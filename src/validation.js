// ==========================================================================
// JSDOC CUSTOM TYPES
// ==========================================================================

/**
 * Type definition for applied to each schema field
 * @typedef {Object} FieldSchema
 * @property {RegExp} pattern - regex pattern used for validating the input
 * @property {string} emptyMessage - message for when user attempts to submit empty form
 * @property {string} invalidMessage - message for when validation fails
 * @property {(value: string) => string} sanitize - returns trimmed string pre-validation
 */

/**
 * type definition for convenience functions that call static field
 * @typedef {function(string): ValidationResult} ConvenienceFn
 */

export class Validate {
  /** @type {Record<string, FieldSchema>} */
  static #schema = {
    name: {
      pattern: /[a-zA-Z]{1,}/,
      emptyMessage: "First name will do.",
      invalidMessage: "Is your name really {value}?",
      sanitize: (value) => value.trim(),
      // line above doesn't work, i want to refer to the value of name.domInput, name.domError how do I reference those?
    },
    email: {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      emptyMessage: "Email cannot be empty",
      invalidMessage: "Please provide a valid email.",
      sanitize: (value) => value.trim(),
    },
    mobile: {
      pattern: /^(\+63\s?|0)?9\d{2}\s?\d{3}\s?\d{4}$/,
      emptyMessage: "Please provide a mobile number",
      invalidMessage: "Please provide a valid mobile number",
      sanitize: (value) => value.replace(/\s/g, ""),
    },
    // address: {
    //   pattern: /^(\+63\s?|0)?9\d{2}\s?\d{3}\s?\d{4}$/,
    //   emptyMessage: "Please provide a mobile number",
    //   invalidMessage: "Please provide a valid mobile number",
    //   sanitize: (value) => value.replace(/\s/g, ""),
    // },
  };

  /**
   * Static getter than returns all field names defined in the schema property
   * @returns {string[]}
   */
  static get fields() {
    return Object.keys(this.#schema);
  }

  /**
   * @param {string} field - which field to validate
   * @param {string} value - provided value to the field being validated
   * @returns {ValidationResult}
   */
  static field(field, value) {
    const rules = this.#schema[field];
    if (!rules) throw new Error(`Unknown field: ${field}`);

    const sanitizedValue = rules.sanitize(value);
    if (sanitizedValue === "")
      return { isValid: false, errorMessage: rules.emptyMessage, value: "" };
    if (!rules.pattern.test(sanitizedValue))
      return {
        isValid: false,
        errorMessage: rules.invalidMessage.replace("{value}", sanitizedValue),
        value: "",
      };

    return { isValid: true, errorMessage: "", value: sanitizedValue };
  }
}
