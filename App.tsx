// import React, { useEffect } from 'react';
// import { View, Button, StyleSheet, Alert } from 'react-native';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// export default function App() {
//   useEffect(() => {
//     GoogleSignin.configure({
//       webClientId: "1062035059821-pmv8k3ipviplenp24ou2v953fsdfv8h2.apps.googleusercontent.com", // 👈 Web client ID from google-services.json (client_type:3)
//       offlineAccess: true,
//       forceCodeForRefreshToken: true,
//     });
//   }, []);

//   const signIn = async () => {
//     try {
//       await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
//       const userInfo = await GoogleSignin.signIn();
//       console.log('✅ User Info:', userInfo);
//       Alert.alert('Login Successful', `Welcome ${userInfo.type}`);
//     } catch (error: any) {
//       console.error('❌ Full error:', error);
//       Alert.alert('Sign-In Error', `${error.code || error.message}`);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Sign in with Google" onPress={signIn} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });


import React from 'react';
import { View, Text, Button, ActivityIndicator} from 'react-native';
import { AuthProvider, useAuth } from './android/app/src/context/AuthContext';

const HomeScreen = () => {
  const { state, signIn, signOut } = useAuth();

  if (state.loading) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {state.user ? (
        <>
          {/* <Image source={{ uri: state.user.photo }} style={{ width: 80, height: 80, borderRadius: 40 }} /> */}
          <Text style={{ fontSize: 18, marginVertical: 10 }}>Hello, {state.user.name}</Text>
          <Button title="Sign Out" onPress={signOut} />
        </>
      ) : (
        <Button title="Sign In with Google" onPress={signIn} />
      )}
    </View>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <HomeScreen />
    </AuthProvider>
  );
}
