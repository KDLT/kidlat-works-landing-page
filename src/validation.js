// ==========================================================================
// JSDOC CUSTOM TYPES
// ==========================================================================

/**
 * Creates a new Type called ValidationResult
 * These are the formats of the returns of the export functions below
 * One of its properties is ValidationError defined above
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid - Whether validation passed
 * @property {string} errorMessage - error details
 */

// ==========================================================================
// REGULAR EXPRESSION FOR EMAIL VALIDATION
// ==========================================================================
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const nameRegex = /[a-zA-Z]{1,}/;
const mobileRegex = /^(\+63\s?|0)?9\d{2}\s?\d{3}\s?\d{4}$/;

/** @type {ValidationResult} */
const validObject = {
  isValid: true,
  errorMessage: "",
};

/**
 * Validates the name input
 * @param {string} trimmedName - name string with leading and trailing whitespaces removed
 * @returns {ValidationResult} - object containing the validity and error details of the input
 */
// TODO test if export function validateInput needs export
export function validateName(trimmedName) {
  if (trimmedName === "") {
    return {
      isValid: false,
      errorMessage: "First name will do.",
    };
  }
  if (!nameRegex.test(trimmedName)) {
    return {
      isValid: false,
      errorMessage: `Is your name really ${trimmedName}?`,
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
      errorMessage: "Email cannot be empty.",
    };
  }
  if (!emailRegex.test(trimmedEmail)) {
    return {
      isValid: false,
      errorMessage: "Valid email, please.",
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
      errorMessage: "Mobile number, please.",
    };
  }
  if (!mobileRegex.test(sanitizedMobile)) {
    return {
      isValid: false,
      errorMessage: "Valid mobile, please.",
    };
  }
  return validObject;
}

// this is the only object i need to export (maybe)
// it has to be mapped to which input uses which function
export const validationFunctions = {
  name: validateName,
  email: validateEmail,
  mobile: validateMobile,
};
