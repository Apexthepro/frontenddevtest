//---------------------------------- Variable Definition Start----------------------------------//
//Required Variables Start//
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    lineec = require('gulp-line-ending-corrector'),
    autoprefixer = require('gulp-autoprefixer'),
    uglifycss = require('gulp-uglifycss'),
    browserSync = require('browser-sync').create();
//Environment Configurations Start//
var projectName = 'frontenddevtest/',
    dev = '../dev/',
    dist = '../dist/';
//Watch Files Start//
var html = dev + '**/*.html',
    scss = dev + '**/*.scss',
    js = dev + '**/*.js';
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
        .pipe(browserSync.stream());
})
//Gulp CSS End//
//Gulp Browser Sync Start//
gulp.task('serve', ['css'], function () {

    browserSync.init({
        server: "./"
    });

    gulp.watch(scss, ['css']);
    gulp.watch(html, browserSync.reload);
});
//Gulp Browser Sync End//
//---------------------------------- Task Definition End----------------------------------//
//---------------------------------- Auto Watch Task Definition Start----------------------------------//

gulp.task('default', ['serve']);
//---------------------------------- Auto Watch Task Definition End----------------------------------//