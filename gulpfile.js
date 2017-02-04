var gulp         = require('gulp');
var sass         = require('gulp-sass');
var browserSync  = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var concatCss    = require('gulp-concat-css');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglifyjs');
var del          = require('del');
var imagemin     = require('gulp-imagemin');
var pngquant     = require('imagemin-pngquant');
var cache        = require('gulp-cache');

gulp.task('sass', function(){
	return gulp.src('working/scss/**/*.scss')
	.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
	.pipe(gulp.dest('working/css'))
	.pipe(browserSync.reload({stream: true}))
});


gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'working'
		},
		notify: false
	});
});


gulp.task('gulp-concat-css', ['sass'], function(){
	return gulp.src([
		'working/libs/bootstrap/dist/css/bootstrap.min.css',
		'working/libs/font-awesome/css/font-awesome.css',
		'working/libs/slick-carousel/slick/slick.css',
		'working/libs/slick-carousel/slick/slick-theme.css',
		'working/css/overlay_menu.css',
		'working/libs/animate/animate.css',
		'working/libs/overlay-menu/css/overlay-menu-style.css'
		])
	.pipe(concatCss('libs.css'))
	.pipe(gulp.dest('working/css'));
});


gulp.task('scripts', function(){
	return gulp.src([
		'working/libs/jquery/dist/jquery.min.js',
		'working/libs/overlay-menu/js/jquery-2.1.4.min.js',
		'working/libs/slick-carousel/slick/slick.min.js',
		'working/libs/overlay-menu/js/scroll.js',
		'working/libs/overlay-menu/js/TweenMax.min.js',
		'working/libs/overlay-menu/js/vendor.min.js',
		'working/libs/isotope/dist/isotope.pkgd.min.js'
		])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('working/js'))
});


gulp.task('watch', ['browser-sync', 'gulp-concat-css', 'scripts'], function(){
	gulp.watch('working/scss/**/*.scss', ['sass']);
	gulp.watch('working/*.html', browserSync.reload); 
  gulp.watch('working/js/**/*.js', browserSync.reload);
});

gulp.task('clean', function(){
	return del.sync('production');
});

gulp.task('img', function(){
	return gulp.src('working/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('production/img'));
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function(){
	var buildCss = gulp.src([
		'working/css/fonts.css',
		'working/css/libs.css',
		'working/css/mystyle.css'
		])
	.pipe(gulp.dest('production/css'))

	var buildFonts = gulp.src('working/fonts/**/*')
	.pipe(gulp.dest('production/fonts'))

	var buildJs = gulp.src('working/js/**/*')
	.pipe(gulp.dest('production/js'))

	var buildHtml = gulp.src('working/*.html')
	.pipe(gulp.dest('production'));
});