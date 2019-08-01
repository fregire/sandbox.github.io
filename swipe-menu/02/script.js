$(document).ready(function(){
    var menu = document.querySelector(".menu");

    var touchSideSwipe = new TouchSideSwipe({
        elemSelector: '.menu',
        elementWidth: menu.innerWidth,
        elementMaxWidth: .95, 
        sideHookWidth: 0, 
        moveSpeed: 0.5,
        opacityBackground: .5,
        shiftForStart: 50,
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