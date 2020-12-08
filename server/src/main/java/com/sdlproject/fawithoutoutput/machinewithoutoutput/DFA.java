package com.sdlproject.fawithoutoutput.machinewithoutoutput;

import com.sdlproject.fawithoutoutput.bodies.EndClass;
import com.sdlproject.fawithoutoutput.bodies.GivenState;
import com.sdlproject.fawithoutoutput.states.State;
import com.sdlproject.fawithoutoutput.states.TypeOfState;
import com.sdlproject.fawithoutoutput.supportclasses.Alphabet;
import com.sdlproject.fawithoutoutput.supportclasses.StringChecker;
import com.sdlproject.fawithoutoutput.supportclasses.Transitions;

import java.util.*;

public class DFA implements FiniteAutomata {
    private TypeOfFA type;
    private Alphabet alphabet;
    private ArrayList<String> testCases;
    private ArrayList<State> states;
    private Set<String> stateNames;
    private String nameOfMachine;

    public DFA(Alphabet alphabet, String nameOfMachine) {
        this.type = TypeOfFA.DFA;
        this.alphabet = alphabet;
        this.nameOfMachine = nameOfMachine;
    }

    public void createStates(int stateCount, GivenState[] givenState) {
        this.stateNames = new TreeSet<String>();
        this.states = new ArrayList<State>();
        for(int i=0; i < stateCount; i++) {
            this.stateNames.add(givenState[i].getName());
            states.add(new State(givenState[i].getName(), givenState[i].getType(), this.alphabet, givenState[i].getTransitions()));
        }
        this.states.sort((state, t1) -> { return state.getType().getValue() - t1.getType().getValue(); });
    }

    @Override
    public void defineStates() {
        states.forEach(e -> {
            e.createLanguageConstrain(stateNames, this.type);
        });
    }

    @Override
    public EndClass descriptMachine(EndClass responseBody) {
        StringBuilder str = new StringBuilder();

        str.append(
                "Name :- " + this.nameOfMachine + "\n" +
                        "Type :- " + this.type + "\n" +
                        "Alphabet :- " + this.alphabet.getAlphabet() + "\n" +
                        "States -" + "\n"
        );

        for (State e : this.states) {
            str.append(
                    "\tState: " + e.getName() + " - " + e.getLanguageCons() + " - " + e.getTypeName() + "\n"
            );
        }

        responseBody.setMachine_type(this.type);
        responseBody.setMachine_name(this.nameOfMachine);
        responseBody.setAlphabet_count(this.alphabet.getSize());
        responseBody.setState_count(this.stateNames.size());

        return responseBody;
    }

    public State giveMeStateFromName(String nameOfState) {
        for (State e : this.states) {
            if (e.getName().equals(nameOfState)) {
                return e;
            }
        }
        return null;
    }

    @Override
    public Transitions testTheMachine(String testString) {
        Transitions transitions = new Transitions();
        ArrayList<TreeMap<String, String>> transition = new ArrayList<TreeMap<String, String>>();
        if (StringChecker.isStringIsMadeOfAlphabets(testString, this.alphabet)) {
            State statePointer = this.states.get(0);
            for (int i = 0; i < testString.length(); i++) {
                String alpha = "" + testString.charAt(i);
                TreeMap<String, String> temp = new TreeMap<>();
                temp.put(alpha, statePointer.whichState(alpha));
                transition.add(temp);
                statePointer = this.giveMeStateFromName(statePointer.whichState(alpha));
            }
            System.out.println(statePointer.getType().getValue());
            if (statePointer.getType().equals(TypeOfState.Final) || statePointer.getType().equals(TypeOfState.InitialFinal)) {
                transitions.setTransition(transition);
                transitions.setResult("Accepted");
                return transitions;
            } else {
                transitions.setTransition(transition);
                transitions.setResult("Rejected");
                return transitions;
            }

        } else {
            transitions.setResult("The Given String is Not Build by the Given Language The Machine Can't Process Sorry !");
            return transitions;
        }
    }

    @Override
    public EndClass setTestCases(String[] testCases, EndClass responseBody) {

        ArrayList<Map<String, Transitions>> transmap = new ArrayList<>();
        int i = 0;
       for(String e : testCases) {
           Map<String, Transitions> temp = new HashMap<>();
           temp.put(String.valueOf(i), this.testTheMachine(e));
           transmap.add(temp);
           i++;
       }
        responseBody.setTransitions(transmap);
       return responseBody;
    }
}
