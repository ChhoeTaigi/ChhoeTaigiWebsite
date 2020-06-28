module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '64.225.90.138',
      username: 'root',
      pem: "~/.ssh/digitalocean",
      // password: 'server-password'
      // or neither for authenticate from ssh-agent
    }
  },

  app: {
    // TODO: change app name and path
    name: 'ChhoeTaigi',
    path: '../',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'https://chhi.taigi.info',
      MONGO_URL: 'mongodb://localhost/meteor',
      // MONGO_OPLOG_URL: 'mongodb://mongodb/local'
      PORT: 80,
    },

    docker: {
      // abernix/meteord:node-12-base works with Meteor 1.9 - 1.10
      // If you are using a different version of Meteor,
      // refer to the docs for the correct image to use.
      image: 'abernix/meteord:node-12-base',
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  mongo: {
    version: '3.4.1',
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

    domains: 'chhi.taigi.info',

    ssl: {
      // Enable Let's Encrypt
      letsEncryptEmail: 'shiami15@gmail.com',
      forceSSL: true,
    }
  }
};
