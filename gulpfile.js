var gulp = require('gulp')
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var del = require('del');

gulp.task('js-linting-compiling', function(){
    return gulp.src(['./scripts/**/*.js'
		    ])
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
        .pipe(concat('edelfelt.js'))
	.pipe(gulp.dest('./'))
	.pipe(rename('edelfelt.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./'));
});

gulp.task('clean-files', function(){
    return del(['edelfelt.js',
		'edelfelt.min.js']);
});

gulp.task('default', ['clean-files','js-linting-compiling']);

gulp.task('jshint', function () {
    gulp.src('./scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('watch', function () {
    gulp.watch('./scripts/**/*.js', ['jshint']);
});
