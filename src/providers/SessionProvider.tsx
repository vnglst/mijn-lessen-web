import React, { FC, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { API_URL } from "../config";
import { niceFetch } from "../pages";

export type User = {
  id: number;
  name: string;
  email: string;
};

export type Session = {
  error?: Error;
  session?: { user: User };
};

export const SessionContext = React.createContext({} as Session);

export const SessionProvider: FC = ({ children }) => {
  const [session, setSession] = useState({} as Session);
  const { data, error } = useSWR(`${API_URL}/session`, niceFetch);

  useEffect(() => {
    if (error) setSession({ error });
    if (session) setSession({ session: data });
  }, [data, error]);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
