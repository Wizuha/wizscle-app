import { create } from "zustand";

// Types
interface OnboardingData {
  // Step 1 - Objectifs
  primaryGoal: string | null;
  secondaryGoals: string[];
  targetWeight: string;

  // Step 2 - À ajouter plus tard
  experienceLevel?: string;
  trainingLocation?: string;
  daysPerWeek?: number;
  sessionDuration?: string;

  // Step 3 - À ajouter plus tard
  dietaryRestrictions?: string[];
  mealsPerDay?: number;

  // Actions
  setStep1Data: (data: {
    primaryGoal: string;
    secondaryGoals: string[];
    targetWeight: string;
  }) => void;

  resetOnboarding: () => void;
}

// État initial
const initialState = {
  primaryGoal: null,
  secondaryGoals: [],
  targetWeight: "",
};

// Store
export const useOnboardingStore = create<OnboardingData>((set) => ({
  ...initialState,

  // Sauvegarder les données du Step 1
  setStep1Data: (data) =>
    set({
      primaryGoal: data.primaryGoal,
      secondaryGoals: data.secondaryGoals,
      targetWeight: data.targetWeight,
    }),

  // Reset pour recommencer
  resetOnboarding: () => set(initialState),
}));
