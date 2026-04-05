import { useNutritionStore } from "@/app/store/nutritionStore";
import { useUserStore } from "@/app/store/userStore";
import { useWorkoutStore } from "@/app/store/workoutStore";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Bell,
  ChevronRight,
  Flame,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react-native";
import { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const DAY_NAMES = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const MONTH_NAMES = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

function MacroBar({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <View style={macroStyles.container}>
      <View style={macroStyles.header}>
        <Text style={macroStyles.label}>{label}</Text>
        <Text style={macroStyles.value}>{value}g</Text>
      </View>
      <View style={macroStyles.track}>
        <View style={[macroStyles.fill, { width: `${pct}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const macroStyles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  label: { fontSize: 11, color: "#6B7280" },
  value: { fontSize: 11, fontWeight: "600", color: "#9CA3AF" },
  track: {
    height: 4,
    backgroundColor: "#1f2937",
    borderRadius: 2,
    overflow: "hidden",
  },
  fill: { height: "100%", borderRadius: 2 },
});

export default function DashboardScreen() {
  const router = useRouter();
  const { profile, isOnboarded, checkOnboarding } = useUserStore();
  const { program } = useWorkoutStore();
  const { weekPlan } = useNutritionStore();

  useEffect(() => {
    checkOnboarding().then((onboarded) => {
      if (!onboarded) {
        router.replace("/screens/auth/WelcomeScreen");
      }
    });
  }, []);

  const today = new Date();
  const todayDayIndex = (today.getDay() + 6) % 7; // 0=lundi
  const todayLabel = `${DAY_NAMES[today.getDay()]} ${today.getDate()} ${MONTH_NAMES[today.getMonth()]}`;

  const todayWorkout = program[todayDayIndex];
  const todayMeals = weekPlan[todayDayIndex];

  const completedWorkouts = program.filter((s) => s.completed).length;
  const totalWorkoutDays = program.filter((s) => s.type !== "rest").length;
  const weekProgress = Math.round((completedWorkouts / totalWorkoutDays) * 100);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View
          entering={FadeIn.duration(500)}
          style={styles.header}
        >
          <View>
            <Text style={styles.greeting}>Bonjour, {profile.name} 👋</Text>
            <Text style={styles.date}>{todayLabel}</Text>
          </View>
          <TouchableOpacity style={styles.notifButton}>
            <Bell color="#9CA3AF" size={20} />
          </TouchableOpacity>
        </Animated.View>

        {/* Stats rapides */}
        <Animated.View
          entering={FadeInDown.delay(100).duration(400)}
          style={styles.quickStatsRow}
        >
          <View style={styles.quickStat}>
            <View style={[styles.quickStatIcon, { backgroundColor: "rgba(251,146,60,0.15)" }]}>
              <Flame color="#FB923C" size={18} />
            </View>
            <Text style={styles.quickStatValue}>7</Text>
            <Text style={styles.quickStatLabel}>Jours streak</Text>
          </View>

          <View style={styles.quickStatDivider} />

          <View style={styles.quickStat}>
            <View style={[styles.quickStatIcon, { backgroundColor: "rgba(74,222,128,0.15)" }]}>
              <Trophy color="#4ADE80" size={18} />
            </View>
            <Text style={styles.quickStatValue}>{completedWorkouts}</Text>
            <Text style={styles.quickStatLabel}>Séances / 7</Text>
          </View>

          <View style={styles.quickStatDivider} />

          <View style={styles.quickStat}>
            <View style={[styles.quickStatIcon, { backgroundColor: "rgba(96,165,250,0.15)" }]}>
              <TrendingUp color="#60A5FA" size={18} />
            </View>
            <Text style={styles.quickStatValue}>{weekProgress}%</Text>
            <Text style={styles.quickStatLabel}>Semaine</Text>
          </View>
        </Animated.View>

        {/* Workout du jour */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)}>
          <Text style={styles.sectionTitle}>Entraînement du jour</Text>

          {todayWorkout.type === "rest" ? (
            <View style={styles.restCard}>
              <Text style={styles.restEmoji}>😴</Text>
              <View>
                <Text style={styles.restTitle}>Jour de repos</Text>
                <Text style={styles.restSubtitle}>
                  Récupération active ou étirements
                </Text>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.workoutCard}
              onPress={() => router.push(`/workout/${todayWorkout.id}`)}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={
                  todayWorkout.completed
                    ? ["rgba(74,222,128,0.15)", "rgba(74,222,128,0.05)"]
                    : ["rgba(74,222,128,0.08)", "rgba(0,0,0,0)"]
                }
                style={styles.workoutCardGradient}
              >
                <View style={styles.workoutCardHeader}>
                  <View>
                    <View style={styles.workoutTypeBadge}>
                      <Zap color="#4ADE80" size={12} />
                      <Text style={styles.workoutTypeBadgeText}>
                        {todayWorkout.type.toUpperCase()}
                      </Text>
                    </View>
                    <Text style={styles.workoutCardName}>{todayWorkout.name}</Text>
                  </View>
                  {todayWorkout.completed ? (
                    <View style={styles.completedBadge}>
                      <Text style={styles.completedBadgeText}>✓ Fait</Text>
                    </View>
                  ) : (
                    <ChevronRight color="#4ADE80" size={20} />
                  )}
                </View>

                <View style={styles.workoutCardStats}>
                  <View style={styles.workoutStat}>
                    <Text style={styles.workoutStatValue}>
                      {todayWorkout.exercises.length}
                    </Text>
                    <Text style={styles.workoutStatLabel}>exercices</Text>
                  </View>
                  <View style={styles.workoutStatDivider} />
                  <View style={styles.workoutStat}>
                    <Text style={styles.workoutStatValue}>
                      {todayWorkout.duration}
                    </Text>
                    <Text style={styles.workoutStatLabel}>minutes</Text>
                  </View>
                  <View style={styles.workoutStatDivider} />
                  <View style={styles.workoutStat}>
                    <Text style={styles.workoutStatValue}>
                      {todayWorkout.targetMuscles[0]?.split(" ")[0] ?? "—"}
                    </Text>
                    <Text style={styles.workoutStatLabel}>focus</Text>
                  </View>
                </View>

                {!todayWorkout.completed && (
                  <TouchableOpacity
                    style={styles.startButton}
                    onPress={() => router.push(`/workout/${todayWorkout.id}`)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.startButtonText}>Démarrer la séance</Text>
                    <ChevronRight color="#000" size={18} />
                  </TouchableOpacity>
                )}
              </LinearGradient>
            </TouchableOpacity>
          )}
        </Animated.View>

        {/* Nutrition du jour */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nutrition aujourd'hui</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/nutrition")}>
              <Text style={styles.sectionLink}>Voir tout</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.nutritionCard}>
            {/* Calories */}
            <View style={styles.caloriesRow}>
              <View>
                <Text style={styles.caloriesValue}>
                  {todayMeals.totalNutrition.calories}
                </Text>
                <Text style={styles.caloriesLabel}>kcal planifiées</Text>
              </View>
              <View style={styles.caloriesTarget}>
                <Text style={styles.caloriesTargetText}>/ 2200 kcal</Text>
                <View style={styles.caloriesBar}>
                  <View
                    style={[
                      styles.caloriesBarFill,
                      {
                        width: `${Math.min(
                          (todayMeals.totalNutrition.calories / 2200) * 100,
                          100
                        )}%`,
                      },
                    ]}
                  />
                </View>
              </View>
            </View>

            {/* Macros */}
            <View style={styles.macrosRow}>
              <MacroBar
                label="Protéines"
                value={todayMeals.totalNutrition.protein}
                max={180}
                color="#4ADE80"
              />
              <View style={{ width: 12 }} />
              <MacroBar
                label="Glucides"
                value={todayMeals.totalNutrition.carbs}
                max={250}
                color="#60A5FA"
              />
              <View style={{ width: 12 }} />
              <MacroBar
                label="Lipides"
                value={todayMeals.totalNutrition.fats}
                max={80}
                color="#FB923C"
              />
            </View>

            {/* Repas du jour */}
            <View style={styles.mealsPreview}>
              {todayMeals.meals.map((meal) => (
                <TouchableOpacity
                  key={meal.id}
                  style={styles.mealPreviewItem}
                  onPress={() => router.push(`/meal/${meal.id}`)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.mealPreviewEmoji}>{meal.imageEmoji}</Text>
                  <View style={styles.mealPreviewText}>
                    <Text style={styles.mealPreviewName} numberOfLines={1}>
                      {meal.name}
                    </Text>
                    <Text style={styles.mealPreviewType}>
                      {meal.type === "breakfast"
                        ? "Petit-déjeuner"
                        : meal.type === "lunch"
                        ? "Déjeuner"
                        : meal.type === "snack"
                        ? "Collation"
                        : "Dîner"}{" "}
                      · {meal.calories} kcal
                    </Text>
                  </View>
                  <ChevronRight color="#4B5563" size={16} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Animated.View>

        {/* Programme de la semaine */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Semaine</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/workouts")}>
              <Text style={styles.sectionLink}>Voir tout</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.weekScroll}
          >
            {program.map((session, index) => (
              <TouchableOpacity
                key={session.id}
                style={[
                  styles.weekDayCard,
                  index === todayDayIndex && styles.weekDayCardToday,
                  session.completed && styles.weekDayCardCompleted,
                ]}
                onPress={() =>
                  session.type !== "rest" &&
                  router.push(`/workout/${session.id}`)
                }
                activeOpacity={session.type === "rest" ? 1 : 0.7}
              >
                <Text
                  style={[
                    styles.weekDayLabel,
                    index === todayDayIndex && styles.weekDayLabelToday,
                  ]}
                >
                  {session.day.slice(0, 3)}
                </Text>
                <Text style={styles.weekDayEmoji}>
                  {session.type === "rest"
                    ? "😴"
                    : session.completed
                    ? "✅"
                    : session.type === "push"
                    ? "💪"
                    : session.type === "pull"
                    ? "🏋️"
                    : "🦵"}
                </Text>
                {session.type !== "rest" && (
                  <Text style={styles.weekDayDuration}>
                    {session.duration}min
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000" },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 32 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  greeting: { fontSize: 22, fontWeight: "bold", color: "#FFFFFF", marginBottom: 4 },
  date: { fontSize: 14, color: "#6B7280" },
  notifButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#111111",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  quickStatsRow: {
    flexDirection: "row",
    backgroundColor: "#111111",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
    padding: 16,
    marginBottom: 28,
    alignItems: "center",
  },
  quickStat: { flex: 1, alignItems: "center", gap: 4 },
  quickStatIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  quickStatValue: { fontSize: 18, fontWeight: "bold", color: "#FFFFFF" },
  quickStatLabel: { fontSize: 11, color: "#6B7280", textAlign: "center" },
  quickStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#1f2937",
    marginHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 14,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionLink: { fontSize: 14, color: "#4ADE80", fontWeight: "500" },
  restCard: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 28,
  },
  restEmoji: { fontSize: 32 },
  restTitle: { fontSize: 16, fontWeight: "600", color: "#FFFFFF" },
  restSubtitle: { fontSize: 13, color: "#6B7280", marginTop: 2 },
  workoutCard: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#1f2937",
    marginBottom: 28,
  },
  workoutCardGradient: { padding: 20 },
  workoutCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  workoutTypeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 6,
  },
  workoutTypeBadgeText: { fontSize: 11, color: "#4ADE80", fontWeight: "700", letterSpacing: 1 },
  workoutCardName: { fontSize: 18, fontWeight: "bold", color: "#FFFFFF" },
  completedBadge: {
    backgroundColor: "rgba(74,222,128,0.2)",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  completedBadgeText: { fontSize: 13, color: "#4ADE80", fontWeight: "600" },
  workoutCardStats: { flexDirection: "row", gap: 0, marginBottom: 16 },
  workoutStat: { flex: 1, alignItems: "center" },
  workoutStatValue: { fontSize: 20, fontWeight: "bold", color: "#FFFFFF" },
  workoutStatLabel: { fontSize: 11, color: "#6B7280", marginTop: 2 },
  workoutStatDivider: { width: 1, backgroundColor: "#1f2937", marginHorizontal: 8 },
  startButton: {
    backgroundColor: "#4ADE80",
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    shadowColor: "#4ADE80",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  startButtonText: { fontSize: 15, fontWeight: "bold", color: "#000000" },
  nutritionCard: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 16,
    padding: 16,
    marginBottom: 28,
  },
  caloriesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 14,
  },
  caloriesValue: { fontSize: 28, fontWeight: "bold", color: "#FFFFFF" },
  caloriesLabel: { fontSize: 12, color: "#6B7280" },
  caloriesTarget: { alignItems: "flex-end", gap: 6 },
  caloriesTargetText: { fontSize: 12, color: "#6B7280" },
  caloriesBar: {
    width: 100,
    height: 4,
    backgroundColor: "#1f2937",
    borderRadius: 2,
    overflow: "hidden",
  },
  caloriesBarFill: {
    height: "100%",
    backgroundColor: "#4ADE80",
    borderRadius: 2,
  },
  macrosRow: {
    flexDirection: "row",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1f2937",
  },
  mealsPreview: { gap: 10 },
  mealPreviewItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  mealPreviewEmoji: { fontSize: 24 },
  mealPreviewText: { flex: 1 },
  mealPreviewName: { fontSize: 14, fontWeight: "500", color: "#FFFFFF" },
  mealPreviewType: { fontSize: 12, color: "#6B7280", marginTop: 2 },
  weekScroll: { paddingRight: 20, gap: 8 },
  weekDayCard: {
    width: 64,
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 14,
    padding: 10,
    alignItems: "center",
    gap: 6,
  },
  weekDayCardToday: {
    borderColor: "#4ADE80",
    backgroundColor: "#0d1f14",
  },
  weekDayCardCompleted: {
    borderColor: "#166534",
    backgroundColor: "#052e16",
  },
  weekDayLabel: { fontSize: 12, fontWeight: "600", color: "#6B7280" },
  weekDayLabelToday: { color: "#4ADE80" },
  weekDayEmoji: { fontSize: 20 },
  weekDayDuration: { fontSize: 10, color: "#4B5563" },
});
