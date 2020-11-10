import { useState } from "react";

export function useSessionStore<T>(key: string, initialState: T) {
  const [state, setState] = useState(
    typeof window === "undefined"
      ? initialState
      : JSON.parse(sessionStorage.getItem(key) || "false") || initialState
  );

  const setStateWithSession = (newState: T) => {
    sessionStorage.setItem(key, JSON.stringify(newState));
    setState(newState);
  };

  return [state, setStateWithSession];
}
