import { API_URL } from "@config/services";
import ky from "ky-universal";

export const api = ky.create({ prefixUrl: API_URL, credentials: "include" });

export const apiFetcher = async (
  url: RequestInfo,
  opts?: RequestInit
): Promise<any> => {
  const res = api.get(url, opts);
  return res.json();
};
