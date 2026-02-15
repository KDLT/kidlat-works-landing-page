import { LeadSchema } from "./lead.schema";

export default class Lead {
  // constructor is the blueprint for any given lead
  // should contain associated data and error if validation fails
  // Hey claude, I thought of initializing the a new Lead with this.errors contianing a property like so
  // This is my attempt to ensure isValid won't return true at the very start since errors now initializes with something
  constructor() {
    this.data = {};
    this.errors = {};
  }

  /** @typedef {{ value?: string, error?: string }} ValidationResult */

  /**
   * @param {string} field - which field to validate
   * @param {string} value - provided value to the field being validated
   * @returns {ValidationResult}
   */
  #validateField(field, value) {
    const rules = LeadSchema[field].pattern;
    if (!rules) throw new Error(`No pattern to enforce for ${field}`);

    const sanitizedValue = LeadSchema[field].sanitize(value);
    if (sanitizedValue.length === 0) {
      return { error: LeadSchema[field].error.empty };
    }

    if (!rules.test(sanitizedValue)) {
      return { error: LeadSchema[field].error.invalid };
    } else {
      return { value: sanitizedValue };
    }
  }

  /**
   * @param {string} field - which field
   * @param {string} value - collected value of input field
   */
  set(field, value) {
    const result = this.#validateField(field, value);
    // console.log("set method result: ", result);
    console.log("this.errors: ", this.errors);
    console.log("this.data: ", this.data);

    if (result.error) {
      this.errors[field] = result.error;
    } else {
      delete this.errors[field]; // clears the error for the specific field that passes
      this.data[field] = result.value;
    }

    // Hey claude, but the lsp complains about the operand of delete must be optional
    // Is this a jank workaround? Do people actually instantiate classes this way?
    // Sort of like already having some properties assigned "native values"?
    if ("fresh" in this.errors) {
      console.log("fresh detected, deleting...");
      delete this.errors.fresh;
    }
  }

  // if lead is valid, all the fields have been validated, resulting to an empty errors object
  isValid() {
    // console.log("isValid() triggered");
    if (Object.keys(this.errors).length > 0) return false;
    return Object.keys(LeadSchema)
      .filter((field) => LeadSchema[field].required)
      .every((field) => field in this.data);
  }

  // pick and choose which part of the data to send later
  serialize() {
    return { ...this.data };
  }
}
