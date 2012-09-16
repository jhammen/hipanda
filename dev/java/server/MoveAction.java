package com.hipanda.server;

public class MoveAction extends Action {

	int top;
	int left;
	
	public MoveAction(String pandaId, int t, int l) {
		super("ACTION_TYPE_MOVE", pandaId);
		top = t;
		left = l;
	}
	
	public int getLeft() {
		return left;
	}
	public int getTop() {
		return top;
	}
}
