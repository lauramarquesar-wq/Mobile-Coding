import React, { createContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import AlarmScreen from './screens/AlarmScreen';
import HistoryScreen from './screens/HistoryScreen';
import SymptomsScreen from './screens/SymptomsScreen';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const AppContext = createContext();
const Stack = createStackNavigator();

export default function App() {
  const [userName, setUserName] = useState('');
  const [reminderTime, setReminderTime] = useState('08:30');
  const [pillTakenToday, setPillTakenToday] = useState(false);
  const [contraceptiveMethod, setContraceptiveMethod] = useState('mensal');
  const [contraceptiveName, setContraceptiveName] = useState(''); 

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('@user_name');
        const storedTime = await AsyncStorage.getItem('@reminder_time');
        const storedMethod = await AsyncStorage.getItem('@contraceptive_method');
        const storedCName = await AsyncStorage.getItem('@contraceptive_name');
        
        if (storedName) setUserName(storedName);
        if (storedTime) setReminderTime(storedTime);
        if (storedMethod) setContraceptiveMethod(storedMethod);
        if (storedCName) setContraceptiveName(storedCName);
      } catch (e) {
        console.log('Erro ao carregar dados', e);
      }
    };
    loadData();
  }, []);

  return (
    <AppContext.Provider value={{ 
      userName, setUserName, 
      reminderTime, setReminderTime,
      pillTakenToday, setPillTakenToday,
      contraceptiveMethod, setContraceptiveMethod,
      contraceptiveName, setContraceptiveName
    }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Alarms" component={AlarmScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
          <Stack.Screen name="Symptoms" component={SymptomsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}
