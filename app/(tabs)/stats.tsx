import { useUserStore } from "@/app/store/userStore";
import { useWorkoutStore } from "@/app/store/workoutStore";
import { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const CHART_WIDTH = width - 40;

const PERIODS = ["1M", "3M", "6M", "All"] as const;
type Period = (typeof PERIODS)[number];

function WeightChart({
  data,
  period,
}: {
  data: { date: string; weight: number }[];
  period: Period;
}) {
  const periodMap: Record<Period, number> = { "1M": 5, "3M": 8, "6M": 10, All: 12 };
  const slicedData = data.slice(-periodMap[period]);

  if (slicedData.length < 2) return null;

  const minW = Math.min(...slicedData.map((d) => d.weight)) - 0.5;
  const maxW = Math.max(...slicedData.map((d) => d.weight)) + 0.5;
  const range = maxW - minW;

  const CHART_H = 140;
  const PAD_X = 40;
  const chartInnerW = CHART_WIDTH - PAD_X * 2;
  const stepX = chartInnerW / (slicedData.length - 1);

  const points = slicedData.map((d, i) => ({
    x: PAD_X + i * stepX,
    y: CHART_H - ((d.weight - minW) / range) * CHART_H * 0.8 - CHART_H * 0.1,
    weight: d.weight,
    date: d.date,
  }));

  // SVG-like rendering with Views
  return (
    <View style={{ height: CHART_H + 40 }}>
      {/* Y axis labels */}
      {[0, 0.5, 1].map((pct) => {
        const val = maxW - pct * (maxW - minW);
        const y = CHART_H * 0.1 + pct * CHART_H * 0.8;
        return (
          <View
            key={pct}
            style={[
              chartStyles.yLabel,
              { top: y - 8 },
            ]}
          >
            <Text style={chartStyles.yLabelText}>{val.toFixed(1)}</Text>
          </View>
        );
      })}

      {/* Grid lines */}
      {[0, 0.5, 1].map((pct) => {
        const y = CHART_H * 0.1 + pct * CHART_H * 0.8;
        return (
          <View
            key={pct}
            style={[
              chartStyles.gridLine,
              { top: y, left: PAD_X, width: chartInnerW },
            ]}
          />
        );
      })}

      {/* Line segments */}
      {points.slice(0, -1).map((pt, i) => {
        const next = points[i + 1];
        const dx = next.x - pt.x;
        const dy = next.y - pt.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        return (
          <View
            key={i}
            style={[
              chartStyles.lineSegment,
              {
                left: pt.x,
                top: pt.y,
                width: length,
                transform: [{ rotate: `${angle}deg` }],
              },
            ]}
          />
        );
      })}

      {/* Data points */}
      {points.map((pt, i) => (
        <View
          key={i}
          style={[
            chartStyles.dataPoint,
            { left: pt.x - 4, top: pt.y - 4 },
          ]}
        />
      ))}

      {/* X axis labels (first, middle, last) */}
      {[0, Math.floor(points.length / 2), points.length - 1].map((i) => {
        const pt = points[i];
        const date = new Date(pt.date);
        const label = `${date.getDate()}/${date.getMonth() + 1}`;
        return (
          <Text
            key={i}
            style={[
              chartStyles.xLabel,
              { left: pt.x - 18, top: CHART_H + 10 },
            ]}
          >
            {label}
          </Text>
        );
      })}
    </View>
  );
}

const chartStyles = StyleSheet.create({
  yLabel: {
    position: "absolute",
    left: 0,
    width: 36,
  },
  yLabelText: { fontSize: 10, color: "#4B5563", textAlign: "right" },
  gridLine: {
    position: "absolute",
    height: 1,
    backgroundColor: "#1f2937",
  },
  lineSegment: {
    position: "absolute",
    height: 2,
    backgroundColor: "#4ADE80",
    borderRadius: 1,
    transformOrigin: "left center",
  },
  dataPoint: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4ADE80",
    borderWidth: 2,
    borderColor: "#000",
  },
  xLabel: {
    position: "absolute",
    width: 36,
    fontSize: 10,
    color: "#4B5563",
    textAlign: "center",
  },
});

function StatCard({
  label,
  value,
  unit,
  emoji,
  color,
  delay,
}: {
  label: string;
  value: string | number;
  unit?: string;
  emoji: string;
  color: string;
  delay: number;
}) {
  return (
    <Animated.View
      entering={FadeInDown.delay(delay).duration(350)}
      style={[statCardStyles.card, { borderColor: `${color}20` }]}
    >
      <Text style={statCardStyles.emoji}>{emoji}</Text>
      <View style={statCardStyles.row}>
        <Text style={[statCardStyles.value, { color }]}>{value}</Text>
        {unit && <Text style={statCardStyles.unit}>{unit}</Text>}
      </View>
      <Text style={statCardStyles.label}>{label}</Text>
    </Animated.View>
  );
}

const statCardStyles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#111111",
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    gap: 4,
  },
  emoji: { fontSize: 22 },
  row: { flexDirection: "row", alignItems: "baseline", gap: 3 },
  value: { fontSize: 22, fontWeight: "bold" },
  unit: { fontSize: 12, color: "#6B7280" },
  label: { fontSize: 11, color: "#6B7280", textAlign: "center" },
});

function WeeklyBar({
  day,
  completed,
  type,
}: {
  day: string;
  completed: boolean;
  type: string;
}) {
  const height = completed ? 48 : 20;
  return (
    <View style={barStyles.container}>
      <View
        style={[
          barStyles.bar,
          { height, backgroundColor: completed ? "#4ADE80" : "#1f2937" },
        ]}
      />
      <Text style={barStyles.label}>{day.slice(0, 1)}</Text>
    </View>
  );
}

const barStyles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", gap: 6, justifyContent: "flex-end" },
  bar: { width: 24, borderRadius: 6 },
  label: { fontSize: 10, color: "#4B5563" },
});

export default function StatsScreen() {
  const { weightHistory, profile } = useUserStore();
  const { program } = useWorkoutStore();
  const [period, setPeriod] = useState<Period>("3M");

  const startWeight = weightHistory[0]?.weight ?? profile.weight;
  const currentWeight = weightHistory[weightHistory.length - 1]?.weight ?? profile.weight;
  const weightDelta = (currentWeight - startWeight).toFixed(1);
  const isLoss = parseFloat(weightDelta) < 0;

  const completedWorkouts = program.filter((s) => s.completed).length;
  const totalWorkoutDays = program.filter((s) => s.type !== "rest").length;
  const completionRate = Math.round((completedWorkouts / totalWorkoutDays) * 100);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
          <Text style={styles.title}>Statistiques</Text>
          <Text style={styles.subtitle}>Votre progression</Text>
        </Animated.View>

        {/* Chiffres clés */}
        <Animated.View entering={FadeInDown.delay(80).duration(400)}>
          <View style={styles.statsGrid}>
            <StatCard
              label="Séances cette semaine"
              value={completedWorkouts}
              unit={`/ ${totalWorkoutDays}`}
              emoji="🏋️"
              color="#4ADE80"
              delay={100}
            />
            <StatCard
              label="Taux de complétion"
              value={completionRate}
              unit="%"
              emoji="🎯"
              color="#60A5FA"
              delay={150}
            />
          </View>
          <View style={[styles.statsGrid, { marginTop: 10 }]}>
            <StatCard
              label="Streak actuel"
              value={7}
              unit="jours"
              emoji="🔥"
              color="#FB923C"
              delay={200}
            />
            <StatCard
              label="Poids actuel"
              value={currentWeight}
              unit="kg"
              emoji="⚖️"
              color="#A78BFA"
              delay={250}
            />
          </View>
        </Animated.View>

        {/* Évolution du poids */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.chartTitle}>Évolution du poids</Text>
              <Text style={styles.chartSubtitle}>
                {isLoss ? "▼" : "▲"}{" "}
                <Text
                  style={{
                    color: isLoss ? "#4ADE80" : "#FB923C",
                    fontWeight: "600",
                  }}
                >
                  {Math.abs(parseFloat(weightDelta))} kg
                </Text>{" "}
                depuis le début
              </Text>
            </View>
            <View style={styles.periodSelector}>
              {PERIODS.map((p) => (
                <TouchableOpacity
                  key={p}
                  style={[
                    styles.periodButton,
                    period === p && styles.periodButtonActive,
                  ]}
                  onPress={() => setPeriod(p)}
                >
                  <Text
                    style={[
                      styles.periodButtonText,
                      period === p && styles.periodButtonTextActive,
                    ]}
                  >
                    {p}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <WeightChart data={weightHistory} period={period} />
        </Animated.View>

        {/* Activité hebdomadaire */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.weeklyCard}>
          <Text style={styles.chartTitle}>Activité de la semaine</Text>
          <View style={styles.weeklyBars}>
            {program.map((session) => (
              <WeeklyBar
                key={session.id}
                day={session.day}
                completed={session.completed}
                type={session.type}
              />
            ))}
          </View>
          <View style={styles.weeklyLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: "#4ADE80" }]} />
              <Text style={styles.legendText}>Séance complétée</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: "#1f2937" }]} />
              <Text style={styles.legendText}>À venir</Text>
            </View>
          </View>
        </Animated.View>

        {/* Records personnels */}
        <Animated.View entering={FadeInDown.delay(500).duration(400)} style={styles.prCard}>
          <Text style={styles.chartTitle}>Records personnels</Text>
          <View style={styles.prList}>
            {[
              { exercise: "Développé couché", value: "80 kg × 8", emoji: "🏆" },
              { exercise: "Squat barre", value: "100 kg × 5", emoji: "🏅" },
              { exercise: "Soulevé de terre", value: "120 kg × 4", emoji: "💪" },
              { exercise: "Tractions", value: "BW+15 kg × 6", emoji: "⭐" },
            ].map((pr) => (
              <View key={pr.exercise} style={styles.prItem}>
                <Text style={styles.prEmoji}>{pr.emoji}</Text>
                <View style={styles.prText}>
                  <Text style={styles.prExercise}>{pr.exercise}</Text>
                </View>
                <View style={styles.prValueBadge}>
                  <Text style={styles.prValue}>{pr.value}</Text>
                </View>
              </View>
            ))}
          </View>
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
  header: { marginBottom: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: "#FFFFFF" },
  subtitle: { fontSize: 14, color: "#6B7280", marginTop: 4 },
  statsGrid: { flexDirection: "row", gap: 10 },
  chartCard: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    marginBottom: 16,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  chartSubtitle: { fontSize: 13, color: "#9CA3AF" },
  periodSelector: { flexDirection: "row", gap: 4 },
  periodButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: "#1a1a1a",
  },
  periodButtonActive: { backgroundColor: "#4ADE80" },
  periodButtonText: { fontSize: 11, color: "#6B7280", fontWeight: "600" },
  periodButtonTextActive: { color: "#000000" },
  weeklyCard: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  weeklyBars: {
    flexDirection: "row",
    height: 70,
    alignItems: "flex-end",
    marginTop: 16,
    marginBottom: 12,
  },
  weeklyLegend: { flexDirection: "row", gap: 16 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 12, color: "#6B7280" },
  prCard: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 16,
    padding: 16,
  },
  prList: { gap: 12, marginTop: 4 },
  prItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  prEmoji: { fontSize: 20 },
  prText: { flex: 1 },
  prExercise: { fontSize: 14, fontWeight: "500", color: "#FFFFFF" },
  prValueBadge: {
    backgroundColor: "rgba(74,222,128,0.1)",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  prValue: { fontSize: 13, color: "#4ADE80", fontWeight: "600" },
});
