
export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  auth0: {
    domain: 'pukhrajmotwani23.us.auth0.com',
    clientId: 'GphtyPMt6Jl7c3y5cQD199fwS4Y0TQ76',
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
