import React, { useState, useEffect } from "react";
import { Linking, StyleSheet, PermissionsAndroid, Platform , Alert} from "react-native";
import { WebView } from 'react-native-webview';


export default function App() {

const [hasCameraPermission, setHasCameraPermission] = useState(null);
const [hasLocationPermission, setHasLocationPermission] = useState(null);
const [hasReadStoragePermission, setHasReadStoragePermission] = useState(null);
const [hasWriteStoragePermission, setHasWriteStoragePermission] = useState(null);
const [hasInternetPermission, setHasInternetPermission] = useState(null);
const [hasRecordAudioPermission, setHasRecordAudioPermission] = useState(null);
const [hasModifyAudioPermission, setHasModifyAudioPermission] = useState(null);
const [hasVideoPermission, setHasVideoPermission] = useState(null);
const [hasAudioCapturePermission, setHasAudioCapturePermission] = useState(null);

const useMount = func => useEffect(() => func(), []);

          

const useInitialURL = () => {
  const [url, setUrl] = useState(null);
  const [processing, setProcessing] = useState(true);

  if(Platform.OS === 'android'){
    useEffect(() => {
        (async () => {
          const { status } = await PermissionsAndroid.PERMISSIONS.CAMERA;
          setHasCameraPermission(status === 'granted');
        })();
        (async () => {
          const { status } = await PermissionsAndroid.request('android.permission.ACCESS_FINE_LOCATION');
          setHasLocationPermission(status === 'granted');
        })();
        (async () => {
          const { status } = await PermissionsAndroid.request('android.permission.READ_EXTERNAL_STORAGE');
          setHasReadStoragePermission(status === 'granted');
        })();
        (async () => {
          const { status } = await PermissionsAndroid.request('android.permission.WRITE_EXTERNAL_STORAGE');
          setHasWriteStoragePermission(status === 'granted');
        })();
        (async () => {
          const { status } = await PermissionsAndroid.request('android.permission.INTERNET');
          setHasInternetPermission(status === 'granted');
        })();
        (async () => {
          const { status } = await PermissionsAndroid.request('android.permission.RECORD_AUDIO');
          setHasRecordAudioPermission(status === 'granted');
        })();
        (async () => {
          const { status } = await PermissionsAndroid.request('android.permission.MODIFY_AUDIO_SETTINGS');
          setHasModifyAudioPermission(status === 'granted');
        })();
        (async () => {
          const { status } = await PermissionsAndroid.request('android.permission.VIDEO_CAPTURE');
          setHasVideoPermission(status === 'granted');
        })();
        (async () => {
          const { status } = await PermissionsAndroid.request('android.permission.AUDIO_CAPTURE');
          setHasAudioCapturePermission(status === 'granted');
        })();


      }, []);
    
  }
 
  useMount(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();

      // The setTimeout is just for testing purpose
      setTimeout(() => {
        setUrl(initialUrl);
        // setUrl('https://stg.10tix.me/ckhKGwNX5gNGpO6yeXaI');

        setProcessing(false);
      }, 1000);
    };

    getUrlAsync();
  });
  console.log(url)
  return { url, processing };
};




  const { url: initialUrl, processing } = useInitialURL();
  
  // if(hasCameraPermission !== 'granted' || hasLocationPermission !== 'granted' || hasReadStoragePermission !== 'granted' || 
  // hasWriteStoragePermission !== 'granted' || hasInternetPermission !== 'granted' || hasRecordAudioPermission !== 'granted' || 
  // hasModifyAudioPermission !== 'granted' || hasVideoPermission !== 'granted' || hasAudioCapturePermission !== 'granted') {
  
  //   Alert.alert("One of the permissions was denied, can not complete the session")
  //   return;
  // }
  

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

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

