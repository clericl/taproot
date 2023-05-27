import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import BottomSheet, {BottomSheetBackgroundProps} from '@gorhom/bottom-sheet';
import {BASE_IMAGE_URL} from '@env';
import {
  Dimensions,
  Image,
  Pressable,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {SpeciesDetailsType} from '../../utils/types';
import {useAppSelector} from '../../redux/util/hooks';

import _speciesDetails from '../../data/speciesDetails.json';

const speciesDetails = _speciesDetails as SpeciesDetailsType;

type TreeDetailDrawerBackgroundProps = {
  defaultProps: BottomSheetBackgroundProps;
};

function TreeDetailDrawerBackground({
  defaultProps,
}: TreeDetailDrawerBackgroundProps) {
  const treeDetailData = useAppSelector(state => state.treeDetail.data);

  return (
    <View style={[defaultProps.style, styles.drawerBackground]}>
      <Image
        style={styles.treePhoto}
        source={{
          uri: BASE_IMAGE_URL + treeDetailData.spc_latin + '.jpg',
        }}
      />
    </View>
  );
}

function TreeDetailDrawer() {
  const [allowTouch, setAllowTouch] = useState(false);
  const treeDetailData = useAppSelector(state => state.treeDetail.data);
  const ref = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => [100, '85%'], []);
  const containerStyles = useMemo(
    () => styler(allowTouch).container,
    [allowTouch],
  );

  const BackgroundComponent = useCallback(
    (props: BottomSheetBackgroundProps) => (
      <TreeDetailDrawerBackground defaultProps={props} />
    ),
    [],
  );

  const handleSheetChanges = useCallback((index: number) => {
    setAllowTouch(index === 1);
  }, []);

  const handleOuterPress = useCallback(({nativeEvent}: any) => {
    console.log(nativeEvent);
    ref.current?.snapToIndex(0);
  }, []);

  const commonNames = useMemo(() => {
    const latinName = treeDetailData.spc_latin;

    if (latinName) {
      const speciesDetail = speciesDetails[latinName];
      return speciesDetail.commonNames;
    }

    return '';
  }, [treeDetailData.spc_latin]);

  useEffect(() => {
    if (treeDetailData.spc_latin) {
      ref.current?.snapToIndex(1);
    } else {
      ref.current?.close();
    }
  }, [treeDetailData]);

  return (
    <Pressable onPress={handleOuterPress} style={containerStyles}>
      <BottomSheet
        backgroundComponent={BackgroundComponent}
        handleIndicatorStyle={styles.handleIndicator}
        handleStyle={styles.handle}
        index={-1}
        ref={ref}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}>
        <View style={styles.contentContainer}>
          <Text style={styles.text}>drawer inner</Text>
          <Text style={styles.text}>{treeDetailData.spc_latin}</Text>
          <Text style={styles.text}>{commonNames}</Text>
        </View>
      </BottomSheet>
    </Pressable>
  );
}

const styler = (allowTouch: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: 'transparent',
      pointerEvents: allowTouch ? 'auto' : 'box-none',
    },
  });

const styles = StyleSheet.create({
  drawer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 200,
  },
  drawerBackground: {
    backgroundColor: 'black',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
  },
  treePhoto: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').height * 0.67,
    opacity: 0.6,
  },
  content: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  text: {
    color: 'red',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    position: 'relative',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    overflow: 'hidden',
  },
  handle: {
    height: 40,
  },
  handleIndicator: {
    backgroundColor: 'white',
    marginTop: 10,
  },
});

export default TreeDetailDrawer;
