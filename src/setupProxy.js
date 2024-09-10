// setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

const backendFlask = 'http://philrg.pythonanywhere.com/';
// const backendFlask = 'http://philippe.mourey.com:50001';
// const backendFlask = 'http://192.168.1.10:5000';
// const backendFlask = 'http://localhost:5000';

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: backendFlask, // Replace with your backend server URL
            changeOrigin: true,
            // secure: false,
            logLevel: 'debug', // 'info', 'warn', and 'error'
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
            }
        })
    );
};
