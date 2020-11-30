import { useState } from "react";

type UseSessionStore = <T>(
  key: string,
  initialState: T
) => [T, (newState: T) => void];

export const useSessionStore: UseSessionStore = (key, initialState) => {
  const [state, setState] = useState(
    typeof window === "undefined"
      ? initialState
      : JSON.parse(sessionStorage.getItem(key) || "false") || initialState
  );

  const setStateWithSession = (newState: typeof initialState) => {
    sessionStorage.setItem(key, JSON.stringify(newState));
    setState(newState);
  };

  return [state, setStateWithSession];
};
