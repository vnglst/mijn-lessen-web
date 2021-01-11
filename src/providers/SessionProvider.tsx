import React, { FC, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { User } from "../types";

export type Session = {
  error?: unknown;
  session?: { user: User };
  mutate?: () => Promise<void>;
};

export const SessionContext = React.createContext({} as Session);

export const SessionProvider: FC = ({ children }) => {
  const [session, setSession] = useState({} as Session);

  const queryClient = useQueryClient();
  const mutate = () => queryClient.invalidateQueries(`session`);

  const { data, error }: { data?: { user: User }; error: unknown } = useQuery(
    "session"
  );

  useEffect(() => {
    if (error) setSession({ error });
    if (session) setSession({ session: data, mutate });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};
