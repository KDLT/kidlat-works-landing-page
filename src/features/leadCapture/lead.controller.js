import Lead from "./lead.model";
import LeadView from "./lead.view";

/**
 * @param {HTMLFormElement} container - HTML form that would contain all this
 * @param {Object} schema - the schema, for leads it's LeadSchema
 */
export default function initLeadController(container, schema) {
  const model = new Lead();
  const view = new LeadView(container, schema);
  const form = view.render();
  console.log("form after render: ", form);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("submit pressed");
    if (model.isValid()) {
      console.log(`all required fields passed`);
    } else {
      console.log("some field(s) failed");
    }
  });

  form.addEventListener("input", (event) => {
    // Hey claude, lsp complains about event.target possibly being null
    // it also says name does not exist on type target but it does especially since it's
    // the input attribute string I deliberately set on my schema as it already exists as an attribute
    const target = /** @type {HTMLInputElement} */ (event.target);
    view.clearInvalid(target.name);
  });

  form.addEventListener("focusout", (event) => {
    const target = /** @type {HTMLInputElement} */ (event.target);
    const field = target.name;
    // this exits the eventListener if field does not contain a name attribute
    // only true for button
    if (!field) return;

    const value = target.value;
    // model.set aftermath could contain an error
    model.set(field, value);
    if (model.errors[field]) {
      view.markInvalid(field, model.errors[field]);
    } else {
      view.markSuccess(field);
    }
    // console.log("errors object from models: ", model.errors);
  });
}
