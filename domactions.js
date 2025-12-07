import { dynamicMessage, emailError, emailInput, nameInput } from "./script";

export function showNameInput() {
  nameInput.classList.remove("hidden");
  nameInput.focus();
  dynamicMessage.textContent = "Almost there. Name please.";
}

export function styleOnErrorFeedback() {
  // applied upon submitting invalid or blank email
  emailError.classList.remove("editing");
  emailInput.classList.add("invalid");
}

export function styleOnEditMode() {
  // applied when the user is actively inputting email
  // removes the red text and border, easier on the eyes
  emailInput.classList.remove("invalid");
  emailError.classList.add("editing");
  // emailError.textContent = "";
}
