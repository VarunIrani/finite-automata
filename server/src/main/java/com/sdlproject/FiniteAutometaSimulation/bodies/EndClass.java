package com.sdlproject.FiniteAutometaSimulation.bodies;

import com.sdlproject.FiniteAutometaSimulation.machinewithoutoutput.TypeOfFA;
import com.sdlproject.FiniteAutometaSimulation.supportclasses.Transitions;

import java.util.ArrayList;
import java.util.Map;

public class EndClass {
    public String machine_name;
    public TypeOfFA machine_type;
    public int alphabet_count;
    public String[] alphabets;
    public int state_count;
    public String[] test_strings;
    ArrayList<Map<String, Transitions>> transitions;

    public void setMachine_name(String machine_name) {
        this.machine_name = machine_name;
    }

    public void setMachine_type(TypeOfFA machine_type) {
        this.machine_type = machine_type;
    }

    public void setAlphabet_count(int alphabet_count) {
        this.alphabet_count = alphabet_count;
    }

    public void setAlphabets(String[] alphabets) {
        this.alphabets = alphabets;
    }

    public void setState_count(int state_count) {
        this.state_count = state_count;
    }

    public void setTest_strings(String[] test_strings) {
        this.test_strings = test_strings;
    }

    public String getMachine_name() {
        return machine_name;
    }

    public TypeOfFA getMachine_type() {
        return machine_type;
    }

    public int getAlphabet_count() {
        return alphabet_count;
    }

    public String[] getAlphabets() {
        return alphabets;
    }

    public int getState_count() {
        return state_count;
    }

    public String[] getTest_strings() {
        return test_strings;
    }

    public EndClass(String machine_name, TypeOfFA machine_type, int alphabet_count, String[] alphabets, int state_count, String[] test_strings, ArrayList<Map<String, Transitions>> transitions) {
        this.machine_name = machine_name;
        this.machine_type = machine_type;
        this.alphabet_count = alphabet_count;
        this.alphabets = alphabets;
        this.state_count = state_count;
        this.test_strings = test_strings;
        this.transitions = transitions;
    }

    public ArrayList<Map<String, Transitions>> getTransitions() {
        return transitions;
    }

    public void setTransitions(ArrayList<Map<String, Transitions>> transitions) {
        this.transitions = transitions;
    }

    public EndClass() {}
}

