type Method = "GET" | "POST" | "PATCH" | "DELETE";

const BASE_URL = "http://localhost:3000";

export default async function fetcher<T>(method: Method, url: string, body?: BodyInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
    },
    body,
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json);
  }

  return json.data;
}
