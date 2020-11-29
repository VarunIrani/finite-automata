package com.sdlproject.fasim;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "*")
@RestController
public class HomePage {

    @CrossOrigin
    @GetMapping("/")
    public String helloMessage() {
        return "Hello World! This is FASIM API Thank you! For visiting";
    }
}
