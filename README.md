<div align="center">

# 🎨 PixelCraft Gallery

### *Bring Your Screen to Life ✨*

[![React Native](https://img.shields.io/badge/React%20Native-0.84.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Redux](https://img.shields.io/badge/Redux%20Toolkit-2.11.2-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org)
[![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS-green?style=for-the-badge&logo=android&logoColor=white)](https://reactnative.dev)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](./LICENSE)

**A stunning, feature-rich wallpaper app built with React Native — discover, save, and set beautiful wallpapers directly from your device.**

</div>

---

## 📸 Screenshots

| Splash | Home | Categories | Viewer | Preview |
|--------|------|------------|--------|---------|
| 🌟 | 🏠 | 🗂️ | 👁️ | 🖼️ |

> *Screenshots coming soon — run the app to see it in action!*

---

## ✨ Features

- 🔥 **Trending Wallpapers** — Browse curated, high-resolution wallpapers updated daily
- 🗂️ **Category Browsing** — Explore wallpapers by themes: Nature, Architecture, Abstract, and more
- 🔍 **Smart Search** — Find exactly what you're looking for with powerful keyword search
- ❤️ **Favourites** — Save your favourite wallpapers locally with Redux Persist
- 🖼️ **Live Preview** — Preview how wallpapers look on your Home & Lock screens before applying
- 🎨 **One-Tap Apply** — Set wallpapers to Home Screen, Lock Screen, or Both instantly
- 📥 **Download Support** — Save wallpapers directly to your camera roll
- 📡 **Offline Detection** — Real-time network status monitoring with friendly UI feedback
- ⬆️ **Back-to-Top** — Smooth scroll-to-top button for long lists
- 🌙 **Dark UI** — Sleek, eye-friendly dark theme throughout

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| ⚛️ Framework | React Native 0.84 + TypeScript |
| 🗺️ Navigation | React Navigation v7 (Stack + Bottom Tabs) |
| 🗃️ State Management | Redux Toolkit + Redux Persist |
| 🌐 Data Fetching | TanStack React Query v5 (infinite pagination) |
| 🎬 Animations | React Native Reanimated v4 |
| 📷 Camera Roll | `@react-native-camera-roll/camera-roll` |
| 🖼️ Wallpaper API | `@codeooze/react-native-wallpaper-manager` |
| 🌍 Wallpaper Source | [Pexels API](https://www.pexels.com/api/) |
| 📶 Network | `@react-native-community/netinfo` |
| 💾 Local Storage | `@react-native-async-storage/async-storage` |
| 🔔 Feedback | `react-native-toast-message` |
| 📦 Bundler | Metro + Babel |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) `>= 22.11.0`
- [React Native CLI](https://reactnative.dev/docs/environment-setup)
- [Android Studio](https://developer.android.com/studio) (for Android)
- [Xcode](https://developer.apple.com/xcode/) (for iOS, macOS only)
- A [Pexels API Key](https://www.pexels.com/api/)

---

### 📦 Installation

**1. Clone the repository**

```bash
git clone https://github.com/hamza091197/PixelCraft-Gallery.git
cd PixelCraft-Gallery
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up environment variables**

Create a `.env` file in the root directory:

```env
API_KEY=your_pexels_api_key_here
BASE_URL=https://api.pexels.com/v1
```

> 🔑 Get your free Pexels API key at [pexels.com/api](https://www.pexels.com/api/)

**4. iOS only — install pods**

```bash
cd ios && pod install && cd ..
```

---

### ▶️ Running the App

**Android**

```bash
npm run android
```

**iOS**

```bash
npm run ios
```

**Start Metro bundler only**

```bash
npm start
```

---

## 📁 Project Structure

```
PixelCraft Gallery/
├── 📂 src/
│   ├── 📂 api/              # Pexels API integration
│   ├── 📂 components/       # Reusable UI components
│   │   ├── CategoryItem.tsx
│   │   ├── EmptyFavourites.tsx
│   │   ├── FavBtn.tsx
│   │   ├── InfoModal.tsx
│   │   ├── ProfileRow.tsx
│   │   ├── SelectorModal.tsx
│   │   ├── SmartImage.tsx
│   │   └── TabIcon.tsx
│   ├── 📂 hooks/            # Custom React hooks
│   ├── 📂 navigation/       # Navigation setup (Stack + Tabs)
│   ├── 📂 screens/          # All app screens
│   │   ├── 📂 BottomTabScreens/
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── CategoriesScreen.tsx
│   │   │   ├── FavouritesScreen.tsx
│   │   │   └── ProfileScreen.tsx
│   │   ├── AboutScreen.tsx
│   │   ├── CategoryViewerScreen.tsx
│   │   ├── SearchScreen.tsx
│   │   ├── SplashScreen.tsx
│   │   ├── ViewerScreen.tsx
│   │   └── WallpaperPreviewScreen.tsx
│   ├── 📂 store/            # Redux store, slices & persist config
│   ├── 📂 types/            # TypeScript type definitions
│   └── 📂 utils/            # Helper utilities
├── 📂 assets/               # Images, logos, and static assets
├── 📂 android/              # Android native code
├── 📂 ios/                  # iOS native code
├── App.tsx                  # Root application component
├── app.json                 # App configuration
├── package.json             # Dependencies
└── README.md
```

---

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `API_KEY` | Your Pexels API authorization key | ✅ Yes |
| `BASE_URL` | Pexels API base URL (`https://api.pexels.com/v1`) | ✅ Yes |

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

---

## 🧑‍💻 Developer

<div align="center">

**Hamza Khalid**

[![GitHub](https://img.shields.io/badge/GitHub-hamza091197-181717?style=for-the-badge&logo=github)](https://github.com/hamza091197)
[![Email](https://img.shields.io/badge/Email-hamzakhalid%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:hamzakhalid@gmail.com)

*Made with ❤️ using React Native*

</div>

---

## 📷 Wallpaper Credits

All wallpapers are sourced from **[Pexels](https://www.pexels.com)** — a platform providing beautiful, free-to-use photos from talented photographers around the world.

> 🙏 Huge thanks to the Pexels community for their amazing content!

---

## 📜 License

```
MIT License

Copyright (c) 2025 Hamza Khalid

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software.
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. 🍴 Fork the project
2. 🌿 Create your feature branch: `git checkout -b feature/amazing-feature`
3. 💾 Commit your changes: `git commit -m 'feat: add amazing feature'`
4. 📤 Push to the branch: `git push origin feature/amazing-feature`
5. 🔁 Open a Pull Request

---

<div align="center">

⭐ **If you like this project, please give it a star!** ⭐

*PixelCraft Gallery — Where Every Screen Becomes a Canvas 🎨*

</div>
