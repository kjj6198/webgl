var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('connect', function() {
	connect.server({
		root: './',
		livereload: true
	})
});

gulp.task('livereload', () => {
  return gulp.src('./src/**/*.html')
             .pipe(connect.reload())
});

gulp.task('watch', () => {
  gulp.watch(['./src/**/*.html', './src/**/*.js'], ['livereload'])
})

gulp.task('default', ['connect','watch']);