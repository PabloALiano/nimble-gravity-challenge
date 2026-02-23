import type { Candidate, Job, ApplyPayload } from "../types";

const BASE_URL =
  "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net/api";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = "Error en la solicitud";
    try {
      const errorData = await response.json();
      message = errorData?.message || message;
    } catch {
      /* Si el body no es JSON, ignoramos el error de parseo y usamos el mensaje por defecto */
    }
    throw new Error(message);
  }
  return response.json();
}
export const apiService = {
  // Step 2
  getCandidate: async (email: string): Promise<Candidate> => {
    const response = await fetch(
      `${BASE_URL}/candidate/get-by-email?email=${encodeURIComponent(email)}`
    );
    return handleResponse<Candidate>(response);
  },

  // Step 3
  getJobs: async (): Promise<Job[]> => {
    const response = await fetch(`${BASE_URL}/jobs/get-list`);
    return handleResponse<Job[]>(response);
  },

  // Step 5
  applyToJob: async (
    data: ApplyPayload
  ): Promise<{ ok: boolean }> => {
    const response = await fetch(`${BASE_URL}/candidate/apply-to-job`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<{ ok: boolean }>(response);
  },
};