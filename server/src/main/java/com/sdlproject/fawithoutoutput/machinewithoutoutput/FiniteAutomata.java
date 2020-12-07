package com.sdlproject.fawithoutoutput.machinewithoutoutput;

import com.sdlproject.fawithoutoutput.bodies.EndClass;
import com.sdlproject.fawithoutoutput.bodies.GivenState;
import com.sdlproject.fawithoutoutput.supportclasses.Transitions;

public interface FiniteAutomata {
    void defineStates();
    EndClass descriptMachine(EndClass responseBody);
    Transitions testTheMachine(String testString);
    EndClass setTestCases(String[]testCases, EndClass responseBody);
    void createStates(int state_count, GivenState[] states);
}
