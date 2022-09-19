import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black, useFonts
} from '@expo-google-fonts/inter';
import { StatusBar } from 'react-native';
import { Background } from './src/Components/Background';
import { Loading } from './src/Components/Loading';
import { Routes } from './src/routes';
import { Subscription } from 'expo-modules-core';
import './src/services/notificationConfig';
import { getPushNotificationToken } from './src/services/getPushNotificationToken';
import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';


export default function App() {
  const getNotificationListener = useRef<Subscription>();
  const responseNotificationToken = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  }, []);

  useEffect(() => {
    getNotificationListener.current = Notifications.addNotificationReceivedListener((event) => {
      console.log(event);
    });

    responseNotificationToken.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      if (getNotificationListener.current && responseNotificationToken.current) {
        Notifications.removeNotificationSubscription(getNotificationListener.current);
        Notifications.removeNotificationSubscription(responseNotificationToken.current);
      }
    }
  }, []);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });

  return (
    <Background>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {fontsLoaded ? <Routes /> : <Loading /> }
    </Background>
  );
}


