const errorScenarios = {
  429: {
    type: "rate-limit",
    message: "Too many attempts. Please wait a moment and try again.",
  },
  500: {
    type: "server",
    message: "Server error. Please try again later.",
  },
  400: {
    type: "validation",
    message: "Invalid data submitted",
  },
  offline: {
    type: "offline",
    message: "You appear to be offline. Please check your connection.",
  },
  network: {
    type: "network",
    message: "Could not reach server. Please try again.",
  },
  unknown: {
    type: "unknown",
    message: "Something went wrong. Please try again.",
  },
  timeout: {
    type: "TimeoutError",
    message: "Timeout: It took more than 5 seconds to get the result!",
  },
};

/**
 * @param {Error} error - the caught error
 * @returns {ErrorInfo} - custom error type
 */
export function getErrorInfo(error) {
  if (!navigator.onLine) {
    return errorScenarios.offline;
  }

  if (error.name === "TypeError" && error.message === "Failed to fetch") {
    return errorScenarios.network;
  }

  if (error.name === "TimeoutError") {
    return errorScenarios.timeout;
  }

  if ("status" in error && typeof error.status === "number") {
    if (error.status === 429) return errorScenarios[429];
    if (error.status >= 500) return errorScenarios[500];
    if (error.status === 400) {
      return {
        ...errorScenarios[400],
        message: error.message || errorScenarios[400].message,
      };
    }
  }

  return {
    ...errorScenarios.unknown,
    message: error.message || errorScenarios.unknown.message, // add the || error.message here
  };
}
