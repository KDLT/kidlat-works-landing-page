// this is based on the contents of index.html
// values are supposed to be EXACT html id strings
// I ONLY NEED TO CHANGE THESE NOW
export const indexHtmlElements = {
  // primary object keys are elementTypes
  // except error, this is supposed to be span
  // but span is not descriptive
  input: {
    name: "nameInput",
    email: "emailInput",
    mobile: "mobileInput",
  },
  form: {
    name: "nameForm",
    email: "emailForm",
    mobile: "mobileForm",
  },
  error: {
    name: "nameError",
    email: "emailError",
    mobile: "mobileError",
  },
  button: "submitBtn",
};

function buildInputList() {
  const inputList = [];
  Object.keys(indexHtmlElements.input).forEach((element) => {
    inputList.push(element);
  });
  return inputList;
}
// console.log(buildInputList());
export const inputList = buildInputList();

/**
 * builds input, form, error elements
 * based on the IDs declared in indexHtmlElements
 * @param {string} elementType - primary keys in indexHtmlElements (input, email, mobile)
 */
function buildElementsObject(elementType) {
  const elementsObject = {};
  Object.keys(indexHtmlElements[elementType]).forEach((key) => {
    const keyId = indexHtmlElements[elementType][key];
    // validate the assignment first, prevents null assignments
    const element = document.getElementById(keyId);
    if (!element) {
      throw new Error(`${elementType} element not found in HTML: #${keyId}`);
    }
    elementsObject[key] = element;
  });
  return elementsObject;
}
export const inputElements = buildElementsObject("input");
export const errorElements = buildElementsObject("error");
export const formElements = buildElementsObject("form");

export const dynamicMessage =
  /** @type {HTMLSpanElement} */ (document.getElementById("dynamicMessage"));
export const submitButton =
  /** @type {HTMLButtonElement} */ (document.getElementById("submitBtn"));
