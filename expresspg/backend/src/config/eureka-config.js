import Eureka from 'eureka-js-client';
 
const Eureka = require('eureka-js-client').Eureka;
 
const client = new Eureka({
  instance: {
    app: 'jqservice',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    port: 8080,
    vipAddress: 'jq.test.something.com',
    dataCenterInfo: {
      name: 'MyOwn',
    },
  },
  eureka: {
    host: '192.168.99.100',
    port: 32768,
  },
});