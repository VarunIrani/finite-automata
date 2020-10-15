package com.sdl.server.finiteautomata.FiniteAutomataSimulation;
import com.sdl.server.finiteautomata.FiniteAutomataSimulation.bodies.EndClass;
import com.sdl.server.finiteautomata.FiniteAutomataSimulation.bodies.EntryClass;
import com.sdl.server.finiteautomata.FiniteAutomataSimulation.machine.DFA;
import com.sdl.server.finiteautomata.FiniteAutomataSimulation.machine.FiniteAutomata;
import com.sdl.server.finiteautomata.FiniteAutomataSimulation.machine.NFA;
import com.sdl.server.finiteautomata.FiniteAutomataSimulation.machine.TypeOfFA;
import com.sdl.server.finiteautomata.FiniteAutomataSimulation.supportclasses.Alphabet;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

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
}
