const PROXY_CONFIG = {
  '/s3-image': {
    target: 'https://sl-chat-image-development.s3.amazonaws.com',
    secure: true,
    changeOrigin: true,
    pathRewrite: {
      '^/s3-image': '',
    },
    logLevel: 'debug',
  },
};

module.exports = PROXY_CONFIG;
