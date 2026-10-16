import MoveTo from "moveto";
import { tns } from "../../../node_modules/tiny-slider/src/tiny-slider";
import LiteYoutube from "lite-youtube-embed"

document.addEventListener("DOMContentLoaded", function () {
  const moveTo = new MoveTo();
  let els = document.getElementsByClassName("js-moveto");
  Array.prototype.forEach.call(els, function (el) {
    moveTo.registerTrigger(el);
  });
});

const slider = document.querySelector(".js-slider");
if (slider !== null) {
  tns({
    container: ".slider__container",
    items: 1,
    autoHeight: false,
    autoplay: true,
    autoplayButtonOutput: false,
    autoplayTimeout: 3500,
    mode: "gallery",
    speed: 400,
    controls: false,
    nav: false,
  });
}

const glowHero = document.querySelector(".ft-home__hero");
if (glowHero !== null) {
  glowHero.addEventListener("pointermove", (e) => {
    const rect = glowHero.getBoundingClientRect();
    glowHero.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    glowHero.style.setProperty("--my", `${e.clientY - rect.top}px`);
  });
}
