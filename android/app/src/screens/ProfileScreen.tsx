import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useThemeContext } from '../context/ThemeContext';

export default function ProfileScreen() {
  const { state, signOut } = useAuth();
  const { mode: themeMode, setMode: setThemeMode } = useThemeContext();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: state.user?.photo || 'https://cdn-icons-png.flaticon.com/512/847/847969.png' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{state.user?.name || 'Guest User'}</Text>
      <Text style={styles.email}>{state.user?.email || 'No email available'}</Text>

      <TouchableOpacity style={styles.signOutBtn} onPress={signOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>

      {/* Theme Toggle Section */}
      <View style={styles.themeSection}>
        <Text style={styles.sectionTitle}>Theme Settings</Text>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Dark Mode</Text>
          <Switch
            trackColor={{ false: '#ccc', true: '#7e7d7cff' }}
            thumbColor={themeMode === 'dark' ? '#eee' : '#f4f3f4'}
            onValueChange={() =>
              setThemeMode(themeMode === 'dark' ? 'light' : 'dark')
            }
            value={themeMode === 'dark'}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 5,
  },
  email: {
    fontSize: 14,
    color: '#777',
    marginBottom: 15,
  },
  signOutBtn: {
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 25,
  },
  signOutText: {
    color: '#fff',
    fontWeight: '600',
  },
  themeSection: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 5,
  },
  switchLabel: {
    fontSize: 15,
    color: '#333',
  },
});
