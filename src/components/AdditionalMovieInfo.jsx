
const AdditionalMovieInfo = ({movieDetails}) => {
  return (
    <div>
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
  )
}

export default AdditionalMovieInfo