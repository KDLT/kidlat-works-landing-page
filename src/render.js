import { State } from "./state";
import { errorElements, domInputsList } from "./domactions";
import DOM from "./domactions";

export function render() {
  const currentField = State.current;
  if (!State.isCurrentStepValid) {
    errorElements[currentField].textContent = State.error;
    errorElements[currentField].classList.remove("hidden");
    errorElements[currentField].classList.remove("editing");
    // setTimeout(() => {
    //   currentErrorElement.classList.add("hidden");
    // }, 1000);
    DOM.getInput(currentField).classList.add("invalid");
    // inputElements[currentField].classList.add("invalid");
  } else DOM.getInput(currentField).classList.add("valid");
  console.log("State.getAll: ", State.getAll);
}
