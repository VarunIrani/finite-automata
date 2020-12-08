package com.sdlproject.fawithoutoutput.states;

public enum TypeOfState {
    InitialFinal(1),
    Initial(2),
    Transitional(3),
    Final(4),
    Dead(5);

    private int value;

    TypeOfState(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
