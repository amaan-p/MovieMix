
const CastInfo = ({movieDetails}) => {
  return (
    <div>   <div>
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
  </div></div>
  )
}

export default CastInfo