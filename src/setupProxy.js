const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://glam-gadgets-backend.onrender.com',
      changeOrigin: true,
      secure: false,
      logLevel: 'debug',
      onProxyReq: (proxyReq, req, res) => {
        console.log('🔧 Proxying request:', req.method, req.url);
      },
      onError: (err, req, res) => {
        console.log('❌ Proxy error:', err);
      }
    })
  );
};
