import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, router } from 'expo-router';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { getuserRoleData } from '@/storage/asyncstorage';
import { userRoleType } from '@/utils/types.ds';
import socket from '@/utils/socket';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [userRole, setUserRole] = React.useState<userRoleType>();

  React.useEffect(() => {
    // Event listener to receive user role from the server
    const handleUserRole = (role: userRoleType) => {
      setUserRole(role);
      console.log("Received user role:", role); // Log the received role
    };
  
    socket.on('user_role', handleUserRole);
  
    console.log("Socket connected:", socket.connected); // Log socket connection status
  
    // Clean up function
    return () => {
      socket.off('user_role', handleUserRole);
    };
  }, [socket]);

      React.useEffect(() => {
          if (userRole && userRole.role !== 'admin') {
            router.dismissAll();
          }
        },[userRole]);
        
       
  const screenOptions = {
    index: {
      title: 'Home',
      tabBarIcon: ({ color }: { color: string }) => <TabBarIcon name="home" color={color} />,
      headerShown: false
    },
    settings: {
      title: 'Settings',
      tabBarIcon: ({ color }: { color: string }) => <TabBarIcon name="gear" color={color} />,
      headerShown: false
    }
  };

  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={screenOptions.index}
      />
      <Tabs.Screen
        name="settings"
        options={screenOptions.settings}
      />
    </Tabs>
  );
}
