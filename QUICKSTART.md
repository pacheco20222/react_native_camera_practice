# 🚀 Quick Start Guide - Camera Gallery App

## How to Run the App

### Option 1: Using Expo Go (Recommended for Quick Testing)

1. **Install Expo Go on your phone**
   - iOS: Download from App Store
   - Android: Download from Google Play Store

2. **Start the development server**
   ```bash
   npm start
   ```

3. **Scan the QR code**
   - iOS: Open Camera app and point at the QR code
   - Android: Open Expo Go app and scan the QR code

### Option 2: Using iOS Simulator (Mac only)

```bash
npm run ios
```

### Option 3: Using Android Emulator

```bash
npm run android
```

## Features Implemented ✅

✅ Take photos using device camera
✅ Access and browse phone gallery
✅ Save photos to gallery
✅ Beautiful, modern UI with dark theme
✅ Permission handling for camera and gallery
✅ Image preview
✅ Success/error alerts

## How to Use the App

1. **Take a Photo**
   - Tap "📷 Take Photo" button
   - Allow camera permissions when prompted
   - Take your photo and confirm

2. **Choose from Gallery**
   - Tap "🖼️ Choose from Gallery" button
   - Allow gallery access when prompted
   - Select a photo from your gallery

3. **Save to Gallery**
   - After taking or selecting a photo
   - Tap "💾 Save to Gallery" button
   - Photo will be saved to your device

## Troubleshooting

### If you get permission errors:
- Go to your phone Settings > Apps > Expo Go
- Enable Camera and Storage permissions

### If the app doesn't start:
```bash
# Clear cache and restart
npm start -- --clear
```

### If you need to reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **expo-image-picker** - Camera and gallery access
- **expo-media-library** - Save photos to gallery
- **expo-camera** - Camera permissions

## Submission

This app fulfills all requirements:
- ✅ Can take photos
- ✅ Can access gallery
- ✅ Can save photos to gallery
- ✅ Nice looking UI
- ✅ Working GitHub repository

Push this code to GitHub and submit the repository link!
