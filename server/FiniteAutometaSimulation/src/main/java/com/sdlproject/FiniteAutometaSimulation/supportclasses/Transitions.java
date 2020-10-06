package com.sdlproject.FiniteAutometaSimulation.supportclasses;

import java.util.ArrayList;
import java.util.TreeMap;
public class Transitions {
    public ArrayList<TreeMap<String, String>> transition;
    public String result;
    public boolean test;

    public String getResult() {
        return result;
    }
    public void setResult(String result) {
        this.result = result;
    }

    public void setTransition(ArrayList<TreeMap<String, String>> transition) {
        this.transition = transition;
    }

    public ArrayList<TreeMap<String, String>> getTransition() {
        return transition;
    }

    public Transitions(ArrayList<TreeMap<String, String>> transition, String result) {
        this.transition = transition;
        this.result = result;
    }

    public boolean isTest() {
        return test;
    }

    public void setTest(boolean test) {
        this.test = test;
    }

    public Transitions() {}
}
