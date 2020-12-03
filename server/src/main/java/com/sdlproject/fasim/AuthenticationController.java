package com.sdlproject.fasim;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {

    @GetMapping("/qr")
    public String getQr() {
        return String.valueOf(System.currentTimeMillis());
    }

    @PostMapping("/set-user")
    public String authMethod() {
        return "Successful";
    }

    @GetMapping("has-user")
    public Object hasUserMethod() {
        return "Pass";
    }

}
