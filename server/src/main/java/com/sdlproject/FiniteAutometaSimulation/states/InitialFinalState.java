package com.sdlproject.FiniteAutometaSimulation.states;

import com.sdlproject.FiniteAutometaSimulation.supportclasses.Alphabet;

import java.util.HashMap;
import java.util.List;

public class InitialFinalState extends State {
    public InitialFinalState(String name, TypeOfState type, Alphabet alphabet, List<HashMap<String, String>> transitions) {
        super(name, TypeOfState.InitialFinal, alphabet, transitions);
    }
}
