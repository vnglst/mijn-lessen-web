import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "../types";

export type Session = {
  error?: unknown;
  session?: { user: User };
  mutate?: () => Promise<void>;
};

export const SessionContext = React.createContext({} as Session);

export const SessionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [session, setSession] = useState({} as Session);

  const queryClient = useQueryClient();
  const mutate = () => queryClient.invalidateQueries({ queryKey: ["session"] });

  const { data, error } = useQuery<{ user: User }>({
    queryKey: ["session"],
  });

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
