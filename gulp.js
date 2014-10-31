var markdox = require("gulp-markdox");
var gulp = require('gulp');
gulp.task("doc", function(){
  gulp.src("./lib/*.js")
    .pipe(markdox())
    .pipe(gulp.dest("./doc"));
});