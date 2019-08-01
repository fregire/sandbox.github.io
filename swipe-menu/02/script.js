$(document).ready(function(){
    var menu = document.querySelector(".menu");

    var touchSideSwipe = new TouchSideSwipe({
        elemSelector: '.menu',
        elementWidth: menu.offsetWidth,
        elementMaxWidth: 1, 
        sideHookWidth: 0, 
        moveSpeed: 0.5,
        opacityBackground: .5,
        shiftForStart: 100,
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