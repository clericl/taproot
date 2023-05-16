import React, {useCallback, useMemo} from 'react';
import {Keyboard, Pressable, StyleSheet, Text, View} from 'react-native';
import {SpeciesNameType} from '../../utils/types';

type SpeciesItemProps = {
  item: SpeciesNameType;
  select: Function;
  selected: boolean;
  deselect: Function;
};

function SpeciesItem({item, select, selected, deselect}: SpeciesItemProps) {
  const styles = useMemo(() => styler(selected), [selected]);
  const handlePress = useCallback(() => {
    if (selected) {
      deselect(item);
    } else {
      select(item);
    }
    Keyboard.dismiss();
  }, [deselect, item, select, selected]);

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.container}>
        <Text style={[styles.text]}>{item.id}</Text>
        <Text style={[styles.text, styles.subtitle]}>{item.title}</Text>
      </View>
    </Pressable>
  );
}

const styler = (selected: boolean) =>
  StyleSheet.create({
    container: {
      position: 'relative',
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 6,
      paddingBottom: 8,
      backgroundColor: selected ? '#d6d6d6' : 'transparent',
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
