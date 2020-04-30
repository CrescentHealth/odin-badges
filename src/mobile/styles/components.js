import { fonts, themedColors } from "./";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: themedColors.light.backgroundColor,
    flex: 1,
  },
  containerStyle: {
    backgroundColor: themedColors.light.backgroundColor,
    justifyContent: "space-around",
  },
  headingText: {
    fontSize: fonts.FONT_SIZE_XXLARGE,
    fontWeight: fonts.FONT_WEIGHT_HEAVY,
    fontFamily: fonts.FONT_FAMILY_LARGE,
  },
  secondaryHeadingText: {
    fontSize: fonts.FONT_SIZE_LARGE,
    fontWeight: fonts.FONT_WEIGHT_HEAVY,
    fontFamily: fonts.FONT_FAMILY_LARGE,
  },
  bodyText: {
    fontSize: fonts.FONT_SIZE_MEDIUM,
    fontWeight: fonts.FONT_WEIGHT_MEDIUM,
    fontFamily: fonts.FONT_FAMILY_LARGE,
  },
  largeButton: {
    borderRadius: 4,
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  largeButtonText: {
    fontSize: fonts.FONT_SIZE_LARGE,
    fontWeight: fonts.FONT_WEIGHT_HEAVY,
    fontFamily: fonts.FONT_FAMILY_LARGE,
    textAlign: "center",
  },
  mediumButtonText: {
    fontSize: fonts.FONT_SIZE_MEDIUM,
    fontFamily: fonts.FONT_FAMILY_LARGE,
    textAlign: "center",
  },
  smallButtonText: {
    fontSize: fonts.FONT_SIZE_SMALL,
    fontFamily: fonts.FONT_FAMILY_LARGE,
    textAlign: "center",
  },
});
