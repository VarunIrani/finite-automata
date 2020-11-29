package com.sdlproject.fasim;

import com.sdlproject.FiniteAutometaSimulation.supportclasses.RandomString;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
public class GetRandomString {
    @GetMapping("/getstring")
    public String getRandomString() {
        return RandomString.getAlphaNumericString() + "&:" + (new Date()).getTime();
    }
}
