document.addEventListener("DOMContentLoaded", function(){
  const moveTo = new MoveTo();
  let els = document.getElementsByClassName('moveto');
  Array.prototype.forEach.call(els, function(el){
    moveTo.registerTrigger(el);
  });
});
