/** @typedef {Object} FieldState
 * @property {string} value
 * @property {boolean} isValid
 */

/** @typedef {Object} AppState
 * @property {FieldState} name
 * @property {FieldState} email
 * @property {FieldState} mobile
 * @property {string} currentStep
 * @property {string} errorMessage
 * @property {string} datetime
 * @property {boolean} isSubmitting
 */

export class State {
  /** @type {AppState} */
  static #state = {
    name: { value: "", isValid: false },
    email: { value: "", isValid: false },
    mobile: { value: "", isValid: false },
    currentStep: "",
    errorMessage: "",
    datetime: "",
    isSubmitting: false,
  };

  static get getAll() {
    return this.#state;
  }

  /**
   * the static update method is only called upon validation of raw input
   * @param {string} field - Field name (name, email, mobile)
   * @param {ValidationResult} updates - State updates
   */
  static update(field, { value, isValid, errorMessage }) {
    this.#state[field] = { value, isValid };
    this.#state.errorMessage = errorMessage;
    this.#state.currentStep = field;
  }

  /** @returns {string} - the current value of state.currentStep */
  static get current() {
    return this.#state.currentStep;
  }

  /** @returns {string} error message */
  static get error() {
    return this.#state.errorMessage;
  }

  /** @returns {boolean} - whether or not the current step is valid */
  static get isCurrentStepValid() {
    return this.#state[this.#state.currentStep].isValid;
  }

  /** @param {string} message - Error string */
  static setError(message) {
    this.#state.errorMessage = message;
  }
  static clearError() {
    this.#state.errorMessage = "";
  }
  static setDatetime() {
    this.#state.datetime = Date();
  }

  /** @param {boolean} bool - whether setSubmitting is true or false */
  static setSubmitting(bool) {
    this.#state.isSubmitting = bool;
  }
  /** @returns {ValidUser} */
  static get reportValid() {
    return {
      name: this.#state.name.value,
      email: this.#state.email.value,
      mobile: this.#state.mobile.value,
      creationTime: this.#state.datetime,
    };
  }
}
