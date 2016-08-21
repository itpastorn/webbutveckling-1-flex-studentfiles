"use strict";
var gulp         = require("gulp-help")(require("gulp")),
    eslint       = require("gulp-eslint"),
    csslint      = require("gulp-csslint"),
    cssvalidate  = require("gulp-w3c-css"),
    htmlvalidate = require("gulp-html-validator"),
    autoprefixer = require("gulp-autoprefixer"),
    csscomb      = require("gulp-csscomb"),
    uglify       = require("gulp-uglify"),
    cleancss     = require("gulp-clean-css"),
    imagemin     = require("gulp-imagemin"),
    gutil        = require("gulp-util"),
    cache        = require("gulp-cached"),
    rename       = require("gulp-rename"),
    browserslist = require("browserslist"),
    argv         = require("yargs").argv,
    map          = require("map-stream");

var paths = {
    cssdir     : ["./**/*.css", "!node_modules/**/*.css", "!build/**/*.css"],
    htmldir    : ["./**/*.html", "!node_modules/**/*.html", "!build/**/*.html"],
    scriptsdir : ["./**/*.js", "!node_modules/**/*.js", "!build/**/*.js", "!gulpfile.js"],
    imagesdir  : ["./**/img/*", "!node_modules/**/*.img", "!build/**/*.img"],
    destdir    : "build"
};

gulp.task("hello", "Säger hej", () =>
    gutil.log("Hej på dig, du!")
);

// Alla kommandon nedan använder ES6 arrow functions
gulp.task("eslint", "Kontroll av JavaScript med ESLint", () =>
    gulp.src(paths.scriptsdir)
        .pipe(cache("eslint"))
        .pipe(eslint({
            configFile: ".eslintrc"
        }))
        .pipe(eslint.format()) // Output till konsollen
        .pipe(eslint.failAfterError())
);

gulp.task("css:lint", "Kontroll av CSS med CSSLint", () =>
    gulp.src(paths.cssdir)
        .pipe(csslint(".csslintrc"))
        .pipe(csslint.reporter())
);

// http://stackoverflow.com/questions/38836082/how-can-i-pipe-the-output-from-gulp-w3c-css-to-the-console
gulp.task("css:valid", "Kontroll av CSS med W3C:s validator, använd --warn för att få med varningar",  () =>
    gulp.src(paths.cssdir)
        .pipe(cache("css:valid"))
        .pipe(cssvalidate())
        .on("end", function(){ gutil.log("Validering klar"); })
        .pipe(map(function(file, done) {
            if (file.contents.length === 0) {
                gutil.log("Success: " + file.path);
                gutil.log(gutil.colors.green("No errors or warnings\n"));
            } else {
                var results = JSON.parse(file.contents.toString());
                results.errors.forEach(function(error) {
                    gutil.log("Error: " + file.path + ": line " + error.line);
                    gutil.log(gutil.colors.red(error.message) + "\n");
                });
                if ( argv.warn ) {
                    results.warnings.forEach(function(warning) {
                        gutil.log("Warning: " + file.path + ": line " + warning.line);
                        gutil.log(gutil.colors.yellow(warning.message) + "\n");
                    });
                } else if ( results.warnings.length ) {
                    gutil.log("Varning i: " + gutil.colors.yellow(file.path));
                    gutil.log("Använd flaggan --warn för att se varningar");
                }
            }
            done(null, file);
        }))
);

gulp.task("html:valid", "Kontroll av HTML med W3C:s validator", () =>
    gulp.src(paths.htmldir)
        .pipe(cache("html:valid"))
        .pipe(htmlvalidate())
        .pipe(map(function(file, done) {
            var messages = JSON.parse(file.contents.toString()).messages;
            if (messages.length === 0) {
                gutil.log("Success: " + file.path);
                gutil.log(gutil.colors.green("Inga problem funna\n"));
            } else {
                gutil.log("Problem upptäckta i " + file.path + "\n");
                for ( var msg of messages ) {
                    gutil.log("Fil: " + file.path);
                    if ( msg.firstLine ) {
                        gutil.log("Rader: " + msg.firstLine + " till " + msg.lastLine);
                    } else {
                        gutil.log("Rad: " + msg.lastLine);
                        if ( msg.firstColumn != null ) {
                            gutil.log("Kolumner " + msg.firstColumn + " till " + msg.lastColumn);
                        } else {
                            gutil.log("Kolumn: " + msg.lastColumn);
                        }
                    }
                    if ( msg.type === "error" ) {
                        gutil.log(gutil.colors.red("Error: " + msg.message));
                    } else if ( msg.type === "info" ) {
                        gutil.log(gutil.colors.gray("Info: " + msg.message));
                    } else {
                        gutil.log(gutil.colors.yellow(msg.type + ": " + msg.message));
                    }
                    if ( msg.extract ) {
                        gutil.log(msg.extract.substring(0, msg.hiliteStart-1).trim() +
                            gutil.colors.yellow.bold(msg.extract.substr(msg.hiliteStart, msg.hiliteLength).trim()) +
                            msg.extract.substring(msg.hiliteStart + msg.hiliteLength).trim());
                    }
                    gutil.log("\n");

                }
            }
            gutil.log("------------------------------\n");
            done(null, file);
        }))
);

gulp.task("css:prefix", "Lägg till rätt prefix med autoprefixer", () =>
    gulp.src(paths.cssdir)
        .pipe(autoprefixer( { browsers: browserslist() } ))
        .pipe(rename( (file) =>
            file.basename += ".prefixed"
        ))
        .pipe(gulp.dest(paths.destdir))
);

gulp.task("css:unprefix", "Ta bort alla prefix", () =>
    gulp.src(paths.cssdir)
        .pipe(autoprefixer( { browsers: ["last 1 version", "not ie <= 11", "not safari <= 100", "not ff <= 100", "not chrome <= 100"] } ))
        .pipe(rename( (file) =>
            file.basename += ".unprefixed"
        ))
        .pipe(gulp.dest(paths.destdir))
);

gulp.task("css:comb", "Gör din CSS snygg och fin", () =>
    gulp.src(paths.cssdir)
        .pipe(csscomb())
        .pipe(rename( (file) =>
            file.basename += ".combed"
        ))
        .pipe(gulp.dest(paths.destdir))
);

gulp.task("uglify", "Minska storleken på skript", () =>
    gulp.src(paths.scriptsdir)
        .pipe(rename( (file) =>
            file.basename += ".min"
        ))
        .pipe(uglify())
        .pipe(gulp.dest(paths.destdir))
);

gulp.task("css:clean", "Minska storleken på CSS-filer med clean-css", () =>
    gulp.src(paths.cssdir)
        .pipe(rename( (file) =>
            file.basename += ".min"
        ))
        .pipe(cleancss())
        .pipe(gulp.dest(paths.destdir))
);

gulp.task("images", "Optimera filstorleken på bilder", () =>
    gulp.src(paths.imagesdir)
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest(paths.destdir))
);

gulp.task("default", "Denna körs om du inte anger något argument", [], () =>
    gutil.log(gutil.colors.green("Skriv 'gulp help' för att se vilka metoder du kan välja mellan"))
);

gulp.task("watch", "Bevakar kataloger och kör grundkontroller, avsluta med CTRL + C", () => {
    gutil.log(gutil.colors.yellow("Watch första genomkörning tar några minuter."));
    gulp.watch(paths.htmldir, ["html:valid"]);
    gulp.watch(paths.cssdir, ["css:valid"]);
    gulp.watch(paths.scriptsdir, ["eslint"]);
});
