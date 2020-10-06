package com.sdlproject.FiniteAutometaSimulation.supportclasses;
import java.util.Set;

public class RandomString {
    static String getAlphaNumericString(int n, Set<String> alphabets) {

        String AlphaNumericString = "";
        for (String s : alphabets) {
            AlphaNumericString += s;
        }

        StringBuilder sb = new StringBuilder(n);

        for (int i = 0; i < n; i++) {
            int index
                    = (int) (AlphaNumericString.length()
                    * Math.random());
            sb.append(AlphaNumericString
                    .charAt(index));
        }

        return sb.toString();
    }
}