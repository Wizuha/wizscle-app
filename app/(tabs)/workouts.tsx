import { useWorkoutStore, WorkoutSession } from "@/app/store/workoutStore";
import { useRouter } from "expo-router";
import {
  ChevronRight,
  Clock,
  Dumbbell,
  Moon,
} from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const TYPE_COLORS: Record<string, string> = {
  push: "#4ADE80",
  pull: "#60A5FA",
  legs: "#FB923C",
  upper: "#A78BFA",
  cardio: "#F472B6",
  rest: "#4B5563",
};

const TYPE_LABELS: Record<string, string> = {
  push: "PUSH",
  pull: "PULL",
  legs: "LEGS",
  upper: "UPPER",
  cardio: "CARDIO",
  rest: "REPOS",
};

function WorkoutCard({
  session,
  index,
  isToday,
}: {
  session: WorkoutSession;
  index: number;
  isToday: boolean;
}) {
  const router = useRouter();
  const color = TYPE_COLORS[session.type];

  if (session.type === "rest") {
    return (
      <Animated.View entering={FadeInDown.delay(index * 60).duration(350)}>
        <View style={[styles.card, styles.restCard, isToday && styles.todayCard]}>
          <View style={styles.cardLeft}>
            <View style={[styles.dayIndexBadge, { backgroundColor: "rgba(75,85,99,0.2)" }]}>
              <Text style={[styles.dayIndexText, { color: "#4B5563" }]}>
                {session.day.slice(0, 3).toUpperCase()}
              </Text>
            </View>
            <View style={styles.restIconContainer}>
              <Moon color="#4B5563" size={20} />
            </View>
          </View>
          <View style={styles.cardBody}>
            <Text style={[styles.cardName, { color: "#4B5563" }]}>
              {session.name}
            </Text>
            <Text style={styles.cardRestSub}>Récupération & mobilité</Text>
          </View>
          {isToday && <View style={styles.todayDot} />}
        </View>
      </Animated.View>
    );
  }

  return (
    <Animated.View entering={FadeInDown.delay(index * 60).duration(350)}>
      <TouchableOpacity
        style={[
          styles.card,
          isToday && styles.todayCard,
          session.completed && styles.completedCard,
        ]}
        onPress={() => router.push(`/workout/${session.id}`)}
        activeOpacity={0.75}
      >
        {/* Bande colorée latérale */}
        <View style={[styles.colorBar, { backgroundColor: color }]} />

        <View style={styles.cardContent}>
          <View style={styles.cardTop}>
            {/* Jour + badge type */}
            <View style={styles.cardTopLeft}>
              <Text style={styles.cardDay}>{session.day}</Text>
              <View
                style={[
                  styles.typeBadge,
                  { backgroundColor: `${color}22` },
                ]}
              >
                <Text style={[styles.typeBadgeText, { color }]}>
                  {TYPE_LABELS[session.type]}
                </Text>
              </View>
            </View>

            {session.completed ? (
              <View style={styles.completedBadge}>
                <Text style={styles.completedText}>✓ Complété</Text>
              </View>
            ) : (
              isToday && (
                <View style={styles.todayBadge}>
                  <Text style={styles.todayBadgeText}>Aujourd'hui</Text>
                </View>
              )
            )}
          </View>

          <Text style={styles.cardName}>{session.name}</Text>

          {/* Muscles ciblés */}
          <View style={styles.musclesList}>
            {session.targetMuscles.slice(0, 3).map((m) => (
              <View key={m} style={styles.muscleBadge}>
                <Text style={styles.muscleBadgeText}>{m}</Text>
              </View>
            ))}
          </View>

          {/* Stats */}
          <View style={styles.cardStats}>
            <View style={styles.cardStat}>
              <Clock color="#6B7280" size={13} />
              <Text style={styles.cardStatText}>{session.duration} min</Text>
            </View>
            <View style={styles.cardStat}>
              <Dumbbell color="#6B7280" size={13} />
              <Text style={styles.cardStatText}>
                {session.exercises.length} exercices
              </Text>
            </View>
            <ChevronRight color="#4B5563" size={16} style={{ marginLeft: "auto" }} />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function WorkoutsScreen() {
  const { program } = useWorkoutStore();

  const today = new Date();
  const todayDayIndex = (today.getDay() + 6) % 7;

  const completedCount = program.filter((s) => s.completed).length;
  const totalTraining = program.filter((s) => s.type !== "rest").length;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
          <Text style={styles.title}>Programme</Text>
          <Text style={styles.subtitle}>Semaine en cours</Text>
        </Animated.View>

        {/* Progress semaine */}
        <Animated.View
          entering={FadeInDown.delay(80).duration(400)}
          style={styles.progressCard}
        >
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Progression de la semaine</Text>
            <Text style={styles.progressValue}>
              {completedCount}/{totalTraining} séances
            </Text>
          </View>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.round(
                    (completedCount / totalTraining) * 100
                  )}%`,
                },
              ]}
            />
          </View>
        </Animated.View>

        {/* Liste des jours */}
        <View style={styles.sessionsList}>
          {program.map((session, index) => (
            <WorkoutCard
              key={session.id}
              session={session}
              index={index}
              isToday={index === todayDayIndex}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000" },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 32 },
  header: { marginBottom: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: "#FFFFFF" },
  subtitle: { fontSize: 14, color: "#6B7280", marginTop: 4 },
  progressCard: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  progressLabel: { fontSize: 14, color: "#9CA3AF" },
  progressValue: { fontSize: 14, fontWeight: "600", color: "#4ADE80" },
  progressTrack: {
    height: 6,
    backgroundColor: "#1f2937",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4ADE80",
    borderRadius: 3,
    shadowColor: "#4ADE80",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  sessionsList: { gap: 12 },
  card: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 16,
    overflow: "hidden",
    flexDirection: "row",
  },
  todayCard: {
    borderColor: "#4ADE80",
    shadowColor: "#4ADE80",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  completedCard: {
    borderColor: "#166534",
    backgroundColor: "#030f06",
  },
  restCard: { opacity: 0.6 },
  colorBar: { width: 4 },
  cardContent: { flex: 1, padding: 14 },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  cardTopLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  cardDay: { fontSize: 13, fontWeight: "600", color: "#6B7280" },
  typeBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  typeBadgeText: { fontSize: 10, fontWeight: "700", letterSpacing: 0.5 },
  completedBadge: {
    backgroundColor: "rgba(74,222,128,0.15)",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  completedText: { fontSize: 12, color: "#4ADE80", fontWeight: "600" },
  todayBadge: {
    backgroundColor: "rgba(74,222,128,0.15)",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  todayBadgeText: { fontSize: 12, color: "#4ADE80", fontWeight: "600" },
  cardName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  musclesList: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 10 },
  muscleBadge: {
    backgroundColor: "#1a1a1a",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  muscleBadgeText: { fontSize: 11, color: "#9CA3AF" },
  cardStats: { flexDirection: "row", alignItems: "center", gap: 12 },
  cardStat: { flexDirection: "row", alignItems: "center", gap: 4 },
  cardStatText: { fontSize: 12, color: "#6B7280" },
  // Rest card specifics
  cardLeft: {
    width: 64,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: 12,
  },
  dayIndexBadge: {
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  dayIndexText: { fontSize: 10, fontWeight: "700" },
  restIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
  },
  cardBody: { flex: 1, justifyContent: "center", paddingVertical: 14 },
  cardRestSub: { fontSize: 12, color: "#4B5563", marginTop: 2 },
  todayDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4ADE80",
    alignSelf: "flex-start",
    margin: 12,
  },
});
