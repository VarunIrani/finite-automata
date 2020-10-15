package com.sdl.server.finiteautomata.FiniteAutomataSimulation.bodies;

import com.sdl.server.finiteautomata.FiniteAutomataSimulation.states.TypeOfState;

import java.util.HashMap;
import java.util.List;

public class GivenState {

    private String name;
    private TypeOfState type;
    private List<HashMap<String, String>> transitions;

    GivenState() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public TypeOfState getType() {
        return type;
    }

    public void setType(TypeOfState type) {
        this.type = type;
    }

    public List<HashMap<String, String>> getTransitions() {
        return transitions;
    }

    public void setTransitions(List<HashMap<String, String>> transitions) {
        this.transitions = transitions;
    }

    public GivenState(String name, TypeOfState type, List<HashMap<String, String>> transitions) {
        this.name = name;
        this.type = type;
        this.transitions = transitions;
    }
}