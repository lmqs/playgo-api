export const ENVIRONMENT = Object.freeze({
  server: {
    port: process.env.port || 3000,
    env: process.env.port || 'development'
  },
});
