import {
  dynamicMessage,
  emailError,
  emailInput,
  nameInput,
} from "./domactions";

export function styleOnEditMode() {
  // applied when the user is actively inputting email
  // removes the red text and border, easier on the eyes
  emailInput.classList.remove("invalid");
  emailError.classList.add("editing");
  // emailError.textContent = "";
  nameInput.classList.add("hidden");
}

export function styleOnSuccess() {
  // emailInput.value = "";
  // nameInput.value = "";
  nameInput.disabled = true;
  emailInput.disabled = true;
  dynamicMessage.textContent = `Welcome, ${nameInput.value}.`;
}
