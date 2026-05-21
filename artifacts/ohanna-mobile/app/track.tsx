import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { GoldDivider } from "@/components/GoldDivider";
import { getApiBase } from "@/constants/products";
import { useColors } from "@/hooks/useColors";

type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "confirmed";

const STATUS_LABELS: Record<OrderStatus | string, { label: string; icon: "clock" | "check-circle" | "truck" | "package" }> = {
  pending: { label: "PENDING", icon: "clock" },
  confirmed: { label: "CONFIRMED", icon: "check-circle" },
  paid: { label: "PAID", icon: "check-circle" },
  shipped: { label: "SHIPPED", icon: "truck" },
  delivered: { label: "DELIVERED", icon: "package" },
};

export default function TrackScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    if (!orderId.trim() || !email.trim()) {
      setError("Order ID and email are required.");
      return;
    }
    setLoading(true);
    setError("");
    setOrder(null);
    try {
      const res = await fetch(
        `${getApiBase()}/ohanna/track-order?id=${encodeURIComponent(orderId.trim())}&email=${encodeURIComponent(email.trim())}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Order not found");
      setOrder(data.order);
    } catch (e: any) {
      setError(e.message ?? "Order not found. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  const statusInfo = order ? (STATUS_LABELS[order.status] ?? STATUS_LABELS.pending) : null;

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ flexGrow: 1 }}
      bottomOffset={16}
      keyboardShouldPersistTaps="handled"
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: Platform.OS === "web" ? 67 + 16 : insets.top + 16, backgroundColor: "#1B1B1B" }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={20} color="#FDF8EF" />
        </Pressable>
        <Text style={[styles.headerTitle, { color: "#FDF8EF" }]}>TRACK ORDER</Text>
        <Text style={[styles.headerSub, { color: colors.primary }]}>𓂀 SACRED DELIVERY</Text>
      </View>

      <View style={[styles.content, { backgroundColor: colors.background }]}>
        <GoldDivider />
        <Text style={[styles.formTitle, { color: colors.foreground }]}>FIND YOUR ORDER</Text>

        <TextInput
          value={orderId}
          onChangeText={setOrderId}
          placeholder="Order ID (e.g. OHN-1234567)"
          placeholderTextColor={colors.mutedForeground}
          style={[styles.input, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.card, fontFamily: "Inter_400Regular" }]}
          autoCapitalize="characters"
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email address"
          placeholderTextColor={colors.mutedForeground}
          style={[styles.input, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.card, fontFamily: "Inter_400Regular" }]}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {error ? (
          <View style={[styles.errorBox, { backgroundColor: "rgba(174,28,28,0.1)", borderColor: colors.destructive }]}>
            <Feather name="alert-circle" size={14} color={colors.destructive} />
            <Text style={[styles.errorText, { color: colors.destructive }]}>{error}</Text>
          </View>
        ) : null}

        <Pressable
          style={({ pressed }) => [
            styles.trackBtn,
            { backgroundColor: colors.foreground, opacity: pressed || loading ? 0.85 : 1 },
          ]}
          onPress={handleTrack}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.background} />
          ) : (
            <>
              <Feather name="search" size={16} color={colors.background} />
              <Text style={[styles.trackBtnText, { color: colors.background }]}>TRACK ORDER</Text>
            </>
          )}
        </Pressable>

        {/* Order result */}
        {order && (
          <View style={[styles.orderCard, { backgroundColor: colors.card, borderColor: colors.primary }]}>
            <GoldDivider />
            <View style={styles.orderHeader}>
              <View>
                <Text style={[styles.orderId, { color: colors.foreground }]}>{order.id}</Text>
                <Text style={[styles.orderDate, { color: colors.mutedForeground }]}>
                  {order.created_at ? new Date(order.created_at).toLocaleDateString() : ""}
                </Text>
              </View>
              {statusInfo && (
                <View style={[styles.statusBadge, { backgroundColor: colors.accent }]}>
                  <Feather name={statusInfo.icon} size={12} color={colors.accentForeground} />
                  <Text style={[styles.statusText, { color: colors.accentForeground }]}>
                    {statusInfo.label}
                  </Text>
                </View>
              )}
            </View>

            {order.items && order.items.length > 0 && (
              <View style={styles.orderItems}>
                {order.items.map((item: any, i: number) => (
                  <Text key={i} style={[styles.orderItem, { color: colors.mutedForeground }]}>
                    • {item.product?.name ?? "Item"} × {item.quantity}
                  </Text>
                ))}
              </View>
            )}

            {order.total && (
              <Text style={[styles.orderTotal, { color: colors.primary }]}>
                TOTAL: EGP {order.total.toLocaleString()}
              </Text>
            )}
          </View>
        )}
      </View>
      <View style={{ height: Platform.OS === "web" ? 100 : 60 }} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingBottom: 24,
    gap: 4,
  },
  backBtn: {
    marginBottom: 8,
    width: 40,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: "Cinzel_900Black",
    letterSpacing: 2,
  },
  headerSub: {
    fontSize: 10,
    fontFamily: "Cinzel_700Bold",
    letterSpacing: 3,
  },
  content: {
    padding: 20,
    gap: 14,
    flex: 1,
  },
  formTitle: {
    fontSize: 13,
    fontFamily: "Cinzel_700Bold",
    letterSpacing: 2,
  },
  input: {
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 14,
    borderRadius: 0,
  },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    borderWidth: 1,
  },
  errorText: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    flex: 1,
  },
  trackBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 15,
    minHeight: 52,
  },
  trackBtnText: {
    fontSize: 11,
    fontFamily: "Cinzel_700Bold",
    letterSpacing: 2,
  },
  orderCard: {
    borderWidth: 1.5,
    padding: 16,
    gap: 12,
    marginTop: 8,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  orderId: {
    fontSize: 14,
    fontFamily: "Cinzel_700Bold",
    letterSpacing: 1,
  },
  orderDate: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 2,
  },
  statusText: {
    fontSize: 9,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1,
  },
  orderItems: {
    gap: 4,
  },
  orderItem: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 19,
  },
  orderTotal: {
    fontSize: 14,
    fontFamily: "Inter_700Bold",
  },
});
