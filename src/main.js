import { handleFinalSubmit, handleInputSubmit } from "./formHandlers";
import {
  errorElements,
  formElements,
  inputElements,
  submitButton,
} from "./domactions";
import { styleOnEditMode } from "./style";

console.log(inputElements);
console.log(errorElements);
console.log(formElements);
console.log(submitButton);

function init() {
  // adds input listeners by looping through the inputElements object
  // activate edit mode styling for corresponding input's error element
  Object.keys(inputElements).forEach((inputElementsKey) => {
    const inputToListenTo = inputElements[inputElementsKey];
    const listenedInputError = errorElements[inputElementsKey];
    inputToListenTo.addEventListener("input", () => {
      styleOnEditMode(inputToListenTo, listenedInputError);
    });
  });

  // adds submit evenlisteners by looping through formElements object
  Object.keys(formElements).forEach((formElementsKey) => {
    formElements[formElementsKey].addEventListener("submit", (event) => {
      event.preventDefault();
      handleInputSubmit(formElementsKey);
    });
  });

  submitButton.addEventListener("click", () => {
    handleFinalSubmit();
  });

  console.log("landing page initialized");
}

init();
