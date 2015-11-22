'use strict';

var path = require('path');
var child_process = require('child_process');
var fs = require('fs');
var chai = require('chai');
chai.use(require('chai-json-schema'));
var expect = chai.expect;
var stubbyHelper = require(path.normalize(__dirname + '/helpers/stubby-cli'));

/**
 * Use the command line interface.
 * @param {String|Array} args
 * @param {String} [stdin]
 * @returns {Array.<String>} [stdout, stderr]
 */
function runCli(args, stdin) {
	if (typeof args === 'string') {
 		args = args.split(' ');
	}
	var response,
		options = {};
	args.unshift('./bin/cli.js');
	if (stdin) {
		options.input = stdin;
	}
	response = child_process.spawnSync('node', args, options);
	return [response.stdout.toString('utf8'), response.stderr.toString('utf8')];
}

var inputLocalPath = __dirname + '/fixtures/json/valid.json',
	inputRemotePath =  'http://localhost:' + stubbyHelper.ports.stubs + '/valid/', 
	//'https://raw.githubusercontent.com/krg7880/json-schema-generator/master/test/fixtures/json/valid.json',
	inputJSONString = fs.readFileSync(inputLocalPath, 'utf8'),
	inputJSON = JSON.parse(inputJSONString);

var schemaJSON, copyJSON;

describe('Cli', function() {
	it('Should be able to read a local file', function() {
		var json = runCli(inputLocalPath);
		console.log(typeof json);
		schemaJSON = runCli(inputLocalPath);
		expect(inputJSON).to.be.jsonSchema(schemaJSON);
	});
	it('Should be able to read a remote file', function() {
		this.timeout(5000);
		schemaJSON = runCli(inputRemotePath);
		expect(inputJSON).to.be.jsonSchema(schemaJSON);
		inputRemotePath = null;
	});
	it('Should be able to read stdin', function() {
		schemaJSON = runCli([], inputJSONString);
		expect(inputJSON).to.be.jsonSchema(schemaJSON);
	});
	it('Should be able to write to a file', function() {
		runCli([inputLocalPath, '-o', './test/_file.json']);
		schemaJSON = JSON.parse(fs.readFileSync('./test/_file.json', 'utf8'));
		expect(inputJSON).to.be.jsonSchema(schemaJSON);
		fs.unlinkSync('./test/_file.json');
	});
	it('Should be able to write into a directory', function() {
		runCli([inputLocalPath, '--schemadir', './test/fixtures']);
		schemaJSON = JSON.parse(fs.readFileSync('./test/fixtures/valid.json', 'utf8'));
		expect(inputJSON).to.be.jsonSchema(schemaJSON);
		fs.unlinkSync('./test/fixtures/valid.json');
	});
	it('Should create subdirectories if necessary', function() {
		runCli([inputLocalPath, '--schemadir', './test/fixtures/var/']);
		schemaJSON = JSON.parse(fs.readFileSync('./test/fixtures/var/valid.json'));
		expect(inputJSON).to.be.jsonSchema(schemaJSON);
		fs.unlinkSync('./test/fixtures/var/valid.json');
		fs.rmdirSync('./test/fixtures/var');
	});
	it('Should be able to create a copy of source', function() {
		runCli([inputLocalPath, '--jsondir', './test/fixtures/var/']);
		copyJSON = JSON.parse(fs.readFileSync('./test/fixtures/var/valid.json'));
		expect(inputJSON).to.be.deep.equal(copyJSON);
		fs.unlinkSync('./test/fixtures/var/valid.json');
		fs.rmdirSync('./test/fixtures/var');
	});
});
