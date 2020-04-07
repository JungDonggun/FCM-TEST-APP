import React from 'react'
import { SafeAreaView, Text } from "react-native"
import messaging from '@react-native-firebase/messaging';

const App: React.FunctionComponent = () => {

  React.useEffect(() => {
    registerAppWithFCM()
    checkApplicationPermission()

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
      console.log('A new FCM Message arrived!', remoteMessage)
    });

  }, [])

  const registerAppWithFCM = async () => {
    const token = await messaging().registerDeviceForRemoteMessages();

    console.log('Firebase Token', token)
  }

  const checkApplicationPermission = async () => {
    try {
      const settings = await messaging().requestPermission();

      // settings only available on iOS
      if (settings) {
        console.log('User has notification permissions enabled');
      } else {
        console.log('User has notification permissions disabled');
      }
    } catch (error) {
      // User has rejected permissions
      console.log('Error', error)
      alert("you can't handle push notification");
    }
  }


  return (
      <SafeAreaView>
        <Text>welcome to React native App</Text>
      </SafeAreaView>
  )
}


export default App;
