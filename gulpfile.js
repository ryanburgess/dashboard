var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var browserify = require('browserify');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var eslint = require('gulp-eslint');

gulp.task('lint', function () {
  return gulp.src(['jsx/**/*'])
  .pipe(eslint({
    rules: {
      'strict': 2,
      'quotes': 1
    }
  }))
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
    .pipe(rename('index.js'))
    .pipe(gulp.dest('public/js/'));
});

gulp.task('sass', function () {
  return gulp.src('sass/**/*.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('watch', function() {
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch(['./jsx/**/*'], ['scripts']);
});
gulp.task('default', ['watch']);
