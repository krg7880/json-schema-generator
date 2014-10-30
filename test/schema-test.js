'use strict';

var path = require('path');
var fs = require('fs');
var chai = require('chai');
chai.use(require('chai-json-schema'));

var expect = chai.expect;
var schema = fs.readFileSync(path.resolve(process.env.PWD) + '/test/fixtures/schema/json.json');
var data = fs.readFileSync(path.resolve(process.env.PWD) + '/test/fixtures/json/json.json');

data = JSON.parse(data.toString('utf8'))
schema = JSON.parse(schema.toString('utf8'));

describe('Generator', function() {
	it.only('should not contain additionalProperties', function() {
		expect(data).to.be.jsonSchema(schema);
	});
});