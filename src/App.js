import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Favourite from "./Components/Header/Favourite";
import Filter from "./Components/Header/Filter";
import Search from "./Components/Header/Search";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { SearchMovie } from "./api";
import Loading from "./Components/Common/Loading";
import Error from "./Components/Common/Error";
import MovieCard from "./Components/Main/MovieCard";
import Movies from "./Components/Main/Movies";

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [favourite, setFavourite] = useState([]);
  const [curPage, setCurPage] = useState([]);
  
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
      await handleSearch("anime");
    };
    loadDefaultMovies();
  }, [handleSearch]);
  
  const handleFilter = (filter) => {
    setFilter(filter);
  };
  
  const moviesPerPage = 8;
  const lastMovieIndex = curPage * moviesPerPage;
  const firstMovieIndex = lastMovieIndex - moviesPerPage;
  const curMovies = movies.slice(firstMovieIndex, lastMovieIndex);
  
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const paginationArr = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationArr.push(i);
  }

  const handlePagination = (page) => {
    setCurPage(page);
  };

  const addToFavourite = (movie) => {
    if (favourite.find((fav) => fav.imdbID === movie.imdbID)) {
      alert("This Movie Already is in your Favourites");
      return;
    } else {
      setFavourite([...favourite, movie]);
    }
  };

  const removeFromFavourite = (id) => {
    setFavourite(favourite.filter((fav) => fav.imdbID !== id));
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <>
      <Router>
        <header className="sticky top-0 z-10 bg-green-100 shadow-md p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
              For You Movie Finder
            </h1>
            <Search onSearch={handleSearch} />
            <Filter onFilter={handleFilter} />
            <Link to="/favourites">
              <button
                type="button"
                className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                My Favourites
              </button>
            </Link>
          </div>
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Movies movies={curMovies} />
                  <div className="flex justify-center items-center space-x-2 mt-4">
                    {paginationArr.map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePagination(page)}
                        className={`px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white transition ${
                          curPage === page
                            ? "bg-blue-500 text-white"
                            : "bg-white"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                </>
              }
            />
            <Route
              path="/favourites"
              element={
                <Favourite
                  favourite={favourite}
                  removeFromFavourite={removeFromFavourite}
                />
              }
            />
            <Route
              path="/moviedetails/:id"
              element={
                <MovieCard
                  favourite={favourite}
                  addToFavourite={addToFavourite}
                />
              }
            />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
