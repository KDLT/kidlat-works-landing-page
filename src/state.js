/**
 * @typedef {Object} FieldState - the field type inside AppState
 * @property {string} value - which input field
 * @property {boolean} isValid - is the current input valid
 * What it does.
 */

/**
 * @typedef {Object} AppState
 * @property {FieldState} name - Name field state
 * @property {FieldState} email - Email field state
 * @property {FieldState} mobile - Mobile field state
 * @property {string} previousStep - Previous validation step
 * @property {string} currentStep - Current validation step
 * @property {string} errorMessage - Current error message
 * @property {string} datetime - Timestamp captured when form completes
 */

/** @type {AppState} */
export const state = {
  name: {
    value: "",
    isValid: false,
  },
  email: {
    value: "",
    isValid: false,
  },
  mobile: {
    value: "",
    isValid: false,
  },
  // steps: 'name','email','mobile','vsl','survey'
  previousStep: "",
  currentStep: "",
  errorMessage: "",
  datetime: "",
};

/**
 * @param {string} field - Field name (name, email, mobile)
 * @param {Partial<FieldState>} updates - State updates
 */
export function updateField(field, updates) {
  // spread operator. second arg overwrites
  // matching property values from the first
  state[field] = { ...state[field], ...updates };
}

/**
 * @param {string} step - name, email, mobile
 */
export function updateStep(step) {
  state.previousStep = state.currentStep;
  state.currentStep = step;
}

/**
 * @param {string} message - Error string
 */
export function setError(message) {
  state.errorMessage = message;
}

/** Clears error message */
export function clearError() {
  state.errorMessage = "";
}

export function setDateTime() {
  state.datetime = Date();
}

// i plan to use the reportValidState
// when passing information to the backend
export function reportValidState() {
  console.log(state);
  return state;
}
