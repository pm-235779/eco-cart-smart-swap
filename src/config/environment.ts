
export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  auth0: {
    domain: import.meta.env.VITE_AUTH0_DOMAIN || 'your-auth0-domain.auth0.com',
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || 'your-auth0-client-id',
    audience: import.meta.env.VITE_AUTH0_AUDIENCE, // Your backend API identifier
  },
  environment: import.meta.env.MODE,
  isDevelopment: import.meta.env.MODE === 'development',
  isProduction: import.meta.env.MODE === 'production',
};

// Validate required environment variables
const requiredEnvVars = {
  VITE_AUTH0_DOMAIN: config.auth0.domain,
  VITE_AUTH0_CLIENT_ID: config.auth0.clientId,
};

Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value || value.includes('your-')) {
    console.warn(`⚠️  Environment variable ${key} is not properly configured`);
  }
});
