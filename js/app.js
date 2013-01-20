// This uses require.js to structure javascript:
// http://requirejs.org/docs/api.html#define


define(function (require) {
    var cd = require("utils");
    var snake = require("./snake");

    $(function () {


        $("#start").bind("click", function () {
            $("#audioGame").get(0).play();

            $("#intro").slideUp(2000, function () {


                $("<canvas id='canvas' style='display:none'></canvas>").appendTo("#game");


                $("#canvas").slideDown(1000, function () {

                    var showScore = function (score) {


                        $("#finalScore").text(score);
                        $("#modalScore").modal("show");
                        $("#btnAgain").bind("click", function () {
                            $("#modalScore").modal("hide");
                            $("#canvas").slideDown(1000, function () {
                                cd.countdown($("#game"), 3, function () {
                                    snake.init($("#canvas"), showScore);
                                });
                            })
                        });

                        $("#btnMenu").bind("click",function(){

                            $("#canvas").slideUp().remove();
                            $("#score").remove();
                            $("#intro").slideDown();


                        });
                    }


                    cd.countdown($("#game"), 3, function () {
                        snake.init($("#canvas"), showScore)
                    });


                });


            });


        });


    });


});

