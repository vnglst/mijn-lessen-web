import { useEffect, useRef, useState } from "react";

type UseSessionStore = <T>(
  key: string,
  initialState: T,
  opts?: {
    serialize?: typeof JSON.stringify;
    deserialize?: typeof JSON.parse;
    storage?: Storage;
  }
) => [T, (newState: T) => void];

export const useSessionStore: UseSessionStore = (
  key,
  initialState,
  {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    storage = sessionStorage,
  } = {}
) => {
  const [state, setState] = useState(() => {
    if (typeof window === "undefined") return initialState;
    const valueInStorage = storage.getItem(key);
    if (valueInStorage) return deserialize(valueInStorage);
    // nothing saved in storage yet, save initialState
    storage.setItem(key, serialize(initialState));
    return initialState;
  });

  const setStateWithSession = (newState: typeof initialState) => {
    storage.setItem(key, serialize(newState));
    setState(newState);
  };

  return [state, setStateWithSession];
};
