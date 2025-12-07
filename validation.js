// ==========================================================================
// REGULAR EXPRESSION FOR EMAIL VALIDATION
// ==========================================================================
// export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// I don't even need to export this

import { userData } from "./script";
import { errorHandler } from "./errorhandling";
import { showNameInput } from "./domactions";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// ==========================================================================
// REGULAR EXPRESSION FOR EMAIL VALIDATION
// ==========================================================================
export function validateEmail(trimmedEmail) {
  // errorObject is passed to errorHandler function
  const errorObject = { isEmpty: false, isInvalid: false, isValid: true };
  if (trimmedEmail === "") {
    errorObject.isEmpty = true;
  }
  if (!emailRegex.test(trimmedEmail)) {
    errorObject.isInvalid = true;
  }
  // errorHandler is only true if email is valid
  // only then will the name input show
  if (errorHandler(errorObject)) {
    userData.email = trimmedEmail;
    // console.log("userData in validateEmail: ", userData);
    console.log("Email Captured: ", userData.email);
    showNameInput();
  }
}
