import { Star, Clock, Calendar, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CastInfo from "../components/CastInfo";
import AdditionalMovieInfo from "../components/AdditionalMovieInfo";

const MovieDetails = () => {
  const { movieid } = useParams();
  const id = movieid;
  const [movieDetails, setMoviesData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/moviedetails?id=${movieid}`)
      .then((res) => res.json())
      .then((data) => {
        setMoviesData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      });
  }, [movieid, location.key]);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        Loading...
      </div>
    );

  if (movieDetails.popularity < 2.5) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        <p>
          Looks like this ones lost in the multiverse! 🌀
          <br />
          No results found, but don’t give up – every great story starts with a
          search!
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen  text-white">
      {/* Hero Section */}
      <div className="relative w-full ">
        <iframe
          src={`https://vidsrc.to/embed/movie/${id}`}
          title={movieDetails.original_title}
          className="w-full h-full object-cover aspect-video "
          allowFullScreen
        />
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl font-bold mb-2">
            {movieDetails.original_title || "Unknown Title"}
          </h1>
          <div className="flex items-center gap-2 text-purple-400 mb-5">
            {(movieDetails.genres || []).map((g, i) => (
              <span key={i} className="space-x-1">
                {g.name || "Unknown Genre"}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-purple-400" />
                <span>{movieDetails.runtime || "N/A"} mins</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={18} className="text-purple-400" />
                <span>
                  {movieDetails.vote_average !== undefined
                    ? `${movieDetails.vote_average}/10 TMDb`
                    : "Rating Unavailable"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-purple-400" />
                <span>{movieDetails.release_date || "Unknown Date"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={18} className="text-purple-400" />
                <span>
                  {movieDetails.spoken_languages?.[0]?.name ||
                    "Unknown Language"}
                </span>
              </div>
            </div>

            {/* Synopsis */}
            <div>
              <h3 className="text-2xl font-semibold mb-4">Synopsis</h3>
              <p className="text-gray-300 leading-relaxed">
                {movieDetails.overview || "No synopsis available."}
              </p>
            </div>

            <CastInfo movieDetails={movieDetails} />
          </div>

          {/* Sidebar Content */}
          <AdditionalMovieInfo movieDetails={movieDetails} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
