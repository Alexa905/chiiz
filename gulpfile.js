var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jshintReporter = require('jshint-stylish');
var watch = require('gulp-watch');
var shell = require('gulp-shell');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');

var stylus = require('gulp-stylus');


var paths = {
	'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json'],
	'style': {
		main: './public/styles/site.styl',
		all: './public/styles/**/*.styl',
		output: './public/styles/'
	}

};

// gulp lint
gulp.task('lint', function(){
	gulp.src(paths.src)
		.pipe(jshint())
		.pipe(jshint.reporter(jshintReporter));
});

// gulp watcher for lint
gulp.task('watch:lint', function () {
	gulp.watch(paths.src, ['lint']);
});
// gulp watcher for lint
gulp.task('watch:stylus', function () {
	gulp.watch(paths.style.all, ['stylus']);
});

gulp.task('stylus', function () {
	gulp.src(paths.style.main)
		.pipe(stylus())
		.pipe(gulp.dest(paths.style.output));
});

/*gulp.task('minifyScripts', function() {
	gulp.src(['./public/js/!**'])
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./public/'))
});*/

gulp.task('compressImgs', function(){
	gulp.src('public/images/**')
		.pipe(imagemin())
		.pipe(gulp.dest('public/images'))
});
gulp.task('compressCss', function(){
	gulp.src('public/styles/*.css')
		.pipe(cssmin())
		.pipe(gulp.dest('./public/'));
});



gulp.task('runKeystone', shell.task('node keystone.js'));
gulp.task('watch', [

  'watch:stylus',

  'watch:lint'
]);

gulp.task('default', ['stylus', 'compressImgs', 'compressCss', 'watch', 'runKeystone']);
gulp.task('compress', ['compressImgs', 'compressCss']);
