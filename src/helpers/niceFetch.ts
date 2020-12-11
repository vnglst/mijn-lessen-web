import { API_URL } from "@config/services";

/** @deprecated migrate to @helpers/api */
export async function niceFetch(
  url: RequestInfo,
  opts?: RequestInit
): Promise<any> {
  const res = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    ...opts,
  });
  return res.status !== 204 ? res.json() : null;
}

/** @deprecated migrate to @helpers/api */
export async function niceApi(
  url: RequestInfo,
  opts?: RequestInit
): Promise<any> {
  return niceFetch(`${API_URL}/${url}`, opts);
}
