package com.sdlproject.fawithoutoutput.supportclasses;

public class StringChecker {
    public static boolean isStringIsMadeOfAlphabets(String text, Alphabet alphabet) {
        boolean isStringContainsAlphabets = true;

        for (int i = 0; i < text.length(); i++) {
            String check = "" + text.charAt(i);
            if (!alphabet.getAlphabet().contains(check)) {
                isStringContainsAlphabets = false;
            }
        }
        return isStringContainsAlphabets;
    }
}
