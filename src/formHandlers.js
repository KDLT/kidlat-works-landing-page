import { submitSubscription } from "./lib/api";
import { validationFunctions } from "./validation";
import {
  reportValidState,
  setDateTime,
  setError,
  updateField,
  updateStep,
} from "./state";
import { styleOnSuccess } from "./style";
import { render } from "./render";
import { inputElements, inputList, submitButton } from "./domactions";

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
 * Picks which validation function to use based on the inputElementKey
 * @param {string} inputElementKey - points to which HTML input element, see indexHtmlElements
 * @returns {function}
 */
function chooseValidationFunction(inputElementKey) {
  const validationFn = validationFunctions[inputElementKey];
  if (!validationFn) {
    throw new Error(`Invalid input element key: ${inputElementKey}`);
  }
  return validationFn;
}

/**
 * Handles submit for any of the input elements in the page
 * @param {string} inputElementKey - points to which HTML input element, see indexHtmlElements
 * @example "name"
 * @returns {boolean} - function determines if the input is valid
 */
export function handleInputSubmit(inputElementKey) {
  const trimmedInput = inputElements[inputElementKey].value.trim();
  updateStep(inputElementKey);
  const validationFunction = chooseValidationFunction(inputElementKey);
  // console.log("validationFunction: ", validationFunction);
  const result = validationFunction(trimmedInput);

  if (result.isValid) {
    updateField(inputElementKey, { value: trimmedInput, isValid: true });
  } else {
    setError(result.errorMessage);
  }
  render();
  focusNextElement(inputElementKey);

  return result.isValid;
}

// made the the handleFinalSubmit function async
// previously this @returns {object} but i encountered an error stating this should return Promise<T>
/**
 * @returns {Promise<Object>} - outputs the app state
 */
export async function handleFinalSubmit() {
  let allValid = true;
  // loop through all inputs, one invalid input makes allValid false
  for (const input of inputList) {
    const currentValid = handleInputSubmit(input);
    allValid = allValid && currentValid;
  }
  if (allValid) {
    setDateTime();
    styleOnSuccess();
    // added to communicate with the backend
    const validatedUser = reportValidState();

    try {
      // send data to backend
      const data = await submitSubscription(validatedUser);

      console.log("✅ Subscription successful: ", data);
      // could update UI here to show success message
    } catch (error) {
      console.error("❌ Subscription failed: ", error.message);
      // could update the UI here to show error message
      setError(error.message);
      render();
    }
  }
  // return state; // return state regardless
}
