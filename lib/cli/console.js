module.exports = {
	/**
	 * Give progress messages. Uses stderr, assuming you don't want this in your files.
	 * @param {String} msg
	 */
	logger: function(msg) {
		console.error.apply(console, arguments);
	},
	/**
	 * Barfs the string to stdout so that it can be piped (|) or written (>)
	 * @param {String} str
	 */
	stdout: function(str) {
		console.log(str);
	},
	/**
	 * Gives an error message, optionally followed with the standard help text.
	 * Aborts the process with exit code 1 (generic error)
	 * @param {String} msg
	 */
	errorHandler: function(msg) {
		if (arguments.length > 0) {
			console.error.apply(console, arguments);
		}
		console.error("\nFailed to create schema. Aborting.");
		process.exit(1);
	}
};