package com.sdlproject.fawithoutoutput.states;

import com.sdlproject.fawithoutoutput.supportclasses.Alphabet;

import java.util.HashMap;
import java.util.List;

public class FinalState extends State {
    public FinalState(String name, TypeOfState type, Alphabet alphabet, List<HashMap<String, String>> transitions) {
        super(name, TypeOfState.Final, alphabet, transitions);
    }
}
