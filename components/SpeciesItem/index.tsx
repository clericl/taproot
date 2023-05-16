import React, {useCallback, useMemo} from 'react';
import {
  Keyboard,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SpeciesNameType} from '../../utils/types';
import {SpeciesColor} from '../../utils/types';

import _speciesColors from '../../data/speciesColors.json';

type SpeciesItemProps = {
  item: SpeciesNameType;
  select: Function;
  selected: boolean;
  deselect: Function;
};

const speciesColors: SpeciesColor = _speciesColors;

function SpeciesItem({item, select, selected, deselect}: SpeciesItemProps) {
  const styles = useMemo(() => styler(selected, item.id), [selected, item.id]);
  const handlePress = useCallback(() => {
    if (selected) {
      deselect(item);
    } else {
      select(item);
    }
    Keyboard.dismiss();
  }, [deselect, item, select, selected]);

  return (
    <TouchableHighlight onPress={handlePress} underlayColor="#d6d6d6">
      <View style={styles.container}>
        <Text style={[styles.text]}>{item.id}</Text>
        <Text style={[styles.text, styles.subtitle]}>{item.title}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styler = (selected: boolean, scientificName: string) =>
  StyleSheet.create({
    container: {
      position: 'relative',
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 6,
      paddingBottom: 8,
      backgroundColor: selected ? speciesColors[scientificName] : 'transparent',
      borderBottomColor: '#d6d6d6',
      borderBottomWidth: 1,
    },
    text: {
      color: 'black',
    },
    title: {
      fontSize: 12,
    },
    subtitle: {
      fontSize: 10,
    },
  });

export default SpeciesItem;
