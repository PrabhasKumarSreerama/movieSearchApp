import { useState } from "react";

function Search({ onSearch }) {
  const [searchMovie, setSearchMovie] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchMovie);
    }

  return (
    <div class="w-full max-w-md">
      <form class="flex items-center" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          value={searchMovie}
          onChange={(e) => setSearchMovie(e.target.value)}
          className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default Search;
