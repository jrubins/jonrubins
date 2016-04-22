'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var gls = require('gulp-live-server'); // Local development server
var browserify = require('browserify'); // Bundles JS
var watchify = require('watchify'); // Allows for cached browserify builds
var babelify = require('babelify');
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var changed = require('gulp-changed'); // Only lint and style check changed files
var eslint = require('gulp-eslint');
var jscs = require('gulp-jscs');
var sass = require('gulp-sass');
var rimraf = require('rimraf'); // Used to empty cache directory (rm -rf)

var config = require('./config/buildConfig'); // Configuration options.
var Constants = require('./app/constants/constants');

// Browserify is defined here so it remains persistent through incremental builds. Needed for watchify.
var browserifier = browserify({
    entries: [config.paths.app.mainJs],
    transform: [babelify],
    cache: {},
    packageCache: {}
});

browserifier.plugin(watchify, {
    poll: true // Polling is necessary for NFS mounts (DOCKER).
});

// This is the local dev server. Uses gulp-live-server.
var server;

/**
 * Binds listeners for a server reload so that we can notify live reload to
 * refresh the page when the server has finished reloading.
 */
function bindServerReload() {
    server.server.stdout.on('data', function(data) {
        if (data.indexOf(Constants.SERVER_START_KEYWORD) !== -1) {
            server.notify({
                path: 'bundle.js'
            });
        }
    });
}

gulp.task('init-server', function() {
    server = gls(config.paths.server.mainJs);
    server.start().then(bindServerReload);
});

gulp.task('restart-server', ['js'], function() {
    server.start().then(bindServerReload);
});

gulp.task('html', function() {
    gulp.src(config.paths.app.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(server.notify());
});

gulp.task('images', function() {
    gulp.src(config.paths.app.images)
        .pipe(gulp.dest(config.paths.dist + '/images'))
        .pipe(server.notify());
});

gulp.task('sass', function() {
    gulp.src(config.paths.app.sass.src)
        .pipe(sass({
            includePaths: config.paths.app.sass.importPaths
        })
        .on('error', sass.logError))
        .pipe(gulp.dest(config.paths.dist + '/css'))
        .pipe(server.notify());
});

gulp.task('clear-cache', function() {
    rimraf(config.paths.cache, function(error) {
        if (error) {
            gutil.log(gutil.colors.red('Error:'), error);
        }
    });
});

gulp.task('lint', function() {
    return gulp.src([
            config.paths.app.js,
            config.paths.server.js
        ])
        .pipe(changed(config.paths.cache))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('jscs', function() {
    return gulp.src([
            config.paths.app.js,
            config.paths.server.js
        ])
        .pipe(changed(config.paths.cache))
        .pipe(jscs())
        .pipe(jscs.reporter())
        .pipe(jscs.reporter('fail'));
});

gulp.task('update-cache', ['lint', 'jscs'], function() {
    return gulp.src([
            config.paths.app.js,
            config.paths.server.js
        ])
        .pipe(changed(config.paths.cache))
        .pipe(gulp.dest(config.paths.cache))
        .on('finish', function() {
            gutil.log(gutil.colors.inverse.bold('********* ALL GOOD *********'));
        })
});

// This runs our jscs and lint tasks. This is used to prevent cache update from running if lint or jscs fails wihout
// stopping other tasks
gulp.task('lint-jscs-cache', function() {
    gulp.start('lint');
    gulp.start('jscs');
    gulp.start('update-cache');
});

// This runs our jscs and lint tasks after clearing the cache
gulp.task('lint-jscs-cache-clean', ['clear-cache'], function() {
    gulp.start('lint-jscs-cache');
});

gulp.task('js', function(cb) {
    return browserifier.bundle()
        .on('error', function(error) {
            // Stop browserify. Without this it will lock up on failure.
            cb(new gutil.PluginError('browserify', {
                name: 'Error',
                message: error.message
            }));
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'));
});

gulp.task('watch', function() {
    var watcher; // Used to keep track of file watcher

    // This is used to solve a nasty bug that exists somewhere between watchify, chokidar (used by watchify) and gaze
    // (used by gulp.watch). When watchify is set to polling mode, any file caught by it's watcher will be deregistered
    // from gaze and subsequently gulp.watch. The easiest way to fix this is to rewatch the files after watchify is done
    // with them. This function is used for that.
    var registerJsWatch = function() {
        if (watcher) {
            watcher.end();
        }
        watcher = gulp.watch([
            config.paths.app.js,
            config.paths.server.js
        ], ['lint-jscs-cache']);
    };

    gulp.watch(config.paths.app.html, ['html']);
    gulp.watch(config.paths.app.sass.src, ['sass']);
    registerJsWatch();
    browserifier.on('update', function() {
        gulp.start('js', 'restart-server');

        registerJsWatch();
    });

    gulp.watch(config.paths.server.js, ['restart-server']);
});

gulp.task('default', [
    'init-server',
    'html',
    'images',
    'sass',
    'lint-jscs-cache-clean',
    'js',
    'watch'
]);
