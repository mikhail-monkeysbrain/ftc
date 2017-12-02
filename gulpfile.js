var gulp = require('gulp'),
		sass = require('gulp-sass'),
		browserSync = require('browser-sync'),
		concat = require('gulp-concat'),
		cssnano = require('gulp-cssnano'),
		rename = require('gulp-rename'),
		del = require('del'),
		cache = require('gulp-cache'),
		autoprefixer = require('gulp-autoprefixer'),
		livereload =require('gulp-livereload'),
		imageop = require('gulp-image-optimization'),
		pug = require('gulp-pug');
		
		
		
		
gulp.task('imageop', function(cb) { 	
	gulp.src(['src/**/*.png','src/**/*.jpg','src/**/*.gif','src/**/*.jpeg'])
			.pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    	}))
			.pipe(gulp.dest('src/img/1'))
				.on('end', cb)
				.on('error', cb);
});

gulp.task('pug', function builHTML(){
	return gulp.src('src/jade/*.pug')
			.pipe(pug())
			.pipe(gulp.dest('src'));
});

gulp.task('sass', function(){
	return gulp.src("src/sass/**/*.sass")
			.pipe(sass())
			.pipe(autoprefixer(['Last 10 versions', '>1%', 'ie 8'], {cascade:true}))
			.pipe(gulp.dest('src/css'))
			.pipe(browserSync.reload({stream:true}));
});

gulp.task('css-libs', ['sass'], function(){
	return gulp.src('src/css/*.css')
			.pipe(cssnano())
			.pipe(rename({suffix:'.min'}))
			.pipe(gulp.dest('src/css'));
});

gulp.task('browser-sync',function(){
	browserSync({
		server : {baseDir : 'src'},
		port: 4560
	});
});

gulp.task('clean', function(){
	return del.sync('dist');
});

gulp.task("watch", ['browser-sync', 'sass', 'pug'], function(){
	gulp.watch('src/sass/**/*.sass', ['sass']);
	gulp.watch('src/jade/*.pug', ['pug']);
	gulp.watch('src/*.html', browserSync.reload);
});

gulp.task('build', ['clean',], function(){
	
	var buildCss = gulp.src(['src/css/**/*.css'])
		.pipe(gulp.dest('dist/css'));
	var buildFonts = gulp.src('src/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));
	var buildHtml = gulp.src('src/**/*.html')
		.pipe(gulp.dest('dist'));
});