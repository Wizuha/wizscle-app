import { DayPlan, useNutritionStore } from "@/app/store/nutritionStore";
import { useRouter } from "expo-router";
import { ChevronRight, Clock } from "lucide-react-native";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const MEAL_TYPE_CONFIG = {
  breakfast: { label: "Petit-déjeuner", emoji: "🌅", color: "#FB923C" },
  lunch: { label: "Déjeuner", emoji: "☀️", color: "#FBBF24" },
  snack: { label: "Collation", emoji: "🍎", color: "#34D399" },
  dinner: { label: "Dîner", emoji: "🌙", color: "#60A5FA" },
} as const;

function MacroPill({ label, value, unit, color }: { label: string; value: number; unit: string; color: string }) {
  return (
    <View style={[pillStyles.container, { borderColor: `${color}30` }]}>
      <Text style={[pillStyles.value, { color }]}>{value}{unit}</Text>
      <Text style={pillStyles.label}>{label}</Text>
    </View>
  );
}

const pillStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    gap: 2,
  },
  value: { fontSize: 16, fontWeight: "bold" },
  label: { fontSize: 10, color: "#6B7280" },
});

export default function NutritionScreen() {
  const router = useRouter();
  const { weekPlan } = useNutritionStore();

  const today = new Date();
  const todayDayIndex = (today.getDay() + 6) % 7;
  const [selectedDay, setSelectedDay] = useState(todayDayIndex);

  const dayPlan: DayPlan = weekPlan[selectedDay];
  const { totalNutrition } = dayPlan;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
          <Text style={styles.title}>Nutrition</Text>
          <Text style={styles.subtitle}>Plan nutritionnel de la semaine</Text>
        </Animated.View>

        {/* Sélecteur de jour */}
        <Animated.View entering={FadeInDown.delay(80).duration(400)}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.daySelector}
          >
            {weekPlan.map((day, index) => (
              <TouchableOpacity
                key={day.dayIndex}
                style={[
                  styles.dayButton,
                  selectedDay === index && styles.dayButtonSelected,
                  index === todayDayIndex && selectedDay !== index && styles.dayButtonToday,
                ]}
                onPress={() => setSelectedDay(index)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.dayButtonText,
                    selectedDay === index && styles.dayButtonTextSelected,
                  ]}
                >
                  {day.shortDay}
                </Text>
                {index === todayDayIndex && (
                  <View
                    style={[
                      styles.todayDot,
                      selectedDay === index && styles.todayDotSelected,
                    ]}
                  />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Résumé nutritionnel du jour */}
        <Animated.View
          entering={FadeIn.delay(160).duration(400)}
          style={styles.nutritionSummary}
        >
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryDay}>{dayPlan.day}</Text>
            <View style={styles.calorieBadge}>
              <Text style={styles.calorieBadgeValue}>{totalNutrition.calories}</Text>
              <Text style={styles.calorieBadgeUnit}>kcal</Text>
            </View>
          </View>

          {/* Barre de macros */}
          <View style={styles.macroBarContainer}>
            <View
              style={[
                styles.macroBarSegment,
                {
                  flex: totalNutrition.protein,
                  backgroundColor: "#4ADE80",
                },
              ]}
            />
            <View
              style={[
                styles.macroBarSegment,
                {
                  flex: totalNutrition.carbs,
                  backgroundColor: "#60A5FA",
                },
              ]}
            />
            <View
              style={[
                styles.macroBarSegment,
                {
                  flex: totalNutrition.fats,
                  backgroundColor: "#FB923C",
                },
              ]}
            />
          </View>

          <View style={styles.macroPillsRow}>
            <MacroPill
              label="Protéines"
              value={totalNutrition.protein}
              unit="g"
              color="#4ADE80"
            />
            <MacroPill
              label="Glucides"
              value={totalNutrition.carbs}
              unit="g"
              color="#60A5FA"
            />
            <MacroPill
              label="Lipides"
              value={totalNutrition.fats}
              unit="g"
              color="#FB923C"
            />
          </View>
        </Animated.View>

        {/* Liste des repas */}
        <Text style={styles.mealsTitle}>Repas du jour</Text>
        <View style={styles.mealsList}>
          {dayPlan.meals.map((meal, index) => {
            const config = MEAL_TYPE_CONFIG[meal.type];
            return (
              <Animated.View
                key={meal.id}
                entering={FadeInDown.delay(200 + index * 80).duration(350)}
              >
                <TouchableOpacity
                  style={styles.mealCard}
                  onPress={() => router.push(`/meal/${meal.id}`)}
                  activeOpacity={0.75}
                >
                  {/* Couleur latérale */}
                  <View style={[styles.mealColorBar, { backgroundColor: config.color }]} />

                  <View style={styles.mealCardContent}>
                    <View style={styles.mealCardTop}>
                      <View style={styles.mealTypeRow}>
                        <Text style={styles.mealTypeEmoji}>{config.emoji}</Text>
                        <Text
                          style={[styles.mealTypeLabel, { color: config.color }]}
                        >
                          {config.label}
                        </Text>
                      </View>
                      <ChevronRight color="#4B5563" size={16} />
                    </View>

                    <Text style={styles.mealName}>{meal.name}</Text>

                    <View style={styles.mealMeta}>
                      <View style={styles.mealMetaItem}>
                        <Text style={styles.mealMetaEmoji}>🔥</Text>
                        <Text style={styles.mealMetaText}>{meal.calories} kcal</Text>
                      </View>
                      <View style={styles.mealMetaDot} />
                      <View style={styles.mealMetaItem}>
                        <Clock color="#6B7280" size={12} />
                        <Text style={styles.mealMetaText}>{meal.prepTime} min</Text>
                      </View>
                      <View style={styles.mealMetaDot} />
                      <View style={styles.mealMetaItem}>
                        <Text style={styles.mealMetaEmoji}>💪</Text>
                        <Text style={styles.mealMetaText}>
                          {meal.nutrition.protein}g prot
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

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
  daySelector: {
    paddingRight: 20,
    gap: 8,
    marginBottom: 20,
  },
  dayButton: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#1f2937",
    alignItems: "center",
    justifyContent: "center",
  },
  dayButtonSelected: {
    backgroundColor: "#4ADE80",
    borderColor: "#4ADE80",
  },
  dayButtonToday: {
    borderColor: "#4ADE80",
  },
  dayButtonText: { fontSize: 13, fontWeight: "600", color: "#9CA3AF" },
  dayButtonTextSelected: { color: "#000000" },
  todayDot: {
    position: "absolute",
    bottom: 6,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#4ADE80",
  },
  todayDotSelected: { backgroundColor: "#000000" },
  nutritionSummary: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  summaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  summaryDay: { fontSize: 16, fontWeight: "600", color: "#FFFFFF" },
  calorieBadge: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 2,
  },
  calorieBadgeValue: { fontSize: 24, fontWeight: "bold", color: "#4ADE80" },
  calorieBadgeUnit: { fontSize: 13, color: "#6B7280" },
  macroBarContainer: {
    flexDirection: "row",
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
    gap: 2,
    marginBottom: 14,
  },
  macroBarSegment: { height: "100%", borderRadius: 4 },
  macroPillsRow: { flexDirection: "row", gap: 8 },
  mealsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 14,
  },
  mealsList: { gap: 12 },
  mealCard: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 16,
    overflow: "hidden",
    flexDirection: "row",
  },
  mealColorBar: { width: 4 },
  mealCardContent: { flex: 1, padding: 14 },
  mealCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  mealTypeRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  mealTypeEmoji: { fontSize: 14 },
  mealTypeLabel: { fontSize: 12, fontWeight: "600" },
  mealName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  mealMeta: { flexDirection: "row", alignItems: "center", gap: 8 },
  mealMetaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  mealMetaEmoji: { fontSize: 12 },
  mealMetaText: { fontSize: 12, color: "#6B7280" },
  mealMetaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#374151",
  },
});
