export interface UserProfile {
  id: string;
  email: string;
  age: number;
  sex: "male" | "female" | "other";
  weight: number;
  height: number;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserGoals {
  objective: "bulking" | "cutting" | "toning" | "maintenance";
  level: "beginner" | "intermediate" | "advanced";
}

export interface UserAvailability {
  daysPerWeek: number;
  sessionDuration: number;
  location: "gym" | "home-equipped" | "home-bodyweight" | "limited";
  equipment?: string[];
  injuries?: string;
}

export interface UserNutrition {
  restrictions: string[];
  mealsPerDay: number;
  cookingPreference: "quick" | "elaborate";
  budget?: "low" | "medium" | "high";
}

// Types programme d'entraînement
export interface Exercise {
  id: string;
  name: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  videoUrl: string;
  instructions: string;
  sets: number;
  reps: string;
  rest: number;
  tips: string;
}

export interface WorkoutSession {
  day: string;
  name: string;
  duration: number;
  exercises: Exercise[];
  completed?: boolean;
}

export interface WorkoutProgram {
  id: string;
  userId: string;
  weekProgram: WorkoutSession[];
  generatedAt: Date;
  active: boolean;
}

export interface Meal {
  id: string;
  mealType: "breakfast" | "lunch" | "snack" | "dinner";
  name: string;
  prepTime: number;
  ingredients: Ingredient[];
  steps: string[];
  nutrition: NutritionInfo;
  imageUrl: string;
}

export interface Ingredient {
  name: string;
  quantity: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
}

export interface DailyMealPlan {
  date: string;
  meals: Meal[];
  totalNutrition: NutritionInfo;
}

export interface MealPlan {
  id: string;
  userId: string;
  weekPlan: DailyMealPlan[];
  generatedAt: Date;
  active: boolean;
}

// Types progression
export interface WorkoutProgress {
  userId: string;
  date: string;
  workoutCompleted: boolean;
  exercisesCompleted: string[];
  duration: number;
}

export interface WeightEntry {
  userId: string;
  date: string;
  weight: number;
}
