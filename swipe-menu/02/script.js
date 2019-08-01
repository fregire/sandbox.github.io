document.addEventListener("DOMContentLoaded", function(){
    var menu = document.querySelector(".menu");
    var openBtn = document.querySelector(".open-btn");
    var closeBtn = document.querySelector(".close-btn");

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

    menu.style.visibility = 'visible';


    openBtn.addEventListener("click", touchSideSwipe.tssOpen);
    closeBtn.addEventListener("click", touchSideSwipe.tssClose);
});