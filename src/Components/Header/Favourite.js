import { Link } from "react-router-dom";
import NoMovies from "../Common/NoMovies";

function Favourite({ favourite, removeFromFavourite }) {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      {favourite.length === 0 ? (
        <div className="flex justify-center flex-col text-center">
        <div className="w-full mb-4"><NoMovies message="No Movies Are There In Your Favourites." /></div>
        <Link to="/">
            <button className="text-gray-800 border border-gray-300 bg-white hover:bg-gray-100 font-medium rounded-lg text-sm px-6 py-3 transition">
              Go Back
            </button>
          </Link></div>
      ) : (
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Your Favourite Movies
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favourite.map((movie) => (
              <div
                key={movie.imdbID}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <Link to={`/moviedetails/${movie.imdbID}`}>
                  <div className="relative w-full h-64">
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <h1 className="text-xl font-semibold text-gray-800">
                    {movie.Title}
                  </h1>
                  <p className="text-gray-600">{movie.Year}</p>
                  <p className="text-gray-500 italic text-sm">{movie.Type}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => removeFromFavourite(movie.imdbID)}
                      className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 transition"
                    >
                      Remove
                    </button>
                    <Link
                      to={`/moviedetails/${movie.imdbID}`}
                      className="text-blue-500 hover:underline text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link to="/">
              <button className="text-gray-800 border border-gray-300 bg-white hover:bg-gray-100 font-medium rounded-lg text-sm px-6 py-3 transition">
                Go Back
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Favourite;
