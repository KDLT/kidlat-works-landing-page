import Lead from "./lead.model";
import { LeadSchema } from "./lead.schema";

// trying out putting view here with the controller then I'd separate it later
export class LeadView {
  constructor(container) {
    this.container = container;
    this.inputs = {};
  }

  // why is static not working here? How do I make private methods because # also didn't work
  #createInput(field) {
    const input = document.createElement("input");
    const fieldAttributes = LeadSchema[field].attributes;
    Object.keys(fieldAttributes).forEach((attribute) => {
      input.setAttribute(attribute, fieldAttributes[attribute]);
    });
    // input.setAttribute("id", `${field}Input`);
    // input.setAttribute("type", type);
    // input.setAttribute("placeholder", placeholder);
    // input.setAttribute("aria-label", field);
    return input;
  }

  // render builds the forms based on the schema
  render() {
    const form = document.createElement("form");
    form.setAttribute("id", "leadForm");

    for (const field in LeadSchema) {
      form.appendChild(this.#createInput(field));
      // this.#createInput(field);
    }

    this.container.appendChild(form);
    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";
    submitBtn.setAttribute("id", "submitBtn");
    this.container.appendChild(submitBtn);

    // this.inputs[field] = input;
    // form.appendChild(input);

    return this.container;
  }

  markInvalid() {
    // WIP styleOnFailure
  }

  clearInvalid() {
    // WIP styleOnEditMode originally, addInputListener contains these rules now
  }
}

export default class LeadController {
  constructor(view) {
    this.lead = new Lead(LeadSchema); // new Lead inherently has its own methods for input validation
    this.view = view; // pending view WIP
  }

  handleInput(field, value) {
    this.lead.set(field, value);
    if (this.lead.errors[field]) {
      this.view.markInvalid(field);
    } else {
      this.view.clearInvalid(field);
    }
  }
}
