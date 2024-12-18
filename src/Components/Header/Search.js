import { useState } from "react";

function Search({ onSearch, handleSearchVal }) {
  const [searchMovie, setSearchMovie] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchMovie);
    handleSearchVal(searchMovie)
  };

  return (
    <div className="w-full max-w-md">
      <form className="flex items-center" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          value={searchMovie}
          onChange={(e) => setSearchMovie(e.target.value)}
          className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {/* <Link to="/"> */}
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        {/* </Link> */}
      </form>
    </div>
  );
}

export default Search;
