npm install --global expo-cli
expo --version
expo init mobile-blend-house
npx expo start
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack
npx expo install @react-native-async-storage/async-storage
npm install axios

<!-- build -->
npm install -g eas-cli
eas build --platform android
eas build -p android --profile preview_android

    "@types/react-native": "^0.73.0",
