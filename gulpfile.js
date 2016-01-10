var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var browserify = require('browserify');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var livereload = require('gulp-livereload');
var jsonlint = require("gulp-jsonlint");
var jshintStyle = require('jshint-stylish');
var sassyclean = require('gulp-sassyclean');

gulp.task('lint', function () {
  return gulp.src(['jsx/**/*'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});
 
// Basic usage 
gulp.task('scripts', function() {
 var entryFile = './jsx/clientApp.jsx';

  var bundler = browserify({
    extensions: ['.js', '.es6.js', '.jsx'],
    transform: ['babelify']
  });

  bundler.add(entryFile);

  var stream = bundler.bundle();
  stream.on('error', function (err) { console.error(err.toString()) });

  stream
    .pipe(source(entryFile))
    .pipe(rename('dashboard.js'))
    .pipe(gulp.dest('public/js/'));
});

// JSON Lint
gulp.task('jsonlint', function() {
  return gulp.src(['./*.json'])
    .pipe(jsonlint())
    .pipe(jsonlint.reporter(jshintStyle));
});

gulp.task('photos', function() {
 var photoFile = './jsx/photos.jsx';

  var bundler = browserify({
    extensions: ['.js', '.es6.js', '.jsx'],
    transform: ['babelify']
  });

  bundler.add(photoFile);

  var stream = bundler.bundle();
  stream.on('error', function (err) { console.error(err.toString()) });

  stream
    .pipe(source(photoFile))
    .pipe(rename('photos.js'))
    .pipe(gulp.dest('public/js/'));
});

gulp.task('compress', function() {
  return gulp.src('./public/js/dashboard.js')
    .pipe(uglify())
    .pipe(rename({
       extname: '.min.js'
     }))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('sass', function () {
  return gulp.src('sass/**/*.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./public/css/'))
    .pipe(livereload({ start: true }));
});

gulp.task('sassyclean', function () {
  return gulp.src(['./sass/*.scss'])
    .pipe(sassyclean({
      directory: 'modules',
      remove: true
    }));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(['./*.json'], ['jsonlint']);
  gulp.watch('sass/**/*.scss', ['sass', 'sassyclean']);
  gulp.watch(['./jsx/**/*'], ['lint', 'scripts', 'compress']);
});
gulp.task('default', ['watch']);
gulp.task('test', ['lint', 'jsonlint']);
