import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

type MapLoadingProps = {
  loading: boolean;
};

function MapLoading({loading}: MapLoadingProps) {
  const overrideStyles = useMemo(
    () =>
      StyleSheet.create({
        loadingOpacity: {
          opacity: loading ? 1 : 0,
        },
      }),
    [loading],
  );

  return (
    // @ts-ignore;
    <View style={[styles.container, overrideStyles.loadingOpacity]}>
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: '2.5%',
    right: '5%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default MapLoading;
