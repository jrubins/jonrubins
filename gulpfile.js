'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var history = require('connect-history-api-fallback');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');

// Configuration options.
var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './app/*.html',
        fonts: [
            'node_modules/font-awesome/fonts/*'
        ],
        images: './app/assets/images/**/*',
        js: './app/**/*.js',
        sass: {
            importPaths: [
                'node_modules/bootstrap-sass/assets/stylesheets/',
                'node_modules/font-awesome/scss/',
                'app/assets/sass/'
            ],
            src: './app/assets/**/*.scss'
        },
        dist: './dist',
        mainJs: './app/main.js'
    }
}

gulp.task('connect', function() {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true,
        middleware: function() {
            return [
                // This middleware allows us to use browser history. This basically serves the
                // index.html file for all requests.
                history()
            ];
        }
    });
});

gulp.task('html', function() {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('fonts', function() {
    gulp.src(config.paths.fonts)
        .pipe(gulp.dest(config.paths.dist + '/fonts'))
        .pipe(connect.reload());
});

gulp.task('images', function() {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/images'))
        .pipe(connect.reload());
});

gulp.task('sass', function () {
    gulp.src(config.paths.sass.src)
        .pipe(sass({
            includePaths: config.paths.sass.importPaths
        })
        .on('error', sass.logError))
        .pipe(gulp.dest(config.paths.dist + '/css'))
        .pipe(connect.reload());
});

gulp.task('js', function() {
    browserify(config.paths.mainJs)
    .transform(babelify)
    .on('error', console.error.bind(console))
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(config.paths.dist + '/scripts'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.sass.src, ['sass']);
    gulp.watch(config.paths.js, ['js']);
});

gulp.task('default', ['html', 'fonts', 'images', 'sass', 'js', 'connect', 'watch']);
