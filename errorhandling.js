import { emailError } from "./script";
import { styleOnEditMode, styleOnErrorFeedback } from "./domactions";

// the validateEmail function is in charge of passing the arguments to errorHandler
export function errorHandler({ isEmpty, isInvalid, isValid } = {}) {
  // using object destructuring to handle specific error behaviors
  if (isEmpty) {
    // console.log("email cannot be empty");
    emailError.textContent = "Email cannot be empty.";
    styleOnErrorFeedback();
    return;
  }
  if (isInvalid) {
    // console.log("invalid email format");
    emailError.textContent = "Please Enter a Valid Email.";
    styleOnErrorFeedback();
    return;
  }
  if (isValid) {
    // console.log("valid email");
    // emailError.textContent = "Email Submitted";
    emailError.style.display = "none";
    styleOnEditMode(); // remove error styles
    // emailInput.value = "";
    return true; // only returns true when no errors
  }
}
