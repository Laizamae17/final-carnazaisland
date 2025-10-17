import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const islands = [
  {
    id: "island1",
    name: "Eco Park",
    image: require("../assets/images/island1.jpg"),
    description:
      "Carnaza Eco Park is a scenic eco-park on Carnaza Island, offering white sand beaches, unique cottages, and a peaceful escape surrounded by nature.",
  },
  {
    id: "island2",
    name: "Skull Cove",
    image: require("../assets/images/island3.jpg"),
    description:
      "Skull Cove is known for its mysterious cave with human skulls and a helipad that provides a stunning 360° ocean view. A must-see on the island.",
  },
  {
    id: "island3",
    name: "Liog-Liog",
    image: require("../assets/images/island7.jpg"),
    description:
      "Liog-Liog Cove, or Twin Beach, is a beautiful sandbar connecting two beaches. Its clear waters and calm setting make it perfect for swimming and island hopping.",
  },
  {
    id: "island4",
    name: "Silangga",
    image: require("../assets/images/island4.jpg"),
    description:
      "Also known as Silangga, Carnaza Island is a remote tropical paradise famous for its white sand, rock formations, and diving and snorkeling spots.",
  },
  {
    id: "island5",
    name: "Kailina Beach",
    image: require("../assets/images/island5.jpg"),
    description:
      "Kailina Beach is a serene and secluded beach on Carnaza Island, ideal for swimming, relaxing, and soaking up the island’s peaceful atmosphere.",
  },
];

export default function IslandsScreen() {
  const router = useRouter();
  const [likedIslands, setLikedIslands] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});

  useEffect(() => {
    const loadLikes = async () => {
      try {
        const savedLikes = await AsyncStorage.getItem("likedIslands");
        const savedCounts = await AsyncStorage.getItem("likeCounts");

        if (savedLikes) setLikedIslands(JSON.parse(savedLikes));
        if (savedCounts) setLikeCounts(JSON.parse(savedCounts));
      } catch (error) {
        console.error("Error loading likes:", error);
      }
    };
    loadLikes();
  }, []);

  const toggleLike = async (id) => {
    let updatedLikes = [...likedIslands];
    let updatedCounts = { ...likeCounts };

    if (updatedLikes.includes(id)) {
      // Unlike
      updatedLikes = updatedLikes.filter((islandId) => islandId !== id);
      updatedCounts[id] = Math.max((updatedCounts[id] || 1) - 1, 0);
    } else {
      // Like
      updatedLikes.push(id);
      updatedCounts[id] = (updatedCounts[id] || 0) + 1;
    }

    setLikedIslands(updatedLikes);
    setLikeCounts(updatedCounts);

    try {
      await AsyncStorage.setItem("likedIslands", JSON.stringify(updatedLikes));
      await AsyncStorage.setItem("likeCounts", JSON.stringify(updatedCounts));
    } catch (error) {
      console.error("Error saving likes:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Other Beautiful Views in Carnaza</Text>

      {islands.map((island) => (
        <View key={island.id} style={styles.card}>
          <Image source={island.image} style={styles.image} />

          {/* Heart Button + Count */}
          <View style={styles.heartContainer}>
            <Pressable onPress={() => toggleLike(island.id)}>
              <Ionicons
                name={likedIslands.includes(island.id) ? "heart" : "heart-outline"}
                size={28}
                color={likedIslands.includes(island.id) ? "red" : "#888"}
              />
            </Pressable>
            <Text style={styles.likeCount}>{likeCounts[island.id] || 0}</Text>
          </View>

          <Text style={styles.name}>{island.name}</Text>
          <Text style={styles.description}>{island.description}</Text>

          {/* Explore Button */}
          <Pressable
            style={styles.exploreButton}
            onPress={() => router.push(`/explore?id=${island.id}`)}
          >
            <Text style={styles.exploreText}>Explore</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    marginBottom: 30,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    width: 340,
    position: "relative",
  },
  image: {
    width: 320,
    height: 200,
    borderRadius: 12,
    marginBottom: 10,
  },
  heartContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 15,
    right: 20,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  likeCount: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 5,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  exploreButton: {
    backgroundColor: "#21cc8d",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  exploreText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});