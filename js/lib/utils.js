define( function(require) {
/*contdown (element,from,[callback])*/
	function countdown(element, num,callback) {

		$(element).append($("<div id='counter'></div>"));
		$("#counter").css({
			top: "50%",
			left: ($("#canvas").innerWidth()/2)

		});

		num = (num!=0)? num : "GO!";
		$("#counter").empty().html(num).animate({
			"font-size": $("#canvas").innerWidth()/3 ,
			"opacity": "0"


		}, 1500, function() {
			$("#counter").remove();
			if(num > 0) {
				countdown(element,num - 1,callback);
			}
			else {

				if (callback){callback()};
			}

		});
		

	};

	return	{

		countdown: countdown

	};


})