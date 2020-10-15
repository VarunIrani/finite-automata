package com.sdl.server.finiteautomata.FiniteAutomataSimulation.states;

public enum TypeOfState {
    Initial(0),
    Transitional(1),
    Final(2),
    Dead(3);

    private int value;

    TypeOfState(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
