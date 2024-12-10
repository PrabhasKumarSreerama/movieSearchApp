import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
        setError("failed to fetch the movie details");
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
    <div className="max-w-4xl mx-auto p-4">
      <div className="relative w-full h-96 mb-4">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <h1 className="text-2xl font-bold text-gray-800">{movie.Title}</h1>
        <h3 className="text-sm text-gray-600">Released: {movie.Released}</h3>
        <p className="text-sm text-gray-600">Year: {movie.Year}</p>
        <p className="text-sm text-gray-600">Genre: {movie.Genre}</p>
        <p className="text-sm text-gray-600">Director: {movie.Director}</p>
        <p className="text-sm text-gray-600">Writers: {movie.Writer}</p>
        <p className="text-sm text-gray-600">Actors: {movie.Actors}</p>
        <p className="text-sm text-gray-600">Plot: {movie.Plot}</p>
        {movie.Ratings.length > 0 && (
          <div className="mt-2">
            <h4 className="font-semibold">Ratings:</h4>
            <ul className="list-disc pl-5">
              {movie.Ratings.map((rating) => (
                <li key={rating.Source}>
                  {rating.Source}: {rating.Value}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-4">
          <button
            onClick={() => addToFavourite(movie)}
            className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 ${
              isFav
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isFav ? "Remove from Favourites" : "Add to Favourites"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
