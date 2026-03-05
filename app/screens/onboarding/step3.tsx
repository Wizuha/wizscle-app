import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingStep3() {
  const router = useRouter();
  const [selectedPlaces, setSelectedPlaces] = useState<string | null>(null);
  const placeOptions = [
    "Salles de sport complète",
    "A la maison avec équipement",
    "A la maison sans équipement",
    "Equipement limité",
  ];
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await AsyncStorage.getItem("onboarding_step1");
        if (data) {
          const parsed = JSON.parse(data);
          console.log("Données step1", parsed);
        }
      } catch (error) {
        console.log("Erreur detecté :");
      }
    };
    loadData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Equipement disponible</Text>
        <Text style={styles.subtitle}>Où vous entraînez-vous ?</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.progressContainer}>
          <View style={styles.progressDot} />
          <View style={[styles.progressDot, styles.progressDotActive]} />
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
          // onPress={() => router.push("/screens/onboarding/step4")}
        >
          <Text style={styles.nextButtonText}>Suivant</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Styles basiques pour tester
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  header: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 16,
    color: "#9CA3AF",
    marginTop: 8,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    gap: 12,
  },
  backButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#4ADE80",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4ADE80",
  },
  nextButton: {
    backgroundColor: "#4ADE80",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
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
