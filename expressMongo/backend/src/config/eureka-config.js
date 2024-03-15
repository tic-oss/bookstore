const { Eureka } = require("eureka-js-client");

const eurekaClient = new Eureka({
  instance: {
    app: 'express-mongo',
    hostName: 'localhost', 
    statusPageUrl: 'http://localhost:8080/info',
    ipAddr: '127.0.0.1',   
    port: {
      '$': 8080,
      '@enabled': true,
    },
    vipAddress: 'jq.test.something.com',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    host: 'localhost',
    port: 8761,
    // requestMiddleware: (requestOpts, done) => {
    //   requestOpts.auth = {
    //     user: 'admin',
    //     pass: 'admin',
    //   };
    //   done(requestOpts);
    // },
    servicePath: ''
  },
});

module.exports = { eurekaClient };





// const { Eureka } = require("eureka-js-client");

// const registerWithEureka = (port) => {
//   const eurekaClient = new Eureka({
//     instance: {
//       app: "expressMongo",
//       hostName: "localhost",
//       port: {
//         $: port,
//         "@enabled": true,
//       },
//       vipAddress: "expressMongo",
//       dataCenterInfo: {
//         "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
//         name: "t",
//       },
//     },
//     eureka: {
//       host: "localhost", // Specify your Eureka server host
//       port: 8761, // Specify your Eureka server port
//       servicePath: "/eureka/apps/",
//     },
//   });

//   // Register with Eureka server
//   eurekaClient.start();
// };

// module.exports = { registerWithEureka };
