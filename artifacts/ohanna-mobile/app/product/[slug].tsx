import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { GoldDivider } from "@/components/GoldDivider";
import { BADGE_COLORS, SIZES, fmt, getImageUrl, getProductBySlug } from "@/constants/products";
import { useCart } from "@/contexts/CartContext";
import { useColors } from "@/hooks/useColors";

export default function ProductScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const product = getProductBySlug(slug ?? "");
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <View style={[styles.notFound, { backgroundColor: colors.background }]}>
        <Text style={[styles.nfGlyph, { color: colors.primary }]}>𓂀</Text>
        <Text style={[styles.nfTitle, { color: colors.foreground }]}>PIECE NOT FOUND</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={[styles.nfBack, { color: colors.primary }]}>← GO BACK</Text>
        </Pressable>
      </View>
    );
  }

  const badge = BADGE_COLORS[product.badge];

  const handleAddToCart = () => {
    addItem(product, selectedSize, quantity);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product image */}
        <View style={[styles.imageContainer, { backgroundColor: colors.secondary }]}>
          <Image
            source={{ uri: getImageUrl(product.image_url) }}
            style={styles.image}
            resizeMode="cover"
          />
          {badge && (
            <View style={[styles.badge, { backgroundColor: badge.bg }]}>
              <Text style={[styles.badgeText, { color: badge.text }]}>{product.badge}</Text>
            </View>
          )}
          <Pressable
            style={[styles.backBtn, { backgroundColor: "rgba(27,27,27,0.7)" }]}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={20} color="#FDF8EF" />
          </Pressable>
        </View>

        <View style={styles.content}>
          {/* Category + Name */}
          <Text style={[styles.category, { color: colors.primary }]}>
            {product.category.toUpperCase()}
          </Text>
          <Text style={[styles.name, { color: colors.foreground }]}>{product.name}</Text>

          {/* Rating */}
          <View style={styles.ratingRow}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Feather key={i} name="star" size={14} color={colors.primary} />
            ))}
            <Text style={[styles.ratingText, { color: colors.mutedForeground }]}>4.9 (128 reviews)</Text>
          </View>

          {/* Price */}
          <Text style={[styles.price, { color: colors.primary }]}>{fmt(product.price)}</Text>

          <GoldDivider />

          {/* Description */}
          <Text style={[styles.description, { color: colors.mutedForeground }]}>
            {product.description}
          </Text>

          <GoldDivider glyph="𓋹" />

          {/* Size picker */}
          <View style={styles.sizeSection}>
            <View style={styles.sizeHeader}>
              <Text style={[styles.sizeLabel, { color: colors.foreground }]}>
                SIZE — <Text style={{ color: colors.primary }}>{selectedSize}</Text>
              </Text>
              <Text style={[styles.sizeGuide, { color: colors.primary }]}>SIZE GUIDE</Text>
            </View>
            <View style={styles.sizes}>
              {SIZES.map((s) => {
                const active = s === selectedSize;
                return (
                  <Pressable
                    key={s}
                    style={[
                      styles.sizeBtn,
                      {
                        backgroundColor: active ? colors.foreground : "transparent",
                        borderColor: active ? colors.foreground : colors.border,
                      },
                    ]}
                    onPress={() => {
                      setSelectedSize(s);
                      Haptics.selectionAsync();
                    }}
                  >
                    <Text style={[styles.sizeBtnText, { color: active ? colors.background : colors.mutedForeground }]}>
                      {s}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Quantity */}
          <View style={styles.qtySection}>
            <Text style={[styles.qtyLabel, { color: colors.foreground }]}>QUANTITY</Text>
            <View style={styles.qtyRow}>
              <Pressable
                style={[styles.qtyBtn, { borderColor: colors.border }]}
                onPress={() => { if (quantity > 1) { setQuantity(q => q - 1); Haptics.selectionAsync(); } }}
              >
                <Feather name="minus" size={16} color={colors.foreground} />
              </Pressable>
              <Text style={[styles.qtyNum, { color: colors.foreground }]}>{quantity}</Text>
              <Pressable
                style={[styles.qtyBtn, { borderColor: colors.border }]}
                onPress={() => { setQuantity(q => q + 1); Haptics.selectionAsync(); }}
              >
                <Feather name="plus" size={16} color={colors.foreground} />
              </Pressable>
            </View>
          </View>

          {/* Features */}
          <View style={styles.features}>
            {[
              { icon: "refresh-cw" as const, text: "FREE RETURNS" },
              { icon: "shield" as const, text: "SECURE PAYMENT" },
              { icon: "zap" as const, text: "FAST SHIPPING" },
            ].map((f) => (
              <View key={f.text} style={[styles.featureItem, { borderColor: colors.border }]}>
                <Feather name={f.icon} size={16} color={colors.primary} />
                <Text style={[styles.featureText, { color: colors.mutedForeground }]}>{f.text}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>

      {/* Add to cart button — pinned bottom */}
      <View
        style={[
          styles.addToCartBar,
          {
            backgroundColor: colors.background,
            borderTopColor: colors.border,
            paddingBottom: Platform.OS === "web" ? 34 : insets.bottom + 12,
          },
        ]}
      >
        <Pressable
          style={({ pressed }) => [
            styles.addBtn,
            {
              backgroundColor: added ? colors.accent : colors.foreground,
              opacity: pressed ? 0.85 : 1,
            },
          ]}
          onPress={handleAddToCart}
        >
          <Feather name={added ? "check" : "shopping-bag"} size={16} color="#FDF8EF" />
          <Text style={styles.addBtnText}>
            {added ? "ADDED TO CART" : `ADD TO CART — ${fmt(product.price * quantity)}`}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },
  nfGlyph: { fontSize: 40 },
  nfTitle: { fontSize: 18, fontFamily: "Cinzel_700Bold", letterSpacing: 2 },
  nfBack: { fontSize: 13, fontFamily: "Inter_600SemiBold" },
  imageContainer: {
    width: "100%",
    height: 360,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  badge: {
    position: "absolute",
    top: 16,
    left: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 2,
  },
  badgeText: {
    fontSize: 10,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1,
  },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    padding: 20,
    gap: 14,
  },
  category: {
    fontSize: 10,
    fontFamily: "Cinzel_700Bold",
    letterSpacing: 2,
  },
  name: {
    fontSize: 24,
    fontFamily: "Cinzel_900Black",
    letterSpacing: 1,
    lineHeight: 30,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginLeft: 4,
  },
  price: {
    fontSize: 26,
    fontFamily: "Inter_700Bold",
  },
  description: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 21,
  },
  sizeSection: {
    gap: 10,
  },
  sizeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sizeLabel: {
    fontSize: 11,
    fontFamily: "Cinzel_700Bold",
    letterSpacing: 1.5,
  },
  sizeGuide: {
    fontSize: 10,
    fontFamily: "Inter_500Medium",
    letterSpacing: 0.5,
  },
  sizes: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  sizeBtn: {
    width: 48,
    height: 48,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeBtnText: {
    fontSize: 12,
    fontFamily: "Cinzel_700Bold",
  },
  qtySection: {
    gap: 10,
  },
  qtyLabel: {
    fontSize: 11,
    fontFamily: "Cinzel_700Bold",
    letterSpacing: 1.5,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  qtyBtn: {
    width: 44,
    height: 44,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyNum: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    minWidth: 32,
    textAlign: "center",
  },
  features: {
    flexDirection: "row",
    gap: 8,
  },
  featureItem: {
    flex: 1,
    borderWidth: 1.5,
    padding: 10,
    alignItems: "center",
    gap: 6,
  },
  featureText: {
    fontSize: 8,
    fontFamily: "Inter_700Bold",
    letterSpacing: 0.5,
    textAlign: "center",
  },
  addToCartBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 16,
  },
  addBtnText: {
    fontSize: 11,
    fontFamily: "Cinzel_700Bold",
    color: "#FDF8EF",
    letterSpacing: 1.5,
  },
});
