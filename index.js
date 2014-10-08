'use strict';
// Load Globals
GLOBAL.config = require('./config/index.js');
GLOBAL.log = require('lib-log').init(config);
// Local Api Object
var Api = require('./app/api.js').init;
require('lib-cluster').init(Api, config, log);