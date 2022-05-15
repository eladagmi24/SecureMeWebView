import React, { useState, useEffect } from "react";
import { Linking, StyleSheet, PermissionsAndroid, Platform} from "react-native";
import { WebView } from 'react-native-webview';

export default function App() {
const useMount = func => useEffect(() => func(), []);


const useInitialURL = () => {
  const [url, setUrl] = useState(null);
  const [processing, setProcessing] = useState(true);
  // Asking for android permissions
  if(Platform.OS === 'android'){
    useEffect(() => {
        (async () => {
          const { status } = await PermissionsAndroid.PERMISSIONS.CAMERA;
        })();
        (async () => {
          const { status } = await PermissionsAndroid.request('android.permission.ACCESS_FINE_LOCATION');
        })();
        (async () => {
          const { status } = await PermissionsAndroid.request('android.permission.READ_EXTERNAL_STORAGE');
        })();
        (async () => {
          const { status } = await PermissionsAndroid.request('android.permission.WRITE_EXTERNAL_STORAGE');
        })();
        (async () => {
          const { status } = await PermissionsAndroid.request('android.permission.INTERNET');
        })();
        (async () => {
          const { status } = await PermissionsAndroid.request('android.permission.RECORD_AUDIO');
        })();
        (async () => {
          const { status } = await PermissionsAndroid.request('android.permission.MODIFY_AUDIO_SETTINGS');
        })();
        (async () => {
          const { status } = await PermissionsAndroid.request('android.permission.VIDEO_CAPTURE');
        })();
        (async () => {
          const { status } = await PermissionsAndroid.request('android.permission.AUDIO_CAPTURE');
        })();
      }, []);
  }
 
  useMount(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();

      // The setTimeout is just for testing purpose
        setUrl(initialUrl);
        // setUrl('https://stg.10tix.me/65rV93Ka8MzG9Xpr4GKs');
        setProcessing(false);
    };

    getUrlAsync();
  });
  // Show url in terminal
  console.log(url)
  return { url, processing };
};
  const { url: initialUrl, processing } = useInitialURL();

  return (
    <WebView source={{ uri: initialUrl }}
    userAgent="Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004; Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
    geolocationEnabled={true}
    mediaPlaybackRequiresUserAction={false}
    javaScriptEnabled={true}
    useWebKit={true}
    allowsInlineMediaPlayback={true}
    />
  );

}

const styles = StyleSheet.create({});

