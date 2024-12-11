import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MovieDetails } from "../../api";
import Loading from "../Common/Loading";
import Error from "../Common/Error";

function MovieCard({ favourite, addToFavourite }) {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const movieDetail = async () => {
      try {
        const data = await MovieDetails(id);
        setMovie(data);
      } catch (error) {
        setError("Failed to fetch the movie details.");
      }
    };
    movieDetail();
  }, [id]);

  if (!movie) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  const isFav =
    favourite && movie.imdbID
      ? favourite.some((fav) => fav.imdbID === movie.imdbID)
      : false;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="relative w-full h-96 mb-6">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{movie.Title}</h1>
        <h3 className="text-sm text-gray-500 mb-4">
          Released: {movie.Released}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <p>
            <span className="font-semibold">Year:</span> {movie.Year}
          </p>
          <p>
            <span className="font-semibold">Genre:</span> {movie.Genre}
          </p>
          <p>
            <span className="font-semibold">Director:</span> {movie.Director}
          </p>
          <p>
            <span className="font-semibold">Writers:</span> {movie.Writer}
          </p>
          <p>
            <span className="font-semibold">Actors:</span> {movie.Actors}
          </p>
        </div>
        <p className="mt-4 text-gray-600 leading-relaxed">
          <span className="font-semibold">Plot:</span> {movie.Plot}
        </p>
        {movie.Ratings.length > 0 && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold">Ratings:</h4>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              {movie.Ratings.map((rating) => (
                <li key={rating.Source} className="text-gray-600">
                  {rating.Source}: {rating.Value}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-6 flex justify-end flex-wrap gap-4">
          {!isFav ? (
            <button
              onClick={() => addToFavourite(movie)}
              className="text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-6 py-3 transition"
            >
              Add to Favourites
            </button>
          ) : (
            <Link
              to="/favourites"
              className="text-white bg-teal-500 hover:bg-teal-600 font-medium rounded-lg text-sm px-6 py-3 text-center transition"
            >
              Go to Favourites
            </Link>
          )}
          <Link to="/">
            <button className="text-gray-800 border border-gray-300 bg-white hover:bg-gray-100 font-medium rounded-lg text-sm px-6 py-3 transition">
              Go Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
