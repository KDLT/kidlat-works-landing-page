console.log("KIDLAT WORKS script.js loaded!");

import { validateEmail } from "./validation";
import { styleOnEditMode } from "./domactions";

export const emailInput = document.getElementById("emailInput");
export const emailError = document.getElementById("emailError");

export const formContainer = document.getElementById("formContainer");
export const dynamicMessage = document.getElementById("dynamicMessage");

export const nameInput = document.getElementById("nameInput");

export const userData = { name: "", email: "" };

function enterKeyDownEmail(event) {
  if (event.key == "Enter") {
    // html5 already does this, but just to be sure
    validateEmail(emailInput.value.trim());
  }
}

function enterKeyDownName(event) {
  if (event.key == "Enter") {
    userData.name = nameInput.value.trim(); // no validation yet since name is optional
    // console.log("Name captured: ", userData.name);
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
