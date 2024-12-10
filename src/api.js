import axios from "axios";

const API_KEY = "c6499a81";

const API_URL = "https://www.omdbapi.com/";

export const SearchMovie = async (movieName, type = "") => {
  try {
    const rs = await axios.get(
      `${API_URL}?s=${movieName}&type=${type}&apikey=${API_KEY}`
    );
    return rs.data;
  } catch (error) {
    console.log("Error while fetching the movie data", error);
    return [];
  }
};

export const MovieDetails = async (id) => {
  try {
    const rs = await axios.get(
      `${API_URL}?i=${id}&apikey=${API_KEY}`
    );
    return rs.data;
  } catch (error) {
    console.log("Error fetching the movie data", error);
    return [];
  }
};
