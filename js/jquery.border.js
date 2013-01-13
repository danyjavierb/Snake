/*
Author: Dany javier B
Repo:https://github.com/danyjavierb/jquery.border


This repo solve a classic problem when you are applying to a frontend developer job, in this case this one was part of an application to a job in a French company, in which a nice friend is now working with.

The problem statment:

Write a jQuery module that provides the following methods for setting CSS border properties:

$('#foo').border('1px solid blue');

$('#foo').border({width: '2px', color: 'red', radius: '1px'});

$('#foo').border(null);

$('#foo').border(); // Returns the value of the border property

*/

 ;(function($, window, document, undefined) {

    var pluginName = "border",
        defaults = {};
    var regexs = {
        reWidth: /\dpx/,
        reStyle: /(none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset)/,
        reColor: /(aqua|black|blue|fuchsia|gray|grey|green|lime|maroon|navy|olive|purple|red|silver|teal|white|yellow)/
    };


    function Plugin(element, options) {
        this.element = element;


        if($.type(options) === "string") {

            this.options = options;
        } else {
            this.options = $.extend({}, options);

        }

        if(options == null) {
            this.options = null;
        }
        this._defaults = defaults;
        this._name = pluginName;

        this.init();

    }

    Plugin.prototype = {

        init: function() {


            if(jQuery.type(this.options) === "string") {
                this.setBorderValueString(this.elements, this.options);
            }
            if(jQuery.isPlainObject(this.options) && !$.isEmptyObject(this.options)) {

                this.setBorderValueJson(this.elements, this.options);
            }
            if(this.options == null) {


                this.setBorderValueNone();
            }

        },

        setBorderValueString: function(el, options) {
            var finalStyle = "";

            var stringsArray = options.split(" ");
            for(var i = 0; i < stringsArray.length; i++) {
                if(regexs.reWidth.test(stringsArray[i])) {
                    finalStyle += (stringsArray[i] + " ");

                }

                if(regexs.reStyle.test(stringsArray[i])) {
                    finalStyle += (stringsArray[i] + " ");

                }

                if(regexs.reColor.test(stringsArray[i])) {
                    finalStyle += (stringsArray[i] + " ");

                }

            }

            $(this.element).css("border", finalStyle);

        },
        setBorderValueJson: function(el, options) {
            var finalStyle = "";

            if(regexs.reWidth.test(options.width)) {

                finalStyle += (options.width + " ");

            }

            if(regexs.reStyle.test(options.style)) {
                finalStyle += (options.style + " ");

            }

            if(regexs.reColor.test(options.color)) {
                finalStyle += (options.color + " ");

            }
            if(regexs.reWidth.test(options.radius)) {

                $(this.element).css("border-radius", options.radius);

            }

            console.log(finalStyle);

            $(this.element).css("border", finalStyle);

        },

        setBorderValueNone: function() {

            $(this.element).css("border", "none");

        },
    };

       $.fn[pluginName] = function(options) {

        if($.isEmptyObject(options) && arguments.length == 0) {

            return $(this).css("border");
        } else {
            return this.each(function() {



                if(!$.data(this, "plugin_" + pluginName)) {
                    $.data(this, "plugin_" + pluginName, new Plugin(this, options));

                }


            });
        }
    };

})(jQuery, window, document);