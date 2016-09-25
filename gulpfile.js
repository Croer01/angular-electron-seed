var gulp = require('gulp');
var del = require('del');
var gulpSequence = require('gulp-sequence');
var sourcemaps = require('gulp-sourcemaps');
var runElectron = require('gulp-run-electron');
var paths = {
    src: "src",
    dist: "dist"
};

gulp.task('ts', function () {
    var ts = require('gulp-typescript');
    var project = ts.createProject('tsconfig.json');
    return project.src()
        .pipe(sourcemaps.init())
        .pipe(ts(project))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('templates', function () {
    return gulp.src([paths.src + "/**/*.html"])
        .pipe(gulp.dest(paths.dist))
});

gulp.task('clean', function () {
    del.sync([paths.dist]);
});


gulp.task('build', gulpSequence('clean',['templates', 'ts']));

gulp.task('app:live-reload', ['build'], function () {
    gulp.watch(paths.src + '/**/*.ts', ['ts',runElectron.rerun]);
    gulp.watch(paths.src + '/**/*.html', ['templates',runElectron.rerun]);
    return createElectronApp();
});

gulp.task('app:run', ['build'], function () {
    return createElectronApp();
});

function createElectronApp(){
    return gulp.src("")
        .pipe(runElectron(["./dist/main.js"]));
}
