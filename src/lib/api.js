// relies on the address of the machine from which the server is ran
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
/**
 * sends subscription data to the backend
 * @param {ValidUser} data - Subscription data
 * @returns {Promise<Object>} Response from backend
 * @throws {Error} when submission fails
 */
export async function submitSubscription(data) {
  const response = await fetch(`${API_BASE_URL}/api/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Subscription failed");
  }

  return await response.json();
}
