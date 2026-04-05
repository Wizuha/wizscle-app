import { useNutritionStore } from "@/app/store/nutritionStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Clock } from "lucide-react-native";
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

function MacroCard({
  label,
  value,
  unit,
  color,
  emoji,
}: {
  label: string;
  value: number;
  unit: string;
  color: string;
  emoji: string;
}) {
  return (
    <View style={[macroStyles.card, { borderColor: `${color}25` }]}>
      <Text style={macroStyles.emoji}>{emoji}</Text>
      <Text style={[macroStyles.value, { color }]}>
        {value}
        <Text style={macroStyles.unit}>{unit}</Text>
      </Text>
      <Text style={macroStyles.label}>{label}</Text>
    </View>
  );
}

const macroStyles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#111111",
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
    gap: 4,
  },
  emoji: { fontSize: 18 },
  value: { fontSize: 18, fontWeight: "bold" },
  unit: { fontSize: 11, fontWeight: "normal" },
  label: { fontSize: 10, color: "#6B7280", textAlign: "center" },
});

export default function MealDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getMealById } = useNutritionStore();

  const meal = getMealById(id ?? "");

  if (!meal) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Repas introuvable</Text>
      </SafeAreaView>
    );
  }

  const config = MEAL_TYPE_CONFIG[meal.type];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft color="#FFFFFF" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détail du repas</Text>
        <View style={{ width: 40 }} />
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <Animated.View entering={FadeInDown.delay(80).duration(400)} style={styles.heroCard}>
          <View style={styles.heroEmoji}>
            <Text style={styles.heroEmojiText}>{meal.imageEmoji}</Text>
          </View>

          <View
            style={[styles.mealTypeBadge, { backgroundColor: `${config.color}20` }]}
          >
            <Text style={styles.mealTypeEmoji}>{config.emoji}</Text>
            <Text style={[styles.mealTypeLabel, { color: config.color }]}>
              {config.label}
            </Text>
          </View>

          <Text style={styles.mealName}>{meal.name}</Text>

          <View style={styles.heroMeta}>
            <View style={styles.heroMetaItem}>
              <Text style={styles.heroMetaEmoji}>🔥</Text>
              <Text style={styles.heroMetaValue}>{meal.calories}</Text>
              <Text style={styles.heroMetaLabel}>kcal</Text>
            </View>
            <View style={styles.heroMetaDivider} />
            <View style={styles.heroMetaItem}>
              <Clock color="#9CA3AF" size={14} />
              <Text style={styles.heroMetaValue}>{meal.prepTime}</Text>
              <Text style={styles.heroMetaLabel}>min</Text>
            </View>
            <View style={styles.heroMetaDivider} />
            <View style={styles.heroMetaItem}>
              <Text style={styles.heroMetaEmoji}>🥩</Text>
              <Text style={styles.heroMetaValue}>{meal.nutrition.protein}g</Text>
              <Text style={styles.heroMetaLabel}>prot</Text>
            </View>
          </View>
        </Animated.View>

        {/* Macros */}
        <Animated.View entering={FadeInDown.delay(160).duration(400)}>
          <Text style={styles.sectionTitle}>Valeurs nutritionnelles</Text>
          <View style={styles.macrosGrid}>
            <MacroCard
              label="Protéines"
              value={meal.nutrition.protein}
              unit="g"
              color="#4ADE80"
              emoji="💪"
            />
            <MacroCard
              label="Glucides"
              value={meal.nutrition.carbs}
              unit="g"
              color="#60A5FA"
              emoji="⚡"
            />
            <MacroCard
              label="Lipides"
              value={meal.nutrition.fats}
              unit="g"
              color="#FB923C"
              emoji="🫒"
            />
            <MacroCard
              label="Calories"
              value={meal.nutrition.calories}
              unit=""
              color="#FBBF24"
              emoji="🔥"
            />
          </View>
        </Animated.View>

        {/* Ingrédients */}
        <Animated.View entering={FadeInDown.delay(240).duration(400)}>
          <Text style={styles.sectionTitle}>
            Ingrédients
            <Text style={styles.sectionSubtitle}>
              {" "}({meal.ingredients.length} éléments)
            </Text>
          </Text>
          <View style={styles.ingredientsList}>
            {meal.ingredients.map((ingredient, index) => (
              <Animated.View
                key={index}
                entering={FadeInDown.delay(240 + index * 40).duration(300)}
                style={styles.ingredientItem}
              >
                <View style={styles.ingredientDot} />
                <Text style={styles.ingredientName}>{ingredient.name}</Text>
                <View style={styles.ingredientQuantityBadge}>
                  <Text style={styles.ingredientQuantity}>
                    {ingredient.quantity}
                  </Text>
                </View>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Préparation */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)}>
          <Text style={styles.sectionTitle}>Préparation</Text>
          <View style={styles.stepsList}>
            {meal.steps.map((step, index) => (
              <Animated.View
                key={index}
                entering={FadeInDown.delay(400 + index * 60).duration(300)}
                style={styles.stepItem}
              >
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </Animated.View>
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
    marginBottom: 24,
  },
  heroEmoji: {
    width: 90,
    height: 90,
    borderRadius: 20,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  heroEmojiText: { fontSize: 44 },
  mealTypeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 10,
  },
  mealTypeEmoji: { fontSize: 13 },
  mealTypeLabel: { fontSize: 13, fontWeight: "600" },
  mealName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 16,
  },
  heroMeta: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 12,
    width: "100%",
  },
  heroMetaItem: { flex: 1, flexDirection: "row", alignItems: "center", gap: 4, justifyContent: "center" },
  heroMetaEmoji: { fontSize: 14 },
  heroMetaValue: { fontSize: 16, fontWeight: "bold", color: "#FFFFFF" },
  heroMetaLabel: { fontSize: 11, color: "#6B7280" },
  heroMetaDivider: { width: 1, height: 24, backgroundColor: "#374151", marginHorizontal: 8 },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 14,
  },
  sectionSubtitle: { fontSize: 13, color: "#6B7280", fontWeight: "normal" },
  macrosGrid: { flexDirection: "row", gap: 8, marginBottom: 24 },
  ingredientsList: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24,
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1a1a1a",
    gap: 12,
  },
  ingredientDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4ADE80",
  },
  ingredientName: { flex: 1, fontSize: 14, color: "#FFFFFF", fontWeight: "500" },
  ingredientQuantityBadge: {
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  ingredientQuantity: { fontSize: 13, color: "#9CA3AF", fontWeight: "600" },
  stepsList: { gap: 10 },
  stepItem: {
    flexDirection: "row",
    gap: 14,
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 12,
    padding: 14,
    alignItems: "flex-start",
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "rgba(74,222,128,0.15)",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  stepNumberText: { fontSize: 13, fontWeight: "bold", color: "#4ADE80" },
  stepText: { flex: 1, fontSize: 14, color: "#D1D5DB", lineHeight: 20 },
  errorText: { color: "#6B7280", textAlign: "center", marginTop: 100, fontSize: 16 },
});
