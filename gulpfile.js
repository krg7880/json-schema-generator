var markdox = require("gulp-markdox");
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var concat = require("gulp-concat");
var Stubby = require('node-stubby-server-cli').CLI;
var Events = Stubby.Events;
var path = require('path');
var stubbyHelper = require(path.normalize(__dirname + '/test/helpers/stubby-cli'));



gulp.task('start:stubby', function(next) {
  var cli = new Stubby();
  cli.admin(stubbyHelper.ports.admin)
    .stubs(stubbyHelper.ports.stubs)
    .tls(stubbyHelper.ports.tls)
    .data(path.normalize(__dirname + '/test/fixtures/stubby/routes.json'))
    .unmute()

  cli.once('LISTENING', function() {
    next();
  }).start();
});


gulp.task('test', ['start:stubby'], function() {
  return gulp.src('test/**/*-test.js')
    .pipe(mocha({reporter: 'nyan'}))
    .once('error', function(e) {
      process.exit(1);
    })
    .once('end', function() {
      process.exit(0)
    });
});


gulp.task('stop:stubby', ['test'], function(next) {
  cli.kill();
  next();
});


gulp.task("doc", function(){
  gulp.src("./lib/*.js")
    .pipe(markdox())
    .pipe(concat("README.md"))
    .pipe(gulp.dest("./doc"));
});


// Default tasks to run
gulp.task('default', [
  'start:stubby',
  'test',
  'stop:stubby',
  'doc'
]);