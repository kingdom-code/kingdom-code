let mix = require("laravel-mix");

mix.sass("src/_assets/scss/style.scss", "./dist/_assets/css");
mix.js("src/_assets/js/script.js", "./dist/_assets/js");

mix.disableNotifications();
