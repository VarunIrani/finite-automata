package com.sdlproject.fawithoutput.common;
import com.sdlproject.fawithoutput.FAWithOutput;
public class InputSymbol {
  public String value;

  public InputSymbol(String value) {
    this.value = value;
  }

  public boolean inInputAlphabet() {
    for (InputSymbol i : FAWithOutput.INPUT_SYMBOLS) {
      if (i.getValue().equals(this.value))
        return true;
    }
    return false;
  }
  public String getValue() {
    return value;
  }
  public String toString() {
    return this.value;
  }
}
