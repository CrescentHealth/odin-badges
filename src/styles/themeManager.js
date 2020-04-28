import React from "react";
import { Appearance } from "react-native-appearance";
import { themedColors } from "./index";
import { AsyncStorage } from "react-native";
// set default colour scheme from OS
const osTheme = Appearance.getColorScheme();

// initiate context
export const ManageThemeContext = React.createContext({
  mode: osTheme,
  theme: themedColors[osTheme],
  toggle: () => {},
});

// define useTheme hook for functional components
export const useTheme = () => React.useContext(ManageThemeContext);

// initiate context provider
export class ThemeManager extends React.Component {
  state = {
    mode: osTheme,
  };

  _getMode = async () => {
    try {
      const settings = JSON.parse(await AsyncStorage.getItem("settings"));
      if (settings) {
        return settings["darkMode"];
      } else {
        return false;
      }
    } catch (error) {}
  };

  async componentDidMount() {
    const mode = (await this._getMode()) ? "dark" : "light";
    this.setState({ mode });
  }

  toggleTheme = async () => {
    this.state.mode === "light"
      ? this.setState({
          mode: "dark",
        })
      : this.setState({
          mode: "light",
        });
  };

  render() {
    return (
      <ManageThemeContext.Provider
        value={{
          mode: this.state.mode,
          theme: themedColors[this.state.mode],
          toggle: this.toggleTheme,
        }}
      >
        {this.props.children}
      </ManageThemeContext.Provider>
    );
  }
}

export default ThemeManager;
