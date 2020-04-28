import React from "react";
import { View, Platform, Text, TouchableOpacity } from "react-native";
import { NavigationEvents } from "react-navigation";
import { Header, Icon } from "react-native-elements";
import { ManageThemeContext } from "../../styles/themeManager";
import * as Font from "expo-font";
import styles from "../../styles/components";
import { fonts } from "../../styles/index";
import { _setDarkMode, _getSettings, _startupRoutine } from "./api";
import NotificationPermissions from "./components/NotificationPermissions";
import Modal from "react-native-modal";
import { touchVibrate } from "../../utils"; // haptic feedback only for iOS
import DayProgress from "./components/DayProgress";

const IS_IOS = Platform.OS === "ios";

export default class Main extends React.Component {
  static contextType = ManageThemeContext;
  constructor(props) {
    super(props);
    this.state = {
      isNewUser: true,
      promptNotificationPermissions: false,
      settings: null,
    };
    this.dismissNotificationPrompt = this.dismissNotificationPrompt.bind(this); // prompt iOS users to allow notifications through pop-up modal
  }

  async componentDidMount() {
    await Font.loadAsync({
      Avenir: require("./../../../assets/Avenir.otf"),
    });
    this.onGetSettings();
    this.onStartupRoutine();
  }

  onStartupRoutine() {
    _startupRoutine(IS_IOS);
  }

  onSetDarkMode() {
    _setDarkMode();
  }

  onGetSettings() {
    const _this = this;
    _getSettings(IS_IOS, function (isNewUser, settings) {
      if (settings) {
        _this.setState({
          isNewUser,
          settings,
          promptNotificationPermissions: IS_IOS && isNewUser ? true : false,
        });
      }
    });
  }

  dismissNotificationPrompt() {
    this.setState({ isNewUser: false, promptNotificationPermissions: false });
  }
  onWillFocus = () => {};

  render() {
    const { mode, theme, toggle } = this.context; // refer to theme manager under ../../styles.themeManager
    return (
      <View
        style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      >
        <NavigationEvents onWillFocus={this.onWillFocus}></NavigationEvents>
        <Header
          statusBarProps={{
            barStyle: mode === "light" ? "dark-content" : "light-content",
            backgroundColor: theme.backgroundColor,
            translucent: true,
          }}
          containerStyle={[
            styles.containerStyle,
            {
              backgroundColor: theme.backgroundColor,
              borderBottomColor: "transparent",
              // height: 100,
            },
          ]}
        />
        <View
          style={[
            styles.containerStyle,
            {
              backgroundColor: theme.backgroundColor,
            },
          ]}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: fonts.fontFamily,
              fontSize: fonts.FONT_SIZE_MEDIUM,
              color: theme.headingTextColor,
            }}
          >
            Mode: {mode}
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.onSetDarkMode();
              touchVibrate("light");
              toggle();
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: fonts.fontFamily,
                fontSize: fonts.FONT_SIZE_LARGE,
                color: theme.headingTextColor,
              }}
            >
              Click me to toggle
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.containerStyle, { flex: 3 }]}>
          <DayProgress theme={theme}></DayProgress>
        </View>
        <Modal
          isVisible={this.state.promptNotificationPermissions}
          opacity={1}
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}
          animationInTiming={1500}
          animationOutTiming={1500}
        >
          <NotificationPermissions
            theme={theme}
            dismissNotificationPrompt={this.dismissNotificationPrompt}
          />
        </Modal>
      </View>
    );
  }
}
