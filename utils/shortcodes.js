const Image = require("@11ty/eleventy-img");

module.exports = {
  svgSprite: (svgSprite) => {
    return "";
    return `<svg class="${svgSprite.class}" role="img" aria-hidden="true">
              <use xlink:href="/_assets/svg/sprite.svg#${svgSprite.name}">
              </use>
            </svg>`;
  },

  rwdImg: (src, alt, sizes = "100vw", classes = " ") => {
    if (!src) {
      return;
    }
    src = `./src${src}`;

    let opts = {
      widths: [320, 800, 1200],
      formats: ["webp", "jpeg"],
      urlPath: "/_assets/rwd-img/",
      outputDir: "./dist/_assets/rwd-img",
    };

    Image(src, opts);

    let imageAttributes = {
      class: classes,
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    };

    let metadata = Image.statsSync(src, opts);
    return Image.generateHTML(metadata, imageAttributes, {
      whitespaceMode: "inline",
    });
  },
};
