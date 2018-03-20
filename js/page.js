var parallaxSpeed = 0.5;
var $root = $('html, body');

archive = [

]

$(document).scroll(function() {
	$("#mountain").css("background-position-y", document.documentElement.scrollTop*parallaxSpeed+"px");
	$("#contact").css("background-position-y", (document.documentElement.scrollTop*parallaxSpeed-$("#contact").height())+"px");
});

$(document).ready(function() {
	$("a[href='#']").click(function() {
		$root.animate({ scrollTop: $("#"+$(this).attr("link")).offset().top }, 500);

		return false; // prevents page from reloading
	});
	$(".project").hover(function() {
		$(this).parent("td").animate({
		    backgroundColor: "#cfdff9"
		}, 150);
		$(this).parent("th").animate({
		    backgroundColor: "#ffdddd"
		}, 150);
	}, function() {
	    $(this).parent("td").animate({
		    backgroundColor: "#a3c6ff"
		}, 75);
		$(this).parent("th").animate({
		    backgroundColor: "#ffaaaa"
		}, 75);
	});
	$("#myName h1").hover(function() {
		$(this).animate({
		    fontSize: 96
		}, 200);
	}, function() {
	    $(this).animate({
		    fontSize: 72
		}, 100);
	});
	$("#myName p").hover(function() {
		$(this).animate({
		    fontSize: 48
		}, 200);
	}, function() {
	    $(this).animate({
		    fontSize: 36
		}, 100);
	});
	$("#myResume").hover(function() {
		$(this).find(".dot[animate=width]").animate({
		    opacity: 1,
		    width: $(this).width() + 60
		}, 200);
		$(this).find(".dot[animate=height]").animate({
		    opacity: 1,
		    height: $(this).height() + 60
		}, 200);
	}, function() {
	    $(this).find(".dot[animate=width]").animate({
		    opacity: 0,
		    width: 10
		}, 100);
		$(this).find(".dot[animate=height]").animate({
		    opacity: 0,
		    height: 10
		}, 100);
	});
	$(".contacts").hover(function() {
		$(this).animate({
		    backgroundSize: "120%"
		}, 200);
	}, function() {
	    $(this).animate({
		    backgroundSize: "100%"
		}, 100);
	});
});
