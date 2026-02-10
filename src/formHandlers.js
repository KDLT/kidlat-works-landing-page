import { submitSubscription } from "./lib/api";
import { Validate } from "./validation";
import { State } from "./state";
import {
  styleOnFailure,
  styleOnSubmitComplete,
  styleOnSubmitting,
  styleOnSuccess,
} from "./style";
import { render } from "./render";
import { inputList, submitButton } from "./domactions";
import { getErrorInfo } from "./lib/errors";

/**
 * Focuses on the next input element after submitting the current one
 * If on last input form, focus on submit button
 * @param {string} inputElementKey - points to which HTML input element, see indexHtmlElements
 * @example "name"
 */
// function focusNextElement(inputElementKey) {
//   const nextInputIndex = inputList.indexOf(inputElementKey) + 1;
//   const nextInputString = inputList[nextInputIndex];
//   if (nextInputIndex === inputList.length) {
//     submitButton.focus();
//   } else {
//     inputElements[nextInputString].focus();
//   }
// }

/**
 * Handles submit for any of the input elements in the page
 * @param {HTMLInputElement} inputField - which HTML input element to handle, see keys for Validate.schema
 * @example "name" "email" "mobile"
 * @returns {boolean} - function determines if the input is valid
 */
export function handleInputSubmit(inputField) {
  console.log("handleinputsubmit triggered");
  // const rawInput = inputElements[formField].value;
  const rawInput = inputField.value;
  console.log("formField: ", rawInput);
  // State.updateStep(inputElementKey);

  // WIP I changed the parameter type handleInputSubmit accepts, previously a string
  // now an HTMLInputElement
  // NEED to adapt Valida.field accordingly
  const result = Validate.field(inputField, rawInput);

  // {...State.getAll} is necessary for logging otherwise it reports before and after state is the same
  // console.log("State before update: ", { ...State.getAll });
  State.update(inputField, result);
  // console.log("State after update: ", State.getAll);
  if (result.isValid) State.clearError;

  render();
  // focusNextElement(inputElementKey);

  return result.isValid;
}

/**
 * @param {boolean} bool - whether or not data is currently being submitted
 */
function isBeingSubmitted(bool) {
  if (bool) {
    State.setSubmitting(bool);
    styleOnSubmitting();
  } else {
    State.setSubmitting(!bool);
    styleOnSubmitComplete();
  }
}

/**
 * @returns {boolean} whether all inputs to submit are valid
 */
function isAllValid() {
  let allValid = true;
  for (const input of inputList) {
    const currentValid = handleInputSubmit(input);
    allValid = allValid && currentValid;
  }
  return allValid;
}

// made the the handleFinalSubmit function async
// previously this @returns {object} but i encountered an error stating this should return Promise<T>
/**
 * @returns {Promise<Object>} - outputs the app state
 */
export async function handleFinalSubmit() {
  isBeingSubmitted(true);
  if (isAllValid()) {
    State.setDatetime();
    const validatedUser = State.reportValid;

    try {
      // send data to backend
      const data = await submitSubscription(validatedUser);
      console.log("✅ Subscription successful: ", data);
      styleOnSuccess(); // only apply success styles after submit success
      isBeingSubmitted(false);
    } catch (error) {
      // get user-friendly error, see src/lib/errors.js
      const errorInfo = getErrorInfo(error);
      console.error(
        `❌ Subscription failed (${errorInfo.type}): ${error.message}`,
      );
      // could update the UI here to show error message
      State.setError(errorInfo.message);
      styleOnFailure(); // reenable input forms when submit fails
      isBeingSubmitted(false);
      render();
    }
  } else {
    // validation failed, reset submitting state
    isBeingSubmitted(false);
  }
}
