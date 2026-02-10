// import { handleFinalSubmit } from "./formHandlers";
// import { submitButton } from "./domactions";

import LeadController, {
  LeadView,
} from "./features/leadCapture/lead.controller";

function init() {
  // console.log(inputElements.name);
  // inputElements.name.addEventListener("input", () => {
  //   styleOnEditMode(inputElements.name, errorElements.name);
  // });

  // adds input listeners by looping through the inputElements object
  // activate edit mode styling for corresponding input's error element

  // Object.keys(inputElements).forEach((inputElementsKey) => {
  //   const inputToListenTo = inputElements[inputElementsKey];
  //   const listenedInputError = errorElements[inputElementsKey];
  //   inputToListenTo.addEventListener("input", () => {
  //     styleOnEditMode(inputToListenTo, listenedInputError);
  //   });
  // });

  // adds submit eventlisteners by looping through formElements object

  // Object.keys(formElements).forEach((formElementsKey) => {
  //   formElements[formElementsKey].addEventListener("submit", (event) => {
  //     event.preventDefault();
  //     handleInputSubmit(formElementsKey);
  //   });
  // });

  const container = document.getElementById("formContainer");
  const view = new LeadView(container);
  const form = view.render();
  console.log("form after render: ", form);

  const controller = new LeadController(view);

  // submitButton.addEventListener("click", () => {
  //   handleFinalSubmit();
  // });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });
  form.addEventListener("input", (event) => {
    event.preventDefault();
    // console.log("event.target: ", event.target);
    // console.log("event.target.name: ", event.target.name);
    // console.log("event.target.value: ", event.target.value);
    const field = event.target.name;
    // console.log("field in form.addEventListener: ", field);
    const value = event.target.value;

    controller.handleInput(field, value);
  });

  console.log("landing page initialized");
}

init();
