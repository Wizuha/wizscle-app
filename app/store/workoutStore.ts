import { create } from "zustand";

export interface Exercise {
  id: string;
  name: string;
  muscleGroups: string[];
  equipment: string;
  sets: number;
  reps: string;
  rest: number;
  instructions: string[];
  tips: string;
}

export interface WorkoutSession {
  id: string;
  day: string;
  dayIndex: number;
  name: string;
  type: "push" | "pull" | "legs" | "upper" | "cardio" | "rest";
  duration: number;
  targetMuscles: string[];
  exercises: Exercise[];
  completed: boolean;
}

interface WorkoutStore {
  program: WorkoutSession[];
  toggleWorkoutCompleted: (id: string) => void;
  getWorkoutById: (id: string) => WorkoutSession | undefined;
  getExerciseById: (exerciseId: string) => Exercise | undefined;
}

const EXERCISES: Record<string, Exercise> = {
  "bench-press": {
    id: "bench-press",
    name: "Développé couché",
    muscleGroups: ["Pectoraux", "Triceps", "Épaules"],
    equipment: "Barre + banc",
    sets: 4,
    reps: "8-10",
    rest: 90,
    instructions: [
      "Allongez-vous sur le banc, pieds à plat au sol.",
      "Saisissez la barre un peu plus large que la largeur des épaules.",
      "Descendez la barre lentement vers le milieu de la poitrine.",
      "Poussez la barre vers le haut en expirant jusqu'à l'extension complète.",
      "Gardez les omoplates rétractées tout au long du mouvement.",
    ],
    tips: "Ne laissez pas les coudes s'écarter à plus de 75°. Contrôlez bien la descente en 2-3 secondes.",
  },
  "incline-press": {
    id: "incline-press",
    name: "Développé incliné haltères",
    muscleGroups: ["Pectoraux haut", "Épaules", "Triceps"],
    equipment: "Haltères + banc incliné",
    sets: 3,
    reps: "10-12",
    rest: 75,
    instructions: [
      "Réglez le banc à 30-45°.",
      "Tenez un haltère dans chaque main, bras tendus au-dessus de la poitrine.",
      "Descendez les haltères lentement de chaque côté de la poitrine.",
      "Remontez en appuyant les haltères l'un vers l'autre en haut.",
    ],
    tips: "Le banc incliné à 30° cible mieux le haut des pectoraux qu'à 45°.",
  },
  "cable-fly": {
    id: "cable-fly",
    name: "Écarté câble croisé",
    muscleGroups: ["Pectoraux", "Deltoïdes antérieurs"],
    equipment: "Câble",
    sets: 3,
    reps: "12-15",
    rest: 60,
    instructions: [
      "Réglez les câbles en position haute.",
      "Placez-vous au centre, un câble dans chaque main.",
      "Avancez légèrement un pied devant l'autre pour équilibrer.",
      "Amenez les mains devant vous en arc de cercle, en gardant un léger pli aux coudes.",
      "Revenez lentement en contrôlant la charge.",
    ],
    tips: "Concentrez-vous sur le pincement des pectoraux en bas du mouvement. Ne bloquez pas les coudes.",
  },
  "overhead-press": {
    id: "overhead-press",
    name: "Développé militaire",
    muscleGroups: ["Épaules", "Triceps", "Trapèzes"],
    equipment: "Barre ou haltères",
    sets: 4,
    reps: "8-10",
    rest: 90,
    instructions: [
      "Debout, pieds à la largeur des hanches.",
      "Saisissez la barre au niveau des épaules, paumes vers l'avant.",
      "Poussez la barre au-dessus de la tête jusqu'à l'extension complète.",
      "Amenez légèrement la tête en avant quand la barre passe devant le visage.",
      "Redescendez lentement à hauteur d'épaule.",
    ],
    tips: "Gardez le gainage abdominal actif pour protéger le bas du dos. Ne cambrez pas.",
  },
  "lateral-raises": {
    id: "lateral-raises",
    name: "Élévations latérales",
    muscleGroups: ["Épaules (chef médian)"],
    equipment: "Haltères",
    sets: 3,
    reps: "15",
    rest: 60,
    instructions: [
      "Debout, haltères le long du corps.",
      "Levez les bras sur les côtés jusqu'à hauteur des épaules.",
      "Gardez un léger pli aux coudes, les paumes vers le bas.",
      "Redescendez lentement en résistant à la gravité.",
    ],
    tips: "Penchez légèrement le torse en avant et tournez les pouces légèrement vers le bas pour mieux cibler le faisceau médian.",
  },
  "tricep-pushdown": {
    id: "tricep-pushdown",
    name: "Pushdown triceps câble",
    muscleGroups: ["Triceps"],
    equipment: "Câble",
    sets: 3,
    reps: "12-15",
    rest: 60,
    instructions: [
      "Debout face au câble, coudes collés au corps.",
      "Poussez la corde ou la barre vers le bas jusqu'à l'extension complète.",
      "Sentez la contraction des triceps en bas.",
      "Remontez lentement sans décoller les coudes.",
    ],
    tips: "Gardez les coudes fixes le long du corps. L'erreur commune est de les laisser partir en avant.",
  },
  "deadlift": {
    id: "deadlift",
    name: "Soulevé de terre",
    muscleGroups: ["Ischio-jambiers", "Fessiers", "Dos", "Trapèzes"],
    equipment: "Barre",
    sets: 4,
    reps: "5-6",
    rest: 120,
    instructions: [
      "Pieds à la largeur des hanches, barre au-dessus des mi-pieds.",
      "Fléchissez les hanches et genoux, saisissez la barre juste à l'extérieur des jambes.",
      "Inspirez, gainez fort, dos droit.",
      "Poussez le sol loin de vous en remontant.",
      "Finissez debout, hanches et genoux verrouillés.",
      "Redescendez en contrôlant, hanches en arrière d'abord.",
    ],
    tips: "Gardez la barre collée au corps tout le long du mouvement. Ne arrondissez jamais le bas du dos.",
  },
  "pullups": {
    id: "pullups",
    name: "Tractions",
    muscleGroups: ["Grand dorsal", "Biceps", "Rhomboïdes"],
    equipment: "Barre de traction",
    sets: 4,
    reps: "6-8",
    rest: 90,
    instructions: [
      "Saisissez la barre en pronation, écartement légèrement plus large que les épaules.",
      "Partez bras tendus, épaules légèrement rétractées.",
      "Tirez le menton au-dessus de la barre en gardant le buste légèrement incliné.",
      "Redescendez lentement jusqu'à l'extension complète.",
    ],
    tips: "Initiez le mouvement avec les coudes, pas les mains. Pensez à 'amener les coudes vers les hanches'.",
  },
  "seated-row": {
    id: "seated-row",
    name: "Rowing assis câble",
    muscleGroups: ["Grand dorsal", "Rhomboïdes", "Biceps"],
    equipment: "Câble",
    sets: 3,
    reps: "10-12",
    rest: 75,
    instructions: [
      "Assis face au câble, pieds sur les appuis, genoux légèrement fléchis.",
      "Saisissez la poignée, bras tendus, dos droit.",
      "Tirez la poignée vers le nombril en rétractant les omoplates.",
      "Maintenez la contraction 1 seconde, puis revenez lentement.",
    ],
    tips: "Ne balancez pas le buste. Tout le mouvement doit venir des bras et du dos.",
  },
  "face-pulls": {
    id: "face-pulls",
    name: "Face pulls",
    muscleGroups: ["Deltoïdes postérieurs", "Rhomboïdes", "Coiffes des rotateurs"],
    equipment: "Câble + corde",
    sets: 3,
    reps: "15",
    rest: 60,
    instructions: [
      "Réglez le câble à hauteur des yeux.",
      "Saisissez la corde en pronation (paumes vers le bas).",
      "Tirez la corde vers le visage en écartant les mains.",
      "Finissez avec les coudes au-dessus des épaules et les mains de chaque côté du visage.",
    ],
    tips: "Exercice essentiel pour la santé des épaules. Ne négligez pas cet exercice même s'il semble léger.",
  },
  "bicep-curls": {
    id: "bicep-curls",
    name: "Curl haltères",
    muscleGroups: ["Biceps", "Avant-bras"],
    equipment: "Haltères",
    sets: 3,
    reps: "10-12",
    rest: 60,
    instructions: [
      "Debout, haltères le long du corps, paumes vers l'avant.",
      "Fléchissez les coudes en amenant les haltères vers les épaules.",
      "Maintenez la contraction en haut.",
      "Redescendez lentement sans balancer les coudes.",
    ],
    tips: "Gardez les coudes fixes le long du corps. Supinez les poignets en montant pour une meilleure contraction.",
  },
  "squat": {
    id: "squat",
    name: "Squat barre",
    muscleGroups: ["Quadriceps", "Fessiers", "Ischio-jambiers"],
    equipment: "Barre + rack",
    sets: 4,
    reps: "8-10",
    rest: 120,
    instructions: [
      "Barre sur les trapèzes, pieds à la largeur des épaules.",
      "Inspirez, gainez, descendez en poussant les genoux vers l'extérieur.",
      "Descendez jusqu'à ce que les cuisses soient parallèles au sol.",
      "Remontez en poussant fort sur les talons.",
      "Gardez le dos droit et la poitrine haute.",
    ],
    tips: "Ne laissez pas les genoux rentrer vers l'intérieur. Gardez le regard droit devant ou légèrement vers le haut.",
  },
  "romanian-deadlift": {
    id: "romanian-deadlift",
    name: "Soulevé de terre roumain",
    muscleGroups: ["Ischio-jambiers", "Fessiers", "Bas du dos"],
    equipment: "Barre ou haltères",
    sets: 3,
    reps: "10-12",
    rest: 90,
    instructions: [
      "Debout, barre devant les cuisses, dos droit.",
      "Poussez les hanches en arrière en descendant la barre le long des jambes.",
      "Descendez jusqu'à sentir l'étirement des ischio-jambiers.",
      "Remontez en contractant les fessiers et les ischio-jambiers.",
    ],
    tips: "Ce n'est pas un squat ! Gardez les jambes presque tendues et initiez toujours le mouvement avec les hanches.",
  },
  "leg-press": {
    id: "leg-press",
    name: "Presse à cuisses",
    muscleGroups: ["Quadriceps", "Fessiers"],
    equipment: "Machine leg press",
    sets: 3,
    reps: "12-15",
    rest: 75,
    instructions: [
      "Installez-vous sur la machine, dos appuyé contre le dossier.",
      "Placez les pieds à la largeur des épaules sur la plateforme.",
      "Déverrouillez la machine et descendez lentement.",
      "Remontez sans verrouiller complètement les genoux.",
    ],
    tips: "Plus les pieds sont hauts sur la plateforme, plus vous sollicitez les fessiers et les ischio-jambiers.",
  },
  "calf-raises": {
    id: "calf-raises",
    name: "Mollets à la presse",
    muscleGroups: ["Mollets (gastrocnémiens)"],
    equipment: "Machine leg press ou marche",
    sets: 4,
    reps: "15-20",
    rest: 60,
    instructions: [
      "Installez-vous sur le bord d'une marche ou la presse, talons dans le vide.",
      "Descendez les talons en dessous du niveau de la marche.",
      "Montez sur la pointe des pieds le plus haut possible.",
      "Maintenez 1 seconde en haut.",
    ],
    tips: "Les mollets nécessitent beaucoup de volume. N'hésitez pas à faire des séries longues.",
  },
  "bb-row": {
    id: "bb-row",
    name: "Rowing barre",
    muscleGroups: ["Grand dorsal", "Rhomboïdes", "Biceps"],
    equipment: "Barre",
    sets: 4,
    reps: "8-10",
    rest: 90,
    instructions: [
      "Inclinez le buste à environ 45°, dos droit.",
      "Saisissez la barre en pronation, largeur des épaules.",
      "Tirez la barre vers le nombril en rétractant les omoplates.",
      "Maintenez la contraction 1 seconde puis redescendez.",
    ],
    tips: "Initez le mouvement avec les coudes, pas les mains. Le buste ne doit pas balancer.",
  },
  "lat-pulldown": {
    id: "lat-pulldown",
    name: "Tirage nuque / poitrine",
    muscleGroups: ["Grand dorsal", "Biceps"],
    equipment: "Câble machine",
    sets: 3,
    reps: "10-12",
    rest: 75,
    instructions: [
      "Assis face au câble, cuissières en place.",
      "Saisissez la barre large en pronation.",
      "Tirez la barre vers la clavicule en inclinant légèrement le buste en arrière.",
      "Redescendez lentement jusqu'à l'extension complète.",
    ],
    tips: "Pensez à 'amener vos coudes dans vos poches'. Cela aide à engager le grand dorsal plutôt que les biceps.",
  },
};

const mockProgram: WorkoutSession[] = [
  {
    id: "session-1",
    day: "Lundi",
    dayIndex: 0,
    name: "Push — Poitrine & Épaules",
    type: "push",
    duration: 65,
    targetMuscles: ["Pectoraux", "Épaules", "Triceps"],
    completed: true,
    exercises: [
      EXERCISES["bench-press"],
      EXERCISES["incline-press"],
      EXERCISES["cable-fly"],
      EXERCISES["overhead-press"],
      EXERCISES["lateral-raises"],
      EXERCISES["tricep-pushdown"],
    ],
  },
  {
    id: "session-2",
    day: "Mardi",
    dayIndex: 1,
    name: "Pull — Dos & Biceps",
    type: "pull",
    duration: 60,
    targetMuscles: ["Grand dorsal", "Rhomboïdes", "Biceps"],
    completed: true,
    exercises: [
      EXERCISES["deadlift"],
      EXERCISES["pullups"],
      EXERCISES["seated-row"],
      EXERCISES["face-pulls"],
      EXERCISES["bicep-curls"],
    ],
  },
  {
    id: "session-3",
    day: "Mercredi",
    dayIndex: 2,
    name: "Legs — Cuisses & Fessiers",
    type: "legs",
    duration: 70,
    targetMuscles: ["Quadriceps", "Ischio-jambiers", "Fessiers"],
    completed: false,
    exercises: [
      EXERCISES["squat"],
      EXERCISES["romanian-deadlift"],
      EXERCISES["leg-press"],
      EXERCISES["calf-raises"],
    ],
  },
  {
    id: "session-4",
    day: "Jeudi",
    dayIndex: 3,
    name: "Récupération active",
    type: "rest",
    duration: 30,
    targetMuscles: [],
    completed: false,
    exercises: [],
  },
  {
    id: "session-5",
    day: "Vendredi",
    dayIndex: 4,
    name: "Upper — Haut du corps",
    type: "upper",
    duration: 70,
    targetMuscles: ["Pectoraux", "Grand dorsal", "Épaules"],
    completed: false,
    exercises: [
      EXERCISES["overhead-press"],
      EXERCISES["bb-row"],
      EXERCISES["incline-press"],
      EXERCISES["lat-pulldown"],
      EXERCISES["lateral-raises"],
      EXERCISES["face-pulls"],
    ],
  },
  {
    id: "session-6",
    day: "Samedi",
    dayIndex: 5,
    name: "Legs — Force & Volume",
    type: "legs",
    duration: 65,
    targetMuscles: ["Quadriceps", "Fessiers", "Mollets"],
    completed: false,
    exercises: [
      EXERCISES["squat"],
      EXERCISES["leg-press"],
      EXERCISES["romanian-deadlift"],
      EXERCISES["calf-raises"],
    ],
  },
  {
    id: "session-7",
    day: "Dimanche",
    dayIndex: 6,
    name: "Repos complet",
    type: "rest",
    duration: 0,
    targetMuscles: [],
    completed: false,
    exercises: [],
  },
];

export const useWorkoutStore = create<WorkoutStore>((set, get) => ({
  program: mockProgram,

  toggleWorkoutCompleted: (id) =>
    set((state) => ({
      program: state.program.map((s) =>
        s.id === id ? { ...s, completed: !s.completed } : s
      ),
    })),

  getWorkoutById: (id) => get().program.find((s) => s.id === id),

  getExerciseById: (exerciseId) => EXERCISES[exerciseId],
}));
