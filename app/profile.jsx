import React, { useState } from "react";
import { View, Text, Button, Alert, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useRouter } from "expo-router";

export default function profile() {
  const router = useRouter();
  const user = auth.currentUser;
  const [photo, setPhoto] = useState(user?.photoURL || null);

  const pickImage = async () => {
    // Ask permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission required", "You need to allow access to your photos.");
      return;
    }

    // Pick image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setPhoto(uri);

      // Update user profile photo in Firebase
      try {
        await updateProfile(user, { photoURL: uri });
        Alert.alert("Profile Updated", "Your profile photo has been updated!");
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Logged out", "You have been signed out.");
      router.replace("/login"); // redirect to login
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No user logged in</Text>
        <Button title="Go to Login" onPress={() => router.push("/login")} />
        <Button title="Back to Home" onPress={() => router.push("/home")} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {/* Profile Picture */}
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={
            photo
              ? { uri: photo }
              : require("../assets/images/island6.jpg") // make sure you have a default photo in assets
          }
          style={styles.profilePic}
        />
        <Text style={styles.changeText}>Tap to change photo</Text>
      </TouchableOpacity>

      <Text style={styles.info}>Email: {user.email}</Text>
      <Text style={styles.info}>UID: {user.uid}</Text>

      <View style={{ height: 20 }} />
      <Button title="Logout" onPress={logout} />
      <View style={{ height: 10 }} />
      <Button title="Back to Home" onPress={() => router.push("/home")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  info: { fontSize: 16, marginBottom: 6 },
  profilePic: { width: 120, height: 120, borderRadius: 60, marginBottom: 10, borderWidth: 2, borderColor: "#007BFF" },
  changeText: { color: "#007BFF", fontSize: 14, marginBottom: 15 },
});
