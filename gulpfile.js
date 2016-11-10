/**
 * Created by Administrator on 2016/11/9 0009.
 */

/*此处的代码由NODE执行 （gulp 任务名称）执行任务*/
/*
 gulp.src: 来源
 gulp.dest: 目标
 gulp.pipe: 管道
 gulp.watch: 监视文件系统，文件改动时自动处理
 gulp.task: 任务
*/
//载入Gulp模块
var gulp = require('gulp');
//载入插件
//var less = require('gulp-less');
//合并
//var concat = require('gulp-concat');

//使用自动加载插件
var  gulpLoadPlugins = require('gulp-load-plugins');
plugins = gulpLoadPlugins();


//操作监视
gulp.task('monitoring', function(){
    //监视styles任务 自动同步
    //gulp.watch('src/styles/*.less', ['styles']);
});


// 1.css处理
gulp.task('styles', function(){
    // gulp.src('src/css/*.less')
    gulp.src(['src/styles/*.less', '!src/styles/_*.less'])//多个匹配规则,排除_开头的
        .pipe(plugins.less())//less转css
        .pipe(plugins.cssnano())//压缩
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.reload({
            stream: true
        }));//有变化刷新
});

//2.js处理
gulp.task('scripts', function(){
    gulp.src('src/scripts/*.js')
        .pipe(plugins.concat('all.js'))//js合并：所有js合并成all
        .pipe(plugins.uglify())//混淆
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.reload({
            stream: true
        }));//有变化刷新
});

//3.图片复制
gulp.task('images', function(){
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({
            stream: true
        }));//有变化刷新
});

//4.html
gulp.task('html', function(){
    gulp.src('src/*.html')
        .pipe(plugins.htmlmin({         //html压缩
            collapseWhitespace: true,   //去空格
            removeComments: true        //去注释
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }));//有变化刷新
});

//本地服务器
var browserSync = require('browser-sync')
gulp.task('server', function() {
	browserSync({
		server: {
            baseDir: ['dist']//设置根目录
        }
	}, function (err, bs) {
		
	});

    //server启动后 监视变化
    gulp.watch('src/styles/*.less', ['styles']);
    gulp.watch('src/scripts/*.js', ['scripts']);
    gulp.watch('src/images/*.*', ['images']);
    gulp.watch('src/*.html', ['html']);
});

