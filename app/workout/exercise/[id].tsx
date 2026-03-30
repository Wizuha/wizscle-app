import { useWorkoutStore } from "@/app/store/workoutStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  AlertCircle,
  ArrowLeft,
  Clock,
  Dumbbell,
  RotateCcw,
} from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getExerciseById } = useWorkoutStore();

  const exercise = getExerciseById(id ?? "");

  if (!exercise) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Exercice introuvable</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft color="#FFFFFF" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Exercice</Text>
        <View style={{ width: 40 }} />
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <Animated.View entering={FadeInDown.delay(80).duration(400)} style={styles.heroCard}>
          {/* Placeholder illustration */}
          <View style={styles.illustration}>
            <Dumbbell color="#4ADE80" size={48} strokeWidth={1.5} />
          </View>

          <Text style={styles.exerciseName}>{exercise.name}</Text>
          <Text style={styles.exerciseEquipment}>
            🏋️ {exercise.equipment}
          </Text>

          {/* Muscles */}
          <View style={styles.musclesList}>
            {exercise.muscleGroups.map((m) => (
              <View key={m} style={styles.muscleBadge}>
                <Text style={styles.muscleBadgeText}>{m}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Sets / Reps / Repos */}
        <Animated.View entering={FadeInDown.delay(160).duration(400)} style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{exercise.sets}</Text>
            <Text style={styles.statLabel}>séries</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{exercise.reps}</Text>
            <Text style={styles.statLabel}>répétitions</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Clock color="#4ADE80" size={18} />
            <Text style={styles.statValue}>{exercise.rest}s</Text>
            <Text style={styles.statLabel}>repos</Text>
          </View>
        </Animated.View>

        {/* Instructions */}
        <Animated.View entering={FadeInDown.delay(240).duration(400)}>
          <Text style={styles.sectionTitle}>Comment réaliser l'exercice</Text>
          <View style={styles.instructionsList}>
            {exercise.instructions.map((step, index) => (
              <Animated.View
                key={index}
                entering={FadeInDown.delay(240 + index * 50).duration(300)}
                style={styles.instructionItem}
              >
                <View style={styles.instructionNumber}>
                  <Text style={styles.instructionNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.instructionText}>{step}</Text>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Conseil */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.tipCard}>
          <View style={styles.tipHeader}>
            <AlertCircle color="#FBBF24" size={16} />
            <Text style={styles.tipTitle}>Conseil de l'IA</Text>
          </View>
          <Text style={styles.tipText}>{exercise.tips}</Text>
        </Animated.View>

        {/* Séries à suivre */}
        <Animated.View entering={FadeInDown.delay(480).duration(400)}>
          <Text style={styles.sectionTitle}>Suivi des séries</Text>
          <View style={styles.setTracker}>
            {Array.from({ length: exercise.sets }).map((_, i) => (
              <View key={i} style={styles.setRow}>
                <View style={styles.setNumber}>
                  <Text style={styles.setNumberText}>Série {i + 1}</Text>
                </View>
                <View style={styles.setReps}>
                  <Text style={styles.setRepsLabel}>Objectif</Text>
                  <Text style={styles.setRepsValue}>{exercise.reps} reps</Text>
                </View>
                <View style={styles.setRest}>
                  <RotateCcw color="#4B5563" size={13} />
                  <Text style={styles.setRestText}>{exercise.rest}s</Text>
                </View>
                <View style={styles.setCheck} />
              </View>
            ))}
          </View>
        </Animated.View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#1f2937",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { fontSize: 16, fontWeight: "600", color: "#FFFFFF" },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 32 },
  heroCard: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 16,
  },
  illustration: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: "rgba(74,222,128,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  exerciseName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 6,
  },
  exerciseEquipment: { fontSize: 14, color: "#9CA3AF", marginBottom: 14 },
  musclesList: { flexDirection: "row", flexWrap: "wrap", gap: 8, justifyContent: "center" },
  muscleBadge: {
    backgroundColor: "rgba(74,222,128,0.1)",
    borderWidth: 1,
    borderColor: "rgba(74,222,128,0.3)",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  muscleBadgeText: { fontSize: 12, color: "#4ADE80", fontWeight: "500" },
  statsRow: {
    flexDirection: "row",
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    alignItems: "center",
  },
  statCard: { flex: 1, alignItems: "center", gap: 4 },
  statValue: { fontSize: 24, fontWeight: "bold", color: "#FFFFFF" },
  statLabel: { fontSize: 11, color: "#6B7280" },
  statDivider: { width: 1, height: 40, backgroundColor: "#1f2937", marginHorizontal: 8 },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 14,
  },
  instructionsList: { gap: 10, marginBottom: 24 },
  instructionItem: {
    flexDirection: "row",
    gap: 14,
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 12,
    padding: 14,
    alignItems: "flex-start",
  },
  instructionNumber: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: "rgba(74,222,128,0.15)",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  instructionNumberText: { fontSize: 12, fontWeight: "bold", color: "#4ADE80" },
  instructionText: { flex: 1, fontSize: 14, color: "#D1D5DB", lineHeight: 20 },
  tipCard: {
    backgroundColor: "rgba(251,191,36,0.05)",
    borderWidth: 1,
    borderColor: "rgba(251,191,36,0.3)",
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
  },
  tipHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 },
  tipTitle: { fontSize: 14, fontWeight: "600", color: "#FBBF24" },
  tipText: { fontSize: 14, color: "#D1D5DB", lineHeight: 20 },
  setTracker: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 16,
    overflow: "hidden",
  },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#1f2937",
    gap: 12,
  },
  setNumber: { flex: 0.8 },
  setNumberText: { fontSize: 14, fontWeight: "600", color: "#FFFFFF" },
  setReps: { flex: 1, alignItems: "center" },
  setRepsLabel: { fontSize: 10, color: "#4B5563" },
  setRepsValue: { fontSize: 13, fontWeight: "600", color: "#9CA3AF" },
  setRest: { flexDirection: "row", alignItems: "center", gap: 4, flex: 0.6 },
  setRestText: { fontSize: 12, color: "#4B5563" },
  setCheck: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#374151",
  },
});
