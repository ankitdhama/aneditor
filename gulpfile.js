var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;
 
gulp.task('compress-js', function () {
  return pipeline(
        gulp.src('src/content/js/*.js'),
        uglify(),
        gulp.dest('dist/content/js')
  );
});

gulp.task('html-task', function () {
    return pipeline(
            gulp.src('src/editor.html'),
            gulp.dest('dist/')
    );
});

gulp.task('build', gulp.series('compress-js', 'html-task'));

