import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export interface UserProfile {
  name: string;
  age: number;
  weight: number;
  height: number;
  sex: "male" | "female";
  goal: string;
  level: "beginner" | "intermediate" | "advanced";
  daysPerWeek: number;
  location: string;
}

interface UserStore {
  profile: UserProfile;
  isOnboarded: boolean;
  weightHistory: { date: string; weight: number }[];
  setProfile: (profile: Partial<UserProfile>) => void;
  setOnboarded: (value: boolean) => Promise<void>;
  checkOnboarding: () => Promise<boolean>;
  addWeightEntry: (weight: number) => void;
}

const defaultProfile: UserProfile = {
  name: "Alex",
  age: 26,
  weight: 78,
  height: 178,
  sex: "male",
  goal: "gain-muscle",
  level: "intermediate",
  daysPerWeek: 5,
  location: "Salle de sport complète",
};

const mockWeightHistory = [
  { date: "2026-01-06", weight: 80 },
  { date: "2026-01-13", weight: 79.5 },
  { date: "2026-01-20", weight: 79.2 },
  { date: "2026-01-27", weight: 78.8 },
  { date: "2026-02-03", weight: 78.5 },
  { date: "2026-02-10", weight: 78.2 },
  { date: "2026-02-17", weight: 78.0 },
  { date: "2026-02-24", weight: 77.8 },
  { date: "2026-03-03", weight: 78.1 },
  { date: "2026-03-10", weight: 77.9 },
  { date: "2026-03-17", weight: 78.0 },
  { date: "2026-03-24", weight: 78.0 },
];

export const useUserStore = create<UserStore>((set) => ({
  profile: defaultProfile,
  isOnboarded: false,
  weightHistory: mockWeightHistory,

  setProfile: (data) =>
    set((state) => ({ profile: { ...state.profile, ...data } })),

  setOnboarded: async (value) => {
    await AsyncStorage.setItem("onboardingComplete", value ? "true" : "false");
    set({ isOnboarded: value });
  },

  checkOnboarding: async () => {
    const val = await AsyncStorage.getItem("onboardingComplete");
    const isOnboarded = val === "true";
    set({ isOnboarded });
    return isOnboarded;
  },

  addWeightEntry: (weight) =>
    set((state) => ({
      weightHistory: [
        ...state.weightHistory,
        { date: new Date().toISOString().split("T")[0], weight },
      ],
    })),
}));
