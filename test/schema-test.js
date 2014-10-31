'use strict';

var path = require('path');
var fs = require('fs');
var chai = require('chai');
chai.use(require('chai-json-schema'));

var expect = chai.expect;
var schema = fs.readFileSync(path.resolve(process.env.PWD) + '/test/fixtures/schema/valid.json');
var data = fs.readFileSync(path.resolve(process.env.PWD) + '/test/fixtures/json/valid.json');

data = JSON.parse(data.toString('utf8'))
schema = JSON.parse(schema.toString('utf8'));

describe('Generator', function() {
  it('should not contain additionalProperties', function() {
    expect(data).to.be.jsonSchema(schema);
  });
});