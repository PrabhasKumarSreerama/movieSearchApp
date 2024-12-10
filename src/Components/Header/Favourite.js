import { Link } from "react-router-dom";
import NoMovies from "../Common/NoMovies";

function Favourite({ favourite, removeFromFavourite }) {
  return (
    <>
      <div>
        {favourite.length === 0 ? (
          <NoMovies message="No Movies Are There In Our Favourites." />
        ) : (
          <div>
            {favourite.map((movie) => (
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
                  <button type="button" onClick={() => removeFromFavourite(movie.imdbID)} class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Remove</button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Favourite;
