package com.sdlproject.fasim.database.respository;

import com.sdlproject.fasim.database.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}
