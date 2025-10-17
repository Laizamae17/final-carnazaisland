import { View, Text, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

const exploreData = {
  island1: {
  name: "Eco Park",
  description: `Eco Park is located on Carnaza Island, which is part of Daanbantayan, Cebu. 
To get there, you must first take a bus from Cebu City to Tapilon Port in Daanbantayan, and then catch a passenger boat from the port to the island. 
The island features a white sand beach and the Eco Park offers accommodations and activities like swimming and diving.

Getting there:
• From Cebu City: Take a bus from Cebu North Terminal to Tapilon Port in Daanbantayan (ask the driver to drop you off there).
• From Tapilon Port: Take a passenger boat to Carnaza Island. The trip takes approximately 2–3 hours.
• Best time to travel: Visit during the dry season (November to May) for the best weather and sea conditions.

Park features:
• Accommodations: The park offers a range of options, including air-conditioned rooms, non-air-conditioned rooms, and wooden sheds for rent. Tent pitching is also allowed.
• Beach: Carnaza Eco Park is known for its white sand beach.
• Activities: Visitors can enjoy swimming, snorkeling, and diving to explore marine life and coral reefs.
• Other attractions: The island also features Skull Cove, Liog-liog Beach, and Kailina Beach.

Fees and contact:
• Entrance Fee: ₱200 per person.
• Accommodations: Prices vary, but a wooden shed room costs around ₱200 per night.
• Contact: For booking and inquiries, call +63 998 609 761.

Important reminders:
• Bring enough cash, as ATM access is limited on the island.
• It’s best to go to Tapilon Port before 3 PM to catch a boat to Carnaza Island.`,
  image: require("../assets/images/island1.jpg"),
},

 island2: {
  name: "Skull Cove",
  description: `Skull Cove is a point of interest on Carnaza Island in Daanbantayan, Cebu, known for its cave that contains human skulls and a nearby helipad that offers panoramic views of the sea. 
The skulls' origins are often attributed to a local legend about a couple who died of leprosy or to Japanese military remains from WWII. 
Visitors can explore the cave and the helipad, enjoy the cove's clear blue water, and experience the island's natural beauty.

Activities and features at Skull Cove:
• Cave exploration: The cave contains a small pool and, famously, a collection of human skulls. The exact origin is debated—some say they belong to a local couple, others to WWII Japanese soldiers.
• Helipad: A nearby helipad provides stunning 360° views of the surrounding ocean.
• Scenery: In front of the caves lies enticingly clear, bluish water, and a pathway leading to the helipad.

How to get there:
• From Cebu City: Take a bus from the North Terminal to Tapilon Port in Daanbantayan (approx. 3–4 hours).
• At Tapilon Port: Hire a boat to Carnaza Island (around 2 hours).
• On Carnaza Island: Skull Cove is one of the main attractions—reachable via an island tour or with local guides.`,
  image: require("../assets/images/island3.jpg"),
},

 island3: {
  name: "Liog-Liog",
  description: `Liog-Liog is a cove, also known as Twin Beach, on Carnaza Island in Daanbantayan, Cebu. 
It gets its name from its appearance that resembles a neck, or "liog" in Cebuano. 
It’s a popular destination for tourists, featuring white-sand shores, clear water, and is a key stop during island hopping tours around Carnaza Island.

What is Liog-Liog?
• Name: "Liog-Liog" means "neck" in the Cebuano language, describing the narrow strip of land separating two beaches.
• Description: A scenic cove with soft white sand and crystal-clear water, perfect for swimming and relaxation.
• Activities: Often included in island hopping tours, allowing visitors to explore multiple beaches and scenic spots around Carnaza.

How to get there:
• Travel to Daanbantayan: From Cebu City, take a bus or van to Tapilon Port in Daanbantayan.
• Take a boat to Carnaza Island: From Tapilon Port, board a boat bound for Carnaza Island.
• Explore the island: Once on Carnaza Island, hire a habal-habal (motorcycle taxi) to reach Liog-Liog and nearby attractions.

Tips for visiting:
• Best time to visit: The dry season (November to May) offers the best weather and calmer seas.
• Bring enough cash: ATMs are limited on the island.
• Be prepared: Sea conditions can be rough depending on the weather.`,
  image: require("../assets/images/island7.jpg"),
},

  island4: {
  name: "Silangga",
  description: `"Silangga" is likely a misspelling of the name Carnaza Island, a remote island and barangay in the municipality of Daanbantayan, northern Cebu. 
It is known for its white-sand beaches, clear waters, rock formations, and opportunities for island hopping, snorkeling, and diving.

Location and how to get there:
• Location: Carnaza Island is located approximately 30 km from the northernmost tip of Cebu, in the municipality of Daanbantayan.
• Travel from Cebu City: Take a bus from Cebu North Bus Terminal to Tapilon Port in Daanbantayan.
• Boat ride: From Tapilon Port, take a pump boat to Carnaza Island (about 2 hours).

Things to do and see:
• Island hopping: Explore the island and its nearby islets.
• Beaches: Enjoy the white-sand beaches and peaceful coves.
• Rock formations: See the unique rock formations and visit Skull Cove.
• Snorkeling and diving: Discover the colorful coral reefs and marine life.
• Camping: Camp under the stars — Carnaza Eco Park provides basic facilities for visitors.`,
  image: require("../assets/images/island4.jpg"),
},

 island5: {
  name: "Kailina Beach",
  description: `Kailina is a beach on Carnaza Island, which is a barangay in Daanbantayan, Cebu. 
Carnaza Island is known as a secluded and serene destination with beautiful beaches and unique spots like Kailina Beach.

Kailina Beach on Carnaza Island:
• Description: Kailina Beach is a serene and secluded beach on Carnaza Island, often highlighted by visitors as a favorite spot (say me-to-go.com).
• Location: It is one of several destinations on Carnaza Island, located north of Malapascua Island and the northernmost offshore island of Daanbantayan, Cebu.
• Attractions: The island, and by extension the beach area, is known for its beautiful coastline, caves, and tranquil atmosphere.

How to get to Carnaza Island:
• Travel to Tapilon Port: Go to the North Bus Terminal in Cebu and take a bus or van going to Maya/Bagay. Ask the driver to drop you off at Tapilon Port in Daanbantayan.
• Take a boat to Carnaza Island: From Tapilon Port, ride a pump boat to Carnaza Island. The boat trip takes approximately 2 hours.`,
  image: require("../assets/images/island5.jpg"),
},

};

export default function ExploreScreen() {
  const { id } = useLocalSearchParams(); // get island id from button press
  const router = useRouter();

  const island = exploreData[id]; // pick the right island data

  if (!island) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Island not found!</Text>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={island.image} style={styles.image} />
      <Text style={styles.name}>{island.name}</Text>
      <Text style={styles.description}>{island.description}</Text>

      {/* Back Button */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 340,
    height: 220,
    borderRadius: 12,
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 30,
  },
  error: {
    fontSize: 20,
    color: "red",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#21cc8d",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  backText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
//