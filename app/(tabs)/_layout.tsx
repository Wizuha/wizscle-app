import { Tabs } from "expo-router";
import {
  BarChart2,
  Dumbbell,
  Home,
  Salad,
  User,
} from "lucide-react-native";
import { Platform, StyleSheet, View } from "react-native";

function TabIcon({
  focused,
  icon,
}: {
  focused: boolean;
  icon: React.ReactNode;
}) {
  return (
    <View style={[styles.tabIcon, focused && styles.tabIconActive]}>
      {icon}
      {focused && <View style={styles.tabIconDot} />}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: "#4ADE80",
        tabBarInactiveTintColor: "#4B5563",
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              icon={<Home color={color} size={22} strokeWidth={focused ? 2.5 : 1.8} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              icon={<Dumbbell color={color} size={22} strokeWidth={focused ? 2.5 : 1.8} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              icon={<Salad color={color} size={22} strokeWidth={focused ? 2.5 : 1.8} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              icon={<BarChart2 color={color} size={22} strokeWidth={focused ? 2.5 : 1.8} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              icon={<User color={color} size={22} strokeWidth={focused ? 2.5 : 1.8} />}
            />
          ),
        }}
      />
      {/* Masquer l'écran explore du starter */}
      <Tabs.Screen name="explore" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#0a0a0a",
    borderTopColor: "#1f2937",
    borderTopWidth: 1,
    height: Platform.OS === "ios" ? 84 : 64,
    paddingBottom: Platform.OS === "ios" ? 24 : 8,
    paddingTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
  },
  tabIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    borderRadius: 12,
  },
  tabIconActive: {
    backgroundColor: "rgba(74,222,128,0.1)",
  },
  tabIconDot: {
    position: "absolute",
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#4ADE80",
  },
});
