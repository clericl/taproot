import {useEffect, useRef} from 'react';
import {Animated} from 'react-native';

type AnimationProps = {
  delay?: number;
  duration?: number;
  from?: number;
  to?: number;
  immediate?: boolean;
};

function useAnimation({
  delay = 0,
  duration = 1000,
  from = 0,
  to = 1,
  immediate = true,
}: AnimationProps) {
  const fadeAnim = useRef(new Animated.Value(from)).current;

  useEffect(() => {
    if (immediate) {
      Animated.timing(fadeAnim, {
        delay,
        duration,
        toValue: to,
        useNativeDriver: true,
      }).start();
    }
  }, [delay, duration, fadeAnim, to, immediate]);

  return fadeAnim;
}

export default useAnimation;
