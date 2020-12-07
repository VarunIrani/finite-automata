package com.sdlproject.fasim.database.model;

public class RetUser {

    public String status;
    public String name;
    public String email;

    public RetUser() {
    }

    public RetUser(String status, String name, String email) {
        this.status = status;
        this.name = name;
        this.email = email;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
