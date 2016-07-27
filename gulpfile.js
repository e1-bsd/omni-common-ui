const gulp = require('gulp');
const del = require('del');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const postcssImport = require('postcss-import');
const babel = require('gulp-babel');
const sequence = require('gulp-sequence');

gulp.task('clean', () => del(['lib']));

gulp.task('build:css', () => gulp.src('src/**/*.postcss')
    .pipe(sourcemaps.init())
    .pipe(postcss([postcssImport({
      path: ['node_modules', 'src', 'src/assets/styles', './'],
    })]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('lib')));

gulp.task('build:js', () => gulp.src(['src/**/*.js', 'src/**/*.jsx'])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['react', 'es2015', 'stage-2'],
      plugins: [['resolver', { resolveDirs: ['src'] }]],
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('lib')));

gulp.task('build:rest', () => gulp.src([
  'src/**/*.*',
  '!src/**/*.jsx',
  '!src/**/*.js',
  '!src/**/*.postcss',
])
    .pipe(gulp.dest('lib')));

gulp.task('build', sequence(
  'clean',
  ['build:css', 'build:js', 'build:rest']
));

gulp.task('default', ['build']);
