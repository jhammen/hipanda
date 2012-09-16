function createPanda(id, parent) {
	var div = document.createElement('div');
	div.id = id;
	div.className = "panda";
	div.style.top = 0;
	div.style.left = 0;
	var chatBubble = document.createElement('div');
	chatBubble.id = "chat" + id;
	div.appendChild(chatBubble);
	var avatar = document.createElement('img');
	avatar.src = "img/panda.png";
	div.appendChild(avatar);
	var nameLabel = document.createElement('span');
	nameLabel.innerHTML = id;
	nameLabel.style.textAlign = "center";
	// nameLabel.id = "name" + id;
	div.appendChild(nameLabel);
	// div.style.backgroundImage = "url(img/panda.png)";
	parent.append(div);
	return div;
}

function movePanda(panda, mesg) {

}

function showBubble(panda, mesg) {
	if (mesg.length > 63) {
		mesg = mesg.substring(63);
	}
	var id = '#chat' + panda.id;
	//$(id).fadeIn(100); // mesg.length
	$(id).html(mesg);
	//$(id).fadeOut(10000); // mesg.length
}