$(document).ready(function(){
            var touchSideSwipe = new TouchSideSwipe({

            // container element
            elementID: 'menu',

            // width and height
            elementWidth: 290, //px
            elementMaxWidth: 0.8, // *100%
            sideHookWidth: 0, //px

            // animation speed in seconds
            moveSpeed: 0.5,

            // opacity of background
            opacityBackground: .5,

            // in pixels
            shiftForStart: 50,

            // max width of window
            windowMaxWidth: 2000, 
            
        });

    var openBtn = document.querySelector(".open-btn");
    var closeBtn = document.querySelector(".close-btn");

    $(openBtn).click(function(){
        touchSideSwipe.tssOpen();
    });

    $(closeBtn).click(function(){
        touchSideSwipe.tssClose();
    });
});