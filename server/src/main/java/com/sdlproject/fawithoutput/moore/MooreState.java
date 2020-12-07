package com.sdlproject.fawithoutput.moore;

import com.sdlproject.fawithoutput.common.OutputSymbol;
import com.sdlproject.fawithoutput.common.STATE_TYPE;

import java.util.ArrayList;

public class MooreState {
  String name;
  OutputSymbol output;
  ArrayList<MooreTransition> transitions;
  STATE_TYPE type;

  public MooreState(String name, OutputSymbol output, STATE_TYPE type) {
    this.name = name;
    this.output = output;
    this.type = type;
    this.transitions = new ArrayList<>();
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public OutputSymbol getOutput() {
    return output;
  }

  public void setOutput(OutputSymbol output) {
    this.output = output;
  }

  public ArrayList<MooreTransition> getTransitions() {
    return transitions;
  }

  public void setTransitions(ArrayList<MooreTransition> transitions) {
    this.transitions = transitions;
  }

  public STATE_TYPE getType() {
    return type;
  }

  public void setType(STATE_TYPE type) {
    this.type = type;
  }

  MooreTransition getTransition(String inputSymbol) {
    for (MooreTransition transition : transitions) {
      if (transition.input.value.equals(inputSymbol))
        return transition;
    }
    return null;
  }
}
