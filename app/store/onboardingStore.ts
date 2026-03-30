import { create } from "zustand";

interface OnboardingData {
  // Step 1 - Objectifs
  primaryGoal: string | null;
  secondaryGoals: string[];
  targetWeight: string;

  // Step 2 - Disponibilité
  daysPerWeek: number | null;
  sessionDuration: string | null;

  // Step 3 - Équipement
  trainingLocation: string | null;

  // Step 4 - Profil physique
  age: string;
  weight: string;
  height: string;
  sex: "male" | "female" | null;
  experienceLevel: string | null;

  // Actions
  setStep1Data: (data: {
    primaryGoal: string;
    secondaryGoals: string[];
    targetWeight: string;
  }) => void;
  setStep2Data: (data: { daysPerWeek: number; sessionDuration: string }) => void;
  setStep3Data: (data: { trainingLocation: string }) => void;
  setStep4Data: (data: {
    age: string;
    weight: string;
    height: string;
    sex: "male" | "female";
    experienceLevel: string;
  }) => void;
  resetOnboarding: () => void;
}

const initialState = {
  primaryGoal: null,
  secondaryGoals: [],
  targetWeight: "",
  daysPerWeek: null,
  sessionDuration: null,
  trainingLocation: null,
  age: "",
  weight: "",
  height: "",
  sex: null as "male" | "female" | null,
  experienceLevel: null,
};

export const useOnboardingStore = create<OnboardingData>((set) => ({
  ...initialState,

  setStep1Data: (data) =>
    set({
      primaryGoal: data.primaryGoal,
      secondaryGoals: data.secondaryGoals,
      targetWeight: data.targetWeight,
    }),

  setStep2Data: (data) =>
    set({
      daysPerWeek: data.daysPerWeek,
      sessionDuration: data.sessionDuration,
    }),

  setStep3Data: (data) =>
    set({
      trainingLocation: data.trainingLocation,
    }),

  setStep4Data: (data) =>
    set({
      age: data.age,
      weight: data.weight,
      height: data.height,
      sex: data.sex,
      experienceLevel: data.experienceLevel,
    }),

  resetOnboarding: () => set(initialState),
}));
