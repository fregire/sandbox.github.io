document.addEventListener("DOMContentLoaded", function(){	
	var openMenuBtn = document.querySelector(".open-menu");
	var menu = document.querySelector(".menu");
	var body = document.body;
	var overlay = body.querySelector(".overlay");


	var isOpenedMenu = function(){
		return menu.classList.contains("menu--opened") && body.classList.contains("body--freezed");
	}

	var openMenu = function(){
		menu.classList.add("menu--opened");
		body.classList.add("body--freezed");
		overlay.classList.add("overlay--visible");
		menu.removeAttribute("style");
	}

	var closeMenu = function(){
		menu.classList.remove("menu--opened");
		body.classList.remove("body--freezed");
		overlay.classList.remove("overlay--visible");
		menu.removeAttribute("style");
	}

	openMenuBtn.addEventListener("click", openMenu);

	document.addEventListener("click", function(e){
		if(e.target.classList.contains("overlay") && isOpenedMenu()){
			closeMenu();
		}
	});

	var startCoordX = 0;
	var shiftCoordX, shiftCoordY;
	var oneTouch;
	var openingMenu = false;
	var transform = -290;

	var swipeDistance = 0;
	var followDistance = 0;
	var action;
	var isVertical = false;



	document.addEventListener("touchstart", function(e){
		startCoordX = e.targetTouches[0].clientX;

		if(startCoordX <= 30 && !isOpenedMenu()){
			openingMenu = true;
		}
	});

	document.addEventListener("touchmove", function(e){
		var oneTouch = e.targetTouches[0];
		//Направление свайпа
		shiftCoordX = oneTouch.clientX - startCoordX;

		if(shiftCoordX < 2){
			isVertical = true;
		} else {
			isVertical = false;
		}

		if(shiftCoordX > 0 && openingMenu){
			menu.classList.add("menu--opened");
			followDistance = -290 + oneTouch.clientX;
		}


		if(followDistance >= 0){
			followDistance = 0;
		}

		if(followDistance <= -290){
			followDistance = -290;
		}			

		menu.style.transform = "translate(" + followDistance + "px)";

		swipeDistance++;
		

		startCoordX = oneTouch.clientX;

	});

	document.addEventListener("touchend", function(){
		if(isVertical && isOpenedMenu()){
			return;
		}

		if(isOpenedMenu() && swipeDistance < 20){
			openMenu();
		} else {
			if(!isOpenedMenu() && swipeDistance > 20 && openingMenu){
				openMenu();
				openingMenu = false;
			} else {
				closeMenu();
			}		
		}

		startCoordX = 0;
		swipeDistance = 0;
	});


});
