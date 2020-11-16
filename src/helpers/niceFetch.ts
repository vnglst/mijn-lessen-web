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
