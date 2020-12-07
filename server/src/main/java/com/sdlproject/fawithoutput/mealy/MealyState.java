package com.sdlproject.fawithoutput.mealy;

import com.sdlproject.fawithoutput.common.STATE_TYPE;

import java.util.ArrayList;

public class MealyState {
  String name;
  ArrayList<MealyTransition> transitions;
  STATE_TYPE type;

  @Override
  public String toString() {
    return "MealyState{" +
            "name='" + name + '\'' +
            ", transitions=" + transitions +
            ", type=" + type +
            '}';
  }

  public MealyState(String name, ArrayList<MealyTransition> transitions, STATE_TYPE type) {
    this.name = name;
    this.transitions = transitions;
    this.type = type;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public ArrayList<MealyTransition> getTransitions() {
    return transitions;
  }

  public void setTransitions(ArrayList<MealyTransition> transitions) {
    this.transitions = transitions;
  }

  public STATE_TYPE getType() {
    return type;
  }

  public void setType(STATE_TYPE type) {
    this.type = type;
  }

  MealyTransition getTransition(String inputSymbol) {
    for (MealyTransition transition : transitions) {
      if (transition.input.value.equals(inputSymbol))
        return transition;
    }
    return null;
  }

}
