package com.sdlproject.fasim;

import com.sdlproject.fawithoutoutput.bodies.EndClass;
import com.sdlproject.fawithoutoutput.bodies.EntryClass;
import com.sdlproject.fawithoutoutput.machinewithoutoutput.DFA;
import com.sdlproject.fawithoutoutput.machinewithoutoutput.FiniteAutomata;
import com.sdlproject.fawithoutoutput.machinewithoutoutput.NFA;
import com.sdlproject.fawithoutoutput.machinewithoutoutput.TypeOfFA;
import com.sdlproject.fawithoutoutput.supportclasses.Alphabet;
import com.sdlproject.fawithoutput.bodies.MooreEntryClass;
import com.sdlproject.fawithoutput.bodies.WOpEndClass;
import com.sdlproject.fawithoutput.bodies.MealyEntryClass;
import com.sdlproject.fawithoutput.common.WOpTransitions;
import com.sdlproject.fawithoutput.mealy.MealyMachine;
import com.sdlproject.fawithoutput.moore.MooreMachine;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin(origins = "*")
@RestController
public class FiniteRESTController {
    @PostMapping(value = "/diagram", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public EndClass getStates(@RequestBody EntryClass body) {
        EndClass responseBody = new EndClass();
        String nameOfMachine = body.getMachine_name(); // <- String Machine_Name
        TypeOfFA type = body.getMachine_type(); // <- Type of FA
        Alphabet alphabet = new Alphabet(body.getAlphabet_count(), body.getAlphabets()); // <- Alphabets are created
        FiniteAutomata myMachine = type.equals(TypeOfFA.DFA) ? new DFA(alphabet, nameOfMachine) : new NFA(alphabet, nameOfMachine); // <- FA is Created
        myMachine.createStates(body.getState_count(), body.getStates()); // <- Create the States
        responseBody = myMachine.descriptMachine(responseBody);
        responseBody.setAlphabets(body.getAlphabets());
        responseBody.setTest_strings(body.getTest_strings());
        responseBody = myMachine.setTestCases(body.getTest_strings(), responseBody);
        return responseBody;
    }


    @PostMapping(value = "/mealy-diagram", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public WOpEndClass getMealyMachine(@RequestBody MealyEntryClass body) {
        WOpEndClass responseBody = new WOpEndClass();
        responseBody.setMachine_name(body.machine_name);
        responseBody.setMachine_type(body.machine_type);
        responseBody.setInput_alpha_count(body.input_alpha_count);
        responseBody.setInput_alpha(body.input_alpha);
        responseBody.setOutput_alpha_count(body.output_alpha_count);
        responseBody.setOutput_alpha(body.output_alpha);
        responseBody.setState_count(body.state_count);
        responseBody.setTest_strings(body.test_strings);
        MealyMachine mealyMachine = new MealyMachine(body.states);
        responseBody.setTransitions(mealyMachine.evaluateTestStrings(body.test_strings));
        return responseBody;
    }


    @PostMapping(value = "/moore-diagram", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public WOpEndClass getMooreMachine(@RequestBody MooreEntryClass body) {
        WOpEndClass responseBody = new WOpEndClass();
        responseBody.setMachine_name(body.machine_name);
        responseBody.setMachine_type(body.machine_type);
        responseBody.setInput_alpha_count(body.input_alpha_count);
        responseBody.setInput_alpha(body.input_alpha);
        responseBody.setOutput_alpha_count(body.output_alpha_count);
        responseBody.setOutput_alpha(body.output_alpha);
        responseBody.setState_count(body.state_count);
        responseBody.setTest_strings(body.test_strings);
        MooreMachine mooreMachine = new MooreMachine(body.states);
        responseBody.setTransitions(mooreMachine.evaluateTestStrings(body.test_strings));
        return responseBody;
    }
}
