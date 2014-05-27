var gulp           = require('gulp'),
    // sass           = require('gulp-sass'),
    // csso           = require('gulp-csso'),
    connect        = require('gulp-connect'),
    deploy         = require("gulp-gh-pages");

// Styles.
gulp.task('styles', function() {
  // return gulp.src('src/styles/main.scss')
    // .pipe(sass({
    //     errLogToConsole: true
    //   }))
    // .pipe(csso())
  return gulp.src('src/styles/main.css')
    .pipe( gulp.dest('dist/styles/'))
    .pipe(connect.reload());
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images/'))
    .pipe(connect.reload());
});

// Templates
gulp.task('templates', function() {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
});

// Build
gulp.task('build', ['images','styles','templates']);

// Connect - let's get this party started!
gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    port: 9000,
    livereload: true
  });
});

// Watch
gulp.task('watch', function() {
    gulp.watch('src/styles/**/*.css', ['styles']);
    gulp.watch('src/images/**/*', ['images']);
    gulp.watch('src/**/*.html', ['templates']);
});

// Default task
gulp.task('default', function() {
    gulp.start('build', 'connect', 'watch');
});

// Deploy to gh-pages
gulp.task('deploy', ['build'], function() {
  gulp.src("src/**/*")
    .pipe(deploy('', 'origin'));
});
