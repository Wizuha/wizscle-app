import { useUserStore } from "@/app/store/userStore";
import { useRouter } from "expo-router";
import {
  Bell,
  ChevronRight,
  HelpCircle,
  LogOut,
  Moon,
  RefreshCw,
  Settings,
  Shield,
  Star,
} from "lucide-react-native";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const GOAL_LABELS: Record<string, string> = {
  "lose-weight": "Perte de poids",
  "gain-muscle": "Prise de muscle",
  endurance: "Endurance",
  flexibility: "Souplesse",
  health: "Santé",
  maintain: "Maintien",
};

const LEVEL_LABELS: Record<string, string> = {
  beginner: "Débutant",
  intermediate: "Intermédiaire",
  advanced: "Avancé",
};

function SettingRow({
  icon,
  label,
  value,
  onPress,
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  onPress?: () => void;
  danger?: boolean;
}) {
  return (
    <TouchableOpacity
      style={styles.settingRow}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.settingIcon, danger && styles.settingIconDanger]}>
        {icon}
      </View>
      <Text style={[styles.settingLabel, danger && styles.settingLabelDanger]}>
        {label}
      </Text>
      {value && <Text style={styles.settingValue}>{value}</Text>}
      {!danger && <ChevronRight color="#4B5563" size={16} />}
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const { profile, setOnboarded } = useUserStore();

  const handleLogout = () => {
    Alert.alert(
      "Déconnexion",
      "Voulez-vous vraiment vous déconnecter ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Se déconnecter",
          style: "destructive",
          onPress: () => {
            setOnboarded(false).then(() => {
              router.replace("/screens/auth/WelcomeScreen");
            });
          },
        },
      ]
    );
  };

  const handleRestart = () => {
    Alert.alert(
      "Recommencer l'onboarding",
      "Vous allez régénérer votre programme. Continuer ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Recommencer",
          onPress: () => {
            setOnboarded(false).then(() => {
              router.replace("/screens/auth/WelcomeScreen");
            });
          },
        },
      ]
    );
  };

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
          <Text style={styles.title}>Profil</Text>
        </Animated.View>

        {/* Avatar + Info */}
        <Animated.View entering={FadeInDown.delay(80).duration(400)} style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarInitials}>{initials}</Text>
            </View>
            <View style={styles.premiumBadge}>
              <Star color="#FBBF24" size={10} fill="#FBBF24" />
              <Text style={styles.premiumBadgeText}>PRO</Text>
            </View>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profile.name}</Text>
            <Text style={styles.profileGoal}>
              {GOAL_LABELS[profile.goal] ?? profile.goal}
            </Text>

            <View style={styles.profileMetrics}>
              <View style={styles.profileMetric}>
                <Text style={styles.profileMetricValue}>{profile.weight}</Text>
                <Text style={styles.profileMetricLabel}>kg</Text>
              </View>
              <View style={styles.profileMetricDivider} />
              <View style={styles.profileMetric}>
                <Text style={styles.profileMetricValue}>{profile.height}</Text>
                <Text style={styles.profileMetricLabel}>cm</Text>
              </View>
              <View style={styles.profileMetricDivider} />
              <View style={styles.profileMetric}>
                <Text style={styles.profileMetricValue}>{profile.age}</Text>
                <Text style={styles.profileMetricLabel}>ans</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Objectifs */}
        <Animated.View entering={FadeInDown.delay(150).duration(400)} style={styles.goalsCard}>
          <Text style={styles.goalsTitle}>Mon programme</Text>
          <View style={styles.goalsList}>
            <View style={styles.goalItem}>
              <Text style={styles.goalItemLabel}>Objectif</Text>
              <Text style={styles.goalItemValue}>
                {GOAL_LABELS[profile.goal] ?? profile.goal}
              </Text>
            </View>
            <View style={styles.goalDivider} />
            <View style={styles.goalItem}>
              <Text style={styles.goalItemLabel}>Niveau</Text>
              <Text style={styles.goalItemValue}>
                {LEVEL_LABELS[profile.level] ?? profile.level}
              </Text>
            </View>
            <View style={styles.goalDivider} />
            <View style={styles.goalItem}>
              <Text style={styles.goalItemLabel}>Fréquence</Text>
              <Text style={styles.goalItemValue}>{profile.daysPerWeek}j/sem</Text>
            </View>
            <View style={styles.goalDivider} />
            <View style={styles.goalItem}>
              <Text style={styles.goalItemLabel}>Lieu</Text>
              <Text style={styles.goalItemValue} numberOfLines={1}>
                {profile.location}
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Préférences */}
        <Animated.View entering={FadeInDown.delay(220).duration(400)} style={styles.section}>
          <Text style={styles.sectionTitle}>Préférences</Text>
          <View style={styles.settingsList}>
            <SettingRow
              icon={<Bell color="#9CA3AF" size={18} />}
              label="Notifications"
              value="Activées"
            />
            <View style={styles.settingDivider} />
            <SettingRow
              icon={<Moon color="#9CA3AF" size={18} />}
              label="Thème"
              value="Sombre"
            />
            <View style={styles.settingDivider} />
            <SettingRow
              icon={<Settings color="#9CA3AF" size={18} />}
              label="Paramètres"
            />
          </View>
        </Animated.View>

        {/* Support */}
        <Animated.View entering={FadeInDown.delay(280).duration(400)} style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.settingsList}>
            <SettingRow
              icon={<HelpCircle color="#9CA3AF" size={18} />}
              label="Aide & FAQ"
            />
            <View style={styles.settingDivider} />
            <SettingRow
              icon={<Shield color="#9CA3AF" size={18} />}
              label="Confidentialité"
            />
          </View>
        </Animated.View>

        {/* Actions */}
        <Animated.View entering={FadeInDown.delay(340).duration(400)} style={styles.section}>
          <Text style={styles.sectionTitle}>Programme</Text>
          <View style={styles.settingsList}>
            <SettingRow
              icon={<RefreshCw color="#60A5FA" size={18} />}
              label="Régénérer mon programme"
              onPress={handleRestart}
            />
          </View>
        </Animated.View>

        {/* Déconnexion */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.section}>
          <View style={styles.settingsList}>
            <SettingRow
              icon={<LogOut color="#EF4444" size={18} />}
              label="Se déconnecter"
              onPress={handleLogout}
              danger
            />
          </View>
        </Animated.View>

        {/* Version */}
        <Animated.View entering={FadeInDown.delay(450).duration(400)}>
          <Text style={styles.version}>Wizscle v1.0.0 · Propulsé par IA</Text>
        </Animated.View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000" },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 32 },
  header: { marginBottom: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: "#FFFFFF" },
  profileCard: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
  avatarContainer: { position: "relative" },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(74,222,128,0.15)",
    borderWidth: 2,
    borderColor: "#4ADE80",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitials: { fontSize: 28, fontWeight: "bold", color: "#4ADE80" },
  premiumBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: "#1C1504",
    borderWidth: 1,
    borderColor: "#FBBF24",
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  premiumBadgeText: { fontSize: 9, fontWeight: "bold", color: "#FBBF24" },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 20, fontWeight: "bold", color: "#FFFFFF", marginBottom: 4 },
  profileGoal: { fontSize: 13, color: "#4ADE80", marginBottom: 12 },
  profileMetrics: { flexDirection: "row", alignItems: "center" },
  profileMetric: { flex: 1, alignItems: "center" },
  profileMetricValue: { fontSize: 16, fontWeight: "bold", color: "#FFFFFF" },
  profileMetricLabel: { fontSize: 11, color: "#6B7280" },
  profileMetricDivider: {
    width: 1,
    height: 24,
    backgroundColor: "#1f2937",
    marginHorizontal: 4,
  },
  goalsCard: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  goalsTitle: { fontSize: 16, fontWeight: "bold", color: "#FFFFFF", marginBottom: 14 },
  goalsList: {},
  goalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  goalItemLabel: { fontSize: 14, color: "#6B7280" },
  goalItemValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    maxWidth: "55%",
    textAlign: "right",
  },
  goalDivider: { height: 1, backgroundColor: "#1f2937" },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 14, fontWeight: "600", color: "#6B7280", marginBottom: 8 },
  settingsList: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 16,
    overflow: "hidden",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  settingIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
  },
  settingIconDanger: { backgroundColor: "rgba(239,68,68,0.1)" },
  settingLabel: { flex: 1, fontSize: 15, fontWeight: "500", color: "#FFFFFF" },
  settingLabelDanger: { color: "#EF4444" },
  settingValue: { fontSize: 13, color: "#6B7280", marginRight: 4 },
  settingDivider: { height: 1, backgroundColor: "#1f2937", marginLeft: 62 },
  version: {
    textAlign: "center",
    fontSize: 12,
    color: "#374151",
    marginTop: 8,
  },
});
