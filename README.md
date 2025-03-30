# RytBank Interview Assignment

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Requirement

1. NodeJS (v22 LTS) [[link]](https://nodejs.org/en/download).
2. Follow this guide to setup Dev enviroment [[Guide]](https://docs.expo.dev/get-started/set-up-your-environment/)

## Get started

1. Clone the repo.

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Project Info

This project is build using the following packages:

- React Native UI Lib [[link]](https://wix.github.io/react-native-ui-lib/)
  - This package provide most of the UI elements to build the functionlities of this app
- duix [[link]](https://github.com/BrodaNoel/duix)
  - A simple state management library to manage form input & settings states.
- SQLite
  - Transaction history are stored using SQLite database.
- Auth
  - If user device did not enrolled in any biometric or pin/pattern lock, transaction auth will fallback to use a hardcoded app in which is 123456.
- Mock API status can be change using the 'setting' icon on the top right of the App Header.
- The app will use dark/light theme based on device OS theme setting.

## Things that can be improved

- The dark/light theme code is kind bloated and need to cleanup.
- Click on the transaction history will only pre-fill the recipient input field, aas the amount field is not controlled & I have not yet found way to pre-fill the amount input field.
- Authentication function can be move into a custom hook.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
