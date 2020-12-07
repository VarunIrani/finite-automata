package com.sdlproject.fawithoutput.bodies;

import com.sdlproject.fawithoutput.common.FATypes;
import com.sdlproject.fawithoutput.common.InputSymbol;
import com.sdlproject.fawithoutput.common.OutputSymbol;
import com.sdlproject.fawithoutput.moore.MooreState;

import java.util.ArrayList;

public class MooreEntryClass {
    public String machine_name;
    public FATypes machine_type;
    public int input_alpha_count;
    public ArrayList<InputSymbol> input_alpha;
    public int output_alpha_count;
    public ArrayList<OutputSymbol> output_alpha;
    public int state_count;
    public ArrayList<String> test_strings;
    public ArrayList<MooreState> states;

    public String getMachine_name() {
        return machine_name;
    }

    public void setMachine_name(String machine_name) {
        this.machine_name = machine_name;
    }

    public FATypes getMachine_type() {
        return machine_type;
    }

    public void setMachine_type(FATypes machine_type) {
        this.machine_type = machine_type;
    }

    public int getInput_alpha_count() {
        return input_alpha_count;
    }

    public void setInput_alpha_count(int input_alpha_count) {
        this.input_alpha_count = input_alpha_count;
    }

    public ArrayList<InputSymbol> getInput_alpha() {
        return input_alpha;
    }

    public void setInput_alpha(ArrayList<InputSymbol> input_alpha) {
        this.input_alpha = input_alpha;
    }

    public int getOutput_alpha_count() {
        return output_alpha_count;
    }

    public void setOutput_alpha_count(int output_alpha_count) {
        this.output_alpha_count = output_alpha_count;
    }

    public ArrayList<OutputSymbol> getOutput_alpha() {
        return output_alpha;
    }

    public void setOutput_alpha(ArrayList<OutputSymbol> output_alpha) {
        this.output_alpha = output_alpha;
    }

    public int getState_count() {
        return state_count;
    }

    public void setState_count(int state_count) {
        this.state_count = state_count;
    }

    public ArrayList<String> getTest_strings() {
        return test_strings;
    }

    public void setTest_strings(ArrayList<String> test_strings) {
        this.test_strings = test_strings;
    }

    public ArrayList<MooreState> getStates() {
        return states;
    }

    public void setStates(ArrayList<MooreState> states) {
        this.states = states;
    }

    public MooreEntryClass(String machine_name, FATypes machine_type, int input_alpha_count, ArrayList<InputSymbol> input_alpha, int output_alpha_count, ArrayList<OutputSymbol> output_alpha, int state_count, ArrayList<String> test_strings, ArrayList<MooreState> states) {
        this.machine_name = machine_name;
        this.machine_type = machine_type;
        this.input_alpha_count = input_alpha_count;
        this.input_alpha = input_alpha;
        this.output_alpha_count = output_alpha_count;
        this.output_alpha = output_alpha;
        this.state_count = state_count;
        this.test_strings = test_strings;
        this.states = states;
    }

    public MooreEntryClass() {
    }
}
