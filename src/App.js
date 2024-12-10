import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Favourite from "./Components/Header/Favourite";
import Filter from "./Components/Header/Filter";
import Search from "./Components/Header/Search";
import { Router } from "react-router-dom";
import { SearchMovie } from "./api";

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [favourite, setFavourite] = useState([]);
  const [curPage, setCurPage] = useState([]);
  const moviesPerPage = 10;

  const handleSearch = useCallback(
    async (movieName) => {
      try {
        const data = await SearchMovie(movieName);
        setMovies(data.Search || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [filter]
  );

  useEffect(() => {
    const loadDefaultMovies = async () => {
      await handleSearch("recent");
    };
    loadDefaultMovies();
  }, [handleSearch]);

  const handleFilter = (filter) => {
    setFilter(filter);
  };

  const lastMovieIndex = curPage * moviesPerPage;
  const firstMovieIndex = lastMovieIndex - moviesPerPage;
  const curMovies = movies.slice(firstMovieIndex, lastMovieIndex);

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const paginationArr = [];
  for(let i=1; i<=totalPages; i++){
    paginationArr.push(i);
  }

  const handlePagination = (page) => {
    setCurPage(page);
  }

  const addToFavourite = (movie) => {
    if(favourite.find(fav => fav.imdbId === movie.imdbId)){
      alert("This Movie Already is in your Favourites");
      return;
    }else{
      setFavourite([...favourite, movie])
    }
  }

  return (
    <>
      {/* <Router> */}
      <header className="bg-green-100 shadow-md p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            For You Movie Finder
          </h1>
          <Search onSearch={handleSearch} />
          <Filter onFilter={handleFilter} />
        </div>
      </header>
      {/* </Router> */}
    </>
  );
}

export default App;
