let mouseOverContainer = document.getElementById("header");
let facingFaceImage = document.getElementById("my_avatar");

// ==========================
//  follow mouse (transform)
// ==========================

let constrain = 20;

function transforms(x, y, el) {
  let box = el.getBoundingClientRect();
  let calcX = -(y - box.y - (box.height / 2)) / constrain;
  let calcY = (x - box.x - (box.width / 2)) / constrain;
  
  return "perspective(100px) "
    + "   rotateX("+ calcX +"deg) "
    + "   rotateY("+ calcY +"deg) ";
};

function transformElement(el, xyEl) {
  el.style.transform = transforms.apply(null, xyEl);
}

// ============================
//  to center (undo transform)
// ============================

function unTransforms(x, y, el) {
  let box = el.getBoundingClientRect();
  let calcX = -(box.x / 2) / constrain;
  let calcY = (box.y / 2) / constrain;
  
  return "perspective(none) "
    + "   rotateX("+ calcX +"deg) "
    + "   rotateY("+ calcY +"deg) ";
};

function unTransformElement(el, xyEl) {
  el.style.transform = unTransforms.apply(null, xyEl);
}

// ===============
//  on mouse move
// ===============

mouseOverContainer.onmousemove = function(e) {
  let xy = [e.clientX, e.clientY];
  let position = xy.concat([facingFaceImage]);

  window.requestAnimationFrame(function(){
    transformElement(facingFaceImage, position);
  });
};

// ================
//  on mouse leave
// ================

mouseOverContainer.onmouseleave = function(e) {
  let xy = [e.clientX, e.clientY];
  let position = xy.concat([facingFaceImage]);

  window.requestAnimationFrame(function(){
    unTransformElement(facingFaceImage, position);
  });
};