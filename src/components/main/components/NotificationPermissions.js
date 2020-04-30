import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import { fonts } from "../../../styles/index";
import { touchVibrate } from "../../../utils";

export default class NotificationPermissions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async getNotificationAsync() {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status === "granted") {
      return this.props.dismissNotificationPrompt();
    } else {
      Alert.alert("Notification permission not granted");
      return this.props.dismissNotificationPrompt();
    }
  }

  render() {
    const theme = this.props.theme;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}
      >
        <View
          style={{
            height: 340,
            width: 280,
            borderRadius: 20,
            backgroundColor: theme.backgroundColor,
            justifyContent: "flex-start",
            alignItems: "center",
            paddingHorizontal: 30,
            paddingVertical: 30,
          }}
        >
          <Text
            style={{
              fontSize: fonts.FONT_SIZE_XLARGE,
              fontWeight: fonts.FONT_WEIGHT_MEDIUM,
              color: theme.headingTextColor,
              textAlign: "center",
              fontFamily: fonts.FONT_FAMILY,
            }}
          >
            Be Able To Set Reminders
          </Text>
          <Text
            style={{
              paddingTop: 10,
              paddingBottom: 25,
              fontSize: fonts.FONT_SIZE_LARGE,
              fontWeight: fonts.FONT_WEIGHT_LIGHT,
              color: theme.headingTextColor,
              textAlign: "center",
              fontFamily: fonts.FONT_FAMILY,
            }}
          >
            Enable notifications to set reminders to get some sun.
          </Text>
          <TouchableOpacity
            onPress={() => {
              touchVibrate("light");
              this.getNotificationAsync();
            }}
            style={{
              background: theme.backgroundColor,
              width: 220,
              height: 50,
              borderRadius: 30,
              borderWidth: 1.2,
              borderColor: theme.headingTextColor,
            }}
          >
            <Text
              style={{
                paddingTop: 10,
                fontSize: fonts.FONT_SIZE_LARGE,
                fontWeight: fonts.FONT_WEIGHT_LIGHT,
                color: theme.headingTextColor,
                textAlign: "center",
                fontFamily: fonts.FONT_FAMILY,
              }}
            >
              Enable Notifications
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              touchVibrate("light");
              this.props.dismissNotificationPrompt();
            }}
          >
            <Text
              style={{
                paddingTop: 20,
                fontSize: fonts.FONT_SIZE_MEDIUM,
                fontWeight: fonts.FONT_WEIGHT_LIGHT,
                color: theme.headingTextColor,
                textAlign: "center",
              }}
            >
              Don't Need Reminders
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
