package com.hipanda.server;

public class ChatAction extends Action {

	String message;
	
	public ChatAction(String pandaId, String mesg) {
		super("ACTION_TYPE_CHAT", pandaId);
		message = mesg;
	}

	public String getMessage() {
		return message;
	}
}
