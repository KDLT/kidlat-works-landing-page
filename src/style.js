import { dynamicMessage, inputElements } from "./domactions";

/**
 * @param {object} inputElement - html input element
 * @param {object} errorElement - html error element for corresponding input
 */
export function styleOnEditMode(inputElement, errorElement) {
  // removes error styles depending on which input is being edited
  // can be: nameInput, emailInput, or mobileInput
  inputElement.classList.remove("invalid");
  inputElement.classList.add("editing");
  // inputElementError.classList.add("editing");
  errorElement.classList.add("hidden");
}

export function styleOnSuccess() {
  Object.keys(inputElements).forEach((key) => {
    inputElements[key].disabled = true;
  });
  dynamicMessage.textContent = `Welcome, ${inputElements.name.value}.`;
}
