# Camera Gallery App

A React Native app built with Expo that allows users to:
- 📷 Take photos using the device camera
- 🖼️ Access and select photos from the gallery
- 💾 Save photos to the device gallery

## Features

- **Take Photo**: Capture photos directly using your device camera
- **Gallery Access**: Browse and select existing photos from your gallery
- **Save to Gallery**: Save captured or selected photos to your device's photo library
- **Beautiful UI**: Modern, dark-themed interface with smooth animations

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo Go app installed on your mobile device (available on iOS App Store and Google Play Store)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Scan the QR code with:
   - **iOS**: Use the Camera app to scan the QR code
   - **Android**: Use the Expo Go app to scan the QR code

## Permissions

The app requires the following permissions:
- **Camera**: To take photos
- **Photo Library**: To access and save photos to the gallery

Permissions are requested automatically when you first launch the app.

## Technologies Used

- React Native
- Expo
- expo-image-picker
- expo-media-library
- expo-camera

## Project Structure

```
camera-gallery-app/
├── App.js              # Main application component
├── app.json            # Expo configuration
├── package.json        # Dependencies
├── babel.config.js     # Babel configuration
└── README.md          # This file
```

## Usage

1. **Taking a Photo**:
   - Tap the "Take Photo" button
   - Grant camera permissions if prompted
   - Take a photo and confirm

2. **Selecting from Gallery**:
   - Tap the "Choose from Gallery" button
   - Grant photo library permissions if prompted
   - Select a photo from your gallery

3. **Saving to Gallery**:
   - After taking or selecting a photo, tap "Save to Gallery"
   - The photo will be saved to your device's photo library

## License

This project is for educational purposes.
