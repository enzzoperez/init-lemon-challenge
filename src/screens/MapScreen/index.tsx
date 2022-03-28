import React, {useState, useEffect} from 'react';
import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  ToastAndroid,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import MapView, {Marker, Polyline} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';

const MapScreen = () => {
  const [location, setLocation] = useState();

  const coordinates = [
    {
      latitude: -25.4923785,
      longitude: -64.9651663,
    },
    {
      latitude: -25.5023785,
      longitude: -64.9761663,
    },
  ];

  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
        '',
        [
          {text: 'Go to Settings', onPress: openSetting},
          {text: "Don't Use Location", onPress: () => {}},
        ],
      );
    }

    return false;
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  useEffect(() => {
    const hasPermission = hasLocationPermission().then(res => res);

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log('LAT LONG', latitude, longitude);
        setLocation({
          latitude,
          longitude,
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  const origin = {latitude: 37.3318456, longitude: -122.0296002};
  const destination = {latitude: 37.771707, longitude: -122.4053769};

  return (
    <View style={styles.container}>
      {!!location ? (
        <MapView
          style={styles.maps}
          initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.002,
          }}>
          {/* <Marker
            coordinate={location}
            title={'Your Position'}
            description={'This is you position in map'}
          /> */}
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={'AIzaSyCZaLE6ZSk1L31RxnsQrHhGmPGeM1V-WPU'}
            strokeWidth={3}
          />
          <Marker
            coordinate={origin}
            title={'Your Position'}
            description={'This is you position in map'}
          />
          <Marker
            coordinate={destination}
            title={'Your Position'}
            description={'This is you position in map'}
          />
        </MapView>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maps: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
});

export default MapScreen;
