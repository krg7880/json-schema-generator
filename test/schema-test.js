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

  it('should work with primitive null', function() {
    var data = null,
        generatedSchema = generator(data),
        expectedSchema = {
          type: 'null'
        };

    expect(JSON.stringify(generatedSchema, null, 4)).to.equal(JSON.stringify(expectedSchema, null, 4));
  });

  it('should work with primitive boolean', function() {
    var data = true,
        generatedSchema = generator(data),
        expectedSchema = {
          type: 'boolean'
        };

    expect(JSON.stringify(generatedSchema, null, 4)).to.equal(JSON.stringify(expectedSchema, null, 4));
  });

  it('should work with primitive integer', function() {
    var data = 9,
        generatedSchema = generator(data),
        expectedSchema = {
          type: 'integer'
        };

    expect(JSON.stringify(generatedSchema, null, 4)).to.equal(JSON.stringify(expectedSchema, null, 4));
  });

  it('should work with primitive null', function() {
    var data = 989.04,
        generatedSchema = generator(data),
        expectedSchema = {
          type: 'number'
        };

    expect(JSON.stringify(generatedSchema, null, 4)).to.equal(JSON.stringify(expectedSchema, null, 4));
  });

  it('should work with primitive string', function() {
    var data = 'bear',
        generatedSchema = generator(data),
        expectedSchema = {
          type: 'string'
        };

    expect(JSON.stringify(generatedSchema, null, 4)).to.equal(JSON.stringify(expectedSchema, null, 4));
  });
});
