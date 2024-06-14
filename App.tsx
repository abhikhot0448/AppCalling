import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import {
  registerForPushNotificationsAsync,
  sendPushNotification,
} from "./src/NotificationService";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const App: React.FC = () => {
  useEffect(() => {
    registerForPushNotificationsAsync();

    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);
        // Handle notification for call
      }
    );

    return () => subscription.remove();
  }, []);

  const sendNotification = () => {
    // Replace with the receiver's push token
    const receiverPushToken = "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]";
    sendPushNotification(
      receiverPushToken,
      "Incoming Call",
      "You have an incoming call from User"
    );
  };

  return (
    <View>
      <Text>B2A Notification Calling</Text>
      <Button title="Send Notification" onPress={sendNotification} />
    </View>
  );
};

export default App;
