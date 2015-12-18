'use strict';

var path = require('path');
var fs = require('fs');
var chai = require('chai');
chai.use(require('chai-json-schema'));
var expect = chai.expect;

var generator = require(path.resolve(process.env.PWD + '/index.js'));

describe('Generator', function() {
  it('should work with root arrays', function() {
    var data = fs.readFileSync(path.resolve(process.env.PWD) + '/test/fixtures/json/array.json');
    data = JSON.parse(data.toString('utf8'))

    var schema = fs.readFileSync(path.resolve(process.env.PWD) + '/test/fixtures/schema/array.json');
    schema = JSON.parse(schema.toString('utf8'));

    var generatedSchema = generator(data);
    expect(generatedSchema).to.deep.equal(schema);
  });

  it('should work with root objects', function() {
    var data = fs.readFileSync(path.resolve(process.env.PWD) + '/test/fixtures/json/object.json');
    data = JSON.parse(data.toString('utf8'))

    var schema = fs.readFileSync(path.resolve(process.env.PWD) + '/test/fixtures/schema/object.json');
    schema = JSON.parse(schema.toString('utf8'));

    var generatedSchema = generator(data);
    expect(generatedSchema).to.deep.equal(schema);
  });

  it('should put the type property first, when possible', function() {
    var data = fs.readFileSync(path.resolve(process.env.PWD) + '/test/fixtures/json/ordering.json');
    data = JSON.parse(data.toString('utf8'))


    var schema = fs.readFileSync(path.resolve(process.env.PWD) + '/test/fixtures/schema/ordering.json');
    schema = JSON.parse(schema.toString('utf8'));


    var generatedSchema = generator(data);
    expect(JSON.stringify(generatedSchema, null, 4)).to.equal(JSON.stringify(schema, null, 4));
  });
});
