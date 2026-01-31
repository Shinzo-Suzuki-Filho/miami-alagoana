import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { UrlTile, Marker } from 'react-native-maps';
import { Colors, Spacing } from '../theme/Colors';
import { ZoomIn, ZoomOut, Navigation2 } from 'lucide-react-native';

const TOMTOM_API_KEY = "ukqz4ijIdgMHPxpxEt8rHKyHcXDQXeQX";

const MapScreen = () => {
  const [mapType, setMapType] = React.useState('light');
  const [region, setRegion] = React.useState({
    latitude: -9.6658,
    longitude: -35.735,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  // URL do TomTom para tiles de mapa
  const getTileUrl = () => {
    const layer = mapType === 'light' ? 'basic' : 'dark';
    return `https://api.tomtom.com/map/1/tile/${layer}/main/{z}/{x}/{y}.png?key=${TOMTOM_API_KEY}`;
  };

  const zoomIn = () => {
    setRegion({
      ...region,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    });
  };

  const zoomOut = () => {
    setRegion({
      ...region,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        region={region}
        onRegionChangeComplete={setRegion}
      >
        <UrlTile
          urlTemplate={getTileUrl()}
          zIndex={-1}
        />
        <Marker 
          coordinate={{ latitude: -9.6658, longitude: -35.735 }}
          title="Maceió"
          description="Capital de Alagoas"
        />
      </MapView>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.btn} onPress={zoomIn}>
          <ZoomIn color={Colors.primary} size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={zoomOut}>
          <ZoomOut color={Colors.primary} size={24} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.btn} 
          onPress={() => setMapType(mapType === 'light' ? 'dark' : 'light')}
        >
          <Text style={styles.btnText}>{mapType === 'light' ? 'Dark' : 'Light'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.locationBtn}>
        <Navigation2 color="#FFF" size={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  controls: {
    position: 'absolute',
    right: Spacing.m,
    top: Spacing.m,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    padding: Spacing.s,
    elevation: 3,
  },
  btn: {
    padding: Spacing.s,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  btnText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  locationBtn: {
    position: 'absolute',
    right: Spacing.m,
    bottom: Spacing.m,
    backgroundColor: Colors.primary,
    padding: Spacing.m,
    borderRadius: 30,
    elevation: 5,
  }
});

export default MapScreen;
