# rn-android-modal-key-events

On Android, with the `enableKeyEvents` feature flag on, a focused View inside a `<Modal>` never receives `onKeyDown`, while the same View outside the Modal does. This repository is [React Native's reproducer template](https://github.com/react-native-community/reproducer-react-native) (React Native 0.88.1) with two changes:

- `MainApplication.kt` turns `enableKeyEvents` on after `loadReactNative`, the flag the View key events are behind.
- `App.tsx` renders a focusable View with `onKeyDown` that shows the last key it received, a button that opens a `<Modal>`, and the same View inside the Modal.

## Steps

1. Clone and install:
   ```sh
   git clone https://github.com/YevheniiKotyrlo/rn-android-modal-key-events
   cd rn-android-modal-key-events/ReproducerApp
   yarn install
   ```
2. Build and install the app on an Android device or emulator: `cd android && ./gradlew assembleRelease` and `adb install -r app/build/outputs/apk/release/app-release.apk`.
3. Start it. `adb shell input keyevent KEYCODE_TAB` focuses the first View, and `adb shell input keyevent KEYCODE_A` makes it show `Outside the Modal, last key: a`.
4. Tap **Open the Modal**, then `adb shell input keyevent KEYCODE_TAB` (the View in the Modal takes focus) and `adb shell input keyevent KEYCODE_A`.

Expected: `Inside the Modal, last key: a`.

What I see on a Galaxy S23 (Android 14): `Inside the Modal, last key: none`, while `uiautomator dump` shows that View focused.
