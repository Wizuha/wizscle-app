// app/constants/theme.ts

export const THEME = {
  // Spacing (système de 8px)
  spacing: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
    xxl: 64,
  },

  // Border Radius (basé sur --radius: 1rem = 16px)
  borderRadius: {
    sm: 12, // calc(16px - 4px)
    md: 14, // calc(16px - 2px)
    lg: 16, // var(--radius)
    xl: 20, // calc(16px + 4px)
  },

  // Font Size
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16, // --font-size
    lg: 18,
    xl: 22,
    xxl: 28,
    xxxl: 32,
  },

  // Font Weight
  fontWeight: {
    normal: "400", // --font-weight-normal
    medium: "500", // --font-weight-medium
    bold: "700", // --font-weight-bold
  },

  // Letter Spacing
  letterSpacing: {
    tight: -0.5, // h1, h2
    normal: -0.3, // h3
    wide: 0.5,
  },

  // Line Height
  lineHeight: {
    tight: 1.2, // h1
    normal: 1.3, // h2
    relaxed: 1.4, // h3
    loose: 1.5, // p, label, button, input
  },

  // Shadows avec teinte verte Wizscle
  shadow: {
    sm: {
      shadowColor: "#4ADE80",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: "#4ADE80",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: "#4ADE80",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
  },
} as const;
