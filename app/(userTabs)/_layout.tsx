import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, router } from 'expo-router';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { getuserRoleData } from '@/storage/asyncstorage';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [userRole, setUserRole] = React.useState<string>();

  React.useEffect(() => {
    // Call getuserRoleData when the component mounts
        const fetchData = async () => {
          const role = await getuserRoleData();
          setUserRole(role);
        };
    
        fetchData(); 
      }, []);

      React.useEffect(() => {
        // if (userRole){
        //   console.log(userRole)
        // }
          if (userRole && userRole !== 'user') {
            router.push('../login');
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
