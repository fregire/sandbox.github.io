		'use strict';
		// Моудль callback.js
		(function(){
			// Callback'и
			var elem = {
				name: 'Это элемент',
				mainAction: function(){
					console.log('Какой-то код');
					if(typeof this.callback === 'function'){
						this.callback();
					}
				},
				callback: null
			}
			elem.callback = function(){
				console.log("Привет от callback'а");
			}
			elem.mainAction();
		})();

		// Модуль handlerNaming.js
		(function(){
			//Обработчики событий - наименование
			var btn = document.querySelector(".button");
			function btnClickHandler(){
				alert("элементСобытиеHandler - btnClickHandler");
			}
			function onBtnClick(){
				alert("onЭлементСобытие - onBtnClick");
			}
			btn.addEventListener("click", function(){
				btnClickHandler();
			});
			btn.addEventListener("click", function() {
				onBtnClick();
			});
		})();

		// Модуль delegate.js
		(function(){
			//Делегирование
			window.form = document.querySelector("form");

			// Фаза захвата	
			// Для этой фазы работают все события
			form.addEventListener("focus", function(e){
				console.log("focused on " + e.target.name + ' field');
			}, true);

			// Фаза всплытия
			var links = document.querySelector(".links");
			links.addEventListener("click", function(e){
				if(e.target.getAttribute("href") === '#yandex'){
					// Отправка данных для статистики
					console.log("yandex");
				} else if(e.target.getAttribute("href") === '#google'){
					console.log("google");
				} else {
					console.log(e.target.textContent);
				}
			});
		})();

		// Модуль ajax.js
		(function(){
			var xhr = new XMLHttpRequest();
			form.addEventListener("submit", function(e){
				e.preventDefault();
				xhr.addEventListener("load", function() {
					switch(xhr.status){
						case 200:
							alert('Cool bro, its 200');
					}
				});
				xhr.addEventListener("timeout", function(){
					alert("Too long...");
				});
				xhr.addEventListener("error", function(){
					alert("Error with network");
				});
				var formData = new FormData(this);
				xhr.open("POST", "mail.php");
				xhr.send(formData);	
				console.log();
			});
			
		})();

		(function(){
			// Работа с JSON - server
			var jsonBtn = document.querySelector(".json_btn");
			jsonBtn.addEventListener("click", function() {
				var xhr = new XMLHttpRequest();
				xhr.addEventListener("load", function() {
					console.log(JSON.parse(xhr.response));
				});
				//xhr.responseType = 'json';
				var jsonObj = {
			      "title": "gergergg-ergergergrg",
			      "author": "greger"
			    }
				xhr.open("POST", "http://localhost:3000/posts/");
				xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
				xhr.send(JSON.stringify(jsonObj));
			});
		})();
		(function(){
			var pageBtn = document.querySelector(".btn-page");
			pageBtn.addEventListener("click", function() {
			
				var xhr = new XMLHttpRequest();
				var obj = {
					name: "Grey",
					age: 14
				}
				xhr.open("POST", "page.php");
				xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
				xhr.send(obj);
			});


		})();
		(function(){
			var formUser = document.querySelector(".user_info");
			formUser.addEventListener("submit", function(e){
				var userName = formUser.querySelector("input[name='name']").value;
				var userAge = formUser.querySelector("input[name='age']").value;
				var objUser = {
					name: userName,
					age: userAge,
					id: Math.random() * 10
				}
				e.preventDefault();
				var xhr = new XMLHttpRequest();
				xhr.open("POST", "http://localhost:3000/users/");
				xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
				xhr.send(JSON.stringify(objUser));

			});
		})();
		// Модуль popup.js
		(function(){
			var btn = document.querySelector(".btn_modal");
			var modal = document.querySelector(".modal");
			var closeBtn = document.querySelector(".close");
			window.modalContent = document.querySelector(".modal__content");
			function openPopup() {
				modal.classList.add("modal--opened");
			}
			function closePopup() {
				modal.classList.remove("modal--opened");
				modalContent.removeAttribute("style");
			}
			document.body.addEventListener("click", function(e) {
				if(e.target === btn){
					openPopup();
				} else if(e.target === closeBtn){
					closePopup();
				}
			});
		})();

		// Модуль drag.js - 1 способ(относительно начальной точки)
		// (function(){
		// 	var x,y, sumX, sumY, maxX, maxY;
		// 	modalContent.addEventListener("mousedown", function(e){
		// 		x = e.clientX;
		// 		y = e.clientY;
		// 		if(e.target.tagName.toLowerCase() !== "p"){

		// 			function onMouseMove(e){
		// 				sumX = x - e.clientX;
		// 				sumY = y - e.clientY;
		// 				x = e.clientX;
		// 				y = e.clientY;
					
		// 				if((parseInt(modalContent.style.top) < 50)){
		// 					modalContent.style.top = 50 + "px";
		// 				} else {
		// 					modalContent.style.top = (modalContent.offsetTop - sumY) + "px";
		// 				}
		// 				if((parseInt(modalContent.style.left) < 318)){
		// 					modalContent.style.left = 318 + "px";
		// 				} else {
		// 				modalContent.style.left = (modalContent.offsetLeft - sumX) + "px";
		// 				}
		// 			}
		// 			function onMouseUp(){
		// 				document.removeEventListener("mousemove", onMouseMove);
		// 			}
		// 			document.addEventListener("mousemove", onMouseMove);
		// 			document.addEventListener("mouseup", onMouseUp);
		// 		}
		// 	})
		// })();

		// Модуль drag.js 2 способ
		(function(){
			var x, y, y1, x1;
			modalContent.addEventListener("mousedown", function(e){
				var startCoords = {
					x: e.clientX,
					y: e.clientY
				}
				console.log(e);

				function onMouseMove(e){
					var shiftCoords = {
						x1: e.clientX - startCoords.x,
						y1: e.clientY - startCoords.y
					}
					startCoords.x = e.clientX;
					startCoords.y = e.clientY;
					modalContent.style.left = (modalContent.offsetLeft + shiftCoords.x1) + "px";
					modalContent.style.top = (modalContent.offsetTop + shiftCoords.y1) + "px";
				}
				document.addEventListener("mousemove", onMouseMove);
				document.addEventListener("mouseup", function(){
					document.removeEventListener("mousemove", onMouseMove);
				})
			});

		})();
	