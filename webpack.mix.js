let mix = require('laravel-mix');

mix
.js('src/index.js', 'public')
.sass('src/styles.scss', 'public')
//paims app.js is src, transpiliuos ir perkels i public
.copy('src/index.html', 'public');