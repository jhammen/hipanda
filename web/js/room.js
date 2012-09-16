
var CHAT_TOPIC = "topic://PANDA.HOME";


var username;

function onLoad() {
	amq.addPollHandler(poll);
	username = prompt('username'); // + "@" + domainname;
	//var password = prompt('password');
	amq.sendMessage(CHAT_TOPIC, "<message type='join' from='" + username + "'/>");
	amq.addListener('chat', CHAT_TOPIC, _chat);
	amq._startPolling();
}


function poll(first) {
	log("(pollhandler)");
}

function _chat(message) {
	var type = message.getAttribute('type');
	var from = message.getAttribute('from');

	var panda = document.getElementById(from); // "panda-" + from
	// new panda: create
	if (panda == null) {
		panda = createPanda(from, document.getElementById("out"));
	}

	switch (type) {
	case 'chat': {
		var mesg = message.childNodes[0].data;
		var params = mesg.split(' ');
		if (params[0] == "MOVE") {
			// TODO: how about some range cheking?
			var anim = new YAHOO.util.Motion(panda, {
				points : {
					to : [ params[1], params[2] ]
				}
			});
			anim.animate();
		} else if (params[0] == "COLORME") {
			panda.style.background = "rgb(" + params[1] + "," + params[2] + ","
					+ params[3] + ")";
		} else {
			showBubbleYUI(panda, mesg);
		}
		break;
	}

	case 'ping': {
		break;
	}

	case 'join': {
		// if (room._username!=null)
		// amq.sendMessage(this._chatTopic, "<message type='ping' from='" +
		// room._username + "'/>");
		break;
	}

	case 'leave':
		log(panda.id + " has left the room");
		document.getElementById('out').removeChild(panda);
		break;
	}
}

function log(mesg) {
	document.getElementById('errordiv').innerHTML += "<br>*" + mesg;
}

function handleError(e) {
	log("<br>An error occured:<br />"
			+ ("Code: " + e.getAttribute('code') + "\nType: "
					+ e.getAttribute('type') + "\nCondition: " + e.firstChild.nodeName)
					.htmlEnc());
}

function clientSendMessage(text) {
	try {
		text = text.replace('<', '&lt;');
		text = text.replace('>', '&gt;');
		amq.sendMessage(CHAT_TOPIC, "<message type='chat' from='" + username
				+ "'>" + text + "</message>");
		log('sent message: ' + text);
	} catch (e) {
		log(e.message);
	}
}

function moveMe(evt) {
	// var anim = new YAHOO.util.Motion(myPanda, { points: { to:
	// [evt.clientX-30, evt.clientY-30] } });
	// anim.animate();
	clientSendMessage("MOVE " + (evt.clientX - 30) + " " + (evt.clientY - 30));
}

function chat() {
	var chatText = document.getElementById("chatText");
	// showBubbleYUI(myPanda, chatText.value);
	clientSendMessage(chatText.value);
	chatText.value = "";
}

YAHOO.util.Event.on('out', 'click', moveMe, null, true);
window.onbeforeunload = function() {
	amq.sendMessage(CHAT_TOPIC, "<message type='leave' from='" + username
			+ "'/>");
}

// yahoo version


function showBubbleYUI(panda, mesg) {
	var chatBubble = document.getElementById('chat' + panda.id);
	chatBubble.style.opacity = 100;
	if (mesg.length > 63) {
		mesg = mesg.substring(63);
	}
	chatBubble.innerHTML = mesg;
	var anim = new YAHOO.util.Anim(chatBubble, {
		opacity : {
			to : 0
		}
	}, mesg.length, YAHOO.util.Easing.easeOut);
	anim.animate();
}
