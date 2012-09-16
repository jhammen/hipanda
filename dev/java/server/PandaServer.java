package com.hipanda.server;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PandaServer {	

    private static Map<String, Panda> pandas = new HashMap<String, Panda>();
    private static Map<String, List<Action>> actionQ = new HashMap<String, List<Action>>();
  
	public String login() {
		Panda newPanda = new Panda();
		String newId = newPanda.getId();
		pandas.put(newId, newPanda);
		actionQ.put(newId, new ArrayList<Action>());
		addAction(new EnterAction(newPanda), false);
		return newId;
	}
	
	public Collection<Panda> getPandas() {
		return pandas.values();
	}
	
	public List<Action> getActions(String pandaId) {
		return actionList(pandaId);
	}
	
	public void updateLocation(String pandaId, int top, int left) {
		Panda panda = pandas.get(pandaId);
		panda.setTop(top);
		panda.setLeft(left);
		addAction(new MoveAction(pandaId, top, left), false);
	}
	
	public void exit(String pandaId) {
		pandas.remove(pandaId);
		actionQ.remove(pandaId);
		addAction(new LeaveAction(pandaId), true);
	}
	
	public void chat(String pandaId, String mesg) {
		addAction(new ChatAction(pandaId, mesg), true);
	}
	// ----------------- private functions
	
	private void addAction(Action action, boolean includeSelf) {
		for(Panda panda: pandas.values()) {
			if(includeSelf || !panda.getId().equals(action.getPandaId())) {
				actionQ.get(panda.getId()).add(action);
			}
		}		
	}
	
	private List<Action> actionList(String pandaId) {
		List<Action> ret = actionQ.get(pandaId);
		actionQ.put(pandaId, new ArrayList<Action>());
		return ret;		
	}
}
