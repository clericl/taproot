import React, {useMemo} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SpeciesNameType} from '../../utils/types';
import {StyleSheet, Text, View} from 'react-native';

import _speciesColors from '../../data/speciesColors.json';

interface SpeciesColor {
  [key: string]: string;
}

export type SpeciesPillProps = {
  item: SpeciesNameType;
};

const speciesColors: SpeciesColor = _speciesColors;

function SpeciesPill({item}: SpeciesPillProps) {
  const displayName = useMemo(() => {
    return item.title.split(', ')[0];
  }, [item]);

  const styles = useMemo(() => styler(item.id), [item.id]);

  return (
    <View style={styles.container}>
      <Text style={[styles.text]}>{displayName}</Text>
      <Icon style={styles.closeIcon} name="close" />
    </View>
  );
}

const styler = (scientificName: string) =>
  StyleSheet.create({
    container: {
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 6,
      paddingBottom: 8,
      backgroundColor: speciesColors[scientificName],
      borderRadius: 50,
      display: 'flex',
      flexDirection: 'row',
      alignSelf: 'flex-start',
      alignItems: 'center',
      marginRight: 5,
      marginBottom: 5,
    },
    text: {
      color: 'black',
      marginLeft: 6,
    },
    title: {
      fontSize: 12,
    },
    subtitle: {
      fontSize: 10,
    },
    closeIcon: {
      fontSize: 20,
      marginLeft: 10,
      color: 'black',
    },
  });

export default SpeciesPill;
