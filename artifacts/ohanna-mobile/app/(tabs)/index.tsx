import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { GoldDivider } from "@/components/GoldDivider";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS, getImageUrl } from "@/constants/products";
import { useColors } from "@/hooks/useColors";

const { width } = Dimensions.get("window");
const FEATURED = PRODUCTS.filter((p) => p.badge === "BESTSELLER" || p.badge === "LIMITED").slice(0, 4);

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="never"
    >
      {/* Hero */}
      <View style={[styles.hero, { paddingTop: topPad + 16 }]}>
        <LinearGradient
          colors={["#1B1B1B", "#2A1F0A"]}
          style={StyleSheet.absoluteFill}
        />
        {/* Hieroglyph strip */}
        <Text style={styles.hieroglyphStrip}>𓂀 𓋹 𓇯 𓊽 𓆣 𓐍 𓌀 𓃀</Text>

        <View style={styles.heroContent}>
          <Image
            source={{ uri: getImageUrl("/streetwear-egyptian-sketch.png") }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroText}>
            <Text style={[styles.heroTag, { color: colors.primary }]}>ANCIENT POWER</Text>
            <Text style={styles.heroTitle}>REVIVING{"\n"}ROOTS{"\n"}IN STYLE</Text>
            <Text style={styles.heroSub}>
              5,000 years of pharaonic power meets modern urban fashion.
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.heroBtn,
                { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
              ]}
              onPress={() => router.push("/(tabs)/shop")}
            >
              <Text style={[styles.heroBtnText, { color: colors.primaryForeground }]}>
                SHOP THE CULTURE
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Stats row */}
      <View style={[styles.stats, { backgroundColor: colors.primary }]}>
        {[
          { value: "10K+", label: "PHARAOHS" },
          { value: "5000+", label: "YRS HERITAGE" },
          { value: "12+", label: "SACRED PIECES" },
          { value: "4.9★", label: "RATING" },
        ].map((s) => (
          <View key={s.label} style={styles.stat}>
            <Text style={[styles.statValue, { color: colors.primaryForeground }]}>{s.value}</Text>
            <Text style={[styles.statLabel, { color: colors.primaryForeground }]}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Featured */}
      <View style={[styles.section, { backgroundColor: colors.background }]}>
        <GoldDivider />
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>FEATURED</Text>
          <Pressable onPress={() => router.push("/(tabs)/shop")}>
            <Text style={[styles.seeAll, { color: colors.primary }]}>SEE ALL →</Text>
          </Pressable>
        </View>

        <View style={styles.grid}>
          {FEATURED.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onPress={() => router.push(`/product/${p.slug}`)}
            />
          ))}
        </View>
      </View>

      {/* Brand story teaser */}
      <View style={[styles.storyBanner, { backgroundColor: "#1B1B1B" }]}>
        <Text style={[styles.storyTitle, { color: colors.primary }]}>OUR STORY</Text>
        <Text style={styles.storyText}>
          Born from the cradle of civilization. Built for the streets of today.
        </Text>
        <GoldDivider glyph="𓋹" />
        <Text style={[styles.storyBody, { color: "#E4D5B7" }]}>
          OHANNA — where 5,000 years of pharaonic power meets contemporary rebellion.
        </Text>
      </View>

      {/* Categories */}
      <View style={[styles.section, { backgroundColor: colors.background }]}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>SHOP BY CATEGORY</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
          {[
            { label: "Hoodies", icon: "layers" as const },
            { label: "T-Shirts", icon: "user" as const },
            { label: "Jackets", icon: "wind" as const },
            { label: "Bottoms", icon: "minus" as const },
            { label: "Accessories", icon: "star" as const },
          ].map((cat) => (
            <Pressable
              key={cat.label}
              style={({ pressed }) => [
                styles.catChip,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
              onPress={() => router.push({ pathname: "/(tabs)/shop", params: { category: cat.label } })}
            >
              <Feather name={cat.icon} size={18} color={colors.primary} />
              <Text style={[styles.catLabel, { color: colors.foreground }]}>{cat.label}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View style={{ height: Platform.OS === "web" ? 100 : 90 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: {
    minHeight: 420,
    position: "relative",
    overflow: "hidden",
  },
  hieroglyphStrip: {
    color: "rgba(200,157,41,0.2)",
    fontSize: 14,
    letterSpacing: 8,
    textAlign: "center",
    marginBottom: 8,
  },
  heroContent: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 16,
    alignItems: "flex-end",
  },
  heroImage: {
    width: 150,
    height: 220,
    borderWidth: 2,
    borderColor: "rgba(200,157,41,0.4)",
  },
  heroText: {
    flex: 1,
    gap: 8,
  },
  heroTag: {
    fontSize: 10,
    fontFamily: "Cinzel_700Bold",
    letterSpacing: 2,
  },
  heroTitle: {
    fontSize: 28,
    fontFamily: "Cinzel_900Black",
    color: "#FDF8EF",
    lineHeight: 32,
    letterSpacing: 1,
  },
  heroSub: {
    fontSize: 12,
    color: "rgba(253,248,239,0.65)",
    fontFamily: "Inter_400Regular",
    lineHeight: 17,
  },
  heroBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center",
    marginTop: 4,
  },
  heroBtnText: {
    fontSize: 10,
    fontFamily: "Cinzel_700Bold",
    letterSpacing: 1.5,
  },
  stats: {
    flexDirection: "row",
    paddingVertical: 14,
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 14,
    fontFamily: "Cinzel_700Bold",
  },
  statLabel: {
    fontSize: 8,
    fontFamily: "Inter_500Medium",
    letterSpacing: 0.5,
    opacity: 0.8,
    marginTop: 2,
  },
  section: {
    padding: 20,
    gap: 14,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Cinzel_700Bold",
    letterSpacing: 2,
  },
  seeAll: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },
  storyBanner: {
    padding: 28,
    gap: 12,
    alignItems: "center",
  },
  storyTitle: {
    fontSize: 18,
    fontFamily: "Cinzel_900Black",
    letterSpacing: 3,
  },
  storyText: {
    color: "#FDF8EF",
    fontSize: 13,
    fontFamily: "Cinzel_400Regular",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  storyBody: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 18,
    opacity: 0.85,
  },
  catScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  catChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1.5,
    marginRight: 10,
  },
  catLabel: {
    fontSize: 12,
    fontFamily: "Cinzel_700Bold",
    letterSpacing: 0.8,
  },
});
