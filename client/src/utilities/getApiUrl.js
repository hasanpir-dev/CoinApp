export default function getApiUrl() {
  return import.meta.env.DEV
    ? import.meta.env.VITE_API_URL
    : import.meta.env.VITE_API_URL_PROD;
}
