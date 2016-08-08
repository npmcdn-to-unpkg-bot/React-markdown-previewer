// require gulp
var gulp = require('gulp'),

//require plugins
      autoprefixer = require('gulp-autoprefixer'),
      babel = require('gulp-babel'),
      browserSync = require('browser-sync').create(),
      concat = require('gulp-concat'),
      plumber = require('gulp-plumber'),
      pug = require('gulp-pug'),
      sass = require('gulp-sass'),
      stripDebug = require('gulp-strip-debug'),
      uglify = require('gulp-uglify'),
      webpack = require('webpack-stream');


// gulp default task
gulp.task('default', ['styles', 'htmlComp', 'scripts']) ;

//Watch
gulp.task('watch', ['browserSync'], function(){
  //Watch sass
  gulp.watch('./src/styles/*.sass', ['styles']);
  //Watch pug
  gulp.watch('./src/*.pug', ['htmlComp']);
  //Watch js
  gulp.watch('./src/**/*.js', ['scripts']);
});

//Browser sync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './build/'
    }, browser: ["google chrome"], notify: false,
  });
});

// Compile styles, autoprefix & clean
gulp.task('styles', function () {
  return gulp.src('./src/styles/*.sass')
    .pipe(sass({ style: 'nested'}).on('error', sass.logError))
    // .pipe(concat('style.css'))
    .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(plumber())
    .pipe(gulp.dest('./build/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

//Compile HTML & minify
gulp.task('htmlComp', function () {
  return gulp.src('./src/*.pug')
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('./build/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// JS concat, strip & uglify
gulp.task('scripts', function (){
  gulp.src(['src/js/main.js'])
        .pipe(babel())
      .pipe(webpack({
        output: {
          filename: 'main.min.js',
        },
        module: {
          loaders: [
            {
              test: /\.js$/,
              loader: 'babel',
              query: {
                presets: ['es2015', 'react']
              }
            }
          ]
        }
      }))
      // .pipe(babel())
      .pipe(plumber())
      // .pipe(stripDebug())
      // .pipe(uglify())
      .pipe(gulp.dest('./build/'))
      .pipe(browserSync.reload({
        stream: true
      }));
});
