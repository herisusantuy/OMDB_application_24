import React, { useEffect, useReducer } from "react";

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
        data: action.payload,
      };
    case "REJECTED":
      return {
        ...state,
        loading: false,
        error: action.error.message,
        data: null,
      };
    default:
      throw new Error("Unidentified reducer action type!");
  }
};
const useFetch = (url) => {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
    data: null,
  });
  const getData = async () => {
    dispatch({ type: "PENDING" });
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "FULFILLED", payload: data });
      })
      .catch((error) => {
        dispatch({ type: "REJECTED", error: "Server error." });
      });
  };
  useEffect(() => {
    getData();
  }, [url]);

  const { loading, data, error } = state;

  return { loading, data, error };
};

export default useFetch;
