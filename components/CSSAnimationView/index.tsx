import React, {
  useEffect,
  useRef,
  PropsWithChildren,
  CSSProperties,
} from 'react';
import {Animated, ViewStyle} from 'react-native';

type CSSAnimationViewProps = PropsWithChildren<{
  delay?: number;
  duration?: number;
  from?: number;
  property?: keyof CSSProperties;
  style?: ViewStyle;
  to?: number;
}>;

function CSSAnimationView({
  children,
  delay = 0,
  duration = 1000,
  from = 0,
  property = 'opacity',
  to = 1,
  style,
}: CSSAnimationViewProps) {
  const fadeAnim = useRef(new Animated.Value(from)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      delay,
      duration,
      toValue: to,
      useNativeDriver: true,
    }).start();
  }, [delay, duration, fadeAnim, to]);

  return (
    <Animated.View
      style={[
        style,
        {
          [property]: fadeAnim,
        },
      ]}>
      {children}
    </Animated.View>
  );
}

export default CSSAnimationView;
