import React, {useCallback, useMemo} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SpeciesNameType} from '../../utils/types';
import {
  Pressable,
  PressableStateCallbackType,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {SpeciesDetailsType} from '../../utils/types';

import _speciesDetails from '../../data/speciesDetails.json';

export type SpeciesPillProps = {
  item: SpeciesNameType;
  remove: Function;
};

const speciesDetails: SpeciesDetailsType = _speciesDetails;

function SpeciesPill({item, remove}: SpeciesPillProps) {
  const displayName = useMemo(() => {
    return item.title.split(', ')[0];
  }, [item]);

  const handlePress = useCallback(() => {
    setTimeout(() => {
      remove(item);
    }, 20);
  }, [item, remove]);

  const styles = useMemo(() => styler(item.id), [item.id]);

  return (
    <Pressable onPress={handlePress} style={stylerPressable}>
      <View style={styles.container}>
        <Text style={styles.text}>{displayName}</Text>
        <Icon style={styles.closeIcon} name="close" />
      </View>
    </Pressable>
  );
}

const styler = (scientificName: string) =>
  StyleSheet.create({
    container: {
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 6,
      paddingBottom: 8,
      backgroundColor: speciesDetails[scientificName].color,
      borderRadius: 50,
      display: 'flex',
      flexDirection: 'row',
      alignSelf: 'flex-start',
      alignItems: 'center',
      marginRight: 5,
      marginBottom: 5,
      height: 35,
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
    iconCover: {
      backgroundColor: 'black',
    },
  });

const stylerPressable = ({pressed}: PressableStateCallbackType): ViewStyle => ({
  transform: pressed ? [{scale: 0.96}] : [],
});

export default SpeciesPill;
