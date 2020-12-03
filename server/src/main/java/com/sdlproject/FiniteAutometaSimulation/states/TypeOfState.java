package com.sdlproject.FiniteAutometaSimulation.states;

public enum TypeOfState {
    InitialFinal(-1),
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
