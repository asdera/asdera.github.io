var r = 127;
var g = 127;
var b = 127;
var a = 0.3;
var ax = true;
var lx = true;
var card;

function colorswitch (col) {
  lx = Math.random()<.5;
  if (lx) {
    return col = col + 5;
  } else {
    return col = col - 5;
  }
}

$(document).ready(function() {
  $(function() {
    $('.banner').unslider()
  })
  $('.automatic-slider').unslider({
    autoplay: true
  });

  $('.links').on('mouseenter', function() {
      card = this;
    this.iid = setInterval(function() {
      r = colorswitch(r);
      g = colorswitch(g);
      b = colorswitch(b);
      $(".links").css({"background-color": "rgba(" + r + ", " + g + ", " + b + ", " + 0.4 + ")"});
    }, 10);
  }).on('mouseleave', function(){
      this.iid && clearInterval(this.iid);
  });

  $('.banner').on('mouseenter', function() {
    $("li").addClass("listhover");
    this.iid = setInterval(function() {
      if (a > 0.8 || a < 0.3) {
        ax = !ax;
      }
      if (ax) {
        a = a + 0.005;
      } else {
        a = a - 0.005;
      }
      $(".banner").css({"background-color": "rgba(" + 30 + ", " + 250 + ", " + 50 + ", " + a + ")"});
    }, 10);
  }).on('mouseleave', function(){
      this.iid && clearInterval(this.iid);
      $("li").removeClass("listhover");
  });

  $('.pic').on('mouseenter', function() {
    $(this).animate({width: "+=50px", opacity: 0.4, fontSize: "30px"}, 250);
  }).on('mouseleave', function(){
    $(this).animate({width: "-=50px", opacity: 1, fontSize: "40px"}, 500);
  });
});
