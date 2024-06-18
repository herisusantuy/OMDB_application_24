import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { Link } from "expo-router";

const CardMovie = (props) => {
  const { movie } = props;
  return (
    <Link
      push
      href={{
        pathname: "/movie/[id]",
        params: { id: movie.imdbID },
      }}
      asChild
    >
      <TouchableOpacity style={styles.container}>
        <Image
          source={{ uri: movie.Poster }}
          style={styles.image}
          resizeMode="poster"
        />
      </TouchableOpacity>
    </Link>
  );
};

export default CardMovie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 160,
    height: 200,
    borderRadius: 10,
  },
});
