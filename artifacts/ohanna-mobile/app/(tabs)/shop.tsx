import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useMemo, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS, getProductsByCategory } from "@/constants/products";
import { useColors } from "@/hooks/useColors";

export default function ShopScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const params = useLocalSearchParams<{ category?: string }>();

  const [activeCategory, setActiveCategory] = useState(params.category ?? "All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const byCategory = getProductsByCategory(activeCategory);
    if (!search.trim()) return byCategory;
    const q = search.toLowerCase();
    return byCategory.filter((p) =>
      p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }, [activeCategory, search]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Fixed header */}
      <View style={[styles.header, { paddingTop: topPad + 8, borderBottomColor: colors.border, backgroundColor: colors.background }]}>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>SACRED COLLECTION</Text>
        <Text style={[styles.headerSub, { color: colors.primary }]}>𓂀 {PRODUCTS.length} PIECES</Text>

        {/* Search */}
        <View style={[styles.searchRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="search" size={14} color={colors.mutedForeground} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search pieces..."
            placeholderTextColor={colors.mutedForeground}
            style={[styles.searchInput, { color: colors.foreground, fontFamily: "Inter_400Regular" }]}
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch("")}>
              <Feather name="x" size={14} color={colors.mutedForeground} />
            </Pressable>
          )}
        </View>

        {/* Category chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>
          {CATEGORIES.map((cat) => {
            const active = cat === activeCategory;
            return (
              <Pressable
                key={cat}
                style={[
                  styles.chip,
                  {
                    backgroundColor: active ? colors.foreground : "transparent",
                    borderColor: active ? colors.foreground : colors.border,
                  },
                ]}
                onPress={() => setActiveCategory(cat)}
              >
                <Text style={[styles.chipText, { color: active ? colors.background : colors.mutedForeground }]}>
                  {cat.toUpperCase()}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Product grid */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.grid}
      >
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Feather name="search" size={32} color={colors.mutedForeground} />
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>No pieces found</Text>
          </View>
        ) : (
          <View style={styles.gridInner}>
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onPress={() => router.push(`/product/${p.slug}`)}
              />
            ))}
          </View>
        )}
        <View style={{ height: Platform.OS === "web" ? 100 : 90 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    gap: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Cinzel_900Black",
    letterSpacing: 2,
  },
  headerSub: {
    fontSize: 10,
    fontFamily: "Inter_500Medium",
    letterSpacing: 1,
    marginTop: -6,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderWidth: 1.5,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    paddingVertical: 0,
  },
  chips: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1.5,
    marginRight: 8,
  },
  chipText: {
    fontSize: 9,
    fontFamily: "Cinzel_700Bold",
    letterSpacing: 1,
  },
  grid: {
    flexGrow: 1,
  },
  gridInner: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    padding: 20,
    justifyContent: "space-between",
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
});
