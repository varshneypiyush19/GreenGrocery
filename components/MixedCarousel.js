// // components/MixedCarousel.js
// import { View, Image, Dimensions, StyleSheet } from "react-native";
// import Carousel from "react-native-snap-carousel";
// import Video from "react-native-video";

// const { width } = Dimensions.get("window");

// export default function MixedCarousel({ data }) {
//   const renderItem = ({ item }) => {
//     const isVideo = item.type === "video";

//     return (
//       <View style={styles.slide}>
//         {isVideo ? (
//           <Video
//             source={{ uri: item.url }}
//             style={styles.media}
//             resizeMode="cover"
//             repeat
//             muted
//             controls={false}
//             paused={false}
//           />
//         ) : (
//           <Image source={{ uri: item.url }} style={styles.media} />
//         )}
//       </View>
//     );
//   };

//   return (
//     <Carousel
//       data={data}
//       renderItem={renderItem}
//       sliderWidth={width}
//       itemWidth={width}
//       loop
//       autoplay
//     />
//   );
// }

// const styles = StyleSheet.create({
//   slide: {
//     width: width,
//     height: 250,
//     borderRadius: 12,
//     overflow: "hidden",
//   },
//   media: {
//     width: "100%",
//     height: "100%",
//   },
// });
import { useEffect, useState } from "react";
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
// import Video from "react-native-video";
import { Video } from "expo-video";

import { getFirestore, collection, getDocs } from "firebase/firestore";

const { width } = Dimensions.get("window");

export default function MixedCarousel() {
  const [carouselData, setCarouselData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, "carousel"));
        const items = [];

        querySnapshot.forEach((doc) => {
          items.push(doc.data()); // expects { url: "...", type: "image" | "video" }
        });

        setCarouselData(items);
      } catch (error) {
        console.error("Error fetching carousel data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarouselData();
  }, []);

  const renderItem = ({ item }) => {
    const isVideo = item.type === "video";

    return (
      <View style={styles.slide}>
        {isVideo ? (
          <Video
            source={{ uri: item.url }}
            style={styles.media}
            resizeMode="cover"
            isLooping
            isMuted
            shouldPlay
          />
        ) : (
          <Image source={{ uri: item.url }} style={styles.media} />
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.slide, styles.loader]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }
  if (carouselData.length === 0) return null;
  return (
    <Carousel
      width={width}
      height={250}
      data={carouselData}
      renderItem={renderItem}
      sliderWidth={width}
      itemWidth={width}
      loop
      autoplay
    />
  );
}

const styles = StyleSheet.create({
  slide: {
    width: width,
    height: 250,
    borderRadius: 12,
    overflow: "hidden",
  },
  media: {
    width: "100%",
    height: "100%",
  },
  loader: {
    justifyContent: "center",
    alignItems: "center",
  },
});
