package com.sdlproject.fawithoutoutput.supportclasses;

public class NFACollections {
    public boolean test;
    public NFATransition[] nfaTransitions;

    public NFACollections(int size) {
        nfaTransitions = new NFATransition[size];
    }

    public boolean isTest() {
        return test;
    }

    public void setTest(boolean test) {
        this.test = test;
    }
}
