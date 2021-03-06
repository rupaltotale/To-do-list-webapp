export function getListColorsFromTheme(theme) {
  if (theme === "D") {
    return {
      Default: "rgb(32, 33, 36)",
      Red: "rgb(92, 43, 41)",
      Orange: "rgb(97, 74, 25)",
      Yellow: "rgb(99, 93, 25)",
      Green: "rgb(52, 89, 32)",
      Teal: "rgb(22, 80, 75)",
      Blue: "rgb(45, 85, 94)",
      Dark_Blue: "rgb(30, 58, 95)",
      Purple: "rgb(66, 39, 94)",
      Pink: "rgb(91, 34, 69)",
      Brown: "rgb(68, 47, 25)",
      Gray: "rgb(60, 63, 67)",
    };
  }
  return {
    Default: "rgb(255, 255, 255)",
    Red: "rgb(242, 139, 130)",
    Orange: "rgb(251, 188, 4)",
    Yellow: "rgb(255, 244, 117)",
    Green: "rgb(204, 255, 144)",
    Teal: "rgb(167, 255, 235)",
    Blue: "rgb(203, 240, 248)",
    Dark_Blue: "rgb(174, 203, 250)",
    Purple: "rgb(215, 174, 251)",
    Pink: "rgb(253, 207, 232)",
    Brown: "rgb(230, 201, 168)",
    Gray: "rgb(232, 234, 237)",
  };
}

export function getBackgroundColorFromTheme(theme) {
  if (theme === "D") {
    return "rgb(32, 33, 36)";
  }
  return "rgb(255,255,255)";
}

export function getPrimaryColorFromTheme(theme) {
  if (theme === "D") {
    return "rgb(232, 234, 237)";
  }
  return "rgb(32, 33, 36)";
}

export function getSecondaryColorFromTheme(theme) {
  if (theme === "D") {
    return "rgb(65, 51, 28)";
  }
  return "rgb(254, 239, 195)";
}

export function getHoveringButtonColorFromTheme(theme) {
  if (theme === "D") {
    return "rgba(154,160,166,0.157)";
  }
  return null;
}

export function getDeleteButtonColorFromTheme(theme) {
  if (theme === "D") {
    return "rgb(176, 29, 12)";
  }
  return "rgb(250, 94, 77)";
}

export function getHoveringColorFromTheme(theme) {
  if (theme === "D") {
    return "rgb(154, 160, 166, 0.039)";
  }
  return "rgb(95, 99, 104, 0.039)";
}

export function getHoverFocusColorFromTheme(theme, hovering, focusing) {
  let themeColor = theme === "D" ? "154, 160, 166" : "95, 99, 104";
  if (hovering) {
    var backgroundColor = focusing
      ? `rgb(${themeColor}, 0.157)`
      : `rgb(${themeColor}, 0.039)`;
  } else if (focusing) {
    var backgroundColor = `rgb(${themeColor}, 0.122)`;
  } else {
    var backgroundColor = getBackgroundColorFromTheme(theme);
  }
  return backgroundColor;
}

export function getElevationColorFromTheme(theme) {
  if (theme === "D") {
    return "rgb(45, 46, 48)";
  }
  return getBackgroundColorFromTheme("L");
}

export function getBorderColorFromTheme(theme) {
  if (theme === "D") {
    return "rgb(95, 99, 104)";
  }
  return "rgb(224, 224, 224)";
}
