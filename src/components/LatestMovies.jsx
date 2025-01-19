import { useState,useEffect } from "react";
import { NavLink } from "react-router";
const LatestMovies = () => {
  const [movies, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/popular")
      .then((res) => res.json())
      .then((data) => {
        setMoviesData(data); // Assume the backend sends enriched movie data
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Live movies:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10">
        {/* Movies Grid Section */}
        <div className=" px-8 md:px-12 pt-8 relative">
          <h2 className="text-[4vw] md:text-[2.3vw]  text-white font-bold mb-4 md:p-3">
            Popular Now
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 pb-8">
            {movies.results.map((movie, index) => (
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
        </div>
      </div>
    </div>
  );
};

export default LatestMovies;
