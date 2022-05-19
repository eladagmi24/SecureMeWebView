import React, { useState, useEffect } from "react";
import {StyleSheet, PermissionsAndroid } from "react-native";

const Permissions = () => {

    useEffect(() => {
        (async () => {
        await PermissionsAndroid.PERMISSIONS.CAMERA;
        })();
        (async () => {
            await PermissionsAndroid.requestMultiple('android.permission.ACCESS_FINE_LOCATION', 'android.permission.READ_EXTERNAL_STORAGE', 
            'android.permission.WRITE_EXTERNAL_STORAGE', 'android.permission.INTERNET', 'android.permission.RECORD_AUDIO', 'android.permission.MODIFY_AUDIO_SETTINGS',
            'android.permission.VIDEO_CAPTURE', 'android.permission.AUDIO_CAPTURE');
        })();
    }, []);
};

const styles = StyleSheet.create({});

export default Permissions;