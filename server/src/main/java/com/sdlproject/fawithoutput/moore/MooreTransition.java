package com.sdlproject.fawithoutput.moore;

import com.sdlproject.fawithoutput.common.InputSymbol;

public class MooreTransition {
  String state;
  InputSymbol input;

  public MooreTransition(String state, InputSymbol input) {
    this.state = state;
    this.input = input;
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

  @Override
  public String toString() {
    return state + ": " + input.getValue();
  }
}
