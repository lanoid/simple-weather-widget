var gulp = require('gulp');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var path = require('path');

gulp.task('js', function() {
  return gulp.src(['script/lib/*.js', '!script/lib/jquery.js'])
    .pipe(uglify())
    .pipe(gulp.dest('script/min'));
});

gulp.task('less', function () {
  return gulp.src(['less/*.less', '!less/weather-icons/*.less', '!less/_*.less'])
    .pipe(less({
      paths: [ path.join(__dirname, '.', 'weather-icons') ]
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('watch', function(){
  gulp.watch('script/lib/*.js', ['js']);
  gulp.watch('less/*.less', ['less']);
});

gulp.task('default', ['watch', 'js', 'less']);
