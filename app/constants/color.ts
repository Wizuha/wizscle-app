export const COLORS = {
  // Arrière-plans
  background: "#000000",
  backgroundSecondary: "#1a1a1a",

  // Palette verte Wizscle
  primary: "#4ADE80",
  secondary: "#22C55E",
  accent: "#10B981",
  lime: "#A3E635",

  // Texte
  textPrimary: "#FFFFFF",
  textSecondary: "#9CA3AF",
  textTertiary: "#6B7280",

  // Utilitaires
  border: "#374151",
  borderLight: "#4B5563",
  error: "#EF4444",
  success: "#10B981",
  warning: "#F59E0B",

  // Opacités
  overlay: "rgba(0, 0, 0, 0.8)",
  cardBackground: "rgba(26, 26, 26, 0.9)",
} as const;

// Type pour les couleurs (autocomplete dans VSCode)
export type ColorKey = keyof typeof COLORS;
