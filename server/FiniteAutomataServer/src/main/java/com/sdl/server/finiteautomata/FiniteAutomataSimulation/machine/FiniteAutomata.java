package com.sdl.server.finiteautomata.FiniteAutomataSimulation.machine;

import com.sdl.server.finiteautomata.FiniteAutomataSimulation.bodies.EndClass;
import com.sdl.server.finiteautomata.FiniteAutomataSimulation.bodies.GivenState;
import com.sdl.server.finiteautomata.FiniteAutomataSimulation.supportclasses.Transitions;

public interface FiniteAutomata {
    void defineStates();
    EndClass descriptMachine(EndClass responseBody);
    Transitions testTheMachine(String testString);
    EndClass setTestCases(String[]testCases, EndClass responseBody);
    void createStates(int state_count, GivenState[] states);
}
