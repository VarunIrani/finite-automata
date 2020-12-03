package com.sdlproject.FiniteAutometaSimulation.machinewithoutoutput;

import com.sdlproject.FiniteAutometaSimulation.bodies.EndClass;
import com.sdlproject.FiniteAutometaSimulation.bodies.GivenState;
import com.sdlproject.FiniteAutometaSimulation.supportclasses.Transitions;

public interface FiniteAutomata {
    void defineStates();
    EndClass descriptMachine(EndClass responseBody);
    Transitions testTheMachine(String testString);
    EndClass setTestCases(String[]testCases, EndClass responseBody);
    void createStates(int state_count, GivenState[] states);
}
