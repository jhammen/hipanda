package com.hipanda.server;

public class Action {

	String type;
	String pandaId;
	
	public Action(String t, String id) {
		type = t;
		pandaId = id;
	}
	
	public String getPandaId() {
		return pandaId;
	}
	
	public String getType() {
		return type;
	}
}
