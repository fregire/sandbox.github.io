document.addEventListener("DOMContentLoaded", function(e){
	var user = {
		name: "Вася",
		func: function(){
			return {
				test: true,
				func: function(){
					return this;
				}
			}
		}
	};

	console.log(user.func().func());
	//Drag'n Drop
	(function(){
		var list = document.querySelector(".list");
		var listItems = list.querySelectorAll(".list__item");
		// Добавление элементов в список
		(function(){
			var onListFormSubmit = function(e){
				e.preventDefault();
				var value = e.target.querySelector("input").value;
				createListItem(value);
			}


			var createListItem = function(text){
				var li = document.createElement('li');
				li.classList.add("list__item");
				li.innerText = text;
				li.setAttribute("data-index", listItems.length);
				list.appendChild(li);
				listItems = list.querySelectorAll(".list__item");
				console.log(listItems);

			}
			var listForm = document.querySelector(".list-add");
			listForm.addEventListener("submit", onListFormSubmit);
		})();
		// Drag'n Drop элементов списка
		(function(){
			var draggedItem;
			var startCoordY;
			var listCoordY = list.getBoundingClientRect().top;
			var shiftCoordY;
			var rugItem = document.createElement('li');
			var currentIndex;
			var direction;
			var top;

			rugItem.classList.add("list__item", "list__item--rug");

			var onListItemMouseDown = function(e){
				e.preventDefault();
				if(e.target.tagName === 'LI'){
					draggedItem = e.target;
					currentIndex = parseInt(draggedItem.getAttribute("data-index"));

					startCoordY = draggedItem.getBoundingClientRect().top - listCoordY;
					shiftCoordY = e.pageY - draggedItem.getBoundingClientRect().top;

					draggedItem.classList.add("list__item--dragged");
					draggedItem.style.top = startCoordY + "px";
					list.insertBefore(rugItem, draggedItem.nextElementSibling);

					document.addEventListener("mousemove", onListItemMouseMove);
					document.addEventListener("mouseup", onListItemMouseUp);
				}
			}

			var onListItemMouseMove = function(e){
				draggedItem.style.top  = startCoordY - shiftCoordY + "px";

				if(e.pageY - listCoordY > startCoordY){
					direction = 'bottom';
				} else {
					direction = 'top';
				}

				startCoordY = e.pageY - listCoordY;


				for(let i = 0; i < listItems.length; i++){
					if(listItems[i] === draggedItem) continue;

					if((direction === 'top' && i < currentIndex && listItems[i].getBoundingClientRect().top >= draggedItem.getBoundingClientRect().top)){
						list.insertBefore(rugItem, listItems[i]);
						currentIndex = i;
					} else if(direction === 'bottom' && i > currentIndex && listItems[i].getBoundingClientRect().bottom <= draggedItem.getBoundingClientRect().bottom){
						list.insertBefore(rugItem, listItems[i + 1]);
						currentIndex = i;
					}
					listItems = list.querySelectorAll(".list__item");
					draggedItem.setAttribute("data-index", currentIndex);
					for(let i = 0; i < listItems.length; i++){
						if(listItems[i] === draggedItem) continue;
						listItems[i].setAttribute("data-index", i);
					}
				}
			}


			var onListItemMouseUp = function(e){
				document.removeEventListener("mousemove", onListItemMouseMove);
				list.removeChild(rugItem);
				draggedItem.classList.remove("list__item--dragged");
				draggedItem.setAttribute("data-index", currentIndex);
				list.insertBefore(draggedItem, listItems[currentIndex + 1]);
				listItems = list.querySelectorAll(".list__item");

				for(let i = 0; i < listItems.length; i++){
					listItems[i].removeAttribute("style");
					if(listItems[i] === draggedItem) continue;
					listItems[i].setAttribute("data-index", i);
				}
			}

			for(let i = 0; i < listItems.length; i++){
				listItems[i].addEventListener("mousedown", onListItemMouseDown);	
			}
		})();
	})();


});