var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    imagemin = require('gulp-imagemin'),
    svgmin = require('gulp-svgmin'),
    webserver = require('gulp-webserver');

// scripts task
// uglifies
gulp.task('scripts', function(){
  gulp.src('js/*.js')
      .pipe(plumber())
      .pipe(uglify())
      .pipe(gulp.dest('build/js'));
});

// styles task
//
gulp.task('styles', function(){
  gulp.src('src/*.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(gulp.dest('css/'));
});

// images task
// compress
gulp.task('image', function(){
  gulp.src('img/*')
      .pipe(imagemin())
      .pipe(gulp.dest('build/img'));
});

gulp.task('svgminify', function () {
    return gulp.src('img/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('build/img'));
});

gulp.task('webserver', function() {
  gulp.src('')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

// watch task
// watches JS & CSS
gulp.task('watch', function(){
  gulp.watch('js/*.js', ['scripts']);
  gulp.watch('src/*.scss', ['styles']);
});

gulp.task('default', ['scripts', 'styles', 'image', 'watch', 'webserver']);
