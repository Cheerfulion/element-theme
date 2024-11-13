const fs = require('fs');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));


const INPUT_DIR = 'custom.scss'
let OUTPUT_DIR = 'theme'

try {
  const data = fs.readFileSync('package.json', 'utf8');
  const packageJson = JSON.parse(data);
  const elementTheme = packageJson['element-theme'];
  if (elementTheme && elementTheme['output']) {  OUTPUT = elementTheme['output']; }
} catch (err) {
  console.error('读取文件失败:', err);
}

// 定义 Sass 编译任务
gulp.task('sass', function() {
  return gulp.src(INPUT_DIR) // 输入文件
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(OUTPUT_DIR)); // 输出目录
});

// 定义监视任务，只监听特定的 .scss 文件
gulp.task('watch', function() {
  // '**/*.scss'
  gulp.watch(INPUT_DIR, gulp.series('sass')); // 只监视 custom.scss 文件
});

// 创建默认任务
gulp.task('default', function(done) {
  // 检查是否传入 'watch' 参数
  const isWatch = process.argv.includes('--watch');

  if (isWatch) {
    gulp.series('watch')(); // 启动 watch 任务
  } else {
    gulp.series('sass')(); // 否则执行 sass 编译任务
  }

  done();
});


