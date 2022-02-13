let mix = require("laravel-mix");

require('@ayctor/laravel-mix-svg-sprite');

mix.sass("src/_assets/scss/style.scss", "./dist/_assets/css");
mix.postCss("src/_assets/scss/tw.css", "./dist/_assets/css", [
  require("tailwindcss"),
]);
mix.js("src/_assets/js/script.js", "./dist/_assets/js");

mix.svgSprite('src/_assets/misc/icons/*.svg', {
  output: {
    filename: './dist/_assets/svg/sprite.svg'
  }
});

mix.disableNotifications();
