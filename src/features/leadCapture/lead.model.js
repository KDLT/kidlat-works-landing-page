import { LeadSchema } from "./lead.schema";

export default class Lead {
  // constructor is the blueprint for any given lead
  // should contain associated data and error if validation fails
  constructor(schema) {
    this.data = {};
    this.errors = {}; // initializes an empty error object from the start
  }

  /**
   * @param {string} field - which field to validate
   * @param {string} value - provided value to the field being validated
   * @returns {object}
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

    if (result.error) {
      this.errors[field] = result.error;
    } else {
      this.data[field] = result.value;
    }
  }

  // if lead is valid, all the fields have been validated, resulting to an empty errors object
  isValid() {
    return Object.keys(this.errors).length === 0;
  }

  // pick and choose which part of the data to send later
  serialize() {
    return { ...this.data };
  }
}
