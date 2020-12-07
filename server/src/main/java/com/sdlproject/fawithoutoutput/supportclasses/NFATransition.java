package com.sdlproject.fawithoutoutput.supportclasses;

public class NFATransition {
    public String key;
    public String value;
    public boolean test;

    public NFATransition(String key, String value) {
        this.key = key;
        this.value = value;
        this.test = false;
    }

    public void addValue(String temp) {
        if(this.value.equals("")) {
            this.value = temp;
        } else {
          this.value += "," + temp;
        }
    }

    public boolean isTest() {
        return test;
    }

}
