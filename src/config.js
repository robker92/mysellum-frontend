// Env Variables
const BACKEND_BASE_URL_PROD = process.env.VUE_APP_BACKEND_BASE_URL_PROD;
const BACKEND_BASE_URL_DEV = process.env.VUE_APP_BACKEND_BASE_URL_DEV;

const BACKEND_BASE_URL =
  process.env.NODE_ENV === "production"
    ? BACKEND_BASE_URL_PROD
    : BACKEND_BASE_URL_DEV;

//=============================================================================
export { BACKEND_BASE_URL };
//=============================================================================
