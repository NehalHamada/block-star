import axiosInstance from "../api/axiosInstance.js";

const LOCALHOST_CALLBACKS = [
  "http://localhost:5173/social-login-success",
  "http://127.0.0.1:5173/social-login-success",
];

const PRODUCTION_CALLBACKS = ["https://woodenco.ahdafweb.com/social-login-success"];

export function getSocialAuthCallbackUrl() {
  return `${window.location.origin}/social-login-success`;
}

function normalizeOrigin(origin) {
  if (!origin) {
    return null;
  }

  return origin.endsWith("/") ? origin.slice(0, -1) : origin;
}

function getEnvCallbackUrls() {
  const envOrigins = [
    import.meta.env.VITE_FRONTEND_URL,
    import.meta.env.VITE_VERCEL_URL,
  ];

  return envOrigins
    .map(normalizeOrigin)
    .filter(Boolean)
    .map((origin) => `${origin}/social-login-success`);
}

function getSocialAuthCallbackUrls() {
  return Array.from(
    new Set([
      getSocialAuthCallbackUrl(),
      ...LOCALHOST_CALLBACKS,
      ...getEnvCallbackUrls(),
      ...PRODUCTION_CALLBACKS,
    ]),
  );
}

export function consumeSocialAuthTokenFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (!token) {
    return false;
  }

  localStorage.setItem("userToken", token);
  return true;
}

export async function startSocialLogin(endpoint) {
  const redirectUrl = getSocialAuthCallbackUrl();
  const redirectUrls = getSocialAuthCallbackUrls();
  const localhostRedirectUrl = LOCALHOST_CALLBACKS[0];
  const vercelRedirectUrl =
    getEnvCallbackUrls().find((url) => url.includes("vercel.app")) ||
    (window.location.hostname.includes("vercel.app") ? redirectUrl : null);

  sessionStorage.setItem("socialAuthRedirectUrl", redirectUrl);

  const { data } = await axiosInstance.get(endpoint, {
    params: {
      redirect_url: redirectUrl,
      redirect_uri: redirectUrl,
      callback_url: redirectUrl,
      return_url: redirectUrl,
      return_to: redirectUrl,
      success_url: redirectUrl,
      success_redirect_url: redirectUrl,
      frontend_redirect_url: redirectUrl,
      client_redirect_url: redirectUrl,
      app_redirect_url: redirectUrl,
      frontend_url: window.location.origin,
      origin: window.location.origin,
      localhost_redirect_url: localhostRedirectUrl,
      local_redirect_url: localhostRedirectUrl,
      vercel_redirect_url: vercelRedirectUrl,
      redirect_urls: redirectUrls,
      redirect_urls_csv: redirectUrls.join(","),
      allowed_redirect_urls: redirectUrls,
      allowed_redirect_urls_csv: redirectUrls.join(","),
      callbacks: redirectUrls,
      callbacks_csv: redirectUrls.join(","),
    },
  });

  if (data.success && data.data?.url) {
    window.location.href = data.data.url;
  }
}
