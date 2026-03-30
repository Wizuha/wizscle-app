import { useOnboardingStore } from "@/app/store/onboardingStore";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const LEVELS = [
  { id: "beginner", label: "Débutant", sublabel: "< 1 an d'entraînement", emoji: "🌱" },
  { id: "intermediate", label: "Intermédiaire", sublabel: "1 à 3 ans", emoji: "💪" },
  { id: "advanced", label: "Avancé", sublabel: "> 3 ans", emoji: "🏆" },
];

export default function OnboardingStep4() {
  const router = useRouter();
  const setStep4Data = useOnboardingStore((state) => state.setStep4Data);

  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [sex, setSex] = useState<"male" | "female" | null>(null);
  const [level, setLevel] = useState<string | null>(null);

  const weightRef = useRef<TextInput>(null);
  const heightRef = useRef<TextInput>(null);

  const canProceed = age && weight && height && sex && level;

  const handleContinue = () => {
    if (canProceed && sex && level) {
      setStep4Data({
        age,
        weight,
        height,
        sex,
        experienceLevel: level,
      });
      router.push("/screens/onboarding/loading");
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

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <Animated.View entering={FadeIn.duration(500)} style={styles.header}>
            <View style={styles.progressContainer}>
              {[1, 2, 3, 4].map((i) => (
                <View
                  key={i}
                  style={[styles.progressDot, styles.progressDotActive]}
                />
              ))}
              <Text style={styles.progressText}>4/4</Text>
            </View>
            <Text style={styles.title}>
              Votre{"\n"}
              <Text style={styles.titleHighlight}>profil physique</Text>
            </Text>
            <Text style={styles.subtitle}>
              Ces données permettront à l'IA de calibrer précisément votre programme
            </Text>
          </Animated.View>

          {/* Sexe */}
          <Animated.View entering={FadeIn.delay(100).duration(350)} style={styles.section}>
            <Text style={styles.sectionLabel}>Sexe biologique</Text>
            <View style={styles.sexRow}>
              {(["male", "female"] as const).map((s) => (
                <TouchableOpacity
                  key={s}
                  style={[styles.sexButton, sex === s && styles.sexButtonSelected]}
                  onPress={() => setSex(s)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.sexEmoji}>
                    {s === "male" ? "♂️" : "♀️"}
                  </Text>
                  <Text
                    style={[
                      styles.sexLabel,
                      sex === s && styles.sexLabelSelected,
                    ]}
                  >
                    {s === "male" ? "Homme" : "Femme"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>

          {/* Métriques */}
          <Animated.View entering={FadeIn.delay(150).duration(350)} style={styles.section}>
            <Text style={styles.sectionLabel}>Métriques</Text>
            <View style={styles.metricsRow}>
              {/* Âge */}
              <View style={styles.metricField}>
                <Text style={styles.metricFieldLabel}>Âge</Text>
                <View style={styles.metricInputRow}>
                  <TextInput
                    style={styles.metricInput}
                    value={age}
                    onChangeText={setAge}
                    placeholder="25"
                    placeholderTextColor="#4B5563"
                    keyboardType="number-pad"
                    maxLength={3}
                    returnKeyType="next"
                    onSubmitEditing={() => weightRef.current?.focus()}
                  />
                  <Text style={styles.metricUnit}>ans</Text>
                </View>
              </View>

              {/* Poids */}
              <View style={styles.metricField}>
                <Text style={styles.metricFieldLabel}>Poids</Text>
                <View style={styles.metricInputRow}>
                  <TextInput
                    ref={weightRef}
                    style={styles.metricInput}
                    value={weight}
                    onChangeText={setWeight}
                    placeholder="75"
                    placeholderTextColor="#4B5563"
                    keyboardType="decimal-pad"
                    maxLength={5}
                    returnKeyType="next"
                    onSubmitEditing={() => heightRef.current?.focus()}
                  />
                  <Text style={styles.metricUnit}>kg</Text>
                </View>
              </View>

              {/* Taille */}
              <View style={styles.metricField}>
                <Text style={styles.metricFieldLabel}>Taille</Text>
                <View style={styles.metricInputRow}>
                  <TextInput
                    ref={heightRef}
                    style={styles.metricInput}
                    value={height}
                    onChangeText={setHeight}
                    placeholder="175"
                    placeholderTextColor="#4B5563"
                    keyboardType="number-pad"
                    maxLength={3}
                    returnKeyType="done"
                  />
                  <Text style={styles.metricUnit}>cm</Text>
                </View>
              </View>
            </View>
          </Animated.View>

          {/* Niveau */}
          <Animated.View entering={FadeIn.delay(200).duration(350)} style={styles.section}>
            <Text style={styles.sectionLabel}>Niveau d'expérience</Text>
            <View style={styles.levelsContainer}>
              {LEVELS.map((l, index) => {
                const isSelected = level === l.id;
                return (
                  <Animated.View
                    key={l.id}
                    entering={FadeIn.delay(200 + index * 60).duration(300)}
                  >
                    <TouchableOpacity
                      style={[styles.levelCard, isSelected && styles.levelCardSelected]}
                      onPress={() => setLevel(l.id)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.levelEmoji}>{l.emoji}</Text>
                      <View style={styles.levelTextContainer}>
                        <Text
                          style={[
                            styles.levelLabel,
                            isSelected && styles.levelLabelSelected,
                          ]}
                        >
                          {l.label}
                        </Text>
                        <Text style={styles.levelSublabel}>{l.sublabel}</Text>
                      </View>
                      <View
                        style={[styles.radio, isSelected && styles.radioSelected]}
                      >
                        {isSelected && <View style={styles.radioInner} />}
                      </View>
                    </TouchableOpacity>
                  </Animated.View>
                );
              })}
            </View>
          </Animated.View>

          <View style={{ height: 120 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Précédent</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.continueButton,
            !canProceed && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!canProceed}
        >
          <Text style={styles.continueButtonText}>Générer mon programme</Text>
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
  scrollContent: { paddingHorizontal: 24, paddingTop: 32 },
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
  section: { marginBottom: 28 },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 14,
  },
  sexRow: { flexDirection: "row", gap: 12 },
  sexButton: {
    flex: 1,
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
    gap: 8,
  },
  sexButtonSelected: {
    backgroundColor: "#0d1f14",
    borderColor: "#4ADE80",
    shadowColor: "#4ADE80",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 6,
  },
  sexEmoji: { fontSize: 28 },
  sexLabel: { fontSize: 15, fontWeight: "600", color: "#9CA3AF" },
  sexLabelSelected: { color: "#4ADE80" },
  metricsRow: { flexDirection: "row", gap: 12 },
  metricField: { flex: 1 },
  metricFieldLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: "#6B7280",
    marginBottom: 8,
    textAlign: "center",
  },
  metricInputRow: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
  },
  metricInput: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    width: "100%",
  },
  metricUnit: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  levelsContainer: { gap: 10 },
  levelCard: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  levelCardSelected: {
    backgroundColor: "#0d1f14",
    borderColor: "#4ADE80",
    shadowColor: "#4ADE80",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 6,
  },
  levelEmoji: { fontSize: 24 },
  levelTextContainer: { flex: 1 },
  levelLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#D1D5DB",
    marginBottom: 2,
  },
  levelLabelSelected: { color: "#FFFFFF" },
  levelSublabel: { fontSize: 13, color: "#6B7280" },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#374151",
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: { backgroundColor: "#4ADE80", borderColor: "#4ADE80" },
  radioInner: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
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
  continueButtonText: { color: "#000000", fontSize: 18, fontWeight: "bold" },
});
