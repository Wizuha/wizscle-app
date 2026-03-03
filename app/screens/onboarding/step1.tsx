import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  TrendingDown,
  Dumbbell,
  Zap,
  Activity,
  Heart,
  Trophy,
  ChevronRight,
  Sparkles,
  Scale,
  Flame,
} from "lucide-react-native";

interface Goal {
  id: string;
  label: string;
  sublabel: string;
  emoji: string;
}

export default function OnboardingStep1() {
  const goals: Goal[] = [
    {
      id: "lose-weight",
      label: "Perdre du poids",
      sublabel: "Brûler les graisses & affiner",
      emoji: "🔥",
    },
    {
      id: "gain-muscle",
      label: "Prendre du muscle",
      sublabel: "Hypertrophie & force",
      emoji: "💪",
    },
    {
      id: "endurance",
      label: "Améliorer l'endurance",
      sublabel: "Cardio & performance",
      emoji: "⚡",
    },
    {
      id: "flexibility",
      label: "Souplesse & mobilité",
      sublabel: "Stretching & yoga",
      emoji: "🧘",
    },
    {
      id: "health",
      label: "Améliorer ma santé",
      sublabel: "Bien-être & vitalité",
      emoji: "❤️",
    },
    {
      id: "maintain",
      label: "Maintenir ma forme",
      sublabel: "Stabiliser mes acquis",
      emoji: "🏆",
    },
  ];
  return (
    <View>
      <Text>Step 1</Text>
    </View>
  );
}
