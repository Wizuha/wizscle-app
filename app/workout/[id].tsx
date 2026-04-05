import { useWorkoutStore } from "@/app/store/workoutStore";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  CheckCircle,
  ChevronRight,
  Clock,
  Dumbbell,
  Target,
  Zap,
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

const TYPE_COLORS: Record<string, string> = {
  push: "#4ADE80",
  pull: "#60A5FA",
  legs: "#FB923C",
  upper: "#A78BFA",
  cardio: "#F472B6",
  rest: "#4B5563",
};

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getWorkoutById, toggleWorkoutCompleted } = useWorkoutStore();

  const workout = getWorkoutById(id ?? "");

  if (!workout) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Séance introuvable</Text>
      </SafeAreaView>
    );
  }

  const color = TYPE_COLORS[workout.type] ?? "#4ADE80";

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color="#FFFFFF" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détail de la séance</Text>
        <View style={{ width: 40 }} />
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)}>
          <LinearGradient
            colors={[`${color}20`, `${color}05`]}
            style={[styles.heroCard, { borderColor: `${color}40` }]}
          >
            <View style={styles.heroTop}>
              <View style={[styles.typeBadge, { backgroundColor: `${color}25` }]}>
                <Zap color={color} size={13} />
                <Text style={[styles.typeBadgeText, { color }]}>
                  {workout.type.toUpperCase()}
                </Text>
              </View>
              {workout.completed && (
                <View style={styles.completedBadge}>
                  <CheckCircle color="#4ADE80" size={14} />
                  <Text style={styles.completedText}>Complétée</Text>
                </View>
              )}
            </View>

            <Text style={styles.workoutName}>{workout.name}</Text>
            <Text style={styles.workoutDay}>{workout.day}</Text>

            {/* Stats */}
            <View style={styles.heroStats}>
              <View style={styles.heroStat}>
                <Clock color={color} size={18} />
                <Text style={styles.heroStatValue}>{workout.duration}</Text>
                <Text style={styles.heroStatLabel}>minutes</Text>
              </View>
              <View style={styles.heroStatDivider} />
              <View style={styles.heroStat}>
                <Dumbbell color={color} size={18} />
                <Text style={styles.heroStatValue}>{workout.exercises.length}</Text>
                <Text style={styles.heroStatLabel}>exercices</Text>
              </View>
              <View style={styles.heroStatDivider} />
              <View style={styles.heroStat}>
                <Target color={color} size={18} />
                <Text style={styles.heroStatValue}>
                  {workout.targetMuscles.length}
                </Text>
                <Text style={styles.heroStatLabel}>muscles</Text>
              </View>
            </View>

            {/* Muscles */}
            <View style={styles.musclesList}>
              {workout.targetMuscles.map((m) => (
                <View key={m} style={[styles.muscleBadge, { borderColor: `${color}40` }]}>
                  <Text style={[styles.muscleBadgeText, { color }]}>{m}</Text>
                </View>
              ))}
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Liste des exercices */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)}>
          <Text style={styles.sectionTitle}>Exercices</Text>
          <View style={styles.exercisesList}>
            {workout.exercises.map((exercise, index) => (
              <Animated.View
                key={exercise.id}
                entering={FadeInDown.delay(220 + index * 60).duration(350)}
              >
                <TouchableOpacity
                  style={styles.exerciseCard}
                  onPress={() =>
                    router.push(`/workout/exercise/${exercise.id}`)
                  }
                  activeOpacity={0.75}
                >
                  {/* Numéro */}
                  <View style={styles.exerciseNumber}>
                    <Text style={styles.exerciseNumberText}>{index + 1}</Text>
                  </View>

                  <View style={styles.exerciseContent}>
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                    <View style={styles.exerciseMeta}>
                      {exercise.muscleGroups.slice(0, 2).map((m) => (
                        <Text key={m} style={styles.exerciseMusclePill}>
                          {m}
                        </Text>
                      ))}
                    </View>
                  </View>

                  <View style={styles.exerciseSetsInfo}>
                    <Text style={styles.exerciseSetsValue}>
                      {exercise.sets}×{exercise.reps}
                    </Text>
                    <Text style={styles.exerciseSetsLabel}>
                      repos {exercise.rest}s
                    </Text>
                  </View>

                  <ChevronRight color="#4B5563" size={16} />
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Footer CTA */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.ctaButton,
            workout.completed && styles.ctaButtonCompleted,
          ]}
          onPress={() => toggleWorkoutCompleted(workout.id)}
          activeOpacity={0.85}
        >
          {workout.completed ? (
            <>
              <CheckCircle color="#000" size={20} />
              <Text style={styles.ctaButtonText}>Séance terminée ✓</Text>
            </>
          ) : (
            <>
              <Zap color="#000" size={20} />
              <Text style={styles.ctaButtonText}>Marquer comme terminée</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
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
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    marginBottom: 28,
  },
  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  typeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  typeBadgeText: { fontSize: 11, fontWeight: "700", letterSpacing: 1 },
  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(74,222,128,0.15)",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  completedText: { fontSize: 12, color: "#4ADE80", fontWeight: "600" },
  workoutName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  workoutDay: { fontSize: 14, color: "#9CA3AF", marginBottom: 20 },
  heroStats: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 12,
    padding: 14,
  },
  heroStat: { flex: 1, alignItems: "center", gap: 4 },
  heroStatValue: { fontSize: 22, fontWeight: "bold", color: "#FFFFFF" },
  heroStatLabel: { fontSize: 11, color: "#9CA3AF" },
  heroStatDivider: { width: 1, backgroundColor: "rgba(255,255,255,0.1)", marginHorizontal: 8 },
  musclesList: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  muscleBadge: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  muscleBadgeText: { fontSize: 12, fontWeight: "500" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 14,
  },
  exercisesList: { gap: 10 },
  exerciseCard: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  exerciseNumber: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
  },
  exerciseNumberText: { fontSize: 14, fontWeight: "bold", color: "#6B7280" },
  exerciseContent: { flex: 1 },
  exerciseName: { fontSize: 14, fontWeight: "600", color: "#FFFFFF", marginBottom: 4 },
  exerciseMeta: { flexDirection: "row", gap: 6 },
  exerciseMusclePill: { fontSize: 11, color: "#6B7280" },
  exerciseSetsInfo: { alignItems: "flex-end", gap: 2 },
  exerciseSetsValue: { fontSize: 15, fontWeight: "bold", color: "#4ADE80" },
  exerciseSetsLabel: { fontSize: 11, color: "#4B5563" },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
    backgroundColor: "#000000",
    borderTopWidth: 1,
    borderTopColor: "#1f2937",
  },
  ctaButton: {
    backgroundColor: "#4ADE80",
    height: 56,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#4ADE80",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  ctaButtonCompleted: {
    backgroundColor: "#166534",
    shadowColor: "#166534",
  },
  ctaButtonText: { fontSize: 16, fontWeight: "bold", color: "#000000" },
  errorText: { color: "#6B7280", textAlign: "center", marginTop: 100, fontSize: 16 },
});
