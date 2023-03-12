/** Theme from React Navigation */
import { DefaultTheme as NavLightTheme, DarkTheme as NavDarkTheme } from "@react-navigation/native";

/** Theme from Rect Native Paper */
import { DefaultTheme as PaperLightTheme, MD3DarkTheme as PaperDarkTheme } from "react-native-paper";

/** Merging Navigation and Paper themes */
import merge from "deepmerge";
const comboLightTheme = merge(PaperLightTheme, NavLightTheme);
const comboDarkTheme = merge(PaperDarkTheme, NavDarkTheme);

/** Fixes for original LIGHT colors */
comboLightTheme.colors.primary = "#ffffff";

/** Fixes for original DARK colors */
comboDarkTheme.colors.primary = "#3f545e";
comboDarkTheme.colors.card = "#2c3842";
comboDarkTheme.colors.background = "#202a31";
comboDarkTheme.colors.surface = "#202a31";

// DEBUG
// console.log("NAV ORIGINAL LIGHT COLORS: ", NavLightTheme.colors);
// console.log("NAV ORIGINAL DARK COLORS: ", NavDarkTheme.colors);
// console.log("PAPER ORIGINAL LIGHT COLORS: ", PaperLightTheme.colors);
// console.log("PAPER ORIGINAL DARK COLORS: ", PaperDarkTheme.colors);
// console.log("COMBO LIGHT COLORS: ", comboLightTheme.colors);
// console.log("COMBO DARK COLORS: ", comboDarkTheme.colors);

/** Add fixed colors */
const palette = {
  colors: {
    palette_tomato: "tomato",
    palette_green: "#1d864b",
    palette_blue: "dodgerblue",
    palette_papaya: "orange",
    palette_salmon: "pink",
    palette_pink: "fuchsia",
    palette_cyan: "lightseagreen",
    palette_slate: "slategray",
  },
};

const lightSpecifics = {
  colors: {
    theme_text_faded: "#848485",
    background2: "#dfdfdf",
  },
};
const darkSpecifics = {
  colors: {
    theme_text_faded: "#bfc0c3",
    background2: "#263238",
  },
};

const comboLightPalette = merge(comboLightTheme, palette);
const comboLight = merge(comboLightPalette, lightSpecifics);

const comboDarkPalette = merge(comboDarkTheme, palette);
const comboDark = merge(comboDarkPalette, darkSpecifics);

/** Merge to get final theme versions for light and dark */
const tomatoLight = merge(comboLight, {
  colors: {
    theme_main: palette.colors.palette_tomato,
  },
});
const tomatoDark = merge(comboDark, {
  colors: {
    theme_main: palette.colors.palette_tomato,
  },
});

const greenLight = merge(comboLight, {
  colors: {
    theme_main: palette.colors.palette_green,
  },
});
const greenDark = merge(comboDark, {
  colors: {
    theme_main: palette.colors.palette_green,
  },
});

const blueLight = merge(comboLight, {
  colors: {
    theme_main: palette.colors.palette_blue,
  },
});
const blueDark = merge(comboDark, {
  colors: {
    theme_main: palette.colors.palette_blue,
  },
});

const papayaLight = merge(comboLight, {
  colors: {
    theme_main: palette.colors.palette_papaya,
  },
});
const papayaDark = merge(comboDark, {
  colors: {
    theme_main: palette.colors.palette_papaya,
  },
});

const salmonLight = merge(comboLight, {
  colors: {
    theme_main: palette.colors.palette_salmon,
  },
});
const salmonDark = merge(comboDark, {
  colors: {
    theme_main: palette.colors.palette_salmon,
  },
});

const pinkLight = merge(comboLight, {
  colors: {
    theme_main: palette.colors.palette_pink,
  },
});
const pinkDark = merge(comboDark, {
  colors: {
    theme_main: palette.colors.palette_pink,
  },
});

const cyanLight = merge(comboLight, {
  colors: {
    theme_main: palette.colors.palette_cyan,
  },
});
const cyanDark = merge(comboDark, {
  colors: {
    theme_main: palette.colors.palette_cyan,
  },
});

const slateLight = merge(comboLight, {
  colors: {
    theme_main: palette.colors.palette_slate,
  },
});
const slateDark = merge(comboDark, {
  colors: {
    theme_main: palette.colors.palette_slate,
  },
});

var currentTheme = tomatoLight;

const getTheme = (themeColor: string, themeDark: boolean) => {
  switch (themeColor) {
    case "tomato":
      currentTheme = themeDark ? tomatoDark : tomatoLight;
      break;
    case "green":
      currentTheme = themeDark ? greenDark : greenLight;
      break;
    case "blue":
      currentTheme = themeDark ? blueDark : blueLight;
      break;
    case "papaya":
      currentTheme = themeDark ? papayaDark : papayaLight;
      break;
    case "salmon":
      currentTheme = themeDark ? salmonDark : salmonLight;
      break;
    case "pink":
      currentTheme = themeDark ? pinkDark : pinkLight;
      break;
    case "cyan":
      currentTheme = themeDark ? cyanDark : cyanLight;
      break;
    case "slate":
      currentTheme = themeDark ? slateDark : slateLight;
      break;
    default:
      currentTheme = themeDark ? tomatoDark : tomatoLight;
      break;
  }
  return currentTheme;
};

enum EThemeMode {
  Dark = "dark",
  Light = "light",
  System = "system",
}

export { getTheme, currentTheme as th, EThemeMode };
