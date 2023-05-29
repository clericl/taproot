import React, {useMemo} from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';
import {useAppSelector} from '../../redux/utils/hooks';

function MapLoading() {
  const loading = useAppSelector(state => state.mapData.loading);
  const treeDetailData = useAppSelector(state => state.treeDetail.data);

  const overrideStyles = useMemo(
    () => styler(!!treeDetailData, loading),
    [loading, treeDetailData],
  );

  return (
    <View style={[styles.container, overrideStyles.container]}>
      <ActivityIndicator color="#42573e" animating={loading} size={72} />
    </View>
  );
}

const styler = (hasBottomSheet: boolean, loading: boolean) => {
  const baseBottom = Dimensions.get('window').height * 0.025;

  return StyleSheet.create({
    container: {
      bottom: hasBottomSheet ? baseBottom + 140 : baseBottom,
      opacity: loading ? 1 : 0,
    },
  });
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: '5%',
  },
});

export default MapLoading;
