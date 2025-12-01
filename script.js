console.log("KIDLAT WORKS script.js loaded!");

const emailInput = document.getElementById("emailInput");
const emailError = document.getElementById("emailError");

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function styleOnErrorFeedback() {
  // applied upon submitting invalid or blank email
  emailError.classList.remove("editing");
  emailInput.classList.add("invalid");
}

function styleOnEditMode() {
  // applied when the user is actively inputting email
  // removes the red text and border, easier on the eyes
  emailInput.classList.remove("invalid");
  emailError.classList.add("editing");
}

function errorHandler({ isEmpty, isInvalid, isValid } = {}) {
  // using object destructuring to handle specific error behaviors
  // console.log( `in errorHandler\nisEmpty: ${isEmpty}\nisInvalid: ${isInvalid}\nisValid: ${isValid}`,);
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
    emailError.textContent = "Email Submitted";
    styleOnEditMode(); // remove error styles
    emailInput.value = "";
    return;
  }
}

function validateEmail(trimmedEmail) {
  // errorObject is passed to errorHandler function
  const errorObject = { isEmpty: false, isInvalid: false, isValid: false };
  if (trimmedEmail === "") {
    errorObject.isEmpty = true;
  }
  if (!emailRegex.test(trimmedEmail)) {
    errorObject.isInvalid = true;
  }
  errorObject.isValid = true;
  errorHandler(errorObject);
  return true; // not sure if it makes sense to return true on validation
}

function enterKeyDown(event) {
  if (event.key == "Enter") {
    const email = emailInput.value;
    // console.log("untrimmed email: ", email);

    // html5 already does this, but just be sure
    const trimmedEmail = email.trim();
    // console.log("trimmed email: ", trimmedEmail);

    validateEmail(trimmedEmail);
  }
}

emailInput.addEventListener("keydown", enterKeyDown);

emailInput.addEventListener("input", styleOnEditMode);
