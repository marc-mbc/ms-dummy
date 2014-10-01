'use strict';
var config = require('config');
/*
*  Runtime dynamic config changes
*/
//Absolute paths - Need this depending on Node installation.
var basePath = require('path').resolve(__dirname + '/..');
config.server.path = {};
config.server.path.base = basePath;

module.exports = Object.freeze(config);
