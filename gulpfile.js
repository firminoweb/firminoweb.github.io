'use strict';

// Packages
var gulp       = require('gulp');
var Q          = require('q');
var sourcemaps = require('gulp-sourcemaps');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var sass       = require('gulp-sass');
var rename     = require('gulp-rename');
var cssnano    = require('gulp-cssnano');

// Paths
var bower = {
	jqy: 'components/jquery/',
/*	tet: 'components/tether/',
	bs4: 'components/bootstrap/',*/
  nan: 'components/nanoscroller/',
  pop: 'components/magnific-popup/',
	fpg: 'components/fullpage.js/',
	iso: 'components/isotope/',
	sre: 'components/scrollreveal/'
};

var sassOpts = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

var dir = {
  src: {
    js:  'assets/src/js/',
    scss: 'assets/src/scss/'
  },
  dist: {
    js: 'assets/dist/js/',
    css: 'assets/dist/css/'
  }
};

// Tasks
gulp.task('sync', function () {
  var deferred = Q.defer();

  setTimeout(function () {
    deferred.resolve();
  }, 2000);

  return deferred.promise;
});

gulp.task('jsbuild', function () {
  return gulp.src([
			bower.jqy + 'dist/jquery.js',
      bower.fpg + 'vendors/scrolloverflow.js',
			bower.fpg + 'dist/jquery.fullpage.js',
			bower.iso + 'dist/isotope.pkgd.js',
      //bower.nan + 'bin/javascripts/jquery.nanoscroller.js',
      bower.pop + 'dist/jquery.magnific-popup.js',
			bower.sre + 'dist/scrollreveal.js',

			dir.src.js + 'init.js'
  	])
    .pipe(sourcemaps.init())
    .pipe(concat('firminous.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dir.dist.js));
});

gulp.task('jsmin', function () {
  return gulp.src(dir.dist.js + 'firminous.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dir.dist.js));
});

gulp.task('cssbuild', function () {
  return gulp.src(dir.src.scss + 'firminous.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(sassOpts).on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dir.dist.css));
});

gulp.task('cssmin', function () {
  return gulp.src(dir.dist.css + 'firminous.css')
    .pipe(sourcemaps.init())
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dir.dist.css));
});


//
gulp.task('styles', ['cssbuild','sync'], function () {
  gulp.start('cssmin');
});

gulp.task('scripts', ['jsbuild','sync'], function () {
  gulp.start('jsmin');
});

///
gulp.task('default', ['scripts', 'styles']);
///

// Rodrigo Lifeman
//2306-0096
