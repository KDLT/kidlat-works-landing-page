import { state } from "./state";
import { errorElements, inputElements } from "./domactions";

export function render() {
  const currentStep = state.currentStep;
  const currentInputElement = inputElements[currentStep];
  const currentErrorElement = errorElements[currentStep];
  const isCurrentStepValid = state[currentStep].isValid;
  if (!isCurrentStepValid) {
    currentErrorElement.textContent = state.errorMessage;
    currentErrorElement.classList.remove("hidden");
    currentErrorElement.classList.remove("editing");
    setTimeout(() => {
      currentErrorElement.classList.add("hidden");
    }, 1000);
    currentInputElement.classList.add("invalid");
  }
  console.log("in render. state check:", state);
}
