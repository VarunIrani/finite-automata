package com.sdlproject.fawithoutput;

import com.sdlproject.fawithoutput.common.InputSymbol;
import com.sdlproject.fawithoutput.common.OutputSymbol;

import java.util.ArrayList;

public abstract class FAWithOutput {
  protected int numStates;
  public static ArrayList<InputSymbol> INPUT_SYMBOLS = new ArrayList<com.sdlproject.fawithoutput.common.InputSymbol>();
  public static ArrayList<OutputSymbol> OUTPUT_SYMBOLS = new ArrayList<com.sdlproject.fawithoutput.common.OutputSymbol>();
  protected static boolean initialSet = false;
}
