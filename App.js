import { useEffect, useRef, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  const cameraRef = useRef(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const [capturedUri, setCapturedUri] = useState(null);
  const [pickedUri, setPickedUri] = useState(null);
  const [galleryAssets, setGalleryAssets] = useState([]);
  const [statusMessage, setStatusMessage] = useState('Ready to go!');

  useEffect(() => {
    (async () => {
      if (!cameraPermission) {
        await requestCameraPermission();
      }
      if (!mediaPermission) {
        await requestMediaPermission();
      }
    })();
  }, []);

  useEffect(() => {
    if (mediaPermission?.granted) {
      refreshGallery();
    }
  }, [mediaPermission]);

  const refreshGallery = async () => {
    try {
      const assets = await MediaLibrary.getAssetsAsync({
        first: 12,
        mediaType: ['photo'],
        sortBy: [[MediaLibrary.SortBy.creationTime, false]],
      });
      setGalleryAssets(assets.assets);
    } catch (error) {
      setStatusMessage('Could not load gallery items.');
    }
  };

  const ensurePermissions = async () => {
    const camera = await requestCameraPermission();
    const media = await requestMediaPermission();
    if (!camera.granted || !media.granted) {
      setStatusMessage('Camera and gallery permissions are required.');
    } else {
      setStatusMessage('Permissions granted, you can take photos.');
      refreshGallery();
    }
  };

  const handleTakePhoto = async () => {
    if (!cameraRef.current) return;
    try {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedUri(photo.uri);
      await MediaLibrary.saveToLibraryAsync(photo.uri);
      setStatusMessage('Photo saved to your gallery.');
      refreshGallery();
    } catch (error) {
      setStatusMessage('Something went wrong when taking the photo.');
    }
  };

  const handlePickFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        quality: 1,
      });
      if (!result.canceled) {
        setPickedUri(result.assets[0].uri);
        setStatusMessage('Image loaded from your gallery.');
      }
    } catch (error) {
      setStatusMessage('Could not open the gallery.');
    }
  };

  if (!cameraPermission || !mediaPermission) {
    return (
      <SafeAreaView style={styles.centeredScreen}>
        <Text style={styles.label}>Requesting permissions...</Text>
      </SafeAreaView>
    );
  }

  if (!cameraPermission.granted || !mediaPermission.granted) {
    return (
      <SafeAreaView style={styles.centeredScreen}>
        <Text style={styles.label}>We need camera and gallery access.</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={ensurePermissions}>
          <Text style={styles.buttonText}>Allow Access</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Simple Camera Practice</Text>
        <Text style={styles.subtitle}>{statusMessage}</Text>

        <View style={styles.cameraBox}>
          <CameraView ref={cameraRef} style={styles.cameraPreview} />
        </View>
        <TouchableOpacity style={styles.primaryButton} onPress={handleTakePhoto}>
          <Text style={styles.buttonText}>Take Photo & Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handlePickFromGallery}>
          <Text style={styles.secondaryText}>Open Gallery Picker</Text>
        </TouchableOpacity>

        <View style={styles.previewRow}>
          {capturedUri && (
            <View style={styles.previewBox}>
              <Text style={styles.label}>Last Captured</Text>
              <Image source={{ uri: capturedUri }} style={styles.previewImage} />
            </View>
          )}
          {pickedUri && (
            <View style={styles.previewBox}>
              <Text style={styles.label}>Picked From Gallery</Text>
              <Image source={{ uri: pickedUri }} style={styles.previewImage} />
            </View>
          )}
        </View>

        <Text style={styles.label}>Recent Gallery Photos</Text>
        <View style={styles.galleryGrid}>
          {galleryAssets.map((asset) => (
            <Image key={asset.id} source={{ uri: asset.uri }} style={styles.galleryImage} />
          ))}
          {galleryAssets.length === 0 && (
            <Text style={styles.emptyText}>Take a photo to see it here.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1b2b',
  },
  centeredScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0b1b2b',
    padding: 24,
  },
  scroll: {
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
  },
  subtitle: {
    color: '#c7d7ed',
  },
  cameraBox: {
    borderRadius: 12,
    overflow: 'hidden',
    height: 320,
    backgroundColor: '#111927',
  },
  cameraPreview: {
    flex: 1,
  },
  primaryButton: {
    backgroundColor: '#4c8bf5',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#4c8bf5',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryText: {
    color: '#4c8bf5',
    fontWeight: '600',
  },
  previewRow: {
    flexDirection: 'row',
    gap: 12,
  },
  previewBox: {
    flex: 1,
    backgroundColor: '#111927',
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  previewImage: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 10,
  },
  label: {
    color: '#c7d7ed',
    fontWeight: '600',
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  galleryImage: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 8,
  },
  emptyText: {
    color: '#8aa0c7',
  },
});
