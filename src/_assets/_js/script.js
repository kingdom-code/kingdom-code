import MoveTo from 'moveto';
import { tns } from "../../../node_modules/tiny-slider/src/tiny-slider"

document.addEventListener("DOMContentLoaded", function(){
  const moveTo = new MoveTo();
  let els = document.getElementsByClassName('js-moveto');
  Array.prototype.forEach.call(els, function(el){
    moveTo.registerTrigger(el);
  });
});

const slider = document.querySelector('.js-slider');
if (slider !== null) {
  tns({
    container: '.slider__container',
    items: 1,
    autoHeight: false,
    autoplay: true,
    autoplayButtonOutput: false,
    autoplayTimeout: 3500,
    mode: 'gallery',
    speed: 400,
    controls: false,
    nav: false
  });
}
