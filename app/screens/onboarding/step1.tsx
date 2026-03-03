import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingStep() {
  const [selectedDays, setSelectedDays] = useState<number | null>(null);
  const [selectedTimes, setSelectedTimes] = useState<string | null>(null);
  const daysOptions = [3, 4, 5, 6, 7];
  const timesOptions = ["30-45", "45-60", "60-75", "75-90", "90+"];
  const router = useRouter();

  const handleText = async () => {
    try {
      const step1Data = {
        days: selectedDays,
        times: selectedTimes,
      };
      await AsyncStorage.setItem("onboarding_step1", JSON.stringify(step1Data));
      router.push("/screens/onboarding/step2");
    } catch (error) {
      console.log("Erreur detecté :", error);
    }
  };
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* Header compact */}
      <View style={styles.header}>
        <Text style={styles.title}>Disponibilité</Text>
        <Text style={styles.subtitle}>Planifions vos entraînements</Text>
      </View>

      {/* Contenu scrollable */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formSection}>
          <Text style={styles.sectionLabel}>Jours par semaine</Text>
          <View style={styles.optionsGrid}>
            {daysOptions.map((days) => (
              <TouchableOpacity
                key={days}
                style={[
                  styles.optionButton,
                  selectedDays === days && styles.optionButtonSelected,
                ]}
                onPress={() => setSelectedDays(days)}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    selectedDays == days && styles.optionButtonTextSelected,
                  ]}
                >
                  {days} jours
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionLabel}>Durée des séances</Text>
          <View style={styles.optionsGrid}>
            {timesOptions.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.optionButton,
                  selectedTimes === time && styles.optionButtonSelected,
                ]}
                onPress={() => setSelectedTimes(time)}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    selectedTimes === time && styles.optionButtonTextSelected,
                  ]}
                >
                  {time} min
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Footer avec bouton */}
      <View style={styles.footer}>
        <View style={styles.progressContainer}>
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Précédent</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => handleText()}
        >
          <Text style={styles.nextButtonText}>Suivant</Text>
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

  header: {
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.5,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#9CA3AF",
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },

  formSection: {
    marginBottom: 32,
  },

  sectionLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 16,
  },

  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  optionButton: {
    paddingVertical: 22,
    paddingHorizontal: 24,
    borderRadius: 16,
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#374151",
    minWidth: 100,
    alignItems: "center",
  },

  optionButtonSelected: {
    backgroundColor: "#4ADE80",
    borderColor: "#4ADE80",
  },

  optionButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },

  optionButtonTextSelected: {
    color: "#000000",
    fontWeight: "600",
  },

  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },

  nextButton: {
    backgroundColor: "#4ADE80",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    minHeight: 56,
  },

  nextButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
  },
  backButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#4ADE80",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4ADE80",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#374151",
  },
  progressDotActive: {
    backgroundColor: "#4ADE80",
    width: 24,
  },
});
