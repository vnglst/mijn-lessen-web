import { API_URL } from "@config/services";
import { niceFetch } from "@helpers/niceFetch";
import React, { FC, useEffect, useState } from "react";
import useSWR from "swr";
import { User } from "../types";

export type Session = {
  error?: Error;
  session?: { user: User };
  mutate?: (data?: any, shouldRevalidate?: boolean | undefined) => Promise<any>;
};

export const SessionContext = React.createContext({} as Session);

export const SessionProvider: FC = ({ children }) => {
  const [session, setSession] = useState({} as Session);
  const { data, error, mutate } = useSWR(`${API_URL}/session`, niceFetch);

  useEffect(() => {
    if (error) setSession({ error });
    if (session) setSession({ session: data, mutate });
  }, [data, error]);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};
