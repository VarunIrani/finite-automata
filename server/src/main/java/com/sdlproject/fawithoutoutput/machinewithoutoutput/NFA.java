package com.sdlproject.fawithoutoutput.machinewithoutoutput;

import com.sdlproject.fawithoutoutput.bodies.EndClass;
import com.sdlproject.fawithoutoutput.bodies.GivenState;
import com.sdlproject.fawithoutoutput.states.DeadState;
import com.sdlproject.fawithoutoutput.states.State;
import com.sdlproject.fawithoutoutput.states.TypeOfState;
import com.sdlproject.fawithoutoutput.supportclasses.*;

import java.util.*;

public class NFA implements FiniteAutomata {
    private TypeOfFA type;
    private Alphabet alphabet;
    private ArrayList<String> testCases;
    private ArrayList<State> states;
    private Set<String> stateNames;
    private String nameOfMachine;

    public NFA(Alphabet alphabet, String nameOfMachine) {
        this.type = TypeOfFA.NFA;
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
        this.stateNames.add("$$");
        this.states.add(new DeadState("$$", alphabet));
        this.states.sort((state, t1) -> { return state.getType().getValue() - t1.getType().getValue(); });
    }

    @Override
    public void defineStates() {
        System.out.println("'$$' <- Denotes Dead state in NFA or The do nothing on the input");
        states.forEach(e -> {
            e.createLanguageConstrain(stateNames, this.type);
        });
    }

    @Override
    public EndClass descriptMachine(EndClass responseBody) {
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

    public NFACollections selectStateAtRandom(String test, State statePointer, int pos, int opt, NFACollections transitions) {
        if (pos >= test.length()) {
            transitions.setTest(statePointer.getType().equals(TypeOfState.Final) || statePointer.getType().equals(TypeOfState.InitialFinal));
            return transitions;
        }

        String alpha = "" + test.charAt(pos);
        String options = statePointer.whichState(alpha);
        String[] gotoState = options.split(",");

        if (gotoState.length > 1) {
            while (opt < gotoState.length) {
                statePointer = this.giveMeStateFromName(gotoState[opt]);
                transitions = selectStateAtRandom(test, statePointer, pos + 1, 0, transitions);
                transitions.nfaTransitions[pos].addValue(gotoState[opt]);
                if (transitions.isTest()) {
                    transitions.setTest(true);
                    return transitions;
                }
                opt++;
            }

            transitions.setTest(false);
        } else {
            statePointer = this.giveMeStateFromName(gotoState[0]);
            transitions = selectStateAtRandom(test, statePointer, pos + 1, 0, transitions);
            transitions.setTest(transitions.isTest());
            transitions.nfaTransitions[pos].addValue(gotoState[opt]);
        }
        return transitions;
    }

    @Override
    public Transitions testTheMachine(String testString) {
        Transitions transitions = new Transitions();
        transitions.transition = new ArrayList<>();
        NFACollections nfaCollections = new NFACollections(testString.length());
        for(int i=0; i<testString.length(); i++) {
            nfaCollections.nfaTransitions[i] = new NFATransition("" + testString.charAt(i), "");
        }
        if (StringChecker.isStringIsMadeOfAlphabets(testString, this.alphabet)) {
            State statePointer = this.states.get(0);
            nfaCollections = selectStateAtRandom(testString, statePointer, 0, 0, nfaCollections);
            for(NFATransition x : nfaCollections.nfaTransitions) {
                TreeMap<String, String> temp = new TreeMap<>();
                temp.put(x.key, x.value);
                transitions.transition.add(temp);
            }
            if (nfaCollections.test) {
                transitions.setResult("Accepted");
            } else {
                transitions.setResult("Rejected");
            }
        } else {
            transitions.setResult("The Given String is Not Build by the Given Language The Machine Can't Process Sorry !");
        }
        return transitions;
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
