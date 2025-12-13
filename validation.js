// ==========================================================================
// REGULAR EXPRESSION FOR EMAIL VALIDATION
// ==========================================================================
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function validateEmail(trimmedEmail) {
  if (trimmedEmail === "") {
    return {
      isValid: false,
      error: {
        empty: true,
        message: "Email Cannot be Empty.",
      },
    };
  }
  if (!emailRegex.test(trimmedEmail)) {
    return {
      isValid: false,
      error: {
        invalid: true,
        message: "Invalid Email Format.",
      },
    };
  }
  return {
    isValid: true,
    error: {
      invalid: false,
      empty: false,
      message: "",
    },
  };
}
