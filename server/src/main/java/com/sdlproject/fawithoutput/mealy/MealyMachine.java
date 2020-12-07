package com.sdlproject.fawithoutput.mealy;

import com.sdlproject.fawithoutput.FAWithOutput;
import com.sdlproject.fawithoutput.common.InputSymbol;
import com.sdlproject.fawithoutput.common.STATE_TYPE;
import com.sdlproject.fawithoutput.common.WOpTransitions;

import java.util.ArrayList;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

public class MealyMachine extends FAWithOutput {

  public TreeMap<String, MealyState> states;

  public MealyMachine(ArrayList<MealyState> states) {
    this.states = new TreeMap<>();
    for(MealyState state: states) {
      System.out.println(state);
      this.states.put(state.name, state);
    }
  }

  public ArrayList<WOpTransitions> evaluateTestStrings(ArrayList<String> testStrings) {
    ArrayList<WOpTransitions> mealyTransitions = new ArrayList<>();
    for (String testString : testStrings) {
      WOpTransitions transitions = getOutputFromMachine(testString);
      mealyTransitions.add(transitions);
    }
    return mealyTransitions;
  }

  public WOpTransitions getOutputFromMachine(String testString) {
    WOpTransitions transition = new WOpTransitions();
    StringBuilder output = new StringBuilder();
    if(isValidTestString(testString)) {
      Map<String, MealyState> initialState = states.entrySet().stream()
              .filter(state -> state.getValue().type == STATE_TYPE.INITIAL)
              .collect(Collectors.toMap(map -> map.getKey(), map -> map.getValue()));

      MealyState currentState = (MealyState) initialState.values().toArray()[0];
      ArrayList<TreeMap<String, String>> path = new ArrayList<>();
      for (int i = 0; i < testString.length(); i++) {
        TreeMap<String, String> node = new TreeMap<>();
        MealyTransition currentTransition = currentState.getTransition(String.valueOf(testString.charAt(i)));
        if (currentTransition != null) {
          node.put(currentTransition.input.value, currentTransition.state);
          output.append(currentTransition.output.value);
          currentState = getTheState(currentTransition.state);
          path.add(node);
        }
      }
      transition.setTransition(path);
      transition.setResult(output.toString());
    } else {
      transition.setResult("Wrong Input Sorry");
    }
    return transition;
  }

  public MealyState getTheState(String string) {
    return states.get(string);
  }

  public boolean isValidTestString(String testString) {
    for (InputSymbol symbol : MealyMachine.INPUT_SYMBOLS) {
      if (!testString.contains(symbol.value)) {
        return false;
      }
    }
    return true;
  }
}
