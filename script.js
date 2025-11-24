console.log("KIDLAT WORKS script.js loaded!");

const emailInput = document.getElementById("emailInput");

function enterKeyDown(event) {
  if (event.key == "Enter") {
    const email = emailInput.value;
    console.log("email value upon enter: ", email);
    console.log("clearing email form...");
    emailInput.value = "";
  }
}

emailInput.addEventListener("keydown", enterKeyDown);

// emailInput.addEventListener("keyup", (event) => {
//   console.log("pressed key: ", event.target.value);
// });
