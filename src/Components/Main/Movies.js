import { Link } from "react-router-dom";
import NoMovies from "../Common/NoMovies";

function Movies({ movies }) {
  if (movies.length === 0) {
    return <NoMovies message="No Movies Found, Search With Other Name." />;
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
        {movies.map((movie) => (
          <Link
            key={movie.imdbID}
            to={`/moviedetails/${movie.imdbID}`}
            className="block bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
          >
            <div className="relative w-full h-96">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h1 className="text-lg font-semibold text-gray-800">
                {movie.Title}
              </h1>
              <h3 className="text-sm text-gray-600">{movie.Year}</h3>
              <p className="text-sm text-gray-500">{movie.Type}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Movies;
