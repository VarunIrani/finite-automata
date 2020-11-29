package com.sdlproject.FiniteAutometaSimulation.states;

import com.sdlproject.FiniteAutometaSimulation.machine.TypeOfFA;
import com.sdlproject.FiniteAutometaSimulation.supportclasses.Alphabet;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

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
