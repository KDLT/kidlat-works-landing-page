/**
 * @typedef {Object} InputError
 * @property {string} empty - message for when user attempts to submit empty form
 * @property {string} invalid - message for when validation fails
 */

/**
 * @typedef {Object} InputAttributes
 * @property {string} id - nameInput, mobileInput, etc
 * @property {string} name - matches the schema string, required to get teh event.target.name
 * @property {string} type - input type attribute of HTML element
 * @property {string} placeholder - placeholder for the input form
 * @property {string} aria-label -
 */

/**
 * Type definition for applied to each schema field
 * @typedef {Object} FieldSchema
 * @property {boolean} required - if the field is required to pass validation before form submission
 * @property {RegExp} pattern - regex pattern used for validating the input
 * @property {InputError} error
 * @property {(value: string) => string} sanitize - returns trimmed string pre-validation
 * @property {InputAttributes} inputAttributes - set of attributes to assign any given input
 */

/** @type {Record<string, FieldSchema>} */
export const LeadSchema = {
  name: {
    required: true,
    pattern: /[a-zA-Z]{1,}/,
    error: {
      empty: "First name will do.",
      invalid: "Is your name really {value}?",
    },
    sanitize: (value) => value.trim(),
    inputAttributes: {
      id: "nameInput",
      name: "name",
      type: "text",
      placeholder: "Name****",
      "aria-label": "Name",
    },
  },
  email: {
    required: true,
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    error: {
      empty: "Email cannot be empty",
      invalid: "Please provide a valid email.",
    },
    sanitize: (value) => value.trim(),
    inputAttributes: {
      id: "emailInput",
      name: "email",
      type: "email",
      placeholder: "Email****",
      "aria-label": "Email",
    },
  },
  mobile: {
    required: true,
    pattern: /^(\+63\s?|0)?9\d{2}\s?\d{3}\s?\d{4}$/,
    error: {
      empty: "Please provide a mobile number",
      invalid: "Please provide a valid mobile number",
    },
    sanitize: (value) => value.replace(/\s/g, ""),
    inputAttributes: {
      id: "mobileInput",
      name: "mobile",
      type: "tel",
      placeholder: "Mobile*****",
      "aria-label": "Phone Number",
    },
  },
  address: {
    required: false,
    pattern: /^(\+63\s?|0)?9\d{2}\s?\d{3}\s?\d{4}$/,
    error: {
      empty: "Please provide an address",
      invalid: "Please provide a valid address",
    },
    sanitize: (value) => value.trim(),
    inputAttributes: {
      id: "addressInput",
      name: "address",
      type: "text",
      placeholder: "Address*****",
      "aria-label": "Address",
    },
  },
};
