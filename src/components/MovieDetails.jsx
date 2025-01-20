import { Star, Clock, Calendar, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

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
                {movieDetails.spoken_languages?.[0]?.name || "Unknown Language"}
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

          {/* Cast */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Cast & Crew</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(movieDetails.cast || []).map((member, index) => (
                <div key={index} className="flex items-center gap-4">
                  <img
                    src={
                      member.profile_path
                        ? `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${member.profile_path}`
                        : "https://via.placeholder.com/64x64?text=No+Image"
                    }
                    className="w-16 h-16 rounded-full bg-gray-700 flex-shrink-0 object-cover"
                    alt={member.name || "Unknown Name"}
                  />
                  <div>
                    <h4 className="font-medium">{member.name || "Unknown Name"}</h4>
                    <p className="text-sm text-gray-400">{member.role || "Unknown Role"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="space-y-8">
          {/* Streaming Availability */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Where to Watch</h3>
            <div className="space-y-4">
              {movieDetails.stream?.rent?.length > 0 ? (
                movieDetails.stream.rent.map((platform, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span>{platform.provider_name || "Unknown Platform"}</span>
                    <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400">
                      Available
                    </span>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-between">
                  <span>Streaming</span>
                  <span className="px-3 py-1 rounded-full text-sm bg-red-500/20 text-red-400">
                    Unavailable
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Movie Details */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Movie Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Production</span>
                <span>
                  {movieDetails.production_companies?.[0]?.name || "Unknown"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Release Date</span>
                <span>{movieDetails.release_date || "Unknown Date"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Budget</span>
                <span>
                  $
                  {movieDetails.budget !== undefined && movieDetails.budget > 0
                    ? movieDetails.budget
                    : "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Box Office</span>
                <span>
                  $
                  {movieDetails.revenue !== undefined && movieDetails.revenue > 0
                    ? movieDetails.revenue
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
}

export default MovieDetails;
