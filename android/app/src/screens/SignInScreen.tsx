import React from 'react';
import { View, Button, StyleSheet, Image, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function SignInScreen() {
  const { signIn } = useAuth();

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Welcome to FastEcom</Text>
            <Image
        source={{ uri: 'https://static.vecteezy.com/system/resources/previews/013/734/179/original/3d-google-logo-google-is-usa-multinational-corporation-g-logo-symbol-sign-free-vector.jpg' }}
        style={{ width: 100, height: 60, marginBottom: 20 }}
      />
      <Button title="Sign in with Google" onPress={signIn}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, marginBottom: 20, fontWeight: '600'},
});
