var projectName = 'frontenddevtest/';
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    changed = require('gulp-changed'),
    uglify = require('gulp-uglify'),
    lineec = require('gulp-line-ending-corrector');

var dev = '../dev/',
    statging = '../staging/',
    scss = dev + '**/*.scss',
    js = dev + 'scripts/';

// Watch Files

var PHPWatchFiles = dev + '**/*.php',
    styleWatchFiles = dev + '**/*.scss';

// Used to concat the files in a specific order.
var jsSRC = [
    js + 'common.js'
];

// Used to concat the files in a specific order.
var cssSRC = [
    dev + 'common.css'
];

var imgSRC = dev + 'src/images/*',
    imgDEST = dev + 'dist/images/';

gulp.task('css', function () {
    return gulp.src(dev + '**/*.scss')
        //  .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sass().on('error', sass.logError))
        //  .pipe(sourcemaps.write())
        .pipe(gulp.dest('../staging'));
})



// function css() {
//     return gulp.src([scss + 'common.scss'])
//         .pipe(sourcemaps.init({ loadMaps: true }))
//         .pipe(sass({
//             outputStyle: 'expanded'
//         }).on('error', sass.logError))
//         .pipe(autoprefixer('last 2 versions'))
//         .pipe(sourcemaps.write())
//         .pipe(lineec())
//         .pipe(gulp.dest(dev));
// }

// function concatCSS() {
//     return gulp.src(cssSRC)
//         .pipe(sourcemaps.init({ loadMaps: true, largeFile: true }))
//         .pipe(concat('style.min.css'))
//         .pipe(cleanCSS())
//         .pipe(sourcemaps.write('./maps/'))
//         .pipe(lineec())
//         .pipe(gulp.dest(scss));
// }

// function javascript() {
//     return gulp.src(jsSRC)
//         .pipe(concat('devwp.js'))
//         .pipe(uglify())
//         .pipe(lineec())
//         .pipe(gulp.dest(jsdist));
// }

// function imgmin() {
//     return gulp.src(imgSRC)
//         .pipe(changed(imgDEST))
//         .pipe(imagemin([
//             imagemin.gifsicle({ interlaced: true }),
//             imagemin.jpegtran({ progressive: true }),
//             imagemin.optipng({ optimizationLevel: 5 })
//         ]))
//         .pipe(gulp.dest(imgDEST));
// }

// function watch() {
//     browserSync.init({
//         open: 'external',
//         proxy: 'http://localhost:8888/demowp',
//         port: 8080,
//     });
//     gulp.watch(styleWatchFiles, gulp.series([css, concatCSS]));
//     gulp.watch(jsSRC, javascript);
//     gulp.watch(imgSRC, imgmin);
//     gulp.watch([PHPWatchFiles, jsdist + 'devwp.js', scss + 'style.min.css']).on('change', reload);
// }

// exports.css = css;
// exports.concatCSS = concatCSS;
// exports.javascript = javascript;
// exports.watch = watch;
// exports.imgmin = imgmin;

// var build = gulp.parallel(watch);
// gulp.task('default', build);