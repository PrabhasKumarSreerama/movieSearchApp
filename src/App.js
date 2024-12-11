import { useCallback, useEffect, useState } from "react";
import Favourite from "./Components/Header/Favourite";
import FilterComp from "./Components/Header/Filter";
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
  const [curPage, setCurPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");

  const handleSearch = useCallback(
    async (movieName, fil) => {
      setLoading(true);
      try {
        const data = await SearchMovie(movieName, fil);
        setMovies(data.Search || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const loadDefaultMovies = async () => {
      await handleSearch("anime");
    };
    if (searchVal.trim() === "") loadDefaultMovies();
  }, [handleSearch, searchVal]);

  const handleSearchVal = (val) => {
    setSearchVal(val);
  };

  const handleFilter = (fil) => {
    setFilter(fil);
    console.log(filter);
    handleSearch(searchVal, fil);
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

  if (error) {
    return <Error message={error} />;
  }

  return (
    <>
      <Router>
        <header className="sticky top-0 z-10 bg-green-100 shadow-md p-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <h1 className="text-2xl font-bold text-gray-800 flex-shrink-0">
              <Link to="/">For You Movie Finder</Link>
            </h1>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
              <Search
                onSearch={handleSearch}
                handleSearchVal={handleSearchVal}
              />
              <FilterComp onFilter={handleFilter} />
            </div>
            <Link to="/favourites" className="flex-shrink-0">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-lime-500 via-lime-600 to-lime-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all"
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
                  {loading && <Loading />}
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
