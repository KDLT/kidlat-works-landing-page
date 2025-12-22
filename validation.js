// ==========================================================================
// JSDOC CUSTOM TYPES
// ==========================================================================

/**
 * Creates a new Type called ValidationResult
 * These are the formats of the returns of the export functions below
 * One of its properties is ValidationError defined above
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid - Whether validation passed
 * @property {string} error - error details
 */

// ==========================================================================
// REGULAR EXPRESSION FOR EMAIL VALIDATION
// ==========================================================================
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const nameRegex = /[a-zA-Z]{1,}/;
const mobileRegex = /^(\+63\s?|0)?9\d{2}\s?\d{3}\s?\d{4}$/;

// TODO do away with the error object. turns out i'm only using the message
// i never needed to specify if it was invalid or empty
/** @type {ValidationResult} */
const validObject = {
  isValid: true,
  error: "",
  // error: {
  //   invalid: false,
  //   empty: false,
  //   message: "",
  // },
};

/**
 * Validates the name input
 * @param {string} trimmedName - name string with leading and trailing whitespaces removed
 * @returns {ValidationResult} - object containing the validity and error details of the input
 */
export function validateName(trimmedName) {
  if (trimmedName === "") {
    return {
      isValid: false,
      error: "First name will do.",
    };
  }
  if (!nameRegex.test(trimmedName)) {
    return {
      isValid: false,
      error: `Is your name really ${trimmedName}?`,
    };
  }
  return validObject;
}

/**
 * Validates the email input
 * @param {string} trimmedEmail - email string with leading and trailing whitespaces removed
 * @returns {ValidationResult} - object containing the validity and error details of the input
 */
export function validateEmail(trimmedEmail) {
  if (trimmedEmail === "") {
    return {
      isValid: false,
      error: "Email cannot be empty.",
    };
  }
  if (!emailRegex.test(trimmedEmail)) {
    return {
      isValid: false,
      error: "Valid email, please.",
    };
  }
  return validObject;
}

/**
 * Validates the mobile input
 * @param {string} numberString - mobile number with ALL whitespaces removed
 * @returns {ValidationResult} - object containing the validity and error details of the input
 */
export function validateMobile(numberString) {
  const sanitizedMobile = numberString.replace(/\s/g, "");
  if (sanitizedMobile === "") {
    return {
      isValid: false,
      error: "Mobile number, please.",
    };
  }
  if (!mobileRegex.test(sanitizedMobile)) {
    return {
      isValid: false,
      error: "Valid mobile, please.",
    };
  }
  return validObject;
}
