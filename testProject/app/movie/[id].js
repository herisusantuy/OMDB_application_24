import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useFetch from "../hooks/useFetch";
import { general, colors } from "../constants";

const { API_URL, API_KEY } = general;

const Movie = () => {
  const { id } = useLocalSearchParams();
  const url = `${API_URL}/?apiKey=${API_KEY}&i=${id}&plot=full`;

  const { loading, data, error } = useFetch(url);

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.red} />
        </View>
      ) : (
        <>
          <Image
            source={{
              uri: data?.Poster,
            }}
            style={styles.image}
          />
          <Ionicons
            name="chevron-back-circle"
            size={30}
            color={colors.gray}
            style={styles.backIcon}
            onPress={() => router.back()}
          />
          <View style={styles.wrapper}>
            <View style={{ marginBottom: 15 }}>
              <Text style={styles.genre}>{data?.Genre}</Text>
              <Text style={styles.title}>{data?.Title}</Text>
              <Text style={styles.plot}>{data?.Plot}</Text>
              <View style={styles.releasedWrapper}>
                <Text style={styles.released}>{data?.Released}</Text>
                <Text style={styles.released}>{data?.Runtime}</Text>
              </View>
            </View>
            <Text
              style={{ color: colors.white, fontSize: 20, fontWeight: "bold" }}
            >
              Cast
            </Text>
            <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
              {data?.Actors.split(",").map((actor, index) => (
                <View key={index}>
                  <Text style={{ color: colors.white, fontWeight: "bold" }}>
                    {actor}
                    {index !== data?.Actors.split(",").length - 1 ? (
                      <Text style={{ color: colors.white }}> |</Text>
                    ) : null}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default Movie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 14,
    resizeMode: "cover",
    overflow: "hidden",
  },
  title: {
    color: colors.white,
    fontSize: 36,
    fontWeight: "bold",
    marginVertical: 10,
  },
  genre: {
    color: colors.red,
    fontSize: 16,
  },
  plot: {
    color: colors.white,
    fontSize: 14,
    textAlign: "justify",
  },
  backIcon: {
    position: "absolute",
    top: 15,
    left: 15,
  },
  wrapper: {
    marginTop: -20,
    padding: 15,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: colors.dark,
  },
  released: {
    color: colors.red,
    fontSize: 14,
  },
  releasedWrapper: {
    flex: 1,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loading: {
    height: 500,
    justifyContent: "center",
    alignItems: "center",
  },
});
