package com.sdl.server.finiteautomata.FiniteAutomataSimulation.machine;

import com.sdl.server.finiteautomata.FiniteAutomataSimulation.bodies.EndClass;
import com.sdl.server.finiteautomata.FiniteAutomataSimulation.bodies.GivenState;
import com.sdl.server.finiteautomata.FiniteAutomataSimulation.states.DeadState;
import com.sdl.server.finiteautomata.FiniteAutomataSimulation.states.State;
import com.sdl.server.finiteautomata.FiniteAutomataSimulation.states.TypeOfState;
import com.sdl.server.finiteautomata.FiniteAutomataSimulation.supportclasses.Alphabet;
import com.sdl.server.finiteautomata.FiniteAutomataSimulation.supportclasses.StringChecker;
import com.sdl.server.finiteautomata.FiniteAutomataSimulation.supportclasses.Transitions;

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

//    public void createStates(Set<String> stateNames) {
//        this.stateNames = stateNames;
//        Scanner scan = new Scanner(System.in);
//        ArrayList<State> states = new ArrayList<State>();
//        boolean initisDone = false;
//        for (String name : stateNames) {
//            boolean continueIt;
//            do {
//                continueIt = false;
//                if (!initisDone) {
//                    System.out.print("'" + name + "' this state is which state - (Initial: 0, Transitional: 1, Final: 2) - ");
//                } else {
//                    System.out.print("'" + name + "' this state is which state - (Transitional: 1, Final: 2) - ");
//                }
//                int type = scan.nextInt();
//                if (type == 0 && !initisDone) {
//                    states.add(new InitialState(name, alphabet));
//                    initisDone = true;
//                } else if (type == 0 & initisDone) {
//                    System.out.println("Sorry Only on initial State is permitted ");
//                    continueIt = true;
//                } else if (type == 1) {
//                    states.add(new TransitionState(name, alphabet));
//                } else if (type == 2) {
//                    states.add(new FinalState(name, alphabet));
//                } else {
//                    System.out.println("Sorry this is not in List Please type again ");
//                    continueIt = true;
//                }
//            } while (continueIt);
//        }
//        this.stateNames.add("$$");
//        states.add(new DeadState("$$", alphabet));
//        states.sort((state, t1) -> {
//            return state.getType().getValue() - t1.getType().getValue();
//        });
//        this.states = states;
//    }
    @Override
    public void defineStates() {
        System.out.println("'$$' <- Denotes Dead state in NFA or The do nothing on the input");
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

    public Transitions selectStateAtRandom(String test, State statePointer, int pos, int opt, Transitions transitions) {
        if (pos >= test.length()) {
            if (statePointer.getType().equals(TypeOfState.Final)) {
                transitions.setTest(true);
                return transitions;
            } else {
                transitions.setTest(false);
                return transitions;
            }
        }

        for (; pos < test.length(); pos++) {
            String alpha = "" + test.charAt(pos);
            String options = statePointer.whichState(alpha);
            String[] gotoState = options.split(",");

            if (gotoState.length > 1) {
                while (opt < gotoState.length) {
                    statePointer = this.giveMeStateFromName(gotoState[opt]);
                    transitions = selectStateAtRandom(test, statePointer, pos + 1, 0, transitions);
                    if (transitions.isTest()) {
                        TreeMap<String, String> temp = new TreeMap<>();
                        temp.put(alpha, gotoState[opt]);
                        transitions.transition.add(temp);
                        transitions.setTest(true);
                        return transitions;
                    }

                    opt++;
                }
            } else {
                statePointer = this.giveMeStateFromName(gotoState[0]);
                transitions = selectStateAtRandom(test, statePointer, pos + 1, 0, transitions);
                if (transitions.isTest()) {
                    TreeMap<String, String> temp = new TreeMap<>();
                    temp.put(alpha, gotoState[0]);
                    transitions.transition.add(temp);
                    transitions.setTest(true);
                    return transitions;
                } else {
                    TreeMap<String, String> temp = new TreeMap<>();
                    temp.put(alpha, gotoState[0]);
                    transitions.transition.add(temp);
                    transitions.setTest(false);
                    return transitions;
                }
            }
        }

        transitions.setTest(false);
        return transitions;
    }

    @Override
    public Transitions testTheMachine(String testString) {
        Transitions transitions = new Transitions();
        transitions.transition =new ArrayList<TreeMap<String, String>>();
        if (StringChecker.isStringIsMadeOfAlphabets(testString, this.alphabet)) {
            State statePointer = this.states.get(0);
            transitions = selectStateAtRandom(testString, statePointer, 0, 0, transitions);
            if (transitions.isTest()) {
                transitions.setResult("Accepted");
                return transitions;
            } else {
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
