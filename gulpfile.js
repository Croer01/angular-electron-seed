var gulp = require('gulp');
var del = require('del');
var gulpSequence = require('gulp-sequence');
var sourcemaps = require('gulp-sourcemaps');
var runElectron = require('gulp-run-electron');
var packager = require('electron-packager');
var util = require('gulp-util');
var slash = require('slash');
var sass = require("gulp-sass");

var paths = {
    src: "src",
    dist: "dist",
    release: "release"
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

gulp.task('sass', function () {
    return gulp.src(paths.src + "/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('templates', function () {
    return gulp.src(paths.src + "/**/*.html")
        .pipe(gulp.dest(paths.dist))
});

gulp.task('clean', function () {
    del.sync([paths.dist]);
});


gulp.task('clean:release', function () {
    del.sync([paths.release]);
});

gulp.task('build', gulpSequence('clean', ['templates', 'ts','sass']));

gulp.task('app:live-reload', ['build'], function () {
    gulp.watch(paths.src + '/**/*.ts', ['ts', runElectron.rerun]);
    gulp.watch(paths.src + '/**/*.html', ['templates', runElectron.rerun]);
    gulp.watch(paths.src + '/**/*.scss', ['sass', runElectron.rerun]);
    return runElectronApp();
});

gulp.task('app:run', ['build'], function () {
    return runElectronApp();
});

gulp.task('app:build', ['build'], function (done) {
    var packageJson = require('./package.json');

    var ignoreDevDep = [
        /src/,
        /node_modules\/gulp/
    ];

    var options = {
        'dir': __dirname,
        'name': packageJson.name,
        'app-version': packageJson.version,
        'build-version': packageJson.devDependencies["electron-prebuilt"],
        'out': __dirname + '/' + paths.release,
        'ignore': ignoreDevDep,
        arch:"all",
        tmpdir: false,
        overwrite: true,
        'afterCopy': [function (buildPath, electronVersion, platform, arch, callback) {
            util.log(util.colors.cyan("delete from"), buildPath);
            var path = slash(buildPath);

            del.sync([path + '/**',
                path + '/.*',
                '!' + path,
                '!' + path + "/node_modules/**",
                '!' + path + "/dist/**",
                '!' + path + "/package.json"
            ], {force: true});

            gulp.src(path + "/dist/**/*.*")
                .pipe(gulp.dest(path))
                .on('end', function() {
                    del.sync(path + '/dist/**', {force: true});
                    callback();
                });

        }]
    };

    packager(options, function (err, appPath) {
        if (err) {
            util.log(err)
        }
        else {
            util.log('Built', util.colors.cyan(options.name), util.colors.magenta('v' + options['app-version']));
            util.log('Packaged to: ');
            for (var i = 0; i < appPath.length; i++) {
                util.log(util.colors.cyan(appPath[i]));
            }
        }
        done();
    });
});

function runElectronApp() {
    return gulp.src("")
        .pipe(runElectron(["./dist/main.js"]));
}
