export default () => ({
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  key: process.env.KEY || '',
  requestUrl: process.env.REQUEST_URL || '',
});
