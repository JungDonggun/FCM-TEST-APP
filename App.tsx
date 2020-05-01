import React from 'react'
import { Button, SafeAreaView, Text, View } from "react-native"
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import initPushNotifications from "./src/lib/initPushNotifications";

const App: React.FunctionComponent = () => {

  React.useEffect(() => {
    initPushNotifications()
    registerAppWithFCM()
    getFCMToken()

    messaging().getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
                'Notification caused app to open from quit state:',
                remoteMessage.notification,
            );
          }
        });


    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
          'Notification caused app to open from background state:',
          remoteMessage,
      );
    });

    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM Message arrived!!!', remoteMessage)


    });
  }, [])

  const registerAppWithFCM = async () => {
    const token = await messaging().registerDeviceForRemoteMessages();

    console.log('Firebase Token', token)
  }

  const getFCMToken = async () => {
    const fcmToken = await messaging().getToken();

    console.log('fcmToken', fcmToken)
  }


  return (
      <SafeAreaView>
        <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Button title={'hi me'}/>
        </View>
      </SafeAreaView>
  )
}


export default App;
