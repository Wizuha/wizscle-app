import { create } from "zustand";

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface Ingredient {
  name: string;
  quantity: string;
}

export interface Meal {
  id: string;
  type: "breakfast" | "lunch" | "snack" | "dinner";
  name: string;
  prepTime: number;
  calories: number;
  nutrition: NutritionInfo;
  ingredients: Ingredient[];
  steps: string[];
  imageEmoji: string;
}

export interface DayPlan {
  dayIndex: number;
  day: string;
  shortDay: string;
  meals: Meal[];
  totalNutrition: NutritionInfo;
}

interface NutritionStore {
  weekPlan: DayPlan[];
  getMealById: (id: string) => Meal | undefined;
  getDayPlan: (dayIndex: number) => DayPlan;
}

const ALL_MEALS: Meal[] = [
  // Breakfasts
  {
    id: "breakfast-1",
    type: "breakfast",
    name: "Overnight oats protéinés",
    prepTime: 5,
    calories: 480,
    imageEmoji: "🥣",
    nutrition: { calories: 480, protein: 32, carbs: 58, fats: 11 },
    ingredients: [
      { name: "Flocons d'avoine", quantity: "80g" },
      { name: "Lait d'amande", quantity: "200ml" },
      { name: "Whey protéine vanille", quantity: "1 dose (30g)" },
      { name: "Banane", quantity: "1 petite" },
      { name: "Beurre de cacahuète", quantity: "1 c. à soupe" },
      { name: "Graines de chia", quantity: "10g" },
    ],
    steps: [
      "Mélangez les flocons d'avoine avec le lait d'amande dans un pot.",
      "Ajoutez la whey protéine et les graines de chia. Mélangez bien.",
      "Couvrez et réfrigérez toute la nuit (minimum 4h).",
      "Au matin, ajoutez la banane en rondelles et le beurre de cacahuète.",
    ],
  },
  {
    id: "breakfast-2",
    type: "breakfast",
    name: "Omelette blanc d'œuf & légumes",
    prepTime: 10,
    calories: 320,
    imageEmoji: "🍳",
    nutrition: { calories: 320, protein: 38, carbs: 12, fats: 12 },
    ingredients: [
      { name: "Blancs d'œufs", quantity: "5 (ou 200ml)" },
      { name: "Œuf entier", quantity: "1" },
      { name: "Épinards frais", quantity: "50g" },
      { name: "Tomate cerise", quantity: "6" },
      { name: "Feta allégée", quantity: "30g" },
      { name: "Herbes de Provence", quantity: "à goût" },
    ],
    steps: [
      "Battez les blancs d'œufs et l'œuf entier. Assaisonnez.",
      "Faites revenir les épinards dans une poêle antiadhésive.",
      "Versez le mélange d'œufs sur les épinards.",
      "Ajoutez les tomates cerises et la feta. Pliez en deux.",
    ],
  },
  {
    id: "breakfast-3",
    type: "breakfast",
    name: "Bowl açaï protéiné",
    prepTime: 8,
    calories: 420,
    imageEmoji: "🫐",
    nutrition: { calories: 420, protein: 25, carbs: 52, fats: 13 },
    ingredients: [
      { name: "Purée d'açaï", quantity: "100g" },
      { name: "Banane congelée", quantity: "1" },
      { name: "Whey protéine fruits rouges", quantity: "20g" },
      { name: "Lait de coco allégé", quantity: "50ml" },
      { name: "Granola faible en sucre", quantity: "30g" },
      { name: "Myrtilles fraîches", quantity: "50g" },
      { name: "Graines de lin", quantity: "10g" },
    ],
    steps: [
      "Mixez la purée d'açaï, la banane congelée, la whey et le lait de coco.",
      "Versez dans un bol.",
      "Garnissez de granola, myrtilles et graines de lin.",
    ],
  },
  // Lunches
  {
    id: "lunch-1",
    type: "lunch",
    name: "Bowl de riz poulet grillé",
    prepTime: 20,
    calories: 620,
    imageEmoji: "🍗",
    nutrition: { calories: 620, protein: 52, carbs: 68, fats: 12 },
    ingredients: [
      { name: "Riz basmati", quantity: "100g cru" },
      { name: "Blanc de poulet", quantity: "180g" },
      { name: "Brocoli", quantity: "150g" },
      { name: "Avocat", quantity: "½" },
      { name: "Sauce soja allégée", quantity: "2 c. à soupe" },
      { name: "Ail", quantity: "2 gousses" },
      { name: "Gingembre frais", quantity: "1 c. à café" },
    ],
    steps: [
      "Faites cuire le riz selon les instructions.",
      "Marinez le poulet avec la sauce soja, l'ail et le gingembre 15 min.",
      "Grilllez le poulet 6 min de chaque côté.",
      "Faites cuire le brocoli à la vapeur 5 min.",
      "Assemblez le bowl : riz, poulet en tranches, brocoli, avocat.",
    ],
  },
  {
    id: "lunch-2",
    type: "lunch",
    name: "Salade de quinoa thon avocat",
    prepTime: 15,
    calories: 540,
    imageEmoji: "🥗",
    nutrition: { calories: 540, protein: 44, carbs: 45, fats: 18 },
    ingredients: [
      { name: "Quinoa", quantity: "80g cru" },
      { name: "Thon en conserve (eau)", quantity: "150g" },
      { name: "Avocat", quantity: "1" },
      { name: "Concombre", quantity: "½" },
      { name: "Tomates cerises", quantity: "10" },
      { name: "Jus de citron", quantity: "2 c. à soupe" },
      { name: "Huile d'olive", quantity: "1 c. à soupe" },
    ],
    steps: [
      "Faites cuire le quinoa et laissez refroidir.",
      "Égouttez le thon.",
      "Coupez l'avocat, le concombre et les tomates.",
      "Mélangez tout dans un saladier.",
      "Assaisonnez avec jus de citron et huile d'olive.",
    ],
  },
  {
    id: "lunch-3",
    type: "lunch",
    name: "Wrap dinde & légumes",
    prepTime: 10,
    calories: 490,
    imageEmoji: "🌯",
    nutrition: { calories: 490, protein: 42, carbs: 48, fats: 14 },
    ingredients: [
      { name: "Tortilla blé complet", quantity: "2 grandes" },
      { name: "Escalope de dinde", quantity: "150g" },
      { name: "Fromage blanc 0%", quantity: "2 c. à soupe" },
      { name: "Salade mélangée", quantity: "60g" },
      { name: "Tomate", quantity: "1" },
      { name: "Poivron rouge", quantity: "½" },
      { name: "Moutarde", quantity: "1 c. à café" },
    ],
    steps: [
      "Faites cuire la dinde à la poêle avec les épices.",
      "Mélangez le fromage blanc et la moutarde.",
      "Tartinez les tortillas avec le mélange.",
      "Ajoutez la dinde, la salade, la tomate et le poivron.",
      "Roulez les wraps fermement.",
    ],
  },
  // Snacks
  {
    id: "snack-1",
    type: "snack",
    name: "Shake protéiné banane-cacahuète",
    prepTime: 3,
    calories: 280,
    imageEmoji: "🥤",
    nutrition: { calories: 280, protein: 28, carbs: 28, fats: 7 },
    ingredients: [
      { name: "Whey protéine chocolat", quantity: "1 dose (30g)" },
      { name: "Banane", quantity: "1" },
      { name: "Beurre de cacahuète", quantity: "1 c. à café" },
      { name: "Lait d'amande non sucré", quantity: "300ml" },
      { name: "Glaçons", quantity: "4-5" },
    ],
    steps: [
      "Mettez tous les ingrédients dans un blender.",
      "Mixez 30 secondes jusqu'à obtenir une texture lisse.",
      "Servez immédiatement.",
    ],
  },
  {
    id: "snack-2",
    type: "snack",
    name: "Yaourt grec & fruits",
    prepTime: 2,
    calories: 230,
    imageEmoji: "🍓",
    nutrition: { calories: 230, protein: 20, carbs: 26, fats: 4 },
    ingredients: [
      { name: "Yaourt grec 0%", quantity: "200g" },
      { name: "Fraises", quantity: "100g" },
      { name: "Miel", quantity: "1 c. à café" },
      { name: "Amandes effilées", quantity: "15g" },
    ],
    steps: [
      "Versez le yaourt grec dans un bol.",
      "Ajoutez les fraises coupées.",
      "Arrosez de miel et saupoudrez d'amandes.",
    ],
  },
  // Dinners
  {
    id: "dinner-1",
    type: "dinner",
    name: "Saumon grillé & patate douce",
    prepTime: 25,
    calories: 580,
    imageEmoji: "🐟",
    nutrition: { calories: 580, protein: 48, carbs: 42, fats: 22 },
    ingredients: [
      { name: "Filet de saumon", quantity: "200g" },
      { name: "Patate douce", quantity: "200g" },
      { name: "Asperges", quantity: "150g" },
      { name: "Jus de citron", quantity: "2 c. à soupe" },
      { name: "Huile d'olive", quantity: "1 c. à soupe" },
      { name: "Aneth", quantity: "à goût" },
    ],
    steps: [
      "Préchauffez le four à 200°C.",
      "Coupez la patate douce en cubes, enrobez d'huile et enfournez 20 min.",
      "Assaisonnez le saumon avec jus de citron et aneth.",
      "Faites griller le saumon 4 min de chaque côté.",
      "Faites sauter les asperges à la poêle 5 min.",
      "Servez avec les légumes.",
    ],
  },
  {
    id: "dinner-2",
    type: "dinner",
    name: "Poulet rôti légumes méditerranéens",
    prepTime: 35,
    calories: 520,
    imageEmoji: "🍽️",
    nutrition: { calories: 520, protein: 50, carbs: 32, fats: 18 },
    ingredients: [
      { name: "Cuisse de poulet sans peau", quantity: "250g" },
      { name: "Courgette", quantity: "1" },
      { name: "Poivrons mélangés", quantity: "200g" },
      { name: "Tomates cerises", quantity: "100g" },
      { name: "Herbes de Provence", quantity: "2 c. à café" },
      { name: "Ail", quantity: "3 gousses" },
      { name: "Huile d'olive", quantity: "1 c. à soupe" },
    ],
    steps: [
      "Préchauffez le four à 190°C.",
      "Coupez tous les légumes en morceaux.",
      "Mélangez légumes et poulet avec l'huile, l'ail et les herbes.",
      "Disposez dans un plat allant au four.",
      "Enfournez 35 min en retournant à mi-cuisson.",
    ],
  },
  {
    id: "dinner-3",
    type: "dinner",
    name: "Bœuf haché & riz complet",
    prepTime: 20,
    calories: 600,
    imageEmoji: "🥩",
    nutrition: { calories: 600, protein: 54, carbs: 55, fats: 16 },
    ingredients: [
      { name: "Bœuf haché 5% MG", quantity: "200g" },
      { name: "Riz complet", quantity: "90g cru" },
      { name: "Oignon", quantity: "1" },
      { name: "Poivron", quantity: "1" },
      { name: "Concentré de tomates", quantity: "2 c. à soupe" },
      { name: "Paprika", quantity: "1 c. à café" },
      { name: "Cumin", quantity: "1 c. à café" },
    ],
    steps: [
      "Faites cuire le riz complet.",
      "Faites revenir l'oignon et le poivron hachés.",
      "Ajoutez le bœuf haché, émiettez bien.",
      "Incorporez le concentré de tomates et les épices.",
      "Laissez mijoter 10 min. Servez sur le riz.",
    ],
  },
];

function buildDayPlan(
  dayIndex: number,
  day: string,
  shortDay: string,
  breakfastId: string,
  lunchId: string,
  snackId: string,
  dinnerId: string
): DayPlan {
  const meals = [breakfastId, lunchId, snackId, dinnerId]
    .map((id) => ALL_MEALS.find((m) => m.id === id)!)
    .filter(Boolean);

  const totalNutrition = meals.reduce(
    (acc, m) => ({
      calories: acc.calories + m.nutrition.calories,
      protein: acc.protein + m.nutrition.protein,
      carbs: acc.carbs + m.nutrition.carbs,
      fats: acc.fats + m.nutrition.fats,
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  return { dayIndex, day, shortDay, meals, totalNutrition };
}

const mockWeekPlan: DayPlan[] = [
  buildDayPlan(0, "Lundi", "Lun", "breakfast-1", "lunch-1", "snack-1", "dinner-1"),
  buildDayPlan(1, "Mardi", "Mar", "breakfast-2", "lunch-2", "snack-2", "dinner-2"),
  buildDayPlan(2, "Mercredi", "Mer", "breakfast-3", "lunch-3", "snack-1", "dinner-3"),
  buildDayPlan(3, "Jeudi", "Jeu", "breakfast-1", "lunch-1", "snack-2", "dinner-1"),
  buildDayPlan(4, "Vendredi", "Ven", "breakfast-2", "lunch-2", "snack-1", "dinner-2"),
  buildDayPlan(5, "Samedi", "Sam", "breakfast-3", "lunch-1", "snack-2", "dinner-3"),
  buildDayPlan(6, "Dimanche", "Dim", "breakfast-1", "lunch-3", "snack-1", "dinner-1"),
];

export const useNutritionStore = create<NutritionStore>((_, get) => ({
  weekPlan: mockWeekPlan,

  getMealById: (id) => ALL_MEALS.find((m) => m.id === id),

  getDayPlan: (dayIndex) => {
    const plan = get().weekPlan.find((d) => d.dayIndex === dayIndex);
    return plan ?? get().weekPlan[0];
  },
}));
