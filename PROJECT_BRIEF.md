# WIZSCLE - Application Mobile Fitness & Nutrition IA

## 🎯 Contexte du Projet

Application mobile iOS/Android de coaching fitness et nutrition personnalisée par IA.
L'utilisateur passe par un onboarding en 4 étapes, puis reçoit un programme d'entraînement hebdomadaire + plan nutritionnel quotidien générés par IA.

---

## 📚 Stack Technique

### Frontend

- **React Native** avec **Expo**
- **TypeScript**
- **Expo Router** (navigation file-based)
- **React Native Reanimated** (animations)
- **Lucide React Native** (icônes)
- **Expo Linear Gradient**
- **React Native Safe Area Context**

### State Management

- **Zustand** pour le state global
- **AsyncStorage** pour la persistance locale

### Backend (à intégrer plus tard)

- **Firebase** (Auth, Firestore, Storage)
- **OpenAI GPT-4** ou **Claude API** (génération programmes)
- **DALL-E** (images des plats)

---

## 🎨 Design System

### Couleurs Wizscle

```typescript
background: "#000000"; // Noir pur
backgroundSecondary: "#1a1a1a"; // Gris très foncé
primary: "#4ADE80"; // Vert principal
secondary: "#22C55E"; // Vert secondaire
accent: "#10B981"; // Vert émeraude
lime: "#A3E635"; // Vert lime
textPrimary: "#FFFFFF"; // Blanc
textSecondary: "#9CA3AF"; // Gris clair
textMuted: "#6B7280"; // Gris moyen
border: "#374151"; // Gris bordure
error: "#EF4444"; // Rouge
```

### Typography

- **Title**: 28px, bold, letterSpacing: -0.5
- **Subtitle**: 16px, regular
- **Body**: 16px, fontWeight: '500'
- **Small**: 14px
- **Tiny**: 12px

### Spacing (système 8px)

- xs: 8, sm: 16, md: 24, lg: 32, xl: 48, xxl: 64

### Border Radius

- sm: 12, md: 14, lg: 16, xl: 20

### Ombres (avec teinte verte)

```typescript
shadowColor: '#4ADE80'
shadowOffset: { width: 0, height: 4 }
shadowOpacity: 0.15
shadowRadius: 8
elevation: 4
```

---

## ✅ Déjà Développé

### Step 1 Onboarding (app/onboarding/step1.tsx)

- **Objectif principal** : 6 choix (Perdre du poids, Prendre muscle, Endurance, Souplesse, Santé, Maintien)
- **Objectifs secondaires** : Multi-sélection des 5 autres
- **Poids cible** : Input optionnel si "Perdre" ou "Prendre muscle"
- **Animations** : FadeIn, délai progressif sur les cards
- **Style** : Cards avec glow vert au tap, checkbox rond/carré
- **Navigation** : Système primary/secondary avec 2 écrans dans 1 fichier

### Step 2 Onboarding (app/onboarding/step2.tsx)

- **Jours par semaine** : 3, 4, 5, 6, 7
- **Durée des séances** : 30-45min, 45-60min, 60-75min, 75-90min, 90min+
- **Sauvegarde** : AsyncStorage (`onboarding_step1`)
- **Navigation** : Précédent/Suivant avec progress bar 2/4

### Store Zustand (app/store/onboardingStore.ts)

```typescript
interface OnboardingData {
  // Step 1
  primaryGoal: string | null;
  secondaryGoals: string[];
  targetWeight: string;

  // Step 2
  daysPerWeek?: number;
  sessionDuration?: string;

  // Actions
  setStep1Data: (data) => void;
  setStep2Data: (data) => void;
  resetOnboarding: () => void;
}
```

### Constantes (app/constants/)

- `colors.ts` : Palette complète Wizscle
- `theme.ts` : Spacing, borderRadius, fontSize, fontWeight, shadows

---

## 📋 À Développer (par ordre de priorité)

### 1. Step 3 Onboarding - Nutrition & Préférences

**Fichier** : `app/onboarding/step3.tsx`

**Contenu** :

- **Restrictions alimentaires** (multi-select) :

  - Aucune
  - Végétarien
  - Vegan
  - Sans gluten
  - Sans lactose
  - Halal
  - Casher
  - Allergies (avec input texte optionnel)

- **Repas par jour** : 2, 3, 4, 5, 6

- **Snacks** : Oui / Non

**Design** :

- Suivre exactement le style de Step 1 et 2
- Cards sélectionnables avec glow vert
- Progress bar 3/4
- Boutons Précédent/Suivant
- Sauvegarder dans AsyncStorage et Zustand

---

### 2. Step 4 Onboarding - Récapitulatif

**Fichier** : `app/onboarding/step4.tsx`

**Contenu** :

- Afficher TOUTES les données sélectionnées :
  - Objectif principal (avec emoji)
  - Objectifs secondaires
  - Poids cible (si renseigné)
  - Disponibilité (jours + durée)
  - Préférences nutrition
- Card par section avec icône
- Bouton "Modifier" sur chaque card → retour au step concerné
- Bouton principal "Générer mon programme IA"
- Progress bar 4/4

**Design** :

- Cards grises (#1a1a1a) avec bordure verte au survol
- Bouton CTA vert brillant avec shadow
- Layout propre et lisible

---

### 3. Loading Screen - Animation IA

**Fichier** : `app/onboarding/loading.tsx`

**Contenu** :

- Animation de particules vertes (comme Step 1)
- Messages motivants qui changent toutes les 2 secondes :

  - "Analyse de vos objectifs..."
  - "Création de votre programme..."
  - "Sélection des exercices parfaits..."
  - "Génération du plan nutritionnel..."
  - "Finalisation..."

- Durée totale : 8-10 secondes
- Puis navigation automatique vers Dashboard

**Design** :

- Fond noir avec gradient vert en haut
- Logo Wizscle animé au centre
- Barre de progression indéterminée verte
- Texte qui fade in/out

---

### 4. Dashboard Principal

**Fichier** : `app/(tabs)/index.tsx`

**Contenu** :

- **Header** :

  - "Bonjour [prénom]" avec emoji 👋
  - Date du jour
  - Streak d'entraînements (ex: "🔥 5 jours")

- **Carte Workout du jour** :

  - Titre (ex: "Push Day - Pectoraux & Triceps")
  - Durée estimée
  - Nombre d'exercices
  - Muscles ciblés (badges)
  - Bouton "Commencer"

- **Carte Nutrition du jour** :

  - Calories totales vs objectif
  - Macros (Protéines / Glucides / Lipides) avec barres
  - Aperçu des 4 repas
  - Bouton "Voir le plan"

- **Barre de progression hebdomadaire** :
  - 7 jours avec checkmarks verts
  - "3/5 entraînements complétés"

**Design** :

- ScrollView vertical
- Cards avec ombres vertes
- Icons Lucide
- Bottom Tabs pour navigation

---

### 5. Bottom Tabs Navigation

**Fichier** : `app/(tabs)/_layout.tsx`

**Tabs** :

1. **Home** (Dashboard) - Icône: Home
2. **Workout** (Entraînements) - Icône: Dumbbell
3. **Nutrition** (Plan repas) - Icône: Apple
4. **Stats** (Progression) - Icône: TrendingUp
5. **Profile** (Profil) - Icône: User

**Style** :

- Fond noir
- Icône active: #4ADE80
- Icône inactive: #6B7280
- Height: 72px
- Border top: #374151

---

### 6. Module Workouts

**Fichiers** :

- `app/workout/index.tsx` (Liste)
- `app/workout/[id].tsx` (Détail)
- `app/workout/exercise/[id].tsx` (Détail exercice avec vidéo)

**Liste** :

- Calendrier hebdomadaire (7 jours)
- Cards par jour avec :
  - Titre workout
  - Statut (À venir / Aujourd'hui / Complété)
  - Durée
  - Badge muscles ciblés

**Détail Workout** :

- Liste exercices (nom, séries, reps, repos)
- Timer intégré
- Checkbox complétion
- Notes optionnelles

**Détail Exercice** :

- Vidéo 3D (mannequin) avec contrôles
- Instructions étape par étape
- Muscles ciblés (schéma)
- Conseils forme

---

### 7. Module Nutrition

**Fichiers** :

- `app/nutrition/index.tsx` (Vue jour)
- `app/nutrition/week.tsx` (Vue semaine)
- `app/nutrition/meal/[id].tsx` (Détail recette)

**Vue Jour** :

- 4 repas (Petit-déj, Déjeuner, Snack, Dîner)
- Photo IA de chaque plat
- Calories + macros
- Bouton "Voir la recette"

**Détail Recette** :

- Photo générée par DALL-E
- Liste ingrédients avec quantités
- Étapes de préparation
- Temps de cuisson
- Macros détaillées

**Vue Semaine** :

- Calendrier 7 jours
- Récap calorique
- Bouton "Liste de courses"

---

### 8. Profil Utilisateur

**Fichier** : `app/profile/index.tsx`

**Sections** :

- Infos personnelles (modifiables)
- Statistiques :
  - Poids actuel vs objectif (graphique)
  - Temps total entraînement
  - Calories brûlées
  - Entraînements complétés
- Bouton "Régénérer programme"
- Bouton "Déconnexion"

---

## 🎨 Règles de Style à Respecter

1. **Toujours fond noir** (#000000)
2. **Animations smooth** avec Reanimated (FadeIn, SlideIn)
3. **Cards** : bg #1a1a1a, borderRadius 16, border #374151
4. **Glow vert** au tap : shadowColor #4ADE80
5. **Progress bars** : fond gris, actif vert
6. **Safe Area** partout
7. **Responsive** : paddingHorizontal 24
8. **Icons** : Lucide 24px
9. **Gap** entre éléments : 12-16px

---

## 📁 Structure de Fichiers

```
app/
  ├── (tabs)/
  │   ├── _layout.tsx         (Bottom tabs)
  │   ├── index.tsx           (Dashboard)
  │   ├── workout.tsx         (Liste workouts)
  │   ├── nutrition.tsx       (Plan nutrition)
  │   ├── stats.tsx           (Progression)
  │   └── profile.tsx         (Profil)
  ├── onboarding/
  │   ├── _layout.tsx         (Navigation onboarding)
  │   ├── step1.tsx           ✅ FAIT
  │   ├── step2.tsx           ✅ FAIT
  │   ├── step3.tsx           ⏳ À FAIRE
  │   ├── step4.tsx           ⏳ À FAIRE
  │   └── loading.tsx         ⏳ À FAIRE
  ├── workout/
  │   ├── index.tsx           (Liste)
  │   ├── [id].tsx            (Détail)
  │   └── exercise/[id].tsx   (Exercice)
  ├── nutrition/
  │   ├── index.tsx           (Jour)
  │   ├── week.tsx            (Semaine)
  │   └── meal/[id].tsx       (Recette)
  ├── components/
  │   ├── Button.tsx
  │   ├── Card.tsx
  │   ├── Input.tsx
  │   └── ProgressBar.tsx
  ├── store/
  │   └── onboardingStore.ts  ✅ FAIT
  └── constants/
      ├── colors.ts           ✅ FAIT
      └── theme.ts            ✅ FAIT
```

---

## 🚀 Commandes Suggérées pour Claude Code

```bash
# Créer Step 3
"Lis PROJECT_BRIEF.md et crée app/onboarding/step3.tsx en suivant exactement le même style que step1.tsx et step2.tsx. Respecte le design system Wizscle."

# Créer Step 4
"Crée step4.tsx (récapitulatif) avec toutes les données de l'onboarding affichées dans des cards. Style identique aux steps précédents."

# Créer Loading
"Crée loading.tsx avec animation de particules vertes et messages qui changent. Animation 8-10 secondes puis navigation vers /(tabs)/"

# Créer Dashboard
"Crée le dashboard principal dans (tabs)/index.tsx avec carte workout du jour, carte nutrition, et barre progression hebdomadaire."
```

---

## ⚠️ Points d'Attention

- **Ne PAS utiliser** `className` (c'est du web)
- **Toujours** utiliser StyleSheet.create()
- **Toujours** SafeAreaView sur les écrans principaux
- **Animations** : Reanimated, pas Framer Motion
- **Navigation** : Expo Router file-based
- **Types** : Tout en TypeScript strict

---

## 📦 Packages Déjà Installés

- react-native-reanimated
- lucide-react-native
- expo-linear-gradient
- @react-native-async-storage/async-storage
- zustand
- expo-router
- react-native-safe-area-context

---

**FIN DU BRIEF**
