import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size) =>
  Math.round((width / guidelineBaseWidth) * size * 10) / 10;
// const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  Math.round((size + (scale(size) - size) * factor) * 10) / 10;

// const scale = size => size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
// const moderateScale = (size, factor = 0.5) => size;

export { scale, verticalScale, moderateScale };

const palette = {
  blackColor: "#5B5B5B",
  altBlackColor: "#2E2E2E",
  whiteColor: "#fff",
  altWhiteColor: "#F5F6CE",
  grayColor: "#acacac",
  backgroundColor: "#fff",
  primaryColor: "#f87077",
  secondaryColor: "#A4A4A4",
  lightBlueColor: "#C0D6FE",
  iconColor: "#2E2E2E",
  iconColor2: "#5D5D5D",
  bubbleSecondaryColor: "#E4E2E2",
  disabledButton: "#D8D8D8",
};

export const colors = {
  ...palette,
  backgroundColor: palette.backgroundColor,
  paragraphTextColor: palette.blackColor,
  nameTextColor: palette.blackColor,
  tagTextColor: palette.blackColor,
  headingTextColor: palette.blackColor,
  playButtonBackground: palette.whiteColor,
  playButtonOutline: palette.blackColor,
  primaryButtonTextColor: palette.whiteColor,
};

export const themedColors = {
  "no-preference": {
    ...colors,
  },
  light: {
    ...colors,
  },
  dark: {
    ...colors,
    iconColor: "white",
    iconColor2: "white",
    backgroundColor: palette.altBlackColor,
    headingTextColor: palette.altWhiteColor,
    paragraphTextColor: palette.altWhiteColor,
    nameTextColor: palette.altWhiteColor,
    tagTextColor: palette.altWhiteColor,
  },
};

export const fonts = {
  FONT_FAMILY: "Avenir",
  FONT_SIZE_SMALL: moderateScale(12),
  FONT_SIZE_MEDIUM: moderateScale(16),
  FONT_SIZE_LARGE: moderateScale(20),
  FONT_SIZE_XLARGE: moderateScale(25),
  FONT_SIZE_XXLARGE: moderateScale(29),
  FONT_SIZE_XXXLARGE: moderateScale(40),
  FONT_WEIGHT_XLIGHT: "200",
  FONT_WEIGHT_LIGHT: "300",
  FONT_WEIGHT_MEDIUM: "600",
  FONT_WEIGHT_HEAVY: "800",
};
