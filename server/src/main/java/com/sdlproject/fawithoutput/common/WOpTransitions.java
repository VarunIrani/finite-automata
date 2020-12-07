package com.sdlproject.fawithoutput.common;
import java.util.ArrayList;
import java.util.TreeMap;

public class WOpTransitions {
    public ArrayList<TreeMap<String, String>> transition;
    public String result;

    public void setResult(String result) {
        this.result = result;
    }

    public void setTransition(ArrayList<TreeMap<String, String>> transition) {
        this.transition = transition;
    }

    public WOpTransitions() {}
}
