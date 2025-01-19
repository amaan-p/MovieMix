import { useEffect, useState } from "react";
import { NavLink } from "react-router";
const Movies = () => {
  const [randomId, setRandomId] = useState(0);
  const [movieDetails, setMovieDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 5;

  const generateRandomId = () => Math.floor(Math.random() * 373816);

  const fetchMovie = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/moviedetails?id=${id}`);
      if (!res.ok) throw new Error("Failed to fetch movie details");
      const data = await res.json();

      if (!data || (Array.isArray(data) && data.length === 0)) {
        throw new Error("No movie found");
      }

      const movieData = Array.isArray(data) ? data : [data];
      setMovieDetails(movieData);
      setLoading(false);
      setRetryCount(0);
    } catch (error) {
      console.error("Error fetching movie details:", error);

      if (retryCount < MAX_RETRIES) {
        setRetryCount((prev) => prev + 1);
        setRandomId(generateRandomId());
      } else {
        setError(
          "Unable to find a movie after multiple attempts. Please try again."
        );
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const rid = generateRandomId();
    setRandomId(rid);
  }, []);

  useEffect(() => {
    if (randomId === 0) return;
    setLoading(true);
    setError(null);
    fetchMovie(randomId);
  }, [randomId]);

  const handleFeelingLucky = () => {
    setRetryCount(0);
    setRandomId(generateRandomId());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 ">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-12 md:pl-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 tracking-tight pt-4">
          Random Movie Discovery
        </h2>
        <p className="text-md md:text-lg text-gray-200 mb-10 text-wrap">
          Feeling like life’s a little scripted or just want to direct your
          attention to something fresh? Try watching something random—it’s the
          perfect way to reel in new experiences and maybe even find a new star
          for your favorites list. Who knows? You might just discover a hidden
          gem that leaves you rolling the credits with a smile!
        </p>
        <button
          onClick={handleFeelingLucky}
          disabled={loading}
          className={`
            group relative inline-flex items-center justify-center
            px-8 py-4 md:text-lg text-md font-medium tracking-wide text-white
            rounded-full overflow-hidden transition-all duration-300
            ${
              loading
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-blue-500/25"
            }
          `}
        >
          {loading ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
              <span>Finding your movie...</span>
            </div>
          ) : (
            <>
              <span className="relative z-10">I'm Feeling Lucky</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </>
          )}
        </button>
      </div>

      {/* Content Section - Centered */}
      <div className="max-w-7xl mx-auto flex justify-center">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-center mb-8">
            {error}
          </div>
        )}

        {!loading && !error && movieDetails.length > 0 && (
          <div className="w-full max-w-sm">
            {" "}
            {/* Container for single card */}
            {movieDetails.map((movie, index) => (
              <NavLink key={index} to={`/${movie.id}`}>
                <div
                  key={movie.id}
                  className="relative group rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02]"
                >
                  {/* Glass Background */}
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl" />

                  {/* Content Container */}
                  <div className="relative flex flex-col h-full">
                    {/* Poster */}
                    <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                      {movie.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                          alt={`${movie.original_title} poster`}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = "/api/placeholder/300/450";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
                          No Poster Available
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h2 className="text-xl font-bold text-white mb-3 line-clamp-2">
                        {movie.original_title}
                      </h2>

                      <div className="flex gap-3 mb-4">
                        {movie.release_date && (
                          <span className="px-3 py-1 bg-black/30 rounded-full text-sm text-gray-300">
                            {new Date(movie.release_date).getFullYear()}
                          </span>
                        )}
                        {movie.vote_average && (
                          <span className="px-3 py-1 bg-black/30 rounded-full text-sm text-yellow-400 flex items-center gap-1">
                            ★ {movie.vote_average.toFixed(1)}
                          </span>
                        )}
                      </div>

                      {movie.overview && (
                        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                          {movie.overview}
                        </p>
                      )}

                      {movie.genres && movie.genres.length > 0 && (
                        <div className="mt-auto">
                          <div className="flex flex-wrap gap-2">
                            {movie.genres.slice(0, 3).map((genre, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-blue-500/10 rounded-full text-sm text-blue-400"
                              >
                                {typeof genre === "string" ? genre : genre.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;
