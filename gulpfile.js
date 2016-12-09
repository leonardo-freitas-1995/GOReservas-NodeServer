var gulp = require('gulp'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    stylus = require('gulp-stylus'),
    runSequence = require('run-sequence'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    change = require('gulp-change'),
    htmlreplace = require('gulp-html-replace');

/* Gulp build tasks */

gulp.task('default', ['build-default']);

gulp.task('build-default', function() {
    runSequence('copy', 'server-default', 'angular', 'style');
});

gulp.task('build-production', function() {
    runSequence('copy', 'server-production', 'angular', 'style');
});

gulp.task('server-default', function() {
    return gulp.src('./server.js')
        .pipe(gulp.dest('dist'));
});

gulp.task('server-production', function() {
    return gulp.src('./server.js')
        .pipe(change(function(content) {
            return content.replace('development', 'production');
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy', ['clean'], function() {
    return gulp.src([
            // Includes
            './**/**/*',
            '.bowerrc',

            // Excludes (manually compiled/treated)
            '!mysql-config/**/*',
            '!mysql-config/',
            '!*.md',
            '!*.properties',
            '!gulpfile.js',
            '!test/**/*',
            '!test/',
            '!config/protractor.js',
            '!server/controllers/testController.js',
            '!server/routes/testRoutes.js',
            '!public/vendor/**/*',
            '!public/vendor/',
            '!node_modules/**/*',
            '!node_modules/',

            '!server.js',
            '!public/css/**/*',
            '!public/css/',
            '!public/js/app/**/*',
            '!server/includes/scripts.jade',
            '!server/includes/layout.jade'
        ])
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
    return gulp.src('dist')
        .pipe(clean());
});

gulp.task('style', ['css', 'css-ref']);

gulp.task('css', function() {
    gulp.src('./public/css/**/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: '.min', basename: 'goreservas'}))
        .pipe(gulp.dest('./dist/public/css/'));

});

gulp.task('css-ref', function () {
    return gulp.src('server/includes/layout.jade')
        .pipe(htmlreplace({
            'main-css': {
                src: '/css/goreservas.min.css',
                tpl: 'link(rel="stylesheet", href="%s")'
            }
        }))
        .pipe(gulp.dest('./dist/server/includes/'));
});

gulp.task('angular', ['js', 'js-ref']);

gulp.task('js', function () {
    return gulp.src('./public/js/app/**/*.js')
        .pipe(uglify())
        .pipe(concat('goreservas.min.js'))
        .pipe(gulp.dest('./dist/public/js/app'));
});

gulp.task('js-ref', function () {
    return gulp.src('server/includes/scripts.jade')
        .pipe(htmlreplace({
            'angular-app': {
                src: '/js/app/goreservas.min.js',
                tpl: 'script(type="text/javascript", src="%s")'
            }
        }))
        .pipe(gulp.dest('./dist/server/includes/'));
});