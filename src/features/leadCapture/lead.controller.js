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

  form.addEventListener("keydown", (event) => {
    // console.log(event.key);
    if (event.key === "Enter") {
      const target = /** @type {HTMLInputElement} */ (event.target);

      // makes sure this listener does proceed when already focused on the button
      if (view.submitBtn === target) return;

      event.preventDefault(); // this preventDefault blocks for INPUTS ONLY
      view.getNextInput(target).focus();
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("submit pressed");
    if (model.isValid()) {
      console.log(`all required fields passed`);
    } else {
      console.log("some field(s) failed, this is the error object:");
      console.log(model.errors);
    }
  });

  form.addEventListener("input", (event) => {
    // must cast the target as HTMLInputElement
    const target = /** @type {HTMLInputElement} */ (event.target);
    view.clearInvalid(target.name);
  });

  form.addEventListener("focusout", (event) => {
    const target = /** @type {HTMLInputElement} */ (event.target);
    const field = target.name;
    // this exits the eventListener if field does not contain a name attribute
    // basically tells the focusout event listener to not trigger for buttons
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
