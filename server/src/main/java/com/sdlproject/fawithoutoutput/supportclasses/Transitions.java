package com.sdlproject.fawithoutoutput.supportclasses;
import java.util.ArrayList;
import java.util.TreeMap;

public class Transitions {
    public ArrayList<TreeMap<String, String>> transition;
    public String result;
    public boolean test;
    public void setResult(String result) {
        this.result = result;
    }
    public void setTransition(ArrayList<TreeMap<String, String>> transition) {
        this.transition = transition;
    }
    public boolean isTest() {
        return test;
    }
    public Transitions() {}
}
