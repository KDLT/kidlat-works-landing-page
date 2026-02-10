import { dynamicMessage, domInputsList, submitButton } from "./domactions";

// export function styleOnSuccess() {
//   Object.keys(inputElements).forEach((key) => {
//     inputElements[key].disabled = true;
//   });
//   dynamicMessage.textContent = `Welcome, ${inputElements.name.value}.`;
// }
export function styleOnSuccess() {
  domInputsList.forEach((input) => {
    input.disabled = true;
  });
  dynamicMessage.textContent = `Welcome,asdf sadf`;
}

// export function styleOnFailure() {
//   Object.keys(inputElements).forEach((key) => {
//     inputElements[key].disabled = false;
//   });
// }

export function styleOnFailure() {
  domInputsList.forEach((input) => {
    input.disabled = false;
  });
}

export function styleOnSubmitting() {
  submitButton.disabled = true;
  submitButton.textContent = `Submitting...`;
}

export function styleOnSubmitComplete() {
  submitButton.disabled = false;
  submitButton.textContent = `Submitted`;
}
