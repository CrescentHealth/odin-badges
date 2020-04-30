import * as Haptics from "expo-haptics";
import { Platform, Vibration } from "react-native";
import { Notifications } from "expo";
import moment from "moment";
const IS_IOS = Platform.OS === "ios";

export function touchVibrate(weight) {
  if (IS_IOS) {
    if (weight === "light") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else if (weight === "heavy") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  }
}

export function restartNotification(
  reminder1,
  reminder2,
  reminder3,
  reminder1Time,
  reminder2Time,
  reminder3Time
) {
  Notifications.cancelAllScheduledNotificationsAsync();
  var reminderTimes = {
    1: new Date(reminder1Time),
    2: new Date(reminder2Time),
    3: new Date(reminder3Time),
  };
  var remindersOn = {
    1: reminder1,
    2: reminder2,
    3: reminder3,
  };
  const notification = {
    title: "Please Remind Me",
    body: "Tell me what to do",
    android: {
      channelId: "reminders",
    },
    ios: {
      sound: true,
    },
  };
  for (var reminderNumber in remindersOn) {
    if (remindersOn[reminderNumber]) {
      var date = moment(reminderTimes[reminderNumber]);
      var startDay = diffDays(date, moment());
      for (let i = startDay; i < 21 + startDay; i++) {
        var schedulingOptions = {
          time: new Date(date.add(i, "days")).getTime(),
        };
        Notifications.scheduleLocalNotificationAsync(
          notification,
          schedulingOptions
        );
      }
    }
  }
}
