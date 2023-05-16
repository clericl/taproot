import React, {useMemo} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

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
    <View style={[styles.container, overrideStyles.loadingOpacity]}>
      <ActivityIndicator color="#42573e" animating={loading} size={72} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: '2.5%',
    right: '5%',
  },
});

export default MapLoading;
