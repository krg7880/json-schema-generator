var path = require('path');
var prettyData = require('pretty-data');
var mkdirp = require('mkdirp');
var fs = require('fs');

var IOType = require('./io-type'),
	cliConsole = require("./console"),
	logger = cliConsole.logger,
	errorHandler = cliConsole.errorHandler,
	stdout = cliConsole.stdout;

/**
 * Writes the given data to the specified
 * file location. If the location (directory) does not exist yet, it is created.
 *
 * @param {String} contents The data to write to the FS
 * @param {String} fullPath - create directories if necessary
 * @param {String} defaultFileName - if fullPath does not end with a filename.json, use this as filename.json
 * @param {Boolean} [force]
 */
var writeFile = function(contents, fullPath, defaultFileName, force) {
	var fullPathResolved = path.resolve(path.normalize(fullPath)),
		dir;

	if (path.extname(fullPathResolved) !== ".json") {
		dir = fullPathResolved;
		fullPathResolved= path.resolve(fullPathResolved, defaultFileName);
	} else {
		// assume intent is path/fileName.json
		dir = path.dirname(fullPathResolved);
	}
	// If dir does not exist yet, create
	if (!fs.existsSync(dir)) {
		mkdirp.sync(dir);
	}
	// if file already exists...
	if (fs.existsSync(fullPathResolved) && !force) {
		errorHandler("Destination file " + fullPathResolved + " already exists");
	}
	var writer = fs.createWriteStream(fullPathResolved);
	var buff = new Buffer(Buffer.byteLength(contents));
	buff.write(contents);
	writer.write(buff);
	writer.close();
	logger('Created file: ' + fullPathResolved);
};

/**
 * Save output to a certain location
 * @param {Object} destConfig
 * @param {String} jsonString
 */
function handleOutput(destConfig, jsonString) {
	var type = destConfig.type,
		destPath = destConfig.path,
		defaultFileName = destConfig.defaultFileName,
		force = destConfig.force,
		pretty = destConfig.pretty;

	if (!type || type === "omit") {
		// don't even bother
		return;
	}
	if (pretty) {
		jsonString = prettyData.pd.json(jsonString);
	}

	switch (type) {
		case IOType.FILE:
			writeFile(jsonString, destPath, defaultFileName, force);
			break;
		case IOType.STDOUT:
			stdout(jsonString);
			break;
	}
}

module.exports = handleOutput;