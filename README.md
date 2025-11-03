This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.




# React Native Google Sign-In with Firebase

## Prerequisites

* Node.js ≥ 18
* Java 17 / OpenJDK 17
* Android Studio (with emulator or physical device)
* React Native ≥ 0.76
* Firebase project created at [https://console.firebase.google.com](https://console.firebase.google.com)

---

## Steps to Set Up Google Sign-In

### 1. Create Firebase Project

1. Go to **Firebase Console → Add Project**
2. Enter a project name and click **Continue**
3. Disable Analytics if not required and click **Create Project**

---

### 2. Add Android App to Firebase

1. Click **Add App → Android**
2. Enter your **Package Name** (example: `com.rngooglesignin`)
3. Download the generated `google-services.json` file
4. Place it inside your project at:

   ```
   android/app/google-services.json
   ```

---

### 3. Enable Google Sign-In in Firebase

1. In Firebase Console, go to **Authentication → Sign-in method**
2. Enable the **Google** provider and click **Save**

---

### 4. Update Gradle Configuration

**android/build.gradle**

```gradle
buildscript {
    dependencies {
        classpath 'com.google.gms:google-services:4.4.2'
    }
}
```

**android/app/build.gradle**

```gradle
apply plugin: 'com.google.gms.google-services'

dependencies {
    implementation 'com.google.android.gms:play-services-auth:21.2.0'
}
```

Ensure your `ext` block defines the following:

```gradle
minSdkVersion = 24
compileSdkVersion = 36
targetSdkVersion = 36
```

---

### 5. Install Required NPM Packages

```bash
npm install @react-native-google-signin/google-signin
```

---

### 6. Configure Google Sign-In in App Code

**App.tsx**

```tsx
import React from 'react';
import { Button, View } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
});

export default function App() {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Sign in with Google" onPress={signIn} />
    </View>
  );
}
```

Replace `YOUR_WEB_CLIENT_ID` with the value from
**Firebase Console → Project Settings → Your Apps → Web Client ID**

---

### 7. Run the Application

Start the Android emulator from Android Studio or via CLI, then run:

```bash
adb start-server
adb devices
npx react-native run-android
```

Once the app launches, tap **"Sign in with Google"** to sign in with your Google account.

---


🚀** React Native Google Sign-In with Firebase & Firestore**
🧩 1. Project Setup
Created React Native app (npx react-native init RNGoogleSignin).
Installed dependencies:
Configured Android with SHA1 and google-services.json.
🔑 2. Firebase Setup
Created Firebase project → enabled Authentication → Google Sign-In.
Added Android app using package name (com.rngooglesignin) + SHA1 fingerprint.
Downloaded and placed google-services.json inside:
Added classpath 'com.google.gms:google-services:X.X.X' in android/build.gradle.
Applied apply plugin: 'com.google.gms.google-services' in android/app/build.gradle.
🔥 3. Firestore Setup
Opened Firestore Database → Create Database.
Selected Test Mode and default location (e.g., asia-south1).
Published default rules for development:
👥 4. Google Sign-In Configuration
Configured GoogleSignin with Web client ID from google-services.json (client_type:3):
🔐 5. Authentication & Firestore Logic
Implemented AuthContext to handle:
Google Sign-In
Firebase Auth credential
User state persistence
Firestore user document creation (if not exists)
✅ When user signs in:
Google returns idToken.
FirebaseAuth authenticates with GoogleAuthProvider.credential(idToken).
If first login → adds user data to Firestore collection users.
📂 6. Firestore Data Example
users
 └── uid_12345
      ├── id: "uid_12345"
      ├── name: "Soumya"
      ├── email: "soumyaxxx@gmail.com"
      └── photo: "https://..."
⚙️ 7. Testing
Ran app on Android emulator → selected Google account → user stored in Firestore ✅
Verified entry under Firestore → Data tab → users collection.
🧠 Notes
SHA1 is required for Google Sign-In to work on Android.
Always use Web Client ID (type 3) in GoogleSignin.configure.
Use @react-native-firebase packages — don’t mix with firebase (web SDK).
Test mode DB expires in 30 days → switch to secure rules before release.
For production: use authentication-based access rules.
Would you like me to give you the production-ready Firestore rules snippet next (so you can apply it safely before release)?
GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
});
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
android/app/google-services.json
npm install @react-native-google-signin/google-signin @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore
 
