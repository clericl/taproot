import React, {useMemo} from 'react';
import {BASE_IMAGE_URL} from '@env';
import {Dimensions, Image, Text, View, StyleSheet} from 'react-native';
import {SpeciesDetailsType} from '../../types';
import {useAppSelector} from '../../redux/utils/hooks';

import _speciesDetails from '../../data/speciesDetails.json';

const speciesDetails = _speciesDetails as SpeciesDetailsType;

function TreeDetail() {
  const treeDetailData = useAppSelector(state => state.treeDetail.data);

  const commonNames = useMemo(() => {
    const latinName = treeDetailData.spc_latin;

    if (latinName) {
      const speciesDetail = speciesDetails[latinName];
      return speciesDetail.commonNames;
    }

    return '';
  }, [treeDetailData.spc_latin]);

  return (
    <View style={styles.container}>
      {!!treeDetailData && (
        <Image
          style={styles.treePhoto}
          source={{
            uri: BASE_IMAGE_URL + treeDetailData.spc_latin + '.jpg',
          }}
        />
      )}
      <View style={[styles.container, styles.content]}>
        <Text style={styles.text}>{treeDetailData.spc_latin}</Text>
        <Text style={styles.text}>{commonNames}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  treePhoto: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').height * 0.67,
  },
  content: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  text: {
    color: 'white',
  },
});

export default TreeDetail;
