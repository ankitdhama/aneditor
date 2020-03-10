var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;
let cleanCSS = require('gulp-clean-css');
 
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

gulp.task('minify-css', () => {
  return pipeline(
    gulp.src('src/content/css/*.css'),
    cleanCSS({compatibility: 'ie8'}),
    gulp.dest('dist/content/css')
  );
});

gulp.task('build', gulp.series('compress-js', 'minify-css', 'html-task'));

