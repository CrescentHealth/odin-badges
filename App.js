import React from "react";
import { TextInput, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { AppearanceProvider } from "react-native-appearance";
import { createStackNavigator } from "react-navigation-stack";
import Main from "./src/components/main";
import { ThemeManager } from "./src/styles/themeManager";
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = Text.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

export default () => {
  const App = createAppContainer(
    createStackNavigator(
      {
        Main: {
          screen: Main,
          navigationOptions: {
            headerShown: false,
          },
        },
      },
      {
        initialRouteName: "Main",
      }
    )
  );
  return (
    <AppearanceProvider>
      <ThemeManager>
        <App />
      </ThemeManager>
    </AppearanceProvider>
  );
};

// export default () => {
//   return (
//     <AppearanceProvider>
//       <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
//         <Stack.Navigator initialRouteName="Main">
//           <Stack.Screen name="Main" component={<Main />} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </AppearanceProvider>
//   );
// };
