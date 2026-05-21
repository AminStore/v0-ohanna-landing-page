import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useColors } from "@/hooks/useColors";
import { BADGE_COLORS, fmt, getImageUrl } from "@/constants/products";
import type { Product } from "@/constants/products";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

interface Props {
  product: Product;
  onPress: () => void;
}

export function ProductCard({ product, onPress }: Props) {
  const colors = useColors();
  const badge = BADGE_COLORS[product.badge];

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          opacity: pressed ? 0.88 : 1,
          transform: [{ scale: pressed ? 0.97 : 1 }],
        },
      ]}
      onPress={onPress}
    >
      <View style={[styles.imageWrapper, { backgroundColor: colors.secondary }]}>
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
      </View>
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.foreground }]} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={[styles.category, { color: colors.mutedForeground }]}>
          {product.category}
        </Text>
        <Text style={[styles.price, { color: colors.primary }]}>
          {fmt(product.price)}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderWidth: 1.5,
    borderRadius: 0,
    overflow: "hidden",
    marginBottom: 12,
  },
  imageWrapper: {
    width: "100%",
    height: CARD_WIDTH,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 2,
  },
  badgeText: {
    fontSize: 9,
    fontFamily: "Inter_700Bold",
    letterSpacing: 0.8,
  },
  info: {
    padding: 10,
    gap: 2,
  },
  name: {
    fontSize: 12,
    fontFamily: "Cinzel_700Bold",
    letterSpacing: 0.5,
  },
  category: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
  },
  price: {
    fontSize: 13,
    fontFamily: "Inter_700Bold",
    marginTop: 2,
  },
});
