package com.sdlproject.fawithoutput.common;
import com.sdlproject.fawithoutput.FAWithOutput;

public class OutputSymbol {
  public String value;

  public OutputSymbol(String value) {
    this.value = value;
  }

  public boolean inOutputAlphabet() {
    for (OutputSymbol o : FAWithOutput.OUTPUT_SYMBOLS) {
      if (o.getValue().equals(this.value))
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
