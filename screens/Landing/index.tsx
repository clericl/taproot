import React, {useEffect} from 'react';
import {RootStackParamList} from '../../App';
import {View, Text, StyleSheet} from 'react-native';
import CSSAnimationView from '../../components/CSSAnimationView';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

function Landing({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Landing'>) {
  useEffect(() => {
    let timeout: number | undefined;
    timeout = setTimeout(() => {
      navigation.replace('Map', {fromLanding: true});
    }, 2400);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <CSSAnimationView duration={600} from={1} to={0} delay={1800}>
        <CSSAnimationView duration={600}>
          <Text style={styles.message}>Welcome to Taproot.</Text>
        </CSSAnimationView>
      </CSSAnimationView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 24,
    color: 'black',
  },
});

export default Landing;
