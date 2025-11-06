import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './android/app/src/context/AuthContext';
import { CartProvider } from './android/app/src/context/CartContext';
import AppNavigator from './android/app/src/navigation/AppNavigator';
import { ThemeProvider, useThemeContext } from './android/app/src/context/ThemeContext';

function ThemedApp() {
  // ✅ use hook only *inside* ThemeProvider
  const { theme } = useThemeContext();

  return (
    <PaperProvider theme={theme}>
      <CartProvider>
        <AppNavigator />
      </CartProvider>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ThemedApp />
      </ThemeProvider>
    </AuthProvider>
  );
}
