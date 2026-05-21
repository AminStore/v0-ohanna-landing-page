import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useState } from "react";
import {
  ActivityIndicator,
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
import { fmt, getApiBase, getImageUrl } from "@/constants/products";
import { useCart } from "@/contexts/CartContext";
import { useColors } from "@/hooks/useColors";

export default function CartScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setLoading(true);
    try {
      const domain = process.env.EXPO_PUBLIC_DOMAIN;
      const origin = domain ? `https://${domain}` : "http://localhost:3000";
      const apiBase = getApiBase();

      const res = await fetch(`${apiBase}/ohanna/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          successUrl: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${origin}/cart`,
        }),
      });
      const data = await res.json();
      if (data.sessionId) {
        clearCart();
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Alert.alert(
          "Order Placed! 𓂀",
          `Your order ${data.sessionId} has been confirmed. Thank you, Pharaoh.`,
          [{ text: "OK", style: "default" }]
        );
      } else {
        throw new Error(data.error ?? "Checkout failed");
      }
    } catch (e: any) {
      Alert.alert("Checkout failed", e.message ?? "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.background, paddingTop: topPad + 24 }]}>
        <Text style={[styles.emptyGlyph, { color: colors.primary }]}>𓂀</Text>
        <Text style={[styles.emptyTitle, { color: colors.foreground }]}>YOUR CART IS EMPTY</Text>
        <Text style={[styles.emptySub, { color: colors.mutedForeground }]}>
          The desert awaits your choice, Pharaoh.
        </Text>
        <Pressable
          style={({ pressed }) => [styles.browseBtn, { backgroundColor: colors.foreground, opacity: pressed ? 0.8 : 1 }]}
          onPress={() => router.push("/(tabs)/shop")}
        >
          <Text style={[styles.browseBtnText, { color: colors.background }]}>BROWSE COLLECTION</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.header, { paddingTop: topPad + 8, borderBottomColor: colors.border, backgroundColor: colors.background }]}>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>
          YOUR CART
        </Text>
        <Text style={[styles.headerSub, { color: colors.mutedForeground }]}>
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, gap: 12 }}>
        {items.map((item) => (
          <View
            key={`${item.product.id}-${item.size}`}
            style={[styles.itemCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <Image
              source={{ uri: getImageUrl(item.product.image_url) }}
              style={[styles.itemImage, { backgroundColor: colors.secondary }]}
              resizeMode="cover"
            />
            <View style={styles.itemInfo}>
              <Text style={[styles.itemName, { color: colors.foreground }]} numberOfLines={1}>
                {item.product.name}
              </Text>
              <Text style={[styles.itemSize, { color: colors.mutedForeground }]}>
                SIZE: {item.size}
              </Text>
              <Text style={[styles.itemPrice, { color: colors.primary }]}>
                {fmt(item.product.price)}
              </Text>
              <View style={styles.qtyRow}>
                <Pressable
                  style={[styles.qtyBtn, { borderColor: colors.border }]}
                  onPress={() => {
                    Haptics.selectionAsync();
                    updateQuantity(item.product.id, item.size, item.quantity - 1);
                  }}
                >
                  <Feather name="minus" size={14} color={colors.foreground} />
                </Pressable>
                <Text style={[styles.qtyNum, { color: colors.foreground }]}>{item.quantity}</Text>
                <Pressable
                  style={[styles.qtyBtn, { borderColor: colors.border }]}
                  onPress={() => {
                    Haptics.selectionAsync();
                    updateQuantity(item.product.id, item.size, item.quantity + 1);
                  }}
                >
                  <Feather name="plus" size={14} color={colors.foreground} />
                </Pressable>
                <Pressable
                  style={styles.removeBtn}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    removeItem(item.product.id, item.size);
                  }}
                >
                  <Feather name="trash-2" size={14} color={colors.destructive} />
                </Pressable>
              </View>
            </View>
          </View>
        ))}

        {/* Summary */}
        <View style={[styles.summary, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <GoldDivider />
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>SUBTOTAL</Text>
            <Text style={[styles.summaryValue, { color: colors.foreground }]}>{fmt(totalPrice)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>SHIPPING</Text>
            <Text style={[styles.summaryValue, { color: colors.accent }]}>FREE</Text>
          </View>
          <GoldDivider />
          <View style={styles.summaryRow}>
            <Text style={[styles.totalLabel, { color: colors.foreground }]}>TOTAL</Text>
            <Text style={[styles.totalValue, { color: colors.primary }]}>{fmt(totalPrice)}</Text>
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.checkoutBtn,
            { backgroundColor: colors.foreground, opacity: pressed || loading ? 0.85 : 1 },
          ]}
          onPress={handleCheckout}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.background} />
          ) : (
            <Text style={[styles.checkoutBtnText, { color: colors.background }]}>
              CHECKOUT — {fmt(totalPrice)}
            </Text>
          )}
        </Pressable>

        <View style={{ height: Platform.OS === "web" ? 100 : 80 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    paddingHorizontal: 40,
  },
  emptyGlyph: {
    fontSize: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: "Cinzel_700Bold",
    letterSpacing: 2,
    textAlign: "center",
  },
  emptySub: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 19,
  },
  browseBtn: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    marginTop: 8,
  },
  browseBtnText: {
    fontSize: 11,
    fontFamily: "Cinzel_700Bold",
    letterSpacing: 1.5,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    gap: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Cinzel_900Black",
    letterSpacing: 2,
  },
  headerSub: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  itemCard: {
    flexDirection: "row",
    borderWidth: 1.5,
    overflow: "hidden",
    gap: 0,
  },
  itemImage: {
    width: 90,
    height: 110,
  },
  itemInfo: {
    flex: 1,
    padding: 12,
    gap: 3,
  },
  itemName: {
    fontSize: 12,
    fontFamily: "Cinzel_700Bold",
    letterSpacing: 0.5,
  },
  itemSize: {
    fontSize: 10,
    fontFamily: "Inter_500Medium",
    letterSpacing: 1,
  },
  itemPrice: {
    fontSize: 13,
    fontFamily: "Inter_700Bold",
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyNum: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    minWidth: 20,
    textAlign: "center",
  },
  removeBtn: {
    marginLeft: "auto",
    padding: 4,
  },
  summary: {
    padding: 16,
    borderWidth: 1.5,
    gap: 12,
    marginTop: 4,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 10,
    fontFamily: "Cinzel_700Bold",
    letterSpacing: 1.5,
  },
  summaryValue: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  totalLabel: {
    fontSize: 13,
    fontFamily: "Cinzel_700Bold",
    letterSpacing: 2,
  },
  totalValue: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
  },
  checkoutBtn: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 52,
  },
  checkoutBtnText: {
    fontSize: 12,
    fontFamily: "Cinzel_700Bold",
    letterSpacing: 2,
  },
});
