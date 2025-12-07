console.log("KIDLAT WORKS script.js loaded!");

const emailInput = document.getElementById("emailInput");
const emailError = document.getElementById("emailError");

const formContainer = document.getElementById("formContainer");
const dynamicMessage = document.getElementById("dynamicMessage");

const nameInput = document.getElementById("nameInput");

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userData = { name: "", email: "" };

function showNameInput() {
  nameInput.classList.remove("hidden");
  nameInput.focus();
  dynamicMessage.textContent = "Almost there. Name please.";
}

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
  // emailError.textContent = "";
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
    // emailError.textContent = "Email Submitted";
    emailError.style.display = "none";
    styleOnEditMode(); // remove error styles
    // emailInput.value = "";
    return true; // only returns true when no errors
  }
}

function validateEmail(trimmedEmail) {
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

function enterKeyDownEmail(event) {
  if (event.key == "Enter") {
    // html5 already does this, but just to be sure
    const trimmedEmail = emailInput.value.trim();

    validateEmail(trimmedEmail);
  }
}

function enterKeyDownName(event) {
  if (event.key == "Enter") {
    userData.name = nameInput.value.trim();
    console.log("Name captured: ", userData.name);
    console.log("userData Object: ", userData);
  }
  // TODO: In Milestone 4 (Backend Lessons), we'll send this email
  // to a server endpoint:
  // fetch('/api/subscribe', {
  //   method: 'POST',
  //   headers: { 'Content-type': 'application/json' },
  //   body: JSON.stringify({ email })
  // })
  // For now, we'll just capture it in the console
}

emailInput.addEventListener("keydown", enterKeyDownEmail);

nameInput.addEventListener("keydown", enterKeyDownName);

emailInput.addEventListener("input", styleOnEditMode);
