package com.sdlproject.fawithoutput.mealy;

import com.sdlproject.fawithoutput.common.InputSymbol;
import com.sdlproject.fawithoutput.common.OutputSymbol;

public class MealyTransition {
  String state;
  InputSymbol input;
  OutputSymbol output;

  public MealyTransition(String state, InputSymbol input, OutputSymbol output) {
    this.state = state;
    this.input = input;
    this.output = output;
  }

  @Override
  public String toString() {
    return "MealyTransition{" +
            "state=" + state +
            ", input=" + input +
            ", output=" + output +
            '}';
  }

  public String getState() {
    return state;
  }

  public void setState(String state) {
    this.state = state;
  }

  public InputSymbol getInput() {
    return input;
  }

  public void setInput(InputSymbol input) {
    this.input = input;
  }

  public OutputSymbol getOutput() {
    return output;
  }

  public void setOutput(OutputSymbol output) {
    this.output = output;
  }

}
