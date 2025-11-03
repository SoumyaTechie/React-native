import React, { createContext, useContext, useEffect, useReducer, ReactNode } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  getAuth,
  onAuthStateChanged,
  signInWithCredential,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  User as FirebaseUser,
} from '@react-native-firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  photo?: string | null;
}

interface AuthState {
  user: User | null;
  loading: boolean;
}

type AuthAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_LOADING'; payload: boolean };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

const AuthContext = createContext<{
  state: AuthState;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}>({
  state: { user: null, loading: true },
  signIn: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null, loading: true });

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1062035059821-pmv8k3ipviplenp24ou2v953fsdfv8h2.apps.googleusercontent.com',
    });

    const authInstance = getAuth();
    const unsubscribe = onAuthStateChanged(authInstance, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const { uid, displayName, email, photoURL } = firebaseUser;
        const user: User = {
          id: uid,
          name: displayName ?? '',
          email: email ?? '',
          photo: photoURL ?? '',
        };

        const firestoreInstance = getFirestore();
        const userRef = doc(firestoreInstance, 'users', uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, user);
        }

        dispatch({ type: 'SET_USER', payload: user });
      } else {
        dispatch({ type: 'SET_USER', payload: null });
      }
    });

    return unsubscribe;
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const signInResult = await GoogleSignin.signIn();

      const idToken =
        (signInResult as any)?.data?.idToken ?? (signInResult as any)?.idToken;

      if (!idToken) {
        throw new Error('No ID token returned from Google Sign-In');
      }

      const credential = GoogleAuthProvider.credential(idToken);
      const authInstance = getAuth();

      await signInWithCredential(authInstance, credential);
    } catch (error: any) {
      console.error('Login failed:', error);
      Alert.alert('Login Failed', error.message || 'Something went wrong');
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      const authInstance = getAuth();
      await firebaseSignOut(authInstance);
      dispatch({ type: 'SET_USER', payload: null });
    } catch (error: any) {
      console.error('Sign-out error:', error);
      Alert.alert('Logout Failed', 'Please try again.');
    }
  };

  return (
    <AuthContext.Provider value={{ state, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
