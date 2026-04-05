import { useOnboardingStore } from "@/app/store/onboardingStore";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ChevronRight, Dumbbell, Home, MapPin, Zap } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

interface LocationOption {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
}

export default function OnboardingStep3() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const setStep3Data = useOnboardingStore((state) => state.setStep3Data);

  const options: LocationOption[] = [
    {
      id: "Salle de sport complète",
      label: "Salle de sport complète",
      sublabel: "Tous les équipements disponibles",
      icon: <Dumbbell color="#4ADE80" size={24} />,
    },
    {
      id: "À la maison avec équipement",
      label: "À la maison avec équipement",
      sublabel: "Haltères, barre, banc...",
      icon: <Home color="#4ADE80" size={24} />,
    },
    {
      id: "À la maison sans équipement",
      label: "À la maison sans équipement",
      sublabel: "Poids du corps uniquement",
      icon: <Zap color="#4ADE80" size={24} />,
    },
    {
      id: "Équipement limité",
      label: "Équipement limité",
      sublabel: "Quelques haltères ou bandes élastiques",
      icon: <MapPin color="#4ADE80" size={24} />,
    },
  ];

  const handleContinue = () => {
    if (selected) {
      setStep3Data({ trainingLocation: selected });
      router.push("/screens/onboarding/step4");
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <LinearGradient
        colors={["rgba(74,222,128,0.06)", "transparent"]}
        style={styles.ambientGlow}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.7 }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeIn.duration(500)} style={styles.header}>
          <View style={styles.progressContainer}>
            {[1, 2, 3, 4].map((i) => (
              <View
                key={i}
                style={[styles.progressDot, i <= 3 && styles.progressDotActive]}
              />
            ))}
            <Text style={styles.progressText}>3/4</Text>
          </View>
          <Text style={styles.title}>
            Où vous{"\n"}
            <Text style={styles.titleHighlight}>entraînez-vous ?</Text>
          </Text>
          <Text style={styles.subtitle}>
            Votre programme sera adapté à votre équipement disponible
          </Text>
        </Animated.View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {options.map((option, index) => {
            const isSelected = selected === option.id;
            return (
              <Animated.View
                key={option.id}
                entering={FadeIn.delay(index * 80).duration(350)}
              >
                <TouchableOpacity
                  style={[styles.optionCard, isSelected && styles.optionCardSelected]}
                  onPress={() => setSelected(option.id)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.optionIcon,
                      isSelected && styles.optionIconSelected,
                    ]}
                  >
                    {option.icon}
                  </View>
                  <View style={styles.optionTextContainer}>
                    <Text
                      style={[
                        styles.optionLabel,
                        isSelected && styles.optionLabelSelected,
                      ]}
                    >
                      {option.label}
                    </Text>
                    <Text
                      style={[
                        styles.optionSublabel,
                        isSelected && styles.optionSublabelSelected,
                      ]}
                    >
                      {option.sublabel}
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
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Précédent</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.continueButton, !selected && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!selected}
        >
          <Text style={styles.continueButtonText}>Continuer</Text>
          <ChevronRight color="#000" size={20} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000" },
  ambientGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    pointerEvents: "none",
  },
  scrollView: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 120,
  },
  header: { marginBottom: 32 },
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
  progressText: { color: "#9CA3AF", fontSize: 14, marginLeft: 8 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  titleHighlight: { color: "#4ADE80" },
  subtitle: { fontSize: 16, color: "#9CA3AF" },
  optionsContainer: { gap: 12 },
  optionCard: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  optionCardSelected: {
    backgroundColor: "#0d1f14",
    borderColor: "#4ADE80",
    shadowColor: "#4ADE80",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 6,
  },
  optionIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
  },
  optionIconSelected: { backgroundColor: "rgba(74,222,128,0.15)" },
  optionTextContainer: { flex: 1 },
  optionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#D1D5DB",
    marginBottom: 4,
  },
  optionLabelSelected: { color: "#FFFFFF" },
  optionSublabel: { fontSize: 13, color: "#6B7280" },
  optionSublabelSelected: { color: "#9CA3AF" },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#374151",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: { backgroundColor: "#4ADE80", borderColor: "#4ADE80" },
  checkboxInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#000000",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    backgroundColor: "#000000",
    gap: 12,
  },
  backButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#374151",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  backButtonText: { fontSize: 16, fontWeight: "600", color: "#9CA3AF" },
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
