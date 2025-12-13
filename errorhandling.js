// THIS FILE IS NO LONGER IN USE
import { emailError } from "./domactions";
import { styleOnEditMode, styleOnErrorFeedback } from "./style";

const errorText = {
  empty: "Email cannot be empty.",
  invalid: "Please Enter a valid Email.",
};

// the validateEmail function is in charge of passing the arguments to errorHandler
export function errorHandler({ isEmpty, isInvalid, isValid } = {}) {
  // using object destructuring to handle specific error behaviors
  if (isEmpty) {
    // console.log("email cannot be empty");
    // emailError.textContent = "Email cannot be empty.";
    styleOnErrorFeedback(errorText.empty);
    return { isEmailValid: false, error: errorText.empty };
  }
  if (isInvalid) {
    // console.log("invalid email format");
    // emailError.textContent = "Please Enter a Valid Email.";
    styleOnErrorFeedback(errorText.invalid);
    return { isEmailValid: false, error: errorText.invalid };
  }
  if (isValid) {
    // console.log("valid email");
    // emailError.textContent = "Email Submitted";
    styleOnEditMode(); // remove error styles
    return { isEmailValid: true, error: null }; // only returns true when no errors
  }
}
