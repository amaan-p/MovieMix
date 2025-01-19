import { useState, useEffect } from "react";
import { NavLink } from "react-router";
const Searchpage = () => {
  const [movieName, setMovieName] = useState("");
  const [movies, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch trending movies on initial load
  useEffect(() => {
    fetch("http://localhost:5000/top_rated")
      .then((res) => res.json())
      .then((data) => {
        setMoviesData(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching trending movies:", error);
        setLoading(false);
      });
  }, []);

  const fetchMovies = (e) => {
    e.preventDefault();
    if (!movieName.trim()) return;

    setLoading(true);
    fetch(`http://localhost:5000/search?name=${encodeURIComponent(movieName)}`)
      .then((res) => res.json())
      .then((data) => {
        setMoviesData(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false);
      });
  };

  const queryGenerator = (e) => {
    setMovieName(e.target.value);
  };

  return (
    <div className="bg-gradient-to-b from-black to-slate-950 min-h-screen">
      <div className="flex flex-col items-center p-10 space-y-8">
        <h1 className="text-3xl font-bold text-white">Search Movies</h1>
        <form onSubmit={fetchMovies} className="flex gap-2 w-full max-w-md">
          <input
            type="text"
            placeholder="Enter Movie Name"
            onChange={queryGenerator}
            value={movieName}
            className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 pr-10 
            placeholder-gray-400 text-white focus:outline-none focus:ring-2 
            focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition-all font-medium"
          >
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <div className="flex justify-center p-10">
          <div className="text-lg text-gray-600">Loading movies...</div>
        </div>
      ) : movies.length === 0 ? (
        <div className="flex justify-center p-10">
          <div className="text-lg text-gray-600">No movies found</div>
        </div>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 pb-8 p-4">
          {movies.slice(5, 17).map((movie, index) => (
            <NavLink key={index} to={`/${movie.id}`}>
              <div
                key={index}
                className="transform transition-transform duration-200 hover:scale-105"
              >
                <div className="rounded-lg overflow-hidden">
                  {movie.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      alt={movie.title}
                      className=" h-auto "
                    />
                  )}
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchpage;
