import styles from "./lead.module.css"; // LSP marks this as an error if env.d.ts is not on active buffer
// import { LeadSchema } from "./lead.schema";

export default class LeadView {
  /**
   * @param {HTMLFormElement} container - htmlformelement
   * @param {Object} schema - leadschema
   */
  constructor(container, schema) {
    this.container = container;
    this.schema = schema;

    // yet undefined but will be populated by render(), still like to declare in the constructor
    /** @type {NodeListOf<HTMLInputElement> | undefined} */
    this.inputElements;
    /** @type {HTMLButtonElement | undefined} */
    this.submitBtn;
  }

  /** @typedef {Object} InputErrorObject
   * @property {HTMLInputElement} input
   * @property {HTMLSpanElement} error
   */

  /**
   * @param {string} field - which field to get input for
   * @returns {InputErrorObject}
   */
  #get(field) {
    return {
      input: /** @type {HTMLInputElement} */ (
        document.getElementById(`${field}Input`)
      ),
      error: /** @type {HTMLSpanElement} */ (
        document.getElementById(`${field}Error`)
      ),
    };
  }

  /**
   * @param {string} field - which field to create input for, refer to schema keys
   * @returns {HTMLInputElement} resulting HTML input elemenet
   */
  #createInput(field) {
    const input = document.createElement("input");
    const fieldAttributes = this.schema[field].inputAttributes;
    Object.keys(fieldAttributes).forEach((attribute) => {
      input.setAttribute(attribute, fieldAttributes[attribute]);
    });
    return input;
  }

  /**
   * @param {string} field - which field to create input for, refer to schema keys
   * @returns {HTMLSpanElement} resulting HTML span element
   */
  #createError(field) {
    const span = document.createElement("span");
    span.setAttribute("id", `${field}Error`);
    span.setAttribute("class", `${styles.errorMessage} ${styles.hidden}`);
    span.setAttribute("role", "alert");
    span.setAttribute("aria-live", "polite");
    return span;
  }

  render() {
    const form = document.createElement("form");
    form.setAttribute("id", "leadForm");

    for (const field in this.schema) {
      const fieldGroup = document.createElement("div");
      fieldGroup.style.position = "relative";
      fieldGroup.appendChild(this.#createInput(field));
      fieldGroup.appendChild(this.#createError(field));
      form.appendChild(fieldGroup);
    }

    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";
    submitBtn.setAttribute("id", "submitBtn");
    this.submitBtn = submitBtn;
    form.appendChild(submitBtn);

    this.container.appendChild(form);
    // hey claude, inputNodes only get populated here
    this.inputElements = form.querySelectorAll("input");
    return form;
  }

  // Now using vite's import css functionality. Requires *.module.css naming scheme
  /**
   * @param {string} field - which field to mark invalid, refer to schema keys
   * @param {string} errorMessage - error message delivered by the controller
   */
  markInvalid(field, errorMessage) {
    const { input, error } = this.#get(field);
    input?.classList.remove(styles.valid); // attempt to remove valid if set prior
    error?.classList.remove(styles.hidden);
    error.classList.remove(styles.editing);
    input?.classList.add(styles.invalid);
    error.textContent = errorMessage;
  }

  /**
   * @param {string} field - which field to clear invalid for, refer to schema keys
   */
  clearInvalid(field) {
    // console.log(`clearing ${field} styling`);
    const { input, error } = this.#get(field);
    input.classList.remove(styles.invalid);
    error.classList.add(styles.hidden);
  }

  /**
   * @param {string} field - which field to apply success styling, refer to schema keys
   */
  markSuccess(field) {
    const input = this.#get(field).input;
    input?.classList.add(styles.valid);
  }

  get #inputNodes() {
    return /** @type {NodeListOf<HTMLInputElement>} */ (this.inputElements);
  }

  /**
   * @param {HTMLInputElement} target - the input element you're coming from
   */
  #getInputNodeKey(target) {
    return Object.keys(this.#inputNodes).find(
      (key) => this.#inputNodes[key] === target,
    );
  }

  /**
   * @param {HTMLInputElement} target - the input element you're coming from
   * @returns {HTMLInputElement | HTMLButtonElement}
   */
  getNextInput(target) {
    const currentNodeKey = Number(this.#getInputNodeKey(target)); // coerce to number
    const nextNodeKey = currentNodeKey + 1;
    if (nextNodeKey >= this.#inputNodes.length) {
      return /** @type {HTMLButtonElement} */ (this.submitBtn);
    }
    return this.#inputNodes[nextNodeKey];
  }
}
