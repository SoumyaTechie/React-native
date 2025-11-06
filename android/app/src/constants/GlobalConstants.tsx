import { Dimensions, Platform } from 'react-native';

// 📏 Screen Dimensions
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// 💻 Platform Detection
export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';

// 🎨 Colors
export const COLORS = {
  primary: '#007AFF',
  secondary: '#FF9500',
  background: '#F5F5F5',
  text: '#333333',
  white: '#FFFFFF',
  gray: '#888888',
  border: '#E0E0E0',
};

// 🧠 App Constants
export const APP = {
  name: 'FastEcom',
  currency: '₹',
};
