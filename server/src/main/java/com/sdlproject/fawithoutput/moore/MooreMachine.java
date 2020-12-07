package com.sdlproject.fawithoutput.moore;

import com.sdlproject.fawithoutput.FAWithOutput;
import com.sdlproject.fawithoutput.common.InputSymbol;
import com.sdlproject.fawithoutput.common.STATE_TYPE;
import com.sdlproject.fawithoutput.common.WOpTransitions;

import java.util.ArrayList;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

public class MooreMachine extends FAWithOutput {

  public static TreeMap<String, MooreState> states;

  public MooreMachine(ArrayList<MooreState> states) {
    MooreMachine.states = new TreeMap<>();
    for(MooreState state: states) {
      MooreMachine.states.put(state.name, state);
    }
  }

  public ArrayList<WOpTransitions>  evaluateTestStrings(ArrayList<String> testStrings) {
    ArrayList<WOpTransitions> mooreTransitions = new ArrayList<>();
    for (String testString : testStrings) {
      WOpTransitions transitions = getOutputFromMachine(testString);
      mooreTransitions.add(transitions);
    }
    return mooreTransitions;
  }

  public WOpTransitions getOutputFromMachine(String testString) {
    WOpTransitions transition = new WOpTransitions();
    StringBuilder output = new StringBuilder();

    if(isValidTestString(testString)) {
      Map<String, MooreState> initialState = states.entrySet().stream()
              .filter(state -> state.getValue().type == STATE_TYPE.INITIAL)
              .collect(Collectors.toMap(map -> map.getKey(), map -> map.getValue()));

      MooreState currentState = (MooreState) initialState.values().toArray()[0];
      ArrayList<TreeMap<String, String>> path = new ArrayList<>();

      output.append(currentState.output.value);

      for (int i = 0; i < testString.length(); i++) {
        TreeMap<String, String> node = new TreeMap<>();
        MooreTransition currentTransition = currentState.getTransition(String.valueOf(testString.charAt(i)));
        if (currentTransition != null) {
          node.put(currentTransition.input.getValue(), currentTransition.state);
          currentState = getTheState(currentTransition.state);
          output.append(currentState.output.value);
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

  public MooreState getTheState(String string) {
    return states.get(string);
  }

  public boolean isValidTestString(String testString) {
    for (InputSymbol symbol : MooreMachine.INPUT_SYMBOLS) {
      if (!testString.contains(symbol.value)) {
        return false;
      }
    }
    return true;
  }

}
