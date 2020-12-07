package com.sdlproject.fawithoutoutput.bodies;
import com.sdlproject.fawithoutoutput.machinewithoutoutput.TypeOfFA;

public class EntryClass {
    String machine_name;
    TypeOfFA machine_type;
    int alphabet_count;
    String[] alphabets;
    int state_count;
    String[] test_strings;
    GivenState[] states;

    public String getMachine_name() {
        return machine_name;
    }

    public void setMachine_name(String machine_name) {
        this.machine_name = machine_name;
    }

    public TypeOfFA getMachine_type() {
        return machine_type;
    }

    public void setMachine_type(TypeOfFA machine_type) {
        this.machine_type = machine_type;
    }

    public int getAlphabet_count() {
        return alphabet_count;
    }

    public void setAlphabet_count(int alphabet_count) {
        this.alphabet_count = alphabet_count;
    }

    public String[] getAlphabets() {
        return alphabets;
    }

    public void setAlphabets(String[] alphabets) {
        this.alphabets = alphabets;
    }

    public int getState_count() {
        return state_count;
    }

    public void setState_count(int state_count) {
        this.state_count = state_count;
    }

    public String[] getTest_strings() {
        return test_strings;
    }

    public void setTest_strings(String[] test_strings) {
        this.test_strings = test_strings;
    }

    public GivenState[] getStates() {
        return states;
    }

    public void setStates(GivenState[] states) {
        this.states = states;
    }

    public EntryClass(String machine_name, TypeOfFA machine_type, int alphabet_count, String[] alphabets, int state_count, String[] test_strings, GivenState[] states) {
        this.machine_name = machine_name;
        this.machine_type = machine_type;
        this.alphabet_count = alphabet_count;
        this.alphabets = alphabets;
        this.state_count = state_count;
        this.test_strings = test_strings;
        this.states = states;
    }

}
