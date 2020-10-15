package com.sdl.server.finiteautomata.FiniteAutomataSimulation.states;

import com.sdl.server.finiteautomata.FiniteAutomataSimulation.machine.TypeOfFA;
import com.sdl.server.finiteautomata.FiniteAutomataSimulation.supportclasses.Alphabet;

import java.util.*;

public class DeadState extends State {

    public DeadState(String name, Alphabet alphabet) {
        super();
        List<HashMap<String, String>> transition = new ArrayList<HashMap<String, String>>();

        for(String s : alphabet.getAlphabet()) {
            HashMap<String, String>temp = new HashMap<String, String>();
            temp.put(s, "$$");
            transition.add(temp);
        }
        super.setAll(name, TypeOfState.Dead, alphabet, transition);
    }

    @Override
    public void createLanguageConstrain(Set<String> stateNames, TypeOfFA typeOfFA) {
        super.createLanguageConstrainDefualt();
    }
}
