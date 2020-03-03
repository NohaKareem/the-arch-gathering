let gulp = require('gulp');
let sass = require('gulp-sass');

// compile sass
gulp.task('sass', function () {
    return gulp.src('public/stylesheets/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/stylesheets/'));
});

// compile ES6
gulp.task('es6', function() {
    return gulp.src('js/**/*.js')
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(gulp.dest('./build/'));
})

// watch for sass updates
gulp.task('default', function() {
    gulp.watch('public/stylesheets/**/*.scss', gulp.series('sass'));
});