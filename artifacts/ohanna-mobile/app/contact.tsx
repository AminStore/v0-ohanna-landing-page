import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
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

export default function ContactScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof typeof form) => (val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Name, email and message are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${getApiBase()}/ohanna/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to send");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setForm({ name: "", email: "", subject: "", message: "" });
      Alert.alert("Message Sent 𓂀", "We'll get back to you within 24 hours.", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (e: any) {
      setError(e.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
        <Text style={[styles.headerTitle, { color: "#FDF8EF" }]}>GET IN TOUCH</Text>
        <Text style={[styles.headerSub, { color: colors.primary }]}>𓂀 WE'D LOVE TO HEAR FROM YOU</Text>
      </View>

      <View style={[styles.content, { backgroundColor: colors.background }]}>
        <GoldDivider />

        {/* Contact info */}
        <View style={styles.infoRow}>
          {[
            { icon: "map-pin" as const, text: "Maadi, Cairo, Egypt" },
            { icon: "mail" as const, text: "info@ohanna.store" },
          ].map((c) => (
            <View key={c.text} style={[styles.infoChip, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Feather name={c.icon} size={12} color={colors.primary} />
              <Text style={[styles.infoText, { color: colors.mutedForeground }]}>{c.text}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.formTitle, { color: colors.foreground }]}>SEND A MESSAGE</Text>

        {/* Inputs */}
        {[
          { key: "name" as const, label: "FULL NAME *", placeholder: "Your name", type: "default" as const },
          { key: "email" as const, label: "EMAIL *", placeholder: "your@email.com", type: "email-address" as const },
          { key: "subject" as const, label: "SUBJECT", placeholder: "What's this about?", type: "default" as const },
        ].map((field) => (
          <View key={field.key} style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>{field.label}</Text>
            <TextInput
              value={form[field.key]}
              onChangeText={set(field.key)}
              placeholder={field.placeholder}
              placeholderTextColor={colors.mutedForeground}
              keyboardType={field.type}
              autoCapitalize={field.type === "email-address" ? "none" : "words"}
              style={[styles.input, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.card, fontFamily: "Inter_400Regular" }]}
            />
          </View>
        ))}

        <View style={styles.fieldGroup}>
          <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>MESSAGE *</Text>
          <TextInput
            value={form.message}
            onChangeText={set("message")}
            placeholder="Tell us what's on your mind..."
            placeholderTextColor={colors.mutedForeground}
            multiline
            numberOfLines={5}
            style={[styles.textarea, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.card, fontFamily: "Inter_400Regular" }]}
          />
        </View>

        {error ? (
          <View style={[styles.errorBox, { backgroundColor: "rgba(174,28,28,0.1)", borderColor: colors.destructive }]}>
            <Feather name="alert-circle" size={14} color={colors.destructive} />
            <Text style={[styles.errorText, { color: colors.destructive }]}>{error}</Text>
          </View>
        ) : null}

        <Pressable
          style={({ pressed }) => [
            styles.submitBtn,
            { backgroundColor: colors.foreground, opacity: pressed || loading ? 0.85 : 1 },
          ]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.background} />
          ) : (
            <>
              <Feather name="send" size={16} color={colors.background} />
              <Text style={[styles.submitBtnText, { color: colors.background }]}>SEND MESSAGE</Text>
            </>
          )}
        </Pressable>
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
    letterSpacing: 2,
  },
  content: {
    padding: 20,
    gap: 14,
    flex: 1,
  },
  infoRow: {
    gap: 8,
  },
  infoChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 10,
    borderWidth: 1.5,
  },
  infoText: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  formTitle: {
    fontSize: 13,
    fontFamily: "Cinzel_700Bold",
    letterSpacing: 2,
    marginTop: 4,
  },
  fieldGroup: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 9,
    fontFamily: "Cinzel_700Bold",
    letterSpacing: 1.5,
  },
  input: {
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 14,
  },
  textarea: {
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    minHeight: 120,
    textAlignVertical: "top",
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
  submitBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 15,
    minHeight: 52,
  },
  submitBtnText: {
    fontSize: 11,
    fontFamily: "Cinzel_700Bold",
    letterSpacing: 2,
  },
});
