package com.sdlproject.fawithoutoutput.states;

import com.sdlproject.fawithoutoutput.supportclasses.Alphabet;

import java.util.HashMap;
import java.util.List;

public class InitialState extends State {
    public InitialState(String name, TypeOfState type, Alphabet alphabet, List<HashMap<String, String>> transitions) {
        super(name, TypeOfState.Initial, alphabet, transitions);
    }
}
