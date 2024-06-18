import React, { useState, useReducer, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
} from "react-native";
import CardMovie from "./components/CardMovie";
import InputSearch from "./components/InputSearch";
import { colors, general } from "./constants";
import useDebounce from "./hooks/useDebounce";

const { API_URL, API_KEY } = general;

const reducer = (state, action) => {
  switch (action.type) {
    case "PENDING":
      return {
        ...state,
        loading: true,
      };
    case "FULFILLED":
      return {
        ...state,
        loading: false,
        movies: action.payload,
      };
    case "REJECTED":
      return {
        ...state,
        loading: false,
        error: action.error.message,
        movies: [],
      };
    default:
      throw new Error("Unidentified reducer action type!");
  }
};

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    movies: [],
    error: "",
  });
  const { loading, movies, error } = state;
  const flatListRef = useRef();

  const handleSearchMovies = useDebounce((keyword) => {
    if (keyword && keyword != "" && keyword.length > 2) {
      const url = `${API_URL}/?s=${keyword}&apiKey=${API_KEY}&page=${page}`;
      dispatch({ type: "PENDING" });
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log("🚀 ~ .then ~ data:", data);
          dispatch({ type: "FULFILLED", payload: data?.Search });
        })
        .catch((error) => {
          dispatch({ type: "REJECTED", error: "Server error." });
        });
    }
  }, 500);

  const handleChange = (value) => {
    setKeyword(value);
    handleSearchMovies(value);
  };

  useEffect(() => {
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    handleSearchMovies();
  }, [page]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Film Searcher</Text>
      <InputSearch
        placeholder="Search movie by title"
        value={keyword}
        onChange={handleChange}
        onClear={() => {
          setKeyword("");
          setPage(1);
        }}
      />
      <View style={{ flex: 1, marginTop: 15 }}>
        <FlatList
          ref={flatListRef}
          data={movies}
          renderItem={({ item }) => (
            <CardMovie key={item.imdbID} movie={item} />
          )}
          keyExtractor={(item) => item.imdbID}
          numColumns={2}
          columnWrapperStyle={{
            flex: 1,
            gap: 10,
          }}
          ListEmptyComponent={() => (
            <View style={styles.emptyList}>
              {loading ? (
                <ActivityIndicator size="large" color={colors.red} />
              ) : (
                <>
                  <Feather name="video-off" size={48} color={colors.gray} />
                  <Text
                    style={{ color: colors.white, fontSize: 16, marginTop: 10 }}
                  >
                    No movies found.
                  </Text>
                </>
              )}
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 20 }}></View>}
          ListFooterComponent={() => (
            <>
              {loading ? (
                <View style={styles.loading}>
                  <Text style={styles.footer}>Load more</Text>
                  <ActivityIndicator color={colors.red} size="small" />
                </View>
              ) : null}
            </>
          )}
          initialNumToRender={20}
          onEndReached={() => setPage(page + 1)}
          onEndReachedThreshold={0.5}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    color: colors.white,
  },
  scrollView: {
    width: "100%",
    padding: 15,
  },
  movieContainer: {
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  movieWrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginTop: 20,
  },
  emptyList: {
    height: 500,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    fontSize: 12,
    paddingVertical: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.white,
    backgroundColor: colors.dark,
  },
  loading: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
});
