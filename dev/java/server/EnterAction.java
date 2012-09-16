package com.hipanda.server;

public class EnterAction extends Action {

	Panda panda;
	
	public EnterAction(Panda p) {
		super("ACTION_TYPE_ENTER", p.getId());
		panda = p;
	}
	
	public Panda getPanda() { return panda; }
}
