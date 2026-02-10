// relies on the address of the machine from which the server is ran
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

class ApiError extends Error {
  /**
   * @param {string} message - error message
   * @param {number} status - error status
   */
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * sends subscription data to the backend
 * @param {ValidUser} data - Subscription data
 * @returns {Promise<Object>} Response from backend
 * @throws {ApiError} when submission fails
 */
export async function submitSubscription(data) {
  const response = await fetch(`${API_BASE_URL}/api/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    signal: AbortSignal.timeout(3000),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new ApiError(error.message || "Subscription failed", response.status);
  }

  return await response.json();
}
