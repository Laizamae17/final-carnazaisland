import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

let reviewsData = []; 

const RateThisApp = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleStarPress = (star) => {
    setRating(star);
  };

  const handleSubmit = () => {
    if (name.trim() === "" || rating === 0 || review.trim() === "") {
      alert("Please enter your name, rating, and review.");
      return;
    }

    reviewsData.push({ name, rating, review });
    setName("");
    setRating(0);
    setReview("");
    router.push("/reviews"); 
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Ratings⭐</Text>
      <Text style={styles.subtitle}>Tell us your experience!</Text>

      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
            <Text style={[styles.star, { color: star <= rating ? "#FFD700" : "#ccc" }]}>★</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter your name..."
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Write your review..."
        placeholderTextColor="#888"
        value={review}
        onChangeText={setReview}
        multiline
      />

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Review</Text>
      </TouchableOpacity>
    </View>
  );
};

export { reviewsData };
export default RateThisApp;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20, justifyContent: "center" },
  backButton: { position: "absolute", top: 50, left: 20 },
  backText: { fontSize: 18, color: "#0077b6", fontWeight: "bold" },
  title: { fontSize: 28, fontWeight: "bold", color:'#21cc8d', textAlign: "center" },
  subtitle: { fontSize: 16, color: "#444", textAlign: "center", marginBottom: 20 },
  starsContainer: { flexDirection: "row", justifyContent: "center", marginVertical: 10 },
  star: { fontSize: 40, marginHorizontal: 5 },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    height: 60,
    textAlignVertical: "top",
    marginBottom: 15,
  },
  submitBtn: {
    backgroundColor: '#21cc8d',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  submitText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
