/* eslint-disable @typescript-eslint/no-explicit-any */
import { STORAGE_KEYS } from "../config/constant";

const isClient = typeof window !== "undefined";

interface StorageAPI {
  get: (key: string, isSession?: boolean) => string;
  set: (key: string, value: any, isSession?: boolean) => void;
  remove: (key: string, isSession?: boolean) => void;
  clear: () => void;
  clearSession: () => void;
}

const storage: StorageAPI = {
  get: (key, isSession = false) => {
    if (!isClient) return "";
    return (isSession ? sessionStorage : localStorage).getItem(key) || "";
  },
  set: (key, value, isSession = false) => {
    if (!isClient) return;
    (isSession ? sessionStorage : localStorage).setItem(key, value);
  },
  remove: (key, isSession = false) => {
    if (!isClient) return;
    (isSession ? sessionStorage : localStorage).removeItem(key);
  },
  clear: () => {
    if (isClient) {
      localStorage.clear();
      sessionStorage.clear();
    }
  },
  clearSession: () => {
    if (isClient) sessionStorage.clear();
  },
};

export const getItem = storage.get;
export const setItem = storage.set;
export const removeItem = storage.remove;
export const clearData = storage.clear;
export const clearSessionData = storage.clearSession;

export const clearUserToken = (): void => {
  [true, false].forEach((isSession) => {
    storage.remove(STORAGE_KEYS.CLIENT_TOKEN_STORAGE_KEY, isSession);
  });
};

export const storeUserTokens = (
  access_token: string,
  isSession: boolean
): void => {
  storage.set(STORAGE_KEYS.CLIENT_TOKEN_STORAGE_KEY, access_token, isSession);
};

export const fetchUserToken = (): string =>
  storage.get(STORAGE_KEYS.CLIENT_TOKEN_STORAGE_KEY, true) ||
  storage.get(STORAGE_KEYS.CLIENT_TOKEN_STORAGE_KEY);
