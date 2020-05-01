import PushNotification from 'react-native-push-notification'
import PushNotificationIOS from "@react-native-community/push-notification-ios";

const initPushNotifications = () => {
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log("initPushNotifications TOKEN:", token);
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
      // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
  })
}

export default initPushNotifications
