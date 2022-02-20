const { dest, src, watch, parallel } = require("gulp");
const sass = require("gulp-sass");
const minifyCss = require("gulp-cssnano");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const replace = require("gulp-string-replace");
const plumber = require("gulp-plumber");
const jsImport = require("gulp-js-import");
const uglify = require("gulp-uglify");
const twig = require("gulp-twig");
const beautify = require("gulp-beautify");
const include = require("gulp-include");
const data = require("gulp-data");
const babel = require("gulp-babel");
const fs = require("fs");
/**
 * @paths
 */

const paths = {
    // app
    pathApp: "./app/",
    pathTools: "./app/scss/tool.scss",
    pathMains: "./app/scss/main.scss",
    pathPages: "./app/scss/pages/**/*.scss",
    pathAppPlugins: "./app/js/plugins/**/*.js",
    pathAppAddons: "./app/js/addons/**/*.js",
    pathAppJs: "./app/js/*.js",
    pathAppFonts: "./app/assets/fonts/**/*",
    pathAppImages: "./app/assets/images/**/*",
    pathAppView: "./app/views/pages/**/*.twig",

    //builds
    pathBuild: "./dist/",
    pathBuildStyles: "./dist/css",
    pathBuildPages: "./dist/css/pages",
    pathBuildJsAddons: "./dist/js/addons",
    pathBuildJsPlugins: "./dist/js/plugins",
    pathBuildJs: "./dist/js",
    pathBuildFonts: "./dist/fonts/",
    pathBuildImages: "./dist/images/",
    database: "./app/database/data.json",
};

/**
 * @autoprefixerBrowsers
 */

const autoprefixerBrowsers = [
    "last 3 versions",
    "iOS >= 8",
    "Safari >= 8",
    "ie >= 10",
    "Firefox 14",
    "safari 5",
    "opera 12.1",
    "ios 6",
    "android 4",
];
/**
 * @browserSync
 */
function browserSyncInit() {
    return browserSync.init({
        server: {
            baseDir: "./dist",
        },
        port: 3000,
    });
}
/**
 * @scss
 */

function tools() {
    return src(paths.pathTools)
        .pipe(
            plumber({
                errorHandler: function (error) {
                    console.log(error.toString());
                    this.emit("end");
                },
            })
        )
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(
            autoprefixer({
                browsers: autoprefixerBrowsers,
                cascade: false,
                grid: true,
            })
        )
        .pipe(dest(paths.pathBuildStyles))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
}
function mains() {
    return src(paths.pathMains)
        .pipe(
            plumber({
                errorHandler: function (error) {
                    console.log(error.toString());
                    this.emit("end");
                },
            })
        )
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(
            autoprefixer({
                browsers: autoprefixerBrowsers,
                cascade: false,
                grid: true,
            })
        )
        .pipe(dest(paths.pathBuildStyles))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
}
function pages() {
    return src(paths.pathPages)
        .pipe(
            plumber({
                errorHandler: function (error) {
                    console.log(error.toString());
                    this.emit("end");
                },
            })
        )
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(
            autoprefixer({
                browsers: autoprefixerBrowsers,
                cascade: false,
                grid: true,
            })
        )
        .pipe(dest(paths.pathBuildPages))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
}
/**
 * @js
 */

function appJsAddons() {
    return src(paths.pathAppAddons)
        .pipe(
            plumber({
                errorHandler: function (error) {
                    console.log(error.toString());
                    this.emit("end");
                },
            })
        )
        .pipe(dest(paths.pathBuildJsAddons))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
}

function appJsPlugins() {
    return src(paths.pathAppPlugins)
        .pipe(
            jsImport({
                hideConsole: true,
            })
        )
        .pipe(
            plumber({
                errorHandler: function (error) {
                    console.log(error.toString());
                    this.emit("end");
                },
            })
        )
        .pipe(babel())
        .pipe(uglify())
        .pipe(dest(paths.pathBuildJsPlugins))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
}
function appJs() {
    return src(paths.pathAppJs)
        .pipe(
            plumber({
                errorHandler: function (error) {
                    console.log(error.toString());
                    this.emit("end");
                },
            })
        )
        .pipe(dest(paths.pathBuildJs))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
}
/**
 * @gulp-twig code html
 */

function views() {
    var getJsonData = function (file) {
        return JSON.parse(fs.readFileSync(paths.database));
    };
    var options = {
        indent_size: 4,
    };
    return src(paths.pathAppView)
        .pipe(
            plumber({
                errorHandler: function (error) {
                    console.log(error.toString());
                    this.emit("end");
                },
            })
        )
        .pipe(include())
        .pipe(data(getJsonData))
        .pipe(twig())
        .pipe(beautify.html({ options }))
        .pipe(replace("../../../../dist/", ""))
        .pipe(replace("../../../dist/", ""))
        .pipe(replace("../../dist/", ""))
        .pipe(dest(paths.pathBuild))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
}

/**
 * @fonts
 */

function fonts() {
    return src(paths.pathAppFonts)
        .pipe(dest(paths.pathBuildFonts))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
}
/**
 * @images
 */
function images() {
    return src(paths.pathAppImages)
        .pipe(dest(paths.pathBuildImages))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
}

function dev() {
    watch("./app/scss/**/*", tools);
    watch("./app/scss/**/*", mains);
    watch("./app/scss/**/*", pages);
    watch("./app/js/Addons/**/*", appJsAddons);
    watch("./app/js/plugins/**/*", appJsPlugins);
    watch("./app/js/**/*", appJs);
    watch("./app/views/**/**", views);
    watch("./app/database/**/**", views);
    watch("./app/assets/fonts/**/*", fonts);
    watch("./app/assets/images/**/*", images);
}
exports.default = parallel(
    tools,
    mains,
    pages,
    appJsAddons,
    appJsPlugins,
    appJs,
    views,
    dev,
    images,
    fonts,
    browserSyncInit
);
