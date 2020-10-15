package com.sdl.server.finiteautomata.FiniteAutomataSimulation.states;

import com.sdl.server.finiteautomata.FiniteAutomataSimulation.supportclasses.Alphabet;

import java.util.HashMap;
import java.util.List;

public class TransitionState extends State {
    public TransitionState(String name, TypeOfState type, Alphabet alphabet, List<HashMap<String, String>> transitions) {
        super(name, TypeOfState.Transitional, alphabet, transitions);
    }
}
