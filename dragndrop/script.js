document.addEventListener("DOMContentLoaded", function(){
	var draggedItem;

	document.addEventListener("dragstart", function(e){
		if(e.target.classList.contains('dragged-item')){
			draggedItem = e.target;
			e.dataTransfer.setData('image/jpeg', e.target.textContent);
		}
	});

	document.addEventListener("dragenter", function(e){
		if(e.target.classList.contains("list__item")){
			e.target.classList.add("list__item--hover");
		}
	});

	document.addEventListener("dragleave", function(e){
		if(e.target.classList.contains("list__item--hover")){
			e.target.classList.remove("list__item--hover");
		}
	});


	document.addEventListener("dragover", function(e){
		e.preventDefault();
		return false;
	});


	document.addEventListener("drop", function(e){
		e.preventDefault();
		if(e.target.hasAttribute("dropzone")){
			e.target.appendChild(draggedItem);
			e.target.classList.remove("list__item--hover");
		}
	});
});