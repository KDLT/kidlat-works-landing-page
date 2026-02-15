import initLeadController from "./features/leadCapture/lead.controller";
import { LeadSchema } from "./features/leadCapture/lead.schema";

function init() {
  const container = document.getElementById("formContainer");
  initLeadController(container, LeadSchema);
  console.log("landing page initialized");
}

init();
