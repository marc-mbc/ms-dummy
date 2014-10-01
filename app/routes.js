'use strict';
module.exports = {
  initialize: function (api) {

    // ROOT STATUS AND NOT FOUND  
    var status =function (req, res) {
      return res.send(200,
        {
          code: 'Ok',
          message: config.server.name + ' is running. Awesome!!',
          pid: process.pid,
          memory: process.memoryUsage(),
          uptime: process.uptime()
        }
      );
    };
    api.get('/status', status);
    api.get('/', status);
    
    api.on('NotFound', function (req, res) {
      var response;
      response = {
        code: 'ResourceNotFound',
        message: req.url
      };
      return res.send(404, response);
    });
  }
};