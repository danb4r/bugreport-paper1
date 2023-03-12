import { useState, useEffect } from "react";
import { useColorScheme } from "react-native";

import { ksGetItem, ksSetItem } from "@src/services/keystorage";

import { setStatusBarStyle, setStatusBarBackgroundColor } from "expo-status-bar";
import { setBackgroundColorAsync, setButtonStyleAsync } from "expo-navigation-bar";

/** Theme imports */
import { EThemeMode } from "@src/helpers/theme";

export function useTheme(onChangeCallback: () => void) {
  /** Light or Dark theme engine */
  const [isThemeDark, setIsThemeDark] = useState(false);
  const [themeMode, setThemeMode] = useState(EThemeMode.Light);
  const [themeColor, setThemeColor] = useState("tomato");

  let colorScheme = useColorScheme();

  /** Apply theme option on:
   dark flag, option enum selector, mobile bar background and buttons colors and style
   and persist option to keystorage */
  const applyThemeMode = (option: EThemeMode | unknown) => {
    if (option == EThemeMode.Dark) {
      setIsThemeDark(true);
      setThemeMode(EThemeMode.Dark);
      setBackgroundColorAsync("#202a31");
      setButtonStyleAsync("light");
      setStatusBarBackgroundColor("#2c3842", true);
      setStatusBarStyle("light");
      ksSetItem("theme.option", EThemeMode.Dark);
    } else if (option == EThemeMode.Light) {
      setIsThemeDark(false);
      setThemeMode(EThemeMode.Light);
      setBackgroundColorAsync("#f2f2f2");
      setButtonStyleAsync("dark");
      setStatusBarBackgroundColor("#ffffff", true);
      setStatusBarStyle("dark");
      ksSetItem("theme.option", EThemeMode.Light);
    } else if (colorScheme?.toString().trim() === "dark") {
      setIsThemeDark(true);
      setThemeMode(EThemeMode.System);
      setBackgroundColorAsync("#202a31");
      setButtonStyleAsync("light");
      setStatusBarBackgroundColor("#2c3842", true);
      setStatusBarStyle("light");
      ksSetItem("theme.option", EThemeMode.System);
    } else {
      setIsThemeDark(false);
      setThemeMode(EThemeMode.System);
      setBackgroundColorAsync("#f2f2f2");
      setButtonStyleAsync("dark");
      setStatusBarBackgroundColor("#ffffff", true);
      setStatusBarStyle("dark");
      ksSetItem("theme.option", EThemeMode.System);
    }
  };

  const applyThemeColor = (color: string) => {
    setThemeColor(color);
    ksSetItem("theme.color", color);
  };

  /** RUNONCE Set theme at startup based on previous choice or environment info */
  useEffect(() => {
    /** Try to retrieve pervious theme.light or dark */
    try {
      ksGetItem("theme.option").then((value: unknown) => {
        if (value != null) applyThemeMode(value);
        else applyThemeMode(EThemeMode.System);
        onChangeCallback();
      });
    } catch (error) {
      applyThemeMode(EThemeMode.System);
      onChangeCallback();
    }
    /** Try to retrieve pervious theme.color */
    try {
      ksGetItem("theme.color").then((value: unknown) => {
        if (value != null) applyThemeColor(value.toString());
        else applyThemeColor("tomato");
        onChangeCallback();
      });
    } catch (error) {
      applyThemeColor("tomato");
      onChangeCallback();
    }
  }, []);

  return [themeMode, applyThemeMode, themeColor, applyThemeColor, isThemeDark] as const;
}
