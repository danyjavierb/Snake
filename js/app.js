// This uses require.js to structure javascript:
// http://requirejs.org/docs/api.html#define


define(function(require) {
	var cd = require("utils");
	var snake = require ("./snake");

	$(function() {

		$("#start").bind("click", function() {
			$("#audioGame").get(0).play();

			$("#intro").slideUp(2000, function() {

			
				$("<canvas id='canvas' style='display:none'></canvas>").appendTo("#game");
				

				$("#canvas").slideDown(1000, function() {


					cd.countdown($("#game"),3,function(){snake.init($("canvas",function(score){showScore(score)}))});

					
					
				});



			});


		});



	});


	function showScore(score){
	
		$("#finalScore").text(score);
		$("myModal").modal();
	}


});

