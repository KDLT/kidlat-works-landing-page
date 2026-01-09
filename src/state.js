/** @type {AppState} */
export const state = {
  name: {
    value: "",
    isValid: false,
  },
  email: {
    value: "",
    isValid: false,
  },
  mobile: {
    value: "",
    isValid: false,
  },
  // steps: 'name','email','mobile','vsl','survey'
  previousStep: "",
  currentStep: "",
  errorMessage: "",
  datetime: "",
};

/**
 * @param {string} field - Field name (name, email, mobile)
 * @param {Partial<FieldState>} updates - State updates
 */
export function updateField(field, updates) {
  // spread operator. second arg overwrites
  // matching property values from the first
  state[field] = { ...state[field], ...updates };
}

/**
 * @param {string} step - name, email, mobile
 */
export function updateStep(step) {
  state.previousStep = state.currentStep;
  state.currentStep = step;
}

/**
 * @param {string} message - Error string
 */
export function setError(message) {
  state.errorMessage = message;
}

/** Clears error message */
export function clearError() {
  state.errorMessage = "";
}

export function setDateTime() {
  state.datetime = Date();
}

/**
 * returns validated user data, excludes other parts of the appstate
 * @returns {ValidUser} - declared in types.d.ts
 */
export function reportValidState() {
  console.log(state);
  return {
    name: state.name.value,
    email: state.email.value,
    mobile: state.mobile.value,
    creationTime: state.datetime,
  };
}
