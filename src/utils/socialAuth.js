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

  // Store the redirect URL to verify it after return
  sessionStorage.setItem("socialAuthRedirectUrl", redirectUrl);

  try {
    const { data } = await axiosInstance.get(endpoint, {
      params: {
        redirect_url: redirectUrl,
        callback_url: redirectUrl,
        frontend_url: window.location.origin,
      },
    });

    if (data.success && data.data?.url) {
      window.location.href = data.data.url;
    } else if (data.url) {
      // Handle cases where the URL might be at the top level
      window.location.href = data.url;
    } else {
      console.error("No redirect URL found in response:", data);
    }
  } catch (error) {
    console.error("Social login start failed:", error);
    // Fallback: try direct navigation if axios fails (though it might show JSON)
    const baseUrl = axiosInstance.defaults.baseURL;
    window.location.href = `${baseUrl}${endpoint}?redirect_url=${encodeURIComponent(
      redirectUrl,
    )}&callback_url=${encodeURIComponent(redirectUrl)}`;
  }
}
