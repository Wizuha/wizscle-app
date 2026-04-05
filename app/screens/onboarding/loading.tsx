import { useUserStore } from "@/app/store/userStore";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

const STEPS = [
  { label: "Analyse de votre profil...", duration: 1400 },
  { label: "Calcul de votre TDEE...", duration: 1200 },
  { label: "Génération du programme d'entraînement...", duration: 1800 },
  { label: "Création du plan nutritionnel...", duration: 1600 },
  { label: "Optimisation par IA...", duration: 1200 },
  { label: "Finalisation de votre programme...", duration: 800 },
];

function RotatingRing() {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return <Animated.View style={[styles.ring, animatedStyle]} />;
}

function PulsingDot({ delay }: { delay: number }) {
  const scale = useSharedValue(0.6);
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1, {
        duration: 800,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
    opacity.value = withRepeat(
      withTiming(1, {
        duration: 800,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.dot,
        animatedStyle,
        { animationDelay: String(delay) },
      ]}
    />
  );
}

export default function OnboardingLoading() {
  const router = useRouter();
  const setOnboarded = useUserStore((state) => state.setOnboarded);

  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressAnim = useSharedValue(0);

  useEffect(() => {
    let stepIndex = 0;
    let elapsed = 0;
    const total = STEPS.reduce((acc, s) => acc + s.duration, 0);

    const runSteps = async () => {
      for (const step of STEPS) {
        setCurrentStep(stepIndex);
        await new Promise((resolve) => setTimeout(resolve, step.duration));
        elapsed += step.duration;
        setProgress(Math.round((elapsed / total) * 100));
        stepIndex++;
      }

      progressAnim.value = withTiming(1, { duration: 400 });

      await new Promise((resolve) => setTimeout(resolve, 600));
      await setOnboarded(true);
      router.replace("/(tabs)");
    };

    runSteps();
  }, []);

  const barStyle = useAnimatedStyle(() => ({
    width: `${progress}%`,
  }));

  return (
    <View style={styles.container}>
      {/* Background glow */}
      <View style={styles.glowCenter} />

      {/* Logo */}
      <Animated.View entering={FadeIn.duration(600)} style={styles.logoContainer}>
        <Text style={styles.logo}>WIZSCLE</Text>
        <Text style={styles.logoSub}>AI Fitness</Text>
      </Animated.View>

      {/* Animation centrale */}
      <View style={styles.animationContainer}>
        <RotatingRing />
        <View style={styles.dotsContainer}>
          {[0, 1, 2].map((i) => (
            <PulsingDot key={i} delay={i * 200} />
          ))}
        </View>
        <View style={styles.centerCore} />
      </View>

      {/* Step label */}
      <View style={styles.stepContainer}>
        {STEPS.map((step, index) =>
          index === currentStep ? (
            <Animated.Text
              key={step.label}
              entering={FadeIn.duration(300)}
              exiting={FadeOut.duration(200)}
              style={styles.stepLabel}
            >
              {step.label}
            </Animated.Text>
          ) : null
        )}
      </View>

      {/* Progress bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarTrack}>
          <Animated.View style={[styles.progressBarFill, barStyle]} />
        </View>
        <Text style={styles.progressText}>{progress}%</Text>
      </View>

      {/* Message bas */}
      <Animated.View
        entering={FadeIn.delay(800).duration(600)}
        style={styles.bottomMessage}
      >
        <Text style={styles.bottomText}>
          Votre programme IA est en cours de génération
        </Text>
        <Text style={styles.bottomSubtext}>
          Personnalisé pour vos objectifs et votre niveau
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  glowCenter: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(74,222,128,0.04)",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -150 }, { translateY: -200 }],
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  logo: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#4ADE80",
    letterSpacing: 4,
    textShadowColor: "#4ADE80",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  logoSub: {
    fontSize: 14,
    color: "#6B7280",
    letterSpacing: 2,
    marginTop: 4,
  },
  animationContainer: {
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 48,
  },
  ring: {
    position: "absolute",
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: "transparent",
    borderTopColor: "#4ADE80",
    borderRightColor: "rgba(74,222,128,0.3)",
  },
  dotsContainer: {
    position: "absolute",
    flexDirection: "row",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4ADE80",
  },
  centerCore: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#4ADE80",
    shadowColor: "#4ADE80",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 8,
  },
  stepContainer: {
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  stepLabel: {
    fontSize: 15,
    color: "#9CA3AF",
    textAlign: "center",
  },
  progressBarContainer: {
    width: width - 64,
    alignItems: "center",
    marginBottom: 48,
  },
  progressBarTrack: {
    width: "100%",
    height: 4,
    backgroundColor: "#1f2937",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#4ADE80",
    borderRadius: 2,
    shadowColor: "#4ADE80",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  progressText: {
    fontSize: 13,
    color: "#4ADE80",
    fontWeight: "600",
  },
  bottomMessage: {
    alignItems: "center",
    position: "absolute",
    bottom: 60,
  },
  bottomText: {
    fontSize: 15,
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 6,
  },
  bottomSubtext: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
  },
});
