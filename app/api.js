'use strict';
module.exports = {
  init: function (worker) {
    if (config.profiling.profile) require('lib-profiler').init(config, log);
    
    var restify = require('restify');
    var handlers = require('lib-restify-handlers');
    var router = require(config.server.path.base + '/app/routes.js');

    var port = config.server.port;
    var name = config.server.name;

    var api = restify.createServer({
      name: name,
      log: log
    });

    handlers.init(api, worker, config, log);

    router.initialize(api);

    api.listen(port, function () {
      var worker_info;
      if (worker && worker.id) {
        worker_info = 'Worker: ' + worker.id + ', ' + name;
      }
      log.info(worker_info || name, 'Port: ' + port);
    });
  }
};