import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Fuse from 'fuse.js';
import SpeciesItem from '../../components/SpeciesItem';
import debounce from 'lodash.debounce';
import {
  BackHandler,
  Dimensions,
  FlatList,
  Keyboard,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {FilterContext} from '../FilterController';
import {Shadow} from 'react-native-shadow-2';
import {SpeciesNameType} from '../../utils/types';

import speciesDetails from '../../data/speciesDetails.json';
import SpeciesPillList from '../SpeciesPillList';

const nameData = Object.entries(speciesDetails).map(([scientific, detail]) => ({
  id: scientific,
  title: detail.commonNames,
}));

const fuseOptions = {
  shouldSort: true,
  threshold: 0.3,
  ignoreLocation: true,
  keys: ['id', 'title'],
};

const fuse = new Fuse(nameData, fuseOptions);

function SpeciesSelect() {
  const [data, setData] = useState(nameData);
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const {species: selected, setSpecies: setSelected} =
    useContext(FilterContext);
  const updateData = useRef(
    debounce((query: string) => {
      if (!query) {
        setData(nameData);
      } else {
        const searchResults = fuse.search(query);
        setData(searchResults.map(result => result.item));
      }
    }, 400),
  ).current;

  const addToSelected = useCallback(
    (item: SpeciesNameType) => {
      const oldSelected = selected.slice(selected.length < 10 ? 0 : 1);
      setSelected([...oldSelected, item]);
      setOpen(false);
    },
    [selected, setSelected],
  );

  const removeFromSelected = useCallback(
    (item: SpeciesNameType) => {
      const targetIndex = selected.findIndex(el => el === item);
      const updated = selected.slice();
      updated.splice(targetIndex, 1);
      setSelected(updated);
    },
    [selected, setSelected],
  );

  const handleChangeText = useCallback((text: string) => {
    setInputValue(text);
  }, []);

  useEffect(() => {
    updateData(inputValue);
  }, [inputValue, updateData]);

  useEffect(() => {
    const handleBack = () => {
      if (open) {
        Keyboard.dismiss();
        setOpen(false);
        return true;
      }

      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBack);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBack);
  }, [open]);

  return (
    <View style={styles.container}>
      <View style={styles.widthContainer}>
        <Shadow distance={2} style={styles.shadow}>
          <ScrollView>
            <TextInput
              onBlur={() => setOpen(false)}
              onChangeText={handleChangeText}
              onFocus={() => setOpen(true)}
              placeholder="Sort by species (max. 10)"
              placeholderTextColor="#969fae"
              style={styles.input}
              value={inputValue}
            />
          </ScrollView>
        </Shadow>
        <SpeciesPillList remove={removeFromSelected} />
      </View>
      <View style={[styles.widthContainer, styles.listContainer]}>
        <Shadow distance={2} style={[styles.shadow]}>
          <FlatList
            data={data}
            initialNumToRender={15}
            keyboardShouldPersistTaps="handled"
            renderItem={({item}) => (
              <SpeciesItem
                deselect={removeFromSelected}
                selected={!!selected.find(el => el === item)}
                select={addToSelected}
                item={item}
              />
            )}
            style={[styles.list, open ? styles.open : styles.closed]}
          />
        </Shadow>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
  },
  widthContainer: {
    position: 'relative',
    marginTop: 7,
    width: Dimensions.get('window').width - 24,
    zIndex: 10,
  },
  listContainer: {
    marginTop: 0,
  },
  input: {
    backgroundColor: 'white',
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%',
  },
  shadow: {
    width: '100%',
    marginBottom: 1,
  },
  list: {
    backgroundColor: 'white',
  },
  open: {
    maxHeight: Dimensions.get('window').height * 0.83,
  },
  closed: {
    maxHeight: 0,
  },
  pillList: {
    display: 'flex',
    flex: 1,
    position: 'absolute',
    top: 60,
    zIndex: 2,
  },
});

export default SpeciesSelect;
