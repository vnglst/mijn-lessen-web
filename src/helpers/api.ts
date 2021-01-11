import { API_URL } from "@config/services";
import ky from "ky-universal";

export const api = ky.create({ prefixUrl: API_URL, credentials: "include" });
