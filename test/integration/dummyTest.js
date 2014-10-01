'use strict';
/* jshint expr:true */
/* global before, after, afterEach, beforeEach, describe, it */
GLOBAL.config = require('../../../../config/index.js');
var client = require('restify').createJsonClient({
  url: config.server.base_url + ':' + config.server.port,
  version: '*'
});

var chai = require('chai');
var expect = chai.expect;

describe('Dummy Service Test', function() {
    
  var response, error, request, content;

  before(function (done) {
    client.get('/', function(err, req, res, body) {
      response = res;
      request = req;
      err = error;
      content = body;
      done();
    });
  });

  it('It should respond Ok', function(){
    expect(error).to.not.exist;
    expect(response).to.exist;
    expect(response.statusCode).to.exist;
    expect(response.statusCode).to.equal(200);
    expect(content).to.exist;
    expect(content).to.be.instanceof(Object);
  });

  it('It should have code Ok', function(){
    expect(content.code).to.exist;
    expect(content.code).to.equal('Ok');
  });

  it('It should have an Awesome message', function(){
    expect(content.message).to.exist;
    expect(content.message).to.be.equal('Availability Micro Service is running. Awesome!!');
  });
});