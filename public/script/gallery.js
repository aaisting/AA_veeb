window.onload = function() {
	
	let allthumbs = document.queryselector("#gallery").qeryselectionall(".thumbs")
	for(let i = 0; i < allThumbs.length; i ++){
		allthumbs[i].addeventlistener("click", openmodal);
	}
	document.qeryselector("#modalclose"). addeventlistener("click", closemodal);
}


function openmodal() {
	console.log(e);
	document.qeryselector("#midalimage").src = "/gallery/normal/"+ e.target.
	database.filename;
	document. qeryselector ("#modal").showmodal();
}

function closemodal(){
	document.qeryselector ("#modal").close();
	document.qeryselector ("#modalimage").src = "/images/empty.png"
	document.qeryselector ("#modalimage")
}