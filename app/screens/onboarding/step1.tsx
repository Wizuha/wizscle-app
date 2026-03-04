import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ChevronRight, Sparkles } from "lucide-react-native";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

interface Goal {
  id: string;
  label: string;
  sublabel: string;
  emoji: string;
}
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
export default function OnboardingStep1() {
  const router = useRouter();
  const [primaryGoal, setPrimaryGoal] = useState<string | null>(null);
  const [secondaryGoals, setSecondaryGoals] = useState<string[]>([]);
  const [targetWeight, setTargetWeight] = useState<string>("");
  const [step, setStep] = useState<"primary" | "secondary">("primary");

  const showTargetWeight =
    primaryGoal === "lose-weight" || primaryGoal === "gain-muscle";
  const canProceed = primaryGoal !== null;

  const handlePrimarySelect = (id: string) => {
    setPrimaryGoal(id);
    setStep("secondary");
  };
  const toggleSecondary = (id: string) => {
    if (id === primaryGoal) return;
    setSecondaryGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (step === "primary") {
      setStep("secondary");
    } else {
      // Sauvegarder et passer au step suivant
      router.push("/screens/onboarding/step2");
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* Ambient glow background */}
      <LinearGradient
        colors={["rgba(74,222,128,0.06)", "transparent"]}
        style={styles.ambientGlow}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.7 }}
      />

      {/* Main content */}
      <View style={styles.content}>
        {/* Header avec barre de progression */}
        <Animated.View entering={FadeIn.duration(500)} style={styles.header}>
          {/* Progress bar */}
          <View style={styles.progressContainer}>
            {[1, 2, 3, 4].map((i) => (
              <View
                key={i}
                style={[
                  styles.progressDot,
                  i === 1 && styles.progressDotActive,
                ]}
              />
            ))}
            <Text style={styles.progressText}>1/4</Text>
          </View>

          {/* Badge Coach IA */}
          <View style={styles.badgeContainer}>
            <Sparkles color="#4ADE80" size={20} />
            <Text style={styles.badgeText}>COACH IA</Text>
          </View>

          {/* Titre */}
          <Text style={styles.title}>
            Quel est votre{"\n"}
            <Text style={styles.titleHighlight}>objectif principal ?</Text>
          </Text>
          <Text style={styles.subtitle}>
            Votre IA adaptera chaque programme à ce but précis
          </Text>
        </Animated.View>

        {/* ScrollView avec les objectifs */}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* On va ajouter les cards ici */}
        </ScrollView>
      </View>

      {/* Bouton fixe en bas */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !canProceed && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!canProceed}
        >
          <Text style={styles.continueButtonText}>Continuer</Text>
          <ChevronRight color="#000" size={20} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  ambientGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    pointerEvents: "none",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 100,
  },

  // Header
  header: {
    marginBottom: 24,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  progressDot: {
    height: 4,
    flex: 1,
    borderRadius: 2,
    backgroundColor: "rgba(55,65,81,0.6)",
    marginRight: 8,
  },
  progressDotActive: {
    backgroundColor: "#4ADE80",
    shadowColor: "#4ADE80",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 4,
  },
  progressText: {
    color: "#9CA3AF",
    fontSize: 14,
    marginLeft: 8,
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  badgeText: {
    color: "#4ADE80",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  titleHighlight: {
    color: "#4ADE80",
  },
  subtitle: {
    fontSize: 16,
    color: "#9CA3AF",
  },

  // ScrollView
  scrollView: {
    flex: 1,
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    backgroundColor: "#000000",
  },
  continueButton: {
    backgroundColor: "#4ADE80",
    height: 56,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#4ADE80",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 8,
  },
  continueButtonDisabled: {
    backgroundColor: "#1f2937",
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
});
