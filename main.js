// ==========================================================================
// JSDOC CUSTOM TYPES
// ==========================================================================
/**
 * @typedef {Object} FieldState
 * @property {string} value - the field value
 * @property {boolean} isValid - whether the field is valid
 */

/**
 * @typedef {Object} AppState
 * @property {FieldState} name - Name field state
 * @property {FieldState} email - Email field state
 * @property {FieldState} mobile - Mobile field state
 * @property {string} previousStep - Previous validation step
 * @property {string} currentStep - Current validation step
 * @property {string} error - Current error state
 * @property {string} datetime - Timestamp captured when form completes
 */

import { validateEmail, validateMobile, validateName } from "./validation";
import {
  errorElements,
  formElements,
  inputElements,
  inputList,
  submitButton,
} from "./domactions";
import { styleOnEditMode } from "./style";

console.log("KIDLAT WORKS script.js loaded!");
// the environment variable that I want to expose must be prefixed with 'VITE_' like so
// console.log("what is this for? ", import.meta.env.VITE_WHAT_THIS_IS_FOR);

// adds input listeners by looping through the inputElements object
// activate edit mode styling for corresponding input's error element
Object.keys(inputElements).forEach((inputElementsKey) => {
  const inputToListenTo = inputElements[inputElementsKey];
  const listenedInputError = errorElements[inputElementsKey];
  inputToListenTo.addEventListener("input", () => {
    styleOnEditMode(inputToListenTo, listenedInputError);
  });
});

/** @type {AppState} */
const state = {
  name: {
    value: "",
    isValid: false,
  },
  email: {
    value: "",
    isValid: false,
  },
  mobile: {
    value: "",
    isValid: false,
  },
  // steps: 'name','email','mobile','vsl','survey'
  previousStep: "",
  currentStep: "",
  error: "", // depends on validateEmail function
  datetime: "",
};

/**
 * @param {AppState} state - Current app state
 */
function render(state) {
  const currentStep = state.currentStep;
  const currentInputElement = inputElements[currentStep];
  const currentErrorElement = errorElements[currentStep];
  const isCurrentStepValid = state[currentStep].isValid;
  if (!isCurrentStepValid) {
    currentErrorElement.textContent = state.error;
    currentErrorElement.classList.remove("hidden");
    currentErrorElement.classList.remove("editing");
    setTimeout(() => {
      currentErrorElement.classList.add("hidden");
    }, 1000);
    currentInputElement.classList.add("invalid");
  }
  console.log("in render. state check:", state);
}

/**
 * Picks which validation function to use based on the inputElementKey
 * @param {string} inputElementKey - points to which HTML input element, see indexHtmlElements
 * @example "name"
 */
function chooseValidationFunction(inputElementKey) {
  switch (inputElementKey) {
    case "name":
      return validateName;
    case "email":
      return validateEmail;
    case "mobile":
      return validateMobile;
  }
}

/**
 * Focuses on the next input element after submitting the current one
 * If on last input form, focus on submit button
 * @param {string} inputElementKey - points to which HTML input element, see indexHtmlElements
 * @example "name"
 */
function focusNextElement(inputElementKey) {
  const nextInputIndex = inputList.indexOf(inputElementKey) + 1;
  const nextInputString = inputList[nextInputIndex];
  if (nextInputIndex === inputList.length) {
    submitButton.focus();
  } else {
    inputElements[nextInputString].focus();
  }
}

/**
 * Handles submit for any of the input elements in the page
 * @param {string} inputElementKey - points to which HTML input element, see indexHtmlElements
 * @example "name"
 */
function handleInputSubmit(inputElementKey) {
  state.previousStep = state.currentStep;
  state.currentStep = inputElementKey;
  const trimmedInput = inputElements[inputElementKey].value.trim();
  const validationFunction = chooseValidationFunction(inputElementKey);
  // console.log("validationFunction: ", validationFunction);
  const result = validationFunction(trimmedInput);
  state[inputElementKey].isValid = result.isValid;
  state.error = result.error;
  if (state[inputElementKey].isValid) {
    state[inputElementKey].value = trimmedInput;
  }
  render(state);
  focusNextElement(inputElementKey);
}

/**
 * @returns {object} - outputs the app state
 */
function handleSubmitButton() {
  let allValid = true;
  // loop through all inputs, one invalid input makes allValid false
  for (const input of inputList) {
    handleInputSubmit(input);
    allValid = allValid && state[input].isValid;
  }
  if (allValid) {
    console.log("all valid.");
    state.datetime = Date(); // set datetime when everything is valid
  }
  return state; // return state regardless
}

formElements.name.addEventListener("submit", (event) => {
  event.preventDefault();
  // handleNameSubmit();
  handleInputSubmit("name");
});

formElements.email.addEventListener("submit", (event) => {
  event.preventDefault();
  // handleEmailSubmit();
  handleInputSubmit("email");
});

formElements.mobile.addEventListener("submit", (event) => {
  event.preventDefault();
  // handleMobileSubmit();
  handleInputSubmit("mobile");
});

submitButton.addEventListener("click", () => {
  handleSubmitButton();
});

// TODO: In Milestone 4 (Backend Lessons), we'll send this email
// to a server endpoint:
// fetch('/api/subscribe', {
//   method: 'POST',
//   headers: { 'Content-type': 'application/json' },
//   body: JSON.stringify({ email })
// })
// For now, we'll just capture it in the console
