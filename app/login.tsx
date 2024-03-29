import React, { useState } from 'react';

import { View,Text } from '@/components/Themed'
import Button from '@/components/Button';
import {Picker} from '@react-native-picker/picker';
import { userRoleData } from '@/storage/asyncstorage';
import { router } from 'expo-router';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import socket from '@/utils/socket';

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState<string>('user');
  const colorScheme = useColorScheme();

  React.useEffect(() => {
    // Event listener for connection
    const handleConnect = () => {
      console.log('Connected to server');
    };
  
    // Add event listeners
    socket.on('connect', handleConnect);
    // Cleanup function
    return () => {
      // Remove event listeners
      socket.off('connect', handleConnect);
    };
  }, []);

  // const engine = socket.io.engine;
  // console.log(socket.connected)

  const handleLogin = () => {
    userRoleData(selectedRole)
     // Emit the selected role to the server
     socket.emit('set_role', selectedRole);

    switch (selectedRole) {
        case 'user':
            router.push('./(userTabs)');
          break;
        case 'carrier':
            router.push('./(carrierTabs)');
          break;
        case 'admin':
        router.push('./(adminTabs)');
          break;
        default:
          break;
      }
    
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Please select your role:</Text>
      <Picker
        selectedValue={selectedRole}
        style={{ height: 50, width: 200, marginBottom:10, color: Colors[colorScheme ?? 'dark'].text,  }}
        onValueChange={(itemValue) => setSelectedRole(itemValue)}
        dropdownIconColor={Colors[colorScheme ?? 'dark'].text}
      >
        <Picker.Item label="User" value="user" />
        <Picker.Item label="Carrier" value="carrier" />
        <Picker.Item label="Admin" value="admin" />
      </Picker>
      <Button label="Login" onPress={handleLogin} ></Button>
    </View>
  );
};

export default LoginPage;
