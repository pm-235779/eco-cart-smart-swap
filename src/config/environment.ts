
export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  auth0: {
    domain: 'pukhrajmotwani23.us.auth0.com',
    clientId: 'GphtyPMt6Jl7c3y5cQD199fwS4Y0TQ76',
    audience: 'https://pukhrajmotwani23.us.auth0.com/api/v2/', // Using the API identifier you provided
  },
  environment: import.meta.env.MODE,
  isDevelopment: import.meta.env.MODE === 'development',
  isProduction: import.meta.env.MODE === 'production',
};

// Log configuration for debugging
console.log('Auth0 Config:', {
  domain: config.auth0.domain,
  clientId: config.auth0.clientId,
  audience: config.auth0.audience,
  redirectUri: window.location.origin
});

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
