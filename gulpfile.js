var gulp = require('gulp');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('css', function () {
    gulp.src('css/style.css')
        .pipe(concat('style-min.css'))
        .pipe(minify())
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('js', function () {
    gulp.src('js/script.js')
        .pipe(concat('script-min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('images', function () {
    return gulp.src('images/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});


// Minify Assets (css, js ,images)
gulp.task('mini', ['css', 'js', 'images'], function () {

});

// browser sync
// ถ้าใส่เป็น gulp.task('default',xxx) เวลาสั่งรันจะพิมพ์สั้น ๆ ว่า gulp ได้เลย
gulp.task('sync', ['browser-sync'], function () {
    // เมื่อไฟล์ html หรือ css มีการเปลี่ยนแปลง ก็ให้รีเฟรช web browser
    gulp.watch(['**/*.html'], browserSync.reload);
    gulp.watch(['**/css/*.css'], browserSync.reload);

    // Sub directory
    gulp.watch(['./*/**/*.html'], browserSync.reload);
    gulp.watch(['./*/**/css/*.css'], browserSync.reload);
});