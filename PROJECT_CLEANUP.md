# PushNF - Firebase Push Notification

React Native + FCM (Firebase Cloud Messaging) push notification application with Notifee for system notifications and modal popup for notification details.

## Features

- Firebase Cloud Messaging (FCM) integration
- System notifications with sound using Notifee
- Notification permission handling
- FCM token management
- Background and killed state notification handling
- Prevents duplicate notifications
- Modal popup for notification details when clicked
- Complete notification data display in table format

## Project Architecture

### Project Structure

```
PushNF/
├── App.jsx                          # Main entry point - redirects to Home component
├── src/
│   ├── components/
│   │   ├── homeCompo.jsx           # Home component with notification logic and modal integration
│   │   └── modalNotiyCompo.jsx     # Modal component for displaying notification details
│   └── utils/
│       └── firebase.jsx            # Firebase and notification utilities
├── android/                        # Android native code
│   └── app/
│       └── google-services.json      # Firebase configuration file
└── ios/                            # iOS native code
    └── PushNF/
        └── GoogleService-Info.plist  # Firebase configuration file
```

### Component Responsibilities

**App.jsx**
- Entry point for the application
- Simple container that renders Home component
- Provides global styling structure

**homeCompo.jsx**
- Main UI component
- Handles all notification lifecycle events
- Manages modal state for notification display
- Integrates with Firebase and Notifee listeners

**modalNotiyCompo.jsx**
- Reusable modal component
- Displays complete notification details
- Shows notification data in table format
- Handles close events

**firebase.jsx**
- Firebase configuration and permission handling
- FCM token management
- Notification display with Notifee
- Prevents duplicate notifications
- Stores current notification data

## Step-by-Step Working Process

### 1. Application Startup
```
User opens app → App.jsx renders → homeCompo.jsx initializes
```

### 2. Permission Request Flow
```
homeCompo.jsx useEffect runs → requestUserPermission() called
→ Firebase requests notification permission
→ Permission granted logged to console
→ getFCMToken() called
→ FCM token generated and logged
```

### 3. Notification Reception Flow

#### Foreground State (App is open)
```
1. FCM message received → messaging().onMessage() triggered
2. displayNotification() called
3. Notifee creates notification channel
4. Notifee cancels any existing notification with same ID
5. Notifee displays system notification with sound
6. Notification data stored in currentNotificationData
7. Notification data attached to notification payload
```

#### Background State (App minimized)
```
1. FCM message received → Firebase shows system notification
2. User clicks notification → messaging().onNotificationOpenedApp() triggered
3. showNotificationDetails() called with notification data
4. Modal opens with notification details
```

#### Killed State (App closed)
```
1. FCM message received → Firebase shows system notification
2. User clicks notification → messaging().getInitialNotification() triggered
3. showNotificationDetails() called with notification data
4. Modal opens with notification details
```

### 4. Notification Click Handling

#### System Notification Click
```
1. User taps system notification
2. Notifee.onForegroundEvent() or onBackgroundEvent() triggered
3. Check if notification contains stored notificationData
4. Parse notification data if available
5. Call showNotificationDetails() with notification object
6. Set modalVisible = true
7. Set selectedNotification with notification data
8. Modal component renders with notification details
```

### 5. Modal Display Flow
```
showNotificationDetails() called
→ setSelectedNotification(notification)
→ setModalVisible(true)
→ Modal component receives notification prop
→ Modal renders with notification details:
  - Title
  - Body
  - Data table (key-value pairs)
  - Message ID
  - Sent Time
  - From
  - Collapse Key
→ User views complete notification information
```

### 6. Modal Close Flow
```
User clicks close button → closeModal() called
→ setModalVisible(false)
→ setSelectedNotification(null)
→ Modal component unmounts
→ Returns to main UI
```

## Complete Notification Flow Diagram

```
┌─────────────────┐
│  FCM Server    │
└────────┬────────┘
         │
         │ Push Message
         ▼
┌─────────────────┐
│ Firebase        │
│ Cloud Messaging │
└────────┬────────┘
         │
         │ (3 states)
         ▼
    ┌────┴────┐
    │          │
┌───▼───┐  ┌───▼────────┐
│Foreground│  │Background  │
│   App   │  │   App      │
└───┬───┘  └───┬────────┘
    │            │
    │onMessage() │onNotificationOpened()
    │            │getInitialNotification()
    ▼            ▼
┌─────────────────────────────────┐
│   displayNotification()        │
│   • Notifee creates channel  │
│   • Cancel duplicate         │
│   • Show system notification  │
│   • Store notification data   │
└───────────┬───────────────┘
            │
            │ User Click
            ▼
┌─────────────────────────────────┐
│   Notifee Event Handler     │
│   • onForegroundEvent()      │
│   • onBackgroundEvent()      │
│   • Parse notification data  │
└───────────┬───────────────┘
            │
            ▼
┌─────────────────────────────────┐
│   showNotificationDetails()    │
│   • Set selectedNotification  │
│   • Set modalVisible = true   │
└───────────┬───────────────┘
            │
            ▼
┌─────────────────────────────────┐
│   NotificationModal Component  │
│   • Display title & body     │
│   • Show data table          │
│   • Show metadata           │
│   • Handle close action      │
└─────────────────────────────────┘
```

## Setup Instructions

### 1. Firebase Console Setup
1. Create a Firebase project at https://console.firebase.google.com
2. Add Android app with package name `com.pushnf`
3. Download `google-services.json` and place in `android/app/`
4. Add iOS app with bundle identifier `com.pushnf`
5. Download `GoogleService-Info.plist` and place in `ios/PushNF/`
6. Enable Cloud Messaging in Firebase console

### 2. Install Dependencies
```bash
npm install
```

### 3. Android Setup
```bash
# Place google-services.json in android/app/
npm run android
```

### 4. iOS Setup
```bash
# Place GoogleService-Info.plist in ios/PushNF/
cd ios
pod install
cd ..
npm run ios
```

## Usage Guide

### Receiving Notifications
- App automatically requests notification permissions on startup
- FCM token is logged to console for testing
- Use the FCM token to send test notifications from Firebase console

### Viewing Notification Details
- When notification appears in system notification bar
- Click/tap on the notification
- Modal popup opens with complete notification information
- Scroll through notification data in table format
- Close modal using close button or footer button

### Notification States Explained

**Foreground**: App is open and visible on screen
- System notification appears
- Notification sound plays
- Modal opens when clicked

**Background**: App is minimized but still running
- System notification appears
- Notification sound plays
- Modal opens when clicked

**Killed**: App is completely closed
- System notification appears
- Notification sound plays
- App opens and modal displays when clicked

## Dependencies

### Core Dependencies
- `react` (19.2.3) - UI library
- `react-native` (0.85.3) - Mobile framework
- `react-native-safe-area-context` (5.7.0) - Safe area handling

### Firebase Dependencies
- `@react-native-firebase/app` (24.0.0) - Firebase core
- `@react-native-firebase/messaging` (24.0.0) - FCM messaging

### Notification Dependencies
- `@notifee/react-native` (9.1.8) - System notifications with advanced features

## Technical Implementation Details

### Duplicate Notification Prevention
```javascript
// Before displaying new notification
await notifee.cancelNotification(notificationId);

// Display notification
await notifee.displayNotification({...});
```

### Notification Data Storage
```javascript
// Store notification in notification payload
data: {
  ...remoteMessage.data,
  notificationData: JSON.stringify(remoteMessage),
}
```

### Notification Click Detection
```javascript
// Foreground events
notifee.onForegroundEvent(({ type, detail }) => {
  if (type === 1 && detail.pressAction) {
    // Handle notification click
  }
});

// Background events
notifee.onBackgroundEvent(async ({ type, detail }) => {
  if (type === 1 && detail.pressAction) {
    // Handle notification click
  }
});
```

## Troubleshooting

### Build Issues
- Run `npm install` to ensure dependencies are installed
- Clean Android build: `cd android && ./gradlew clean && cd ..`
- Clean iOS build: `cd ios && rm -rf Pods && pod install`

### Notification Issues
- Check Firebase console notification configuration
- Ensure FCM token is valid
- Verify notification permissions are granted
- Check device notification settings

### Modal Issues
- Verify notification data is properly parsed
- Check modal state management
- Ensure notification data includes required fields

## Notes

- All code uses English language
- Clean code structure without unused dependencies
- Professional UI with modal popup for notification details
- Complete notification data visibility
- Handles all app states (foreground, background, killed)
- Prevents duplicate notifications automatically