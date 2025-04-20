export const BASE_URL = import.meta.env.VITE_APP_SIMPLIFY;

export const REQUEST_TIMEOUT = 60000;
export const PAGE_SIZE = 10;

export const REFRESH_BEFORE = 10; // in minutes
export const REFRESH_INTERVAL = 300000; // in milliseconds

export const STORAGE_KEYS = {
  CLIENT_TOKEN_STORAGE_KEY: "simplify.token",
};
