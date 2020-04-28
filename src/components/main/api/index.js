import { AsyncStorage } from "react-native";
import moment from "moment";
import { restartNotification } from "../../../utils";

export async function _setDarkMode(darkMode) {
  try {
    const settings = JSON.parse(await AsyncStorage.getItem("settings"));
    if (settings) {
      settings["darkMode"] = darkMode;
      await AsyncStorage.setItem("settings", JSON.stringify(settings));
    }
  } catch (error) {
    // console.log("error:", error);
  }
}

export async function _getSettings(IS_IOS, callback) {
  try {
    const settings = JSON.parse(await AsyncStorage.getItem("settings"));
    if (!settings) {
      const _settings = {
        darkMode: false,
        militaryTime: false, // 24 hr format or 12 hr format
        reminder1: true,
        reminder2: false,
        reminder3: false,
        reminder1Time: new Date(new Date().setHours(11, 0, 0, 0)).getTime(),
        reminder2Time: new Date(new Date().setHours(17, 0, 0, 0)).getTime(),
        reminder3Time: new Date(new Date().setHours(22, 0, 0, 0)).getTime(),
      };
      await AsyncStorage.setItem("settings", JSON.stringify(_settings));
      callback(true, _settings);
    } else {
      callback(false, settings);
    }
  } catch (error) {
    // console.log("error:", error);
  }
}

export async function _startupRoutine(IS_IOS) {
  try {
    // create notification channels
    if (!IS_IOS) {
      Notifications.createChannelAndroidAsync("important-updates", {
        name: "Important Updates",
        sound: true,
        priority: "max",
        vibrate: [0, 250, 250, 250],
      });
      Notifications.createChannelAndroidAsync("reminders", {
        name: "Reminders",
        sound: true,
        priority: "max",
        vibrate: [0, 250, 250, 250],
      });
    }
    // get store user's usage to prompt app store review etc..
    const usage = JSON.parse(await AsyncStorage.getItem("usage"));
    if (!usage) {
      const _usage = {
        activeDays: 0,
        lastActiveDay: moment().format("YYYY-MM-DD"),
        openCount: 0,
        sessionStarted: 0,
        sessionCompleted: 0,
      };
      await AsyncStorage.setItem("usage", JSON.stringify(_usage));
    } else {
      if (usage["lastActiveDay"] !== moment().format("YYYY-MM-DD")) {
        usage["lastActiveDay"] = moment().format("YYYY-MM-DD");
        usage["activeDays"] = usage["activeDays"] + 1;
      }
      usage["openCount"] = usage["openCount"] + 1;
      await AsyncStorage.setItem("usage", JSON.stringify(usage));
    }
    // to restart local notifications
    const settings = JSON.parse(await AsyncStorage.getItem("settings"));
    if (settings) {
      const {
        reminder1,
        reminder2,
        reminder3,
        reminder1Time,
        reminder2Time,
        reminder3Time,
      } = settings;
      restartNotification(
        reminder1,
        reminder2,
        reminder3,
        reminder1Time,
        reminder2Time,
        reminder3Time
      );
    }
  } catch (error) {
    //   console.log('error:', error)
  }
}
