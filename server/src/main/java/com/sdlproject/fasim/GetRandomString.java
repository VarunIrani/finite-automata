package com.sdlproject.fasim;

import com.sdlproject.fasim.database.model.User;
import com.sdlproject.fasim.database.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;
import java.util.Date;

@CrossOrigin(origins = "*")
@RestController
public class GetRandomString {

    @Autowired
    public UserRepository userRepository;

    @Autowired
    public MongoOperations mongoOperations;

    @GetMapping("/qr")
    public String getRandomString() {
        String token = String.valueOf((new Date()).getTime());
        userRepository.insert(new User(token, null, null));
        return token;
    }

    @DeleteMapping(value = "/qr", params = {"qr"})
    public String getDeleteQr(@Param("qr") String qr) {
        User user = mongoOperations.findOne(query(where("token").is(qr)), User.class, "Users");
        userRepository.delete(user);
        return "Deleted";
    }

}
