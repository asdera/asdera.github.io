var parallaxSpeed = 0.5;
var $root = $('html, body');

var archive = {
	sections: ["Other", "Games", "Applications"],
}

var zoom = 1;

$(document).scroll(function() {
	$("#mountain").css("background-position-y", document.documentElement.scrollTop*parallaxSpeed*zoom+"px");
	$("#contact").css("background-position-y", (document.documentElement.scrollTop*parallaxSpeed-$("#contact").height()*zoom)+"px");
});

$(document).ready(function() {

	zoom = $(document).width() / 2000;
	document.body.style.zoom = zoom;

	$(".project.applications").hide();
	$(".project.other").hide();

	$("a[href='#']").click(function() {
		$root.animate({ scrollTop: $("#"+$(this).attr("link")).offset().top*zoom }, 500);

		return false; // prevents page from reloading
	});
	$(".shine.heading").click(function() {
		console.log(archive.sections)
		var change = $(this).attr("heading");
		var reSection = [];
		var heading = archive.sections[change].toLowerCase();
		var oldheading = archive.sections[1].toLowerCase();
		reSection[0] = archive.sections[(change+2)%3];
		reSection[1] = archive.sections[change];
		reSection[2] = archive.sections[(change+1)%3];
		archive.sections = reSection;
		$(".heading[heading='0']").children().text(archive.sections[0]);
		$(".heading[heading='1']").children().text(archive.sections[1]);
		$(".heading[heading='2']").children().text(archive.sections[2]);
		$(".project."+oldheading).fadeOut(200, function() {
			$(".project."+heading).fadeIn(200);
		});
	});
	$(".project, .shine").hover(function() {
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
