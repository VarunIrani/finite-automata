package com.sdlproject.fasim;
import com.sdlproject.fasim.database.model.User;
import com.sdlproject.fasim.database.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@CrossOrigin(origins = "*")
@RestController
public class GetRandomString {

    @Autowired
    public UserRepository userRepository;

    @GetMapping("/qr")
    public String getRandomString() {
        String token = String.valueOf((new Date()).getTime());
        userRepository.insert(new User(token, null, null));
        return token;
    }
}
