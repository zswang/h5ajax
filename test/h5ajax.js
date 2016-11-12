
require('./lib/dom');
var h5ajax = require('../');
      

describe("src/h5ajax.js", function () {
  var assert = require('should');
  var util = require('util');
  var examplejs_printLines;
  function examplejs_print() {
    examplejs_printLines.push(util.format.apply(util, arguments));
  }
  
  

  it("send():base", function (done) {
    examplejs_printLines = [];
    // mock : {"status":200,"data":{"user_id":30001,"name":"zswang"}}

    h5ajax.send('http://localhost/user/info', 'GET', null, function(err, json) {
      examplejs_print(JSON.stringify(json));
      assert.equal(examplejs_printLines.join("\n"), "{\"status\":200,\"data\":{\"user_id\":30001,\"name\":\"zswang\"}}"); examplejs_printLines = [];
      done();
    });
  });
          
  it("send():callback is null", function () {
    examplejs_printLines = [];
    h5ajax.send('http://localhost/user/info', 'GET');
  });
          
  it("send():response is error", function () {
    examplejs_printLines = [];
    h5ajax.send('http://localhost/error', 'GET', function (err, json) {
      examplejs_print(!!err);
      assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
    });
  });
          
  it("get():base", function (done) {
    examplejs_printLines = [];
    // mock : {"status":200,"data":{"user_id":30001,"name":"zswang"}}

    h5ajax.get('http://localhost/user/info', function(err, json) {
      examplejs_print(JSON.stringify(json));
      assert.equal(examplejs_printLines.join("\n"), "{\"status\":200,\"data\":{\"user_id\":30001,\"name\":\"zswang\"}}"); examplejs_printLines = [];
      done();
    });
  });
          
  it("post():base", function (done) {
    examplejs_printLines = [];
    // mock : {"status":200,"data":{"user_id":30001,"name":"zswang","code":$code}}

    h5ajax.post('http://localhost/user/info', { "code": "2016" }, function(err, json) {
      examplejs_print(JSON.stringify(json));
      assert.equal(examplejs_printLines.join("\n"), "{\"status\":200,\"data\":{\"user_id\":30001,\"name\":\"zswang\",\"code\":\"2016\"}}"); examplejs_printLines = [];
      done();
    });
  });
          
});
         