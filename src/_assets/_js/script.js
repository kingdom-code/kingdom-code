import MoveTo from 'moveto';

document.addEventListener("DOMContentLoaded", function(){
  const moveTo = new MoveTo();
  let els = document.getElementsByClassName('js-moveto');
  Array.prototype.forEach.call(els, function(el){
    moveTo.registerTrigger(el);
  });
});
