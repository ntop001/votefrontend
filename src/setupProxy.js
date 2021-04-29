const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/api', { 
        target: 'http://127.0.0.1:1751'
        // target: 'https://kawaapp.com',
        // secure: false,
        // changeOrigin: true,
    }))
};