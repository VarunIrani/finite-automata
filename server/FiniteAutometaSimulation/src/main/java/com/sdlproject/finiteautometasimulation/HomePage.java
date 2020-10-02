package com.sdlproject.finiteautometasimulation;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomePage {

    @GetMapping("/")
    public String helloMessage() {
        return "Hello World! This is FASIM API Thank you! For visiting";
    }
}
