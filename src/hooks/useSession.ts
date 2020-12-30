import { SessionContext } from "../providers/SessionProvider";
import { useContext } from "react";

export const useSession = () => useContext(SessionContext);
