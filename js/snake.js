/* Snake Module game

author: @danyjavierb
site: www.danybau.com
repo: 
dependencies: Jquery, require.js

Use this module for construct your own versions of the classic snake game,
 just call start (yourcanvas) and  you will see the game running

*/

define(["jquery"], function($) {

	(function() {
		var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
		window.requestAnimationFrame = requestAnimationFrame;
	})();


	var width;
	var height;
	var cnv;
	var ctx;

	//the snake will be a list.
	var snake = [];

	var food;
	var score;
	//direction
	var dir;

	var now;
	/*the user input should be in another module, but i will put this here
	for simplicity
	*/

	$(document).keydown(function(e){
		var key = e.which;
		//prevent return in one axis
				if(key == "37" && dir != "right") dir = "left";
		else if(key == "38" && dir != "down") dir = "up";
		else if(key == "40" && dir != "up") dir = "down";
		else if(key == "39" && dir != "left") dir = "right";
	})
	


	//every snake´s fragment is a square with width of 10px
	var snakeFragment = 10;

	//callback when the snake collide
	var onLost;

	function init(canvas,callback) {

		cnv=$(canvas);

		ctx =$(canvas).get(0).getContext("2d");


		

		width  = $(canvas).innerWidth();
  		height = $(canvas).innerHeight();
  		ctx.canvas.width  = $(canvas).innerWidth();
  		ctx.canvas.height = $(canvas).innerHeight();

  		

	
		

		//direction when game starts
		dir = "right";
		score = 0;
		startSnake();
		placeFood();
		onLost=callback;
	
		 displayScore();
		animate();

	}


	function startSnake() {

		var length = 5; //Length of the snake
		snake	 = []; //Empty array to start with
		for(var i = length; i>0; i--)
		{
			//This will create a horizontal snake starting from the top left

			snake.push({x: i, y:0});
			
		}
	}

	function placeFood() {

		food = {
			x: Math.round(Math.random() * (width - snakeFragment)/snakeFragment),
			y: Math.round(Math.random() * (height - snakeFragment)/snakeFragment)
		};


	}


	function animate() {
		
		requestAnimationFrame(animate);

		draw();


	}

	function draw() {
		
		//clear canvas every frame
		ctx.fillStyle = "#0F8790";
		ctx.fillRect(0,0, width, height);

		//snake logic
		//cheking snake head, remember, is only a reference
		var headX = snake[0].x;
		var headY = snake[0].y;
		//increment position depending direction
		switch(dir) {
		case("right"):
			headX++;
			break;
		case("left"):
			headX--;
			break;
		case("up"):
			headY--;
			break;
		case("down"):
			headY++;
			break;

		}

		//check collision with wall and with itself
		if(checkCollision(headX, headY, snake)) {

		
			onLost(score);
			

		}
		//eat!
		if(headX == food.x && headY == food.y) {

			//put the new fragment as the  snake´s array
			var newFragment = {
				x: headX,
				y: headY
			};
			score++;
			placeFood();
			displayScore();


		} else {

			var newFragment = snake.pop();
			newFragment.x = headX;
			newFragment.y = headY;

		}

		snake.unshift(newFragment);
	
		for(var j = 0; j < snake.length; j++) {
			var part = snake[j];
			
			drawFragment(part);

		}
		//draw food 
		drawFragment(food);
		

		
	}

function drawFragment (	pos){

	
	ctx.fillStyle = "#AD1D28";
		ctx.fillRect(pos.x*snakeFragment, pos.y*snakeFragment, snakeFragment, snakeFragment);
    
   
		ctx.strokeStyle = "white";
		ctx.strokeRect(pos.x*snakeFragment, pos.y*snakeFragment, snakeFragment, snakeFragment);

}

function checkCollision(headX, headY, array) {
	var collision= false;
	//walls collision
	if(headY<=-1 || headY == height/snakeFragment
		||headX<=-1 || headX == width/snakeFragment )
	{ 
		collision=true;
	}
	//snake itself collision

	for (var i=0;i<snake.lenght;i++){

		if(array[i].x==headX && array[i].y==headY){
			collision= true;
		}
	}
	return collision; 


}

function displayScore(){
	//add styles to #score in your css
	$("#score").remove();
	var scoreElement = $("<div id=score>Score"+score+"</div>");
	scoreElement.css({
		


	});
	var canvasparent=cnv.parent();
	canvasparent.append(scoreElement);


}




return {

	init:init,

}


});