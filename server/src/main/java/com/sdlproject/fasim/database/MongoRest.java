package com.sdlproject.fasim.database;

import com.sdlproject.fasim.database.model.RetUser;
import com.sdlproject.fasim.database.model.User;
import com.sdlproject.fasim.database.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@RestController
public class MongoRest {
    @Autowired
    public UserRepository userRepository;

    @Autowired
    public MongoOperations mongoOperations;

    @PostMapping(value = "/set-user")
    @ResponseBody
    public Object checkingUser(@RequestBody User user) {
        mongoOperations.updateFirst(query(where("token").is(user.getToken())), Update.update("user", user.getUser()),"Users");
        mongoOperations.updateFirst(query(where("token").is(user.getToken())), Update.update("email", user.getEmail()),"Users");
        return "Done";
    }

    @GetMapping("/auth")
    public List<User> authYes() {
        return userRepository.findAll();
    }

    @GetMapping(value = "/has-user", params = "qr")
    public RetUser hasUser(@Param("qr") String qr) {
        RetUser retUser = new RetUser();
        User user = mongoOperations.findOne(query(where("token").is(qr)), User.class, "Users");
        System.out.println(user);
        if(user == null) {
            retUser.setStatus("No");
            retUser.setName("");
            retUser.setEmail("");
        } else {
            retUser.setStatus("Yes");
            retUser.setName(user.getUser());
            retUser.setEmail(user.getEmail());
            userRepository.delete(user);
        }
        return retUser;
    }
}
