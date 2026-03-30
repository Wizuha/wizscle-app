import { useOnboardingStore } from "@/app/store/onboardingStore";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ChevronRight, Scale } from "lucide-react-native";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
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
  const setStep1Data = useOnboardingStore((state) => state.setStep1Data);
  const [secondaryGoals, setSecondaryGoals] = useState<string[]>([]);
  const [targetWeight, setTargetWeight] = useState<string>("");
  const [step, setStep] = useState<"primary" | "secondary">("primary");

  const showTargetWeight =
    primaryGoal === "lose-weight" || primaryGoal === "gain-muscle";
  const canProceed = primaryGoal !== null;

  const handlePrimarySelect = (id: string) => {
    setPrimaryGoal(id);
    setSecondaryGoals([]); // Reset secondaires
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
      if (primaryGoal) {
        setStep1Data({
          primaryGoal,
          secondaryGoals,
          targetWeight,
        });
      }
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

          {/* Titre qui change selon le step */}
          {step === "primary" ? (
            <Animated.View entering={FadeIn.duration(300)}>
              <Text style={styles.title}>
                Quel est votre{"\n"}
                <Text style={styles.titleHighlight}>objectif principal ?</Text>
              </Text>
              <Text style={styles.subtitle}>
                Votre IA adaptera chaque programme à ce but précis
              </Text>
            </Animated.View>
          ) : (
            <Animated.View entering={FadeIn.duration(300)}>
              <Text style={styles.title}>
                Objectifs{"\n"}
                <Text style={styles.titleHighlight}>secondaires ?</Text>
              </Text>
              <Text style={styles.subtitle}>
                Sélectionnez tout ce qui vous motive (optionnel)
              </Text>
            </Animated.View>
          )}
        </Animated.View>

        {/* ScrollView avec les objectifs */}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {step === "primary" ? (
            // ÉCRAN PRIMARY (déjà fait)
            <>
              <View style={styles.goalsContainer}>
                {goals.map((goal, index) => {
                  const isSelected = primaryGoal === goal.id;

                  return (
                    <Animated.View
                      key={goal.id}
                      entering={FadeIn.delay(index * 50).duration(350)}
                    >
                      <TouchableOpacity
                        style={[
                          styles.goalCard,
                          isSelected && styles.goalCardSelected,
                        ]}
                        onPress={() => handlePrimarySelect(goal.id)}
                        activeOpacity={0.7}
                      >
                        <View
                          style={[
                            styles.goalIcon,
                            isSelected && styles.goalIconSelected,
                          ]}
                        >
                          <Text style={styles.goalEmoji}>{goal.emoji}</Text>
                        </View>

                        <View style={styles.goalTextContainer}>
                          <Text
                            style={[
                              styles.goalLabel,
                              isSelected && styles.goalLabelSelected,
                            ]}
                          >
                            {goal.label}
                          </Text>
                          <Text
                            style={[
                              styles.goalSublabel,
                              isSelected && styles.goalSublabelSelected,
                            ]}
                          >
                            {goal.sublabel}
                          </Text>
                        </View>

                        <View
                          style={[
                            styles.checkbox,
                            isSelected && styles.checkboxSelected,
                          ]}
                        >
                          {isSelected && <View style={styles.checkboxInner} />}
                        </View>
                      </TouchableOpacity>
                    </Animated.View>
                  );
                })}
              </View>

              {showTargetWeight && (
                <Animated.View
                  entering={FadeIn.duration(300)}
                  exiting={FadeOut.duration(300)}
                  style={styles.targetWeightContainer}
                >
                  <View style={styles.targetWeightHeader}>
                    <Scale color="#4ADE80" size={16} />
                    <Text style={styles.targetWeightLabel}>
                      {primaryGoal === "lose-weight"
                        ? "Poids cible (optionnel)"
                        : "Poids objectif (optionnel)"}
                    </Text>
                  </View>

                  <View style={styles.targetWeightInputRow}>
                    <TextInput
                      style={styles.targetWeightInput}
                      value={targetWeight}
                      onChangeText={setTargetWeight}
                      placeholder="Ex : 75"
                      placeholderTextColor="#6B7280"
                      keyboardType="numeric"
                    />
                    <Text style={styles.targetWeightUnit}>kg</Text>
                  </View>
                </Animated.View>
              )}
            </>
          ) : (
            // ÉCRAN SECONDARY (nouveau)
            <>
              {/* Récap objectif principal */}
              <Animated.View
                entering={FadeIn.duration(300)}
                style={styles.primaryRecap}
              >
                <Text style={styles.primaryRecapEmoji}>
                  {goals.find((g) => g.id === primaryGoal)?.emoji}
                </Text>
                <View style={styles.primaryRecapTextContainer}>
                  <Text style={styles.primaryRecapLabel}>
                    Objectif principal
                  </Text>
                  <Text style={styles.primaryRecapValue}>
                    {goals.find((g) => g.id === primaryGoal)?.label}
                  </Text>
                </View>
              </Animated.View>

              {/* Liste des objectifs secondaires */}
              <View style={styles.goalsContainer}>
                {goals
                  .filter((g) => g.id !== primaryGoal)
                  .map((goal, index) => {
                    const isSelected = secondaryGoals.includes(goal.id);

                    return (
                      <Animated.View
                        key={goal.id}
                        entering={FadeIn.delay(index * 50).duration(350)}
                      >
                        <TouchableOpacity
                          style={[
                            styles.goalCard,
                            isSelected && styles.goalCardSecondarySelected,
                          ]}
                          onPress={() => toggleSecondary(goal.id)}
                          activeOpacity={0.7}
                        >
                          <View
                            style={[
                              styles.goalIconSmall,
                              isSelected && styles.goalIconSelected,
                            ]}
                          >
                            <Text style={styles.goalEmojiSmall}>
                              {goal.emoji}
                            </Text>
                          </View>

                          <View style={styles.goalTextContainer}>
                            <Text
                              style={[
                                styles.goalLabel,
                                isSelected && styles.goalLabelSelected,
                              ]}
                            >
                              {goal.label}
                            </Text>
                          </View>

                          {/* Checkbox carré pour multi-select */}
                          <View
                            style={[
                              styles.checkboxSquare,
                              isSelected && styles.checkboxSquareSelected,
                            ]}
                          >
                            {isSelected && (
                              <View style={styles.checkboxSquareCheck} />
                            )}
                          </View>
                        </TouchableOpacity>
                      </Animated.View>
                    );
                  })}
              </View>

              {/* Hint */}
              <Text style={styles.skipHint}>
                Vous pouvez passer cette étape
              </Text>
            </>
          )}
        </ScrollView>
      </View>

      {/* Bouton fixe en bas */}
      <View style={styles.footer}>
        {step === "secondary" && (
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => router.push("/screens/onboarding/step2")}
          >
            <Text style={styles.skipButtonText}>Passer cette étape →</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[
            styles.continueButton,
            !canProceed && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!canProceed}
        >
          <Text style={styles.continueButtonText}>
            {step === "primary" ? "Continuer" : "Générer mon programme"}
          </Text>
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
  goalsContainer: {
    gap: 12,
    paddingBottom: 16,
  },
  goalCard: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  goalCardSelected: {
    backgroundColor: "#0d1f14",
    borderColor: "#4ADE80",
    shadowColor: "#4ADE80",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 8,
  },

  // Icon
  goalIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
  },
  goalIconSelected: {
    backgroundColor: "rgba(74,222,128,0.2)",
  },
  goalEmoji: {
    fontSize: 24,
  },

  // Text
  goalTextContainer: {
    flex: 1,
  },
  goalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#D1D5DB",
    marginBottom: 4,
  },
  goalLabelSelected: {
    color: "#FFFFFF",
  },
  goalSublabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  goalSublabelSelected: {
    color: "#9CA3AF",
  },

  // Checkbox
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#374151",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    backgroundColor: "#4ADE80",
    borderColor: "#4ADE80",
  },
  checkboxInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#000000",
  },

  // Target weight input
  targetWeightContainer: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 16,
    padding: 16,
    marginTop: 4,
  },
  targetWeightHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  targetWeightLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  targetWeightInputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  targetWeightInput: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: "#FFFFFF",
    fontSize: 16,
  },
  targetWeightUnit: {
    fontSize: 16,
    fontWeight: "600",
    color: "#9CA3AF",
  },
  // Récap objectif principal
  primaryRecap: {
    backgroundColor: "#0d1f14",
    borderWidth: 1,
    borderColor: "rgba(74,222,128,0.4)",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
    shadowColor: "#4ADE80",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 4,
  },
  primaryRecapEmoji: {
    fontSize: 28,
  },
  primaryRecapTextContainer: {
    flex: 1,
  },
  primaryRecapLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 4,
  },
  primaryRecapValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4ADE80",
  },

  // Goals secondaires (plus compacts)
  goalIconSmall: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
  },
  goalEmojiSmall: {
    fontSize: 20,
  },

  // Checkbox carré pour multi-select
  checkboxSquare: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#374151",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSquareSelected: {
    backgroundColor: "#4ADE80",
    borderColor: "#4ADE80",
  },
  checkboxSquareCheck: {
    width: 10,
    height: 6,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#000000",
    transform: [{ rotate: "-45deg" }, { translateY: -1 }],
  },

  // Card secondaire (moins de glow)
  goalCardSecondarySelected: {
    backgroundColor: "#0d1f14",
    borderColor: "rgba(74,222,128,0.6)",
    shadowColor: "#4ADE80",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 4,
  },

  // Hint
  skipHint: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 12,
    marginTop: 16,
  },

  // Bouton skip
  skipButton: {
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  skipButtonText: {
    color: "#6B7280",
    fontSize: 14,
  },
});
