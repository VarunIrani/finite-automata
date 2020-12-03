package com.sdlproject.FiniteAutometaSimulation.states;
import com.sdlproject.FiniteAutometaSimulation.machinewithoutoutput.TypeOfFA;
import com.sdlproject.FiniteAutometaSimulation.supportclasses.Alphabet;

import java.util.*;

public class State {

    private String name;
    private Alphabet alphabet;
    private Map<String, String> languageConstrain;
    private TypeOfState typeOfState;

    public State() {}

    public State(String name, TypeOfState type, Alphabet alphabet, List<HashMap<String, String>> transitions) {
        this.name = name;
        this.alphabet = alphabet;
        this.typeOfState = type;
        this.languageConstrain = new TreeMap<String, String>();
        for(Map<String, String> x : transitions) {
            for (String key : x.keySet()) {
                this.languageConstrain.put(key, x.get(key));
            }
        }
    }

    public void setAll(String name, TypeOfState type, Alphabet alphabet, List<HashMap<String, String>> transitions) {
        this.name = name;
        this.alphabet = alphabet;
        this.typeOfState = type;
        this.languageConstrain = new TreeMap<String, String>();
        for(Map<String, String> x : transitions) {
            for (String key : x.keySet()) {
                this.languageConstrain.put(key, x.get(key));
            }
        }
    }

    public void createLanguageConstrain(Set<String> stateNames, TypeOfFA typeOfFA) {
        this.languageConstrain = new TreeMap<String, String>();
        // <- Map<String,String> Language_Constarin
        if (typeOfFA.equals(TypeOfFA.DFA)) {
            System.out.println("Now Give The Constarins - ");
        } else {
            System.out.println("You Can Use ',' to Sperate the Multiple State Transition in NFA ");
            System.out.println("Now Give The Constarins - ");
        }

        Scanner scan = new Scanner(System.in);
        this.alphabet.getAlphabet().forEach(e -> {
            boolean continueIt = false;
            do {
                System.out.print("\tFor Input '" + e + "' State '" + this.name + "' Should Go Where (only from '" + stateNames.toString() + "' ) - ");
                String temp = scan.nextLine();
                /* For DFA Doing Something Different */
                if (typeOfFA.equals(TypeOfFA.DFA)) {
                    if (stateNames.contains(temp)) {
                        continueIt = false;
                        this.languageConstrain.put(e, temp);
                    } else {
                        System.out.println("Sorry the state you want to use is out of the range please use in a range!!!");
                        continueIt = true;
                    }
                }  /* For NFA DO Something Different  */ else {
                    boolean pass = true;
                    for (String s : temp.split(",")) {
                        if (stateNames.contains(s)) {
                            pass = true;
                        } else {
                            System.out.println("Sorry the state you want to use is out of the range please use in a range!!! -> '" + s + "' You Cant use this State it is not Defined");
                            pass = false;
                        }
                    }
                    if (pass) {
                        this.languageConstrain.put(e, temp);
                    } else {
                        continueIt = true;
                    }
                }
            } while (continueIt);
        });
    }
    public void createLanguageConstrainDefualt() {
        this.languageConstrain = new TreeMap<String, String>();
        System.out.println("Setting Dead States Langauge Constrains");
        this.alphabet.getAlphabet().forEach(e -> {
            this.languageConstrain.put(e, "$$");
        });
    }
    public String getName() {
        return this.name;
    }
    public String getLanguageCons() {
        return this.languageConstrain.toString();
    }
    public String whichState(String key) {
        return this.languageConstrain.get(key);
    }
    public TypeOfState getType() {
        return this.typeOfState;
    }
    public String getTypeName() {
        return this.typeOfState.name();
    }

}

