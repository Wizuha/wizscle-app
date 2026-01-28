import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface ParticleProps {
  delay: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

function Particle({ delay, startX, startY, endX, endY }: ParticleProps) {
  // Valeurs animées pour la position
  const translateX = useSharedValue(startX);
  const translateY = useSharedValue(startY);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Animation de l'opacité (fade in/out)
    opacity.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
        }),
        -1, // Répéter infiniment
        true // Reverse (aller-retour)
      )
    );

    // Animation du mouvement X
    translateX.value = withDelay(
      delay,
      withRepeat(
        withTiming(endX, {
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      )
    );

    // Animation du mouvement Y
    translateY.value = withDelay(
      delay,
      withRepeat(
        withTiming(endY, {
          duration: 3500,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
      opacity: opacity.value,
    };
  });

  return <Animated.View style={[styles.particle, animatedStyle]} />;
}

export default function ParticleAnimation() {
  const { width } = Dimensions.get("window");
  const centerX = width / 2;

  // Configuration des particules (positions de départ et d'arrivée)
  const particles = [
    { startX: -20, startY: 0, endX: 20, endY: -30, delay: 0 },
    { startX: 20, startY: 0, endX: -20, endY: 30, delay: 300 },
    { startX: -30, startY: -20, endX: 30, endY: 20, delay: 600 },
    { startX: 30, startY: 20, endX: -30, endY: -20, delay: 900 },
    { startX: 0, startY: -30, endX: 0, endY: 30, delay: 1200 },
    { startX: -40, startY: 10, endX: 40, endY: -10, delay: 1500 },
  ];

  return (
    <View style={styles.container}>
      {particles.map((particle, index) => (
        <Particle
          key={index}
          startX={particle.startX}
          startY={particle.startY}
          endX={particle.endX}
          endY={particle.endY}
          delay={particle.delay}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  particle: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4ADE80",
    shadowColor: "#4ADE80",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
});
