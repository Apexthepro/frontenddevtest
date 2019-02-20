//---------------------------------- Variable Definition Start----------------------------------//
//Required Variables Start//
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    lineec = require('gulp-line-ending-corrector'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    changed = require('gulp-changed'),
    imagemin = require('gulp-imagemin');

//Environment Configurations Start//
var projectName = 'frontenddevtest/',
    dev = '../dev/',
    dist = '../dist/';
//Watch Files Start//
var html = dev + '**/*.html',
    scss = dev + '**/*.scss',
    scripts = dev + '**/*.js',
    img = dev + 'Images/**/*';

//---------------------------------- Variable Definition End----------------------------------//
//---------------------------------- Task Definition Start----------------------------------//
//Gulp CSS Start//    
gulp.task('css', function () {
    return gulp.src(scss)//Fetching files from source folder and sub folders having extension as scss
        .pipe(sourcemaps.init({ loadMaps: true }))//write source map to know origin file
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))//convert scss files to css files
        .pipe(autoprefixer('last 2 versions'))
        .pipe(concat('style.min.css'))//concatinate all css files in to a single style.min.css file
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./maps/'))
        .pipe(lineec())//line endidng corrector !!!needs to be verified
        .pipe(gulp.dest(dist + '/css/'))//Saving chnages to destination folder
});
//Gulp CSS End//
//Gulp scripts start//
gulp.task('scripts', function () {
    return gulp.src(scripts)
        .pipe(concat('common.min.js'))
        .pipe(uglify())
        .pipe(lineec())
        .pipe(gulp.dest(dist + '/scripts/'));
});
//Gulp scripts end//
//Gulp copy html files start//
gulp.task('copyHtml', function () {
    gulp.src(html)
        .pipe(gulp.dest(dist));
});
//Gulp copy html files end//
//Gulp minify images start//
gulp.task('imgmin', function () {
    return gulp.src(img)
        .pipe(changed(dist + '/images/'))
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 2 })//Choose between 1 - 8
        ]))
        .pipe(gulp.dest(dist + '/images/'));
});
//Gulp minify images end//
//---------------------------------- Task Definition End----------------------------------//
//---------------------------------- Auto Watch Task Definition Start----------------------------------//
gulp.task('run', ['css', 'scripts', 'copyHtml', 'imgmin']);

gulp.task('watch', function () {
    gulp.watch(scss, ['css']);
    gulp.watch(scripts, ['scripts']);
    gulp.watch(html, ['copyHtml']);
    gulp.watch(img, ['imgmin']);
});

gulp.task('default', ['run', 'watch']);

//---------------------------------- Auto Watch Task Definition End----------------------------------//