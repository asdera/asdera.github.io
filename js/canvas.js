function setCanvas() {
	titleCanvas = createCanvas(canvaswidth, canvasheight);
	titleCanvas.class("titleCanvas");
	$(".titleCanvas").detach().appendTo("#titleContainer")
	ctx = $(".titleCanvas")[0].getContext("2d");
	pg = createGraphics(canvaswidth, canvasheight);
}

$(document).ready(function() {
    console.log( "ready!" );
});