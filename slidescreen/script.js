document.addEventListener("DOMContentLoaded", function(){
	(function(){
		var container = document.querySelector(".container");
		var screenHeight = document.documentElement.clientHeight;
		var containerWrapper = container.querySelector(".container-wrapper");
		var screens = container.querySelectorAll(".screen");
		var coordY = 0;
		var notMoved = true;
		var timer;
		var TIME_FREEZE_SCROLL = 1000;

		var setupSlider = function(){
			container.style.height = screenHeight + "px";
			window.addEventListener("scroll", onWindowScroll);
			window.addEventListener("wheel", onWindowScroll);
			window.addEventListener("mousewheel", onWindowScroll);
			window.addEventListener("resize", onWindowResize);
			window.addEventListener("touchstart", onWindowTouchstart);
			window.addEventListener("touchend", onWindowTouchend);

			for(var i = 0; i < screens.length; i++){
				screens[i].setAttribute("data-href", "screen-" + (i + 1));
			}

			var currentHash = window.location.hash.split("#")[1];
			coordY = -document.querySelector(".screen[data-href='" + currentHash + "']").getBoundingClientRect().top;
			containerWrapper.style.transition = "transform 1s ease-in-out";
			containerWrapper.style.transform = "translate(0, " + coordY + "px)";
			setInterval(function(){
				containerWrapper.style.transition = "transform .5s";
			}, 0);
		}


		var onWindowScroll = function(e){
			if(e.deltaY > 0){
				moveToNextScreen();
			} else {
				moveToPrevScreen();
			}
		}	


		var moveToNextScreen = function(){
			if(notMoved){
				coordY = coordY - screenHeight;

				if(coordY < -(screens.length - 1) * screenHeight){
					coordY = -(screens.length - 1) * screenHeight;
				}

				containerWrapper.style.transform = "translate(0, " + coordY + "px)";

				changeUrl();
				notMoved = false;

				var timer = setInterval(function(){
					notMoved = true;
					clearInterval(timer);
				}, TIME_FREEZE_SCROLL);
			}
		}

		var moveToPrevScreen = function(){
			if(notMoved){
				coordY = coordY + screenHeight;

				if(coordY > 0){
					coordY = 0;
				}

				containerWrapper.style.transform = "translate(0, " + coordY + "px)";

				changeUrl();
				notMoved = false;

				var timer = setInterval(function(){
					notMoved = true;
					clearInterval(timer);
				}, TIME_FREEZE_SCROLL);
			}
		}

		var changeUrl = function(){
			var index = parseInt(coordY / screenHeight) > 0 ? parseInt(coordY / screenHeight) : -parseInt(coordY / screenHeight);
			index++;
			window.location.hash = 'screen-' + index;
		}



		var onWindowResize = function(){
			screenHeight = document.documentElement.clientHeight;
			container.style.height = screenHeight + "px";
			console.log(screenHeight);
		}

		var mobileY = 0;

		var onWindowTouchstart = function(e){
			mobileY = e.changedTouches[0].pageY;
		}

		var onWindowTouchend = function(e){
			if(e.changedTouches[0].pageY - mobileY > 0){
				moveToPrevScreen();
			} 

			if(e.changedTouches[0].pageY - mobileY < 0){
				moveToNextScreen();
			}
		}

		setupSlider();
	})();
});