# 📱 CampusConnect App

CampusConnect is a modern mobile application built with **React Native (Expo)** that empowers students to discover, register for, and manage campus events seamlessly. Stay connected with your college community and never miss an exciting opportunity.

---

## 🎯 Table of Contents

- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Installation & Setup](#-installation--setup)
- [Firebase Configuration](#-firebase-configuration)
- [Available Scripts](#-available-scripts)

---

## 🚀 Project Overview

CampusConnect simplifies event management for college students by providing an intuitive platform to explore campus activities, register for events, and track their participation. The app leverages Firebase for secure authentication and real-time data synchronization, ensuring users always have access to the latest event information while maintaining their registered events locally for offline access.

**Target Users:** College/University Students  
**Platform:** iOS & Android (via React Native)  
**Status:** Active Development

---

## ✨ Key Features

**Authentication & User Management**

- Secure user registration and login with Firebase Authentication
- Email verification and password reset functionality
- User profile management and preferences

**Event Discovery**

- Browse all upcoming campus events on the home page
- Real-time event updates from Firebase Firestore
- Categorized event listings for easy navigation

**Search & Discovery**

- Filter events by category, date, or name
- Search functionality to quickly find specific events
- Sort events by date or popularity

**Event Registration**

- One-tap registration for events
- Local event storage using AsyncStorage for offline access
- Real-time confirmation and notifications

**Personal Dashboard**

- Dedicated "My Events" tab to view all registered events
- Quick event details and reminders
- Easy event management (register/unregister)

**User Profile**

- View personal information and registration history
- Manage notification preferences
- Access account settings

**UI/UX**

- Clean, minimal, and intuitive interface
- Smooth bottom tab navigation
- Responsive design for all screen sizes

---

## 🛠️ Tech Stack

| Category             | Technology                       |
| -------------------- | -------------------------------- |
| **Mobile Framework** | React Native (Expo)              |
| **Navigation**       | Expo Router, React Navigation    |
| **Authentication**   | Firebase Authentication          |
| **Database**         | Firebase Firestore               |
| **Local Storage**    | AsyncStorage                     |
| **Styling**          | Tailwind CSS (NativeWind)        |
| **Icons**            | Ionicons, MaterialCommunityIcons |
| **Build Tool**       | Expo CLI                         |
| **Deployment**       | EAS (Expo Application Services)  |
| **Version Control**  | Git & GitHub                     |

---

## 🎯 Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Expo CLI** (`npm install -g expo-cli`)
- **Git**
- A **Firebase project** with Firestore and Authentication enabled

### Installation & Setup

**1. Clone the Repository**

```bash
git clone https://github.com/your-username/CampusConnectApp.git
cd CampusConnectApp
```

**2. Install Dependencies**

```bash
npm install
# or
yarn install
```

**3. Configure Firebase**

Create a `.env.local` file in the root directory and add your Firebase credentials:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**4. Initialize Firebase Configuration**

Update `firebase/config.js`:

```javascript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

**5. Start the Development Server**

```bash
npm start
# or
expo start
```

**6. Run on Mobile Device or Emulator**

- Press `i` to open in iOS Simulator
- Press `a` to open in Android Emulator
- Scan QR code with Expo Go app on your device

---

## 📱 Available Scripts

```bash
# Start development server
npm start

# Run on iOS Simulator
npm run ios

# Run on Android Emulator
npm run android

# Build for production (EAS)
eas build --platform ios
eas build --platform android

# Submit to App Stores
eas submit --platform ios
eas submit --platform android

# Lint and format code
npm run lint
npm run format

# Run tests
npm test
```

---

**Last Updated:** November 2025  
**Version:** 1.0.0
