module.exports = {
  servers: {
    one: {
      host: '20.2.117.245',
      username: 'ngoohebi',
      pem: "~/.ssh/chhoetaigi-v1-20240606_key.pem",
    }
  },

  app: {
    name: 'ChhoeTaigi',
    path: '../',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      ROOT_URL: 'https://chhoe.taigi.info',
      // MONGO_URL: 'mongodb://localhost/meteor',
      // MONGO_OPLOG_URL: 'mongodb://mongodb/local'
      PORT: 80,
    },

    docker: {
      // https://meteor-up.com/docs#meteor-support
      image: 'zodern/meteor:root',
    },

    volumes: {
      '/data': '/data',
      '/data/logs': '/data/logs',
      '/data/keys': '/data/keys'
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  mongo: {
    version: '5.0.9',
    servers: {
      one: {}
    }
  },

  // (Optional)
  // Use the proxy to setup ssl or to route requests to the correct
  // app when there are several apps

  proxy: {
    servers: {
      one: {}
    },

    domains: 'chhoe.taigi.info',

    ssl: {
      // Enable Let's Encrypt
      letsEncryptEmail: 'shiami15@gmail.com',
      forceSSL: true,
    }
  }
};
