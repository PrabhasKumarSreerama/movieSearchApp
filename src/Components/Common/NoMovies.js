const NoMovies = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-auto bg-gray-100 rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-700">{message}</h2>
    </div>
  );
};

export default NoMovies;
