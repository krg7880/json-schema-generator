var markdox = require("gulp-markdox");
var gulp = require('gulp');
var concat = require("gulp-concat");

gulp.task("doc", function(){
  gulp.src("./lib/*.js")
    .pipe(markdox())
    .pipe(concat("README.md"))
    .pipe(gulp.dest("./doc"));
});

gulp.task('default', ['doc']);