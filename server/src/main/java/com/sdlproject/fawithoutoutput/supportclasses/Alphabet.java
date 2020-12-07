package com.sdlproject.fawithoutoutput.supportclasses;
import java.util.Set;
import java.util.TreeSet;

public class Alphabet {
    private int size;
    private Set<String> alphabet;

    public Alphabet(int size, String[] alphabetsName) {
        this.size = size;
        this.alphabet = new TreeSet<String>();
        for(String x : alphabetsName) {
            this.alphabet.add(x);
        }
    }

    public void setSize(int size) {
        this.size = size;
    }

    public void setAlphabet(Set<String> alphabet) {
        this.alphabet = alphabet;
    }

    public Set<String> getAlphabet() {
        return alphabet;
    }

    public int getSize() {
        return size;
    }
}
