var panda, river, barge, rock = [];

function Init() {
	panda = document.getElementById('panda');
	river = document.getElementById('river');
	barge = document.getElementById('barge');
	
	for(var i=0;i<4;i++) {
		rock[i] = document.getElementById('rock' + i);
	}
	
	var root = document.documentElement;
	root.addEventListener('keypress', movePanda, false);
	setTimeout('advance()', 100);
}

var bargex = 0;
var bargey = 0;

var BARGE_STEP = 5;

function advance() {
	bargex += BARGE_STEP;
	if (bargex > 700) {
		bargex = 0;
	}
	barge.setAttribute('x', bargex);

	// move panda
	if(enclosed(panda, barge)) {
		var x = parseInt(panda.getAttribute('x'));
		panda.setAttribute('x', x + BARGE_STEP);
		if(x > 700) {
			reset();
		}
	}
	setTimeout('advance()', 100);
}

var PANDA_STEP = 15;
var PANDA_JUMP = 120;

function movePanda(evt) {
	var x = panda.getAttribute('x');
	var y = panda.getAttribute('y');
	if (evt.type == 'keypress') {
		var charCode;
		if (evt.charCode) {
			charCode = evt.charCode;
		} else {
			charCode = evt.keyCode;
		}
		if (charCode == 37) {
			stepLeft(x);
		} else if (charCode == 38) {
			stepUp(y);
		} else if (charCode == 39) {
			stepRight(x);
		} else if (charCode == 40) {
			stepDown(y);
		} else if (charCode == 32) {
			pandaJump(y);
		}
		// alert('in river: ' + inRiver());
		if(inRiver()) {
			reset();
		}
	}
}

function inRiver() {	
	if(!enclosed(panda, river)) {
		return false;
	}
	// on a barge
	if(enclosed(panda, barge)) {
		return false;
	}
	// we're in the river - but on a rock?
	for(var i=0;i<4;i++) {
		if(enclosed(panda,rock[i])) {
			//rock[i].setAttribute('style','fill:#00FF00');
			return false;
		}
	}
	
	return true;
}

function reset() {
	river.setAttribute('style','fill:#FF0000');
	// move panda back to start pos
	panda.setAttribute('y', 511);
	setTimeout(function() {
		panda.setAttribute('x', 340);
		river.setAttribute('style','fill:#0000FF'); 
	}, 1000);
}


function enclosed(e1, e2) {	
	var x1 = parseInt(e1.getAttribute('x'));
	var y1 = parseInt(e1.getAttribute('y'));
	var bbox = e2.getBBox();
	var x2 = bbox.x;
	var y2 = bbox.y;
	//console.log(x1 + ":" + y1 + ":" + x2 + ":" +y2 + ":" + bbox);
	if(x1 >= x2 && x1 <= x2 + bbox.width && y1 >= y2 && y1 <= y2 + bbox.height) {
		return true;
	}
	return false;
}


function pandaJump(y) {
	if (y - 100 > 0) {
		panda.setAttribute('y', parseInt(y) - PANDA_JUMP);
	}
}

function stepUp(y) {
	if (y - 50 > 0) {
		panda.setAttribute('y', parseInt(y) - PANDA_STEP);
	}
}

function stepDown(y) {
	if (y < 511) {
		panda.setAttribute('y', parseInt(y) + PANDA_STEP);
	}
}
function stepLeft(x) {
	if (x - 50 > 0) {
		panda.setAttribute('x', parseInt(x) - PANDA_STEP);
	}
}

function stepRight(x) {
	if (x < 690) {
		panda.setAttribute('x', parseInt(x) + PANDA_STEP);
	}
}
