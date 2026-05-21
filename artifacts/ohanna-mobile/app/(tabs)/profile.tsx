import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { GoldDivider } from "@/components/GoldDivider";
import { useColors } from "@/hooks/useColors";

const MENU_ITEMS = [
  { icon: "package" as const, label: "TRACK ORDER", path: "/track" as const },
  { icon: "mail" as const, label: "CONTACT US", path: "/contact" as const },
  { icon: "info" as const, label: "FAQ", badge: null },
  { icon: "truck" as const, label: "SHIPPING INFO", badge: null },
  { icon: "maximize" as const, label: "SIZE GUIDE", badge: null },
  { icon: "users" as const, label: "COMMUNITY", badge: null },
];

const BRAND_STORY = [
  { glyph: "𓂀", title: "ANCIENT ROOTS", text: "Born from the cradle of civilization, wearing 5,000 years of history." },
  { glyph: "𓋹", title: "MODERN STREETS", text: "Egyptian symbolism reinterpreted for contemporary urban fashion." },
  { glyph: "𓇯", title: "SACRED CRAFT", text: "Every piece is a wearable artifact. Premium quality, limitless heritage." },
];

export default function ProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 12, backgroundColor: "#1B1B1B" }]}>
        <Text style={[styles.glyphRow, { color: colors.primary }]}>𓂀 𓋹 𓇯</Text>
        <Text style={styles.brandName}>OHANNA</Text>
        <Text style={[styles.brandTagline, { color: colors.primary }]}>
          EGYPTIAN STREETWEAR
        </Text>
        <Text style={styles.brandSub}>Maadi, Cairo, Egypt</Text>
      </View>

      {/* Quick actions */}
      <View style={[styles.section, { backgroundColor: colors.background }]}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>QUICK LINKS</Text>
        <View style={[styles.menuCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {MENU_ITEMS.map((item, i) => (
            <React.Fragment key={item.label}>
              <Pressable
                style={({ pressed }) => [
                  styles.menuItem,
                  { opacity: pressed ? 0.7 : 1 },
                ]}
                onPress={() => {
                  if (item.path) router.push(item.path as any);
                }}
              >
                <View style={[styles.menuIconWrapper, { backgroundColor: colors.secondary }]}>
                  <Feather name={item.icon} size={16} color={colors.primary} />
                </View>
                <Text style={[styles.menuLabel, { color: colors.foreground }]}>{item.label}</Text>
                <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
              </Pressable>
              {i < MENU_ITEMS.length - 1 && (
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
              )}
            </React.Fragment>
          ))}
        </View>
      </View>

      {/* Brand story */}
      <View style={[styles.section, { backgroundColor: colors.background }]}>
        <GoldDivider />
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>OUR STORY</Text>
        <View style={styles.storyCards}>
          {BRAND_STORY.map((s) => (
            <View
              key={s.title}
              style={[styles.storyCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            >
              <Text style={[styles.storyGlyph, { color: colors.primary }]}>{s.glyph}</Text>
              <Text style={[styles.storyTitle, { color: colors.foreground }]}>{s.title}</Text>
              <Text style={[styles.storyText, { color: colors.mutedForeground }]}>{s.text}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Contact info */}
      <View style={[styles.contactBanner, { backgroundColor: "#1B1B1B" }]}>
        <GoldDivider />
        <Text style={[styles.contactTitle, { color: colors.primary }]}>GET IN TOUCH</Text>
        {[
          { icon: "map-pin" as const, text: "Maadi, Cairo, Egypt" },
          { icon: "mail" as const, text: "info@ohanna.store" },
          { icon: "clock" as const, text: "Sun–Thu 10am–8pm EET" },
        ].map((c) => (
          <View key={c.text} style={styles.contactRow}>
            <Feather name={c.icon} size={14} color={colors.primary} />
            <Text style={[styles.contactText, { color: "#E4D5B7" }]}>{c.text}</Text>
          </View>
        ))}
        <GoldDivider glyph="𓋹" />
        <Text style={[styles.footerText, { color: "rgba(253,248,239,0.3)" }]}>
          © 2025 OHANNA. All rights reserved.
        </Text>
      </View>

      <View style={{ height: Platform.OS === "web" ? 100 : 90 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    alignItems: "center",
    gap: 6,
  },
  glyphRow: {
    fontSize: 20,
    letterSpacing: 8,
    marginBottom: 4,
  },
  brandName: {
    fontSize: 32,
    fontFamily: "Cinzel_900Black",
    color: "#FDF8EF",
    letterSpacing: 4,
  },
  brandTagline: {
    fontSize: 10,
    fontFamily: "Cinzel_700Bold",
    letterSpacing: 3,
  },
  brandSub: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    color: "rgba(253,248,239,0.5)",
  },
  section: {
    padding: 20,
    gap: 14,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: "Cinzel_700Bold",
    letterSpacing: 2,
  },
  menuCard: {
    borderWidth: 1.5,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuIconWrapper: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  menuLabel: {
    flex: 1,
    fontSize: 11,
    fontFamily: "Cinzel_700Bold",
    letterSpacing: 1.2,
  },
  divider: {
    height: 1,
    marginHorizontal: 16,
  },
  storyCards: {
    gap: 10,
  },
  storyCard: {
    padding: 16,
    borderWidth: 1.5,
    gap: 6,
  },
  storyGlyph: {
    fontSize: 20,
  },
  storyTitle: {
    fontSize: 12,
    fontFamily: "Cinzel_700Bold",
    letterSpacing: 1.5,
  },
  storyText: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 19,
  },
  contactBanner: {
    padding: 24,
    gap: 12,
    alignItems: "center",
  },
  contactTitle: {
    fontSize: 14,
    fontFamily: "Cinzel_700Bold",
    letterSpacing: 3,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  contactText: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
  },
  footerText: {
    fontSize: 10,
    fontFamily: "Inter_400Regular",
    letterSpacing: 0.5,
    textAlign: "center",
  },
});
