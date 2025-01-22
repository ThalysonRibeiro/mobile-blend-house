// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { AuthProvider } from './src/contexts/AuthContext';
import { StatusBar } from 'react-native';


export default function App() {
  return (

    <NavigationContainer>
      <AuthProvider>
        {/* <StatusBar backgroundColor='#18181b' style="light" translucent={false} /> */}
        <StatusBar backgroundColor='#18181b' barStyle="light-content" translucent={false} />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
