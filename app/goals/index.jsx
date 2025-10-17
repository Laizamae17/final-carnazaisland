import { Link, useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const home = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>🌊 Explore the Beauty of Carnaza 🌊</Text>
        <Text style={styles.subtitle}>
          Discover beaches, coves, forests, and hidden gems of this paradise in
          Cebu.
        </Text>

        <Link href="/island" style={styles.link}>
          🌟 Other Beautiful View in Carnaza
        </Link>

        <Link href="/location" style={styles.link}>
               Location
        </Link> 

         <Link href="/profile" style={styles.link}>
               Profile
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6f7f1", // soft seafoam background
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#21cc8d", // tropical green
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    elevation: 5,
  },
  navTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#0d6155",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    marginBottom: 30,
  },
  link: {
    marginVertical: 10,
    padding: 16,
    backgroundColor: "#21cc8d",
    color: "white",
    borderRadius: 12,
    width: "90%",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#21cc8d',
    marginLeft: 10,
  },
  logoutBtn: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e63946", // coral red for logout
    paddingVertical: 14,
    borderRadius: 12,
    width: "90%",
    gap: 8,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default home;
