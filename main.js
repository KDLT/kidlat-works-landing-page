console.log("KIDLAT WORKS script.js loaded!");

import { validateEmail } from "./validation";
import { emailInput, nameInput } from "./domactions";
import { emailForm, nameForm } from "./domactions";
import { styleOnEditMode, styleOnSuccess } from "./style";

import { dynamicMessage, emailError } from "./domactions";

// the environment variable that I want to expose must be prefixed with 'VITE_' like so
console.log("what is this for? ", import.meta.env.VITE_WHAT_THIS_IS_FOR);

const state = {
  email: "",
  name: "",
  isEmailValid: false,
  previousStep: "",
  currentStep: "", // 'email_input','name_input', 'vsl', 'survey'
  error: {
    empty: null, // unsure if it's a good idea to set it to null at page load
    invalid: null, // will only be set to either true or false on validation
    message: "", // depends on validateEmail function
  },
};

function render(state) {
  emailError.textContent = state.error.message;
  if (state.error.empty || state.error.invalid) {
    emailError.style.display = "block";
    emailError.classList.remove("editing");
    emailInput.classList.add("invalid");
  }
  // show the nameInput form only when email entered is valid
  if (state.currentStep === "name_input") {
    nameInput.classList.remove("hidden");
    emailError.style.display = "none";
    // emailInput.disabled = true; // locks the email form upon successful input, not sure if it's a good idea
    dynamicMessage.textContent = "Almost there. Name please.";
    nameInput.focus();
  }
}

function handleEmailSubmit() {
  // html5 already does trimming, but just to be sure
  const trimmedEmail = emailInput.value.trim();
  // explicitly define the current step before attempting validation
  state.currentStep = "email_input";
  // 1. assign the result of the validateEmail function
  const result = validateEmail(trimmedEmail);
  // 2. update state based validateEmail results
  state.isEmailValid = result.isValid;
  state.error = result.error;
  // console.log("state on enter email: ", state);
  // 3. email and current step is updated after email validation
  if (state.isEmailValid) {
    state.email = trimmedEmail;
    state.previousStep = state.currentStep;
    state.currentStep = "name_input"; // name_input is next after email_input
  }
  render(state);
}

function handleNameSubmit() {
  state.name = nameInput.value.trim();
  console.log("state Object: ", state);
  styleOnSuccess();
}
// TODO: In Milestone 4 (Backend Lessons), we'll send this email
// to a server endpoint:
// fetch('/api/subscribe', {
//   method: 'POST',
//   headers: { 'Content-type': 'application/json' },
//   body: JSON.stringify({ email })
// })
// For now, we'll just capture it in the console

// emailInput.addEventListener("keydown", enterKeyDownEmail);
emailForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleEmailSubmit();
});

// nameInput.addEventListener("keydown", enterKeyDownName);
nameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleNameSubmit();
});

emailInput.addEventListener("input", styleOnEditMode);
