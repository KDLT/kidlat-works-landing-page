# MVC Refactor TODO

## How to use this guide

Work through the phases in order. Each phase should leave the app in a
**runnable state** (or at least not more broken than it already is). Do not skip
ahead. Check off items as you go.

**Golden rule: Move code, don't rewrite it.** Copy working logic into MVC files
first, then adjust. Rewriting from scratch invites new bugs.

---

## Current state summary

The codebase is half-refactored. The same logic exists in multiple places:

| Concern | Old location | New location | Status |
|---------|-------------|--------------|--------|
| Schema (validation rules) | `validation.js` Validate.#schema | `features/leadCapture/lead.schema.js` | Duplicated |
| Schema (validation + DOM) | `domactions.js` DOM.#schema | `features/leadCapture/lead.schema.js` | Duplicated |
| Validation logic | `validation.js` Validate.field() | `features/leadCapture/lead.model.js` validateField() | Duplicated |
| State management | `state.js` State class | `features/leadCapture/lead.model.js` Lead instance | Partially duplicated |
| DOM building | `domactions.js` DOM class | Should go to `lead.view.js` | Not started |
| Rendering/styles | `render.js` + `style.js` | Should go to `lead.view.js` | Not started |
| Event wiring | `main.js` + `domactions.js` #addFormListener | Should go to `lead.controller.js` | Not started |
| API calls | `src/lib/api.js` | Should move to `src/shared/api.js` | Not started |
| Error classification | `src/lib/errors.js` | Should move to `src/shared/errors.js` | Not started |

---

## Phase 0: Fix existing bugs before refactoring

Do not carry bugs into the new structure.

- [ ] **formHandlers.js:46** — `Validate.field(inputField, rawInput)` passes an
  `HTMLInputElement` as first arg, but `Validate.field()` expects a string field
  name (e.g., `"name"`, `"email"`)
- [ ] **formHandlers.js:50** — `State.update(inputField, result)` same problem,
  passing `HTMLInputElement` instead of a string
- [ ] **formHandlers.js:52** — `State.clearError` is missing parentheses, should
  be `State.clearError()`
- [ ] **formHandlers.js:78-80** — `isAllValid()` loops over `inputList` (strings)
  but passes each string to `handleInputSubmit()` which now expects
  `HTMLInputElement` — type mismatch
- [ ] **lead.schema.js:42-50** — `address` field has mobile's regex pattern and
  error messages (copy-paste artifact)
- [ ] **lead.model.js:20-29** — double sanitization (sanitizes in `validateField`,
  then again in `set`). Return `{ value: sanitizedValue }` on success instead
- [ ] **lead.model.js:52-54** — `isValid()` returns true on a fresh Lead instance
  with no data. Add required fields check
- [ ] **style.js:13** — `Welcome,asdf sadf` is a placeholder, needs real value

---

## Phase 1: Create the directory structure

Set up the target layout. Don't move code yet, just create the folders.

- [ ] Create `src/shared/` directory
- [ ] Create `src/shared/types.d.ts` (will receive types from `src/types.d.ts`)
- [ ] Confirm `features/leadCapture/` exists with its files

Target structure:
```
src/
├── main.js
├── shared/
│   ├── api.js
│   ├── errors.js
│   └── types.d.ts
├── styles/
│   └── main.css
└── features/
    └── leadCapture/
        ├── lead.schema.js
        ├── lead.model.js
        ├── lead.view.js
        └── lead.controller.js
```

Note: `features/` currently lives outside `src/`. Decide whether to move it
inside `src/` (recommended so Vite processes it) or keep it outside. If it stays
outside, update `vite.config.js` if needed.

---

## Phase 2: Finalize lead.schema.js (single source of truth)

The schema currently exists in three places. After this phase, only one remains.

- [ ] Ensure `lead.schema.js` has all fields with correct data:
  - `required` boolean
  - `pattern` regex
  - `emptyMessage` / `invalidMessage` strings
  - `sanitize` function
  - `inputType` string (for DOM building)
  - `placeholder` string (for DOM building)
- [ ] Fix the `address` field (currently has mobile's regex/messages)
- [ ] Add `FieldSchema` JSDoc typedef at the top of this file (move it here,
  this is where it belongs since the schema lives here)
- [ ] Verify: this file has zero imports (it's pure data, depends on nothing)

---

## Phase 3: Build lead.model.js

The model owns data, validation, and state. It replaces both `validation.js` and
`state.js`.

- [ ] Import `LeadSchema` from `lead.schema.js`
- [ ] `constructor` initializes `this.data = {}` and `this.errors = {}`
- [ ] `validateField(field, value)` — uses `LeadSchema[field]` for rules.
  Returns `{ value: sanitizedValue }` on success, `{ error: "message" }` on
  failure. Single sanitization, no double-pass
- [ ] `set(field, value)` — calls `validateField`, stores to `this.data` or
  `this.errors`
- [ ] `isValid()` — checks `this.errors` is empty AND all required fields
  (from schema) are present in `this.data`
- [ ] `serialize()` — returns `{ ...this.data, creationTime: new Date().toString() }`
  ready for API submission
- [ ] `getError(field)` — returns `this.errors[field]` or `null`
- [ ] Remove convenience methods (`Name()`, `Email()`, `Mobile()`) — the generic
  `set(field, value)` replaces them

What this replaces:
- `validation.js` Validate class (validation logic)
- `state.js` State class (the Lead instance IS the state)
- `formHandlers.js` state management parts

---

## Phase 4: Build lead.view.js

The view owns all DOM creation and manipulation. It replaces `domactions.js`,
`render.js`, and `style.js`.

- [ ] Import `LeadSchema` from `lead.schema.js`
- [ ] Move DOM creation methods from the `DOM` class in `domactions.js`:
  - `#createInput(field, type, placeholder)` → `createInput(field)`
    (reads type/placeholder from schema)
  - `#createErrorSpan(field)` → `createErrorSpan(field)`
  - `#formBuilder(field, input, error, container)` → `buildForm(field, ...)`
- [ ] `buildAll(container)` — builds all forms from schema, returns references
  to created elements (inputs, errors, forms) as a structured object:
  ```javascript
  // Returns something like:
  {
    inputs: { name: HTMLInputElement, email: HTMLInputElement, ... },
    errors: { name: HTMLSpanElement, email: HTMLSpanElement, ... },
    forms:  { name: HTMLFormElement, email: HTMLFormElement, ... },
  }
  ```
  This way the view holds its own element references after building. No need
  to re-query the DOM with `getElementById` after creation.
- [ ] Move render logic from `render.js`:
  - `showError(field, message)` — shows error on a field
  - `clearError(field)` — hides error on a field
  - `showValid(field)` — adds `.valid` class
  - `resetField(field)` — removes all validation classes (editing mode)
- [ ] Move style functions from `style.js`:
  - `disableAllInputs()` — from `styleOnSuccess`
  - `enableAllInputs()` — from `styleOnFailure`
  - `setSubmitting(button)` — from `styleOnSubmitting`
  - `setSubmitComplete(button)` — from `styleOnSubmitComplete`
  - `showSuccessMessage(name)` — updates dynamicMessage

What this replaces:
- `domactions.js` DOM class (element creation)
- `domactions.js` exported element references (errorElements, formElements, etc.)
- `render.js` render function
- `style.js` all style functions

---

## Phase 5: Build lead.controller.js

The controller wires events and orchestrates model + view. It replaces `main.js`
event setup and `formHandlers.js`.

- [ ] Import Lead model, view functions, API, and error utilities
- [ ] `initLeadCapture()` function that:
  1. Creates a `Lead` instance
  2. Gets the `#formContainer` div and `#submitBtn` from the DOM
  3. Calls view's `buildAll(container)` to create forms, gets element references
  4. Wires input listeners (editing mode) — for each input, on `"input"` event,
     call view's `resetField(field)`
  5. Wires form submit listeners — for each form, on `"submit"` event,
     call `handleFieldSubmit(field)`
  6. Wires submit button click — calls `handleFinalSubmit()`
- [ ] `handleFieldSubmit(field)`:
  1. Gets value from the input element
  2. Calls `lead.set(field, value)`
  3. If error: calls `view.showError(field, lead.getError(field))`
  4. If valid: calls `view.showValid(field)`
- [ ] `handleFinalSubmit()`:
  1. Loops through all fields, calls `handleFieldSubmit` for each
  2. Checks `lead.isValid()`
  3. If invalid: stop
  4. If valid: `view.setSubmitting()`, call API with `lead.serialize()`,
     then `view.showSuccessMessage()` on success or `view.showError()` on failure
- [ ] Export `initLeadCapture`

What this replaces:
- `formHandlers.js` (handleInputSubmit, handleFinalSubmit, isAllValid, isBeingSubmitted)
- `main.js` event listener setup
- `domactions.js` #addInputListener, #addFormListener

---

## Phase 6: Move shared utilities

- [ ] Move `src/lib/api.js` → `src/shared/api.js`
  - No logic changes, just the file move
  - Update the import in `lead.controller.js`
- [ ] Move `src/lib/errors.js` → `src/shared/errors.js`
  - No logic changes
  - Update the import in `lead.controller.js`
- [ ] Move `src/types.d.ts` → `src/shared/types.d.ts`
  - Add JSDoc property descriptions (the tooltip issue from earlier)
  - Remove `ValidUser` type if Lead.serialize() replaces it
  - Update `tsconfig.json` or `jsconfig.json` if type paths changed
- [ ] Delete `src/lib/` directory once empty

---

## Phase 7: Update main.js

- [ ] Replace all current imports and logic with:
  ```javascript
  import { initLeadCapture } from "./features/leadCapture/lead.controller.js";

  function init() {
    initLeadCapture();
  }

  init();
  ```
- [ ] Update `index.html` script src if `features/` moved inside `src/`

---

## Phase 8: Delete old files

Only delete after confirming the app works with the new MVC files.

- [ ] Delete `src/validation.js`
- [ ] Delete `src/state.js`
- [ ] Delete `src/domactions.js`
- [ ] Delete `src/formHandlers.js`
- [ ] Delete `src/render.js`
- [ ] Delete `src/style.js`
- [ ] Delete `src/lib/` (should already be empty)
- [ ] Delete `src/components/` if unused
- [ ] Delete `src/env.d.ts` if no longer needed
- [ ] Remove leftover console.log statements throughout

---

## Phase 9: Verify everything works

- [ ] `npm run dev` starts without errors
- [ ] Forms are dynamically generated (no hardcoded HTML forms in index.html)
- [ ] Typing in an input clears previous validation styling
- [ ] Pressing Enter in a field triggers validation for that field
- [ ] Invalid input shows error message and red border
- [ ] Valid input shows green border
- [ ] Clicking Submit validates all fields
- [ ] Successful submission hits backend, disables inputs, shows success message
- [ ] Failed submission (server down) shows error, re-enables inputs
- [ ] Backend server at localhost:3000 still receives correct data shape
- [ ] No console errors in browser devtools
- [ ] `npm run build` completes without errors

---

## Decisions to make along the way

These don't have right answers — decide as you go:

1. **Should `features/` live inside or outside `src/`?**
   Inside is simpler for Vite. Outside means a conceptual separation but may
   need config changes.

2. **Should the view store element references or re-query the DOM?**
   Storing references from `buildAll()` is faster and avoids the type-casting
   issue with `getElementById`. But it means the view must be initialized before
   the controller can use it.

3. **Should the view be a class or plain functions?**
   A class can hold element references as instance properties. Plain functions
   are simpler but need the references passed in each time or stored in module
   scope.

4. **Should `lead.controller.js` export a class or a function?**
   A single `initLeadCapture()` function is the simplest. A class makes sense
   if you need multiple independent lead capture forms on the same page.
