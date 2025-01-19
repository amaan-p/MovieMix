import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const data = e.target.value;
    setQuery(data);
  };
  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query)}`);
      setQuery(""); // Clear the input field
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <nav className="relative z-50">
      {/* Main Navigation Bar */}
      <div className="flex items-center justify-between px-4 md:px-12 py-4 bg-black/20 backdrop-blur-sm">
        {/* Left side - Logo and Links */}
        <div className="flex items-center">
          <div className="text-blue-700 text-2xl font-bold mr-8">MOVIEMIX</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-md text-gray-300">
            <NavLink to="/" className="hover:text-white">
              Home
            </NavLink>
            <NavLink to="/movies" className="hover:text-white">
              Random
            </NavLink>
            
            <NavLink to="/popular" className="hover:text-white">
              New & Popular
            </NavLink>
          </div>
        </div>

             {/* Right side - Search and Mobile Menu Toggle */}
             <div className="flex items-center space-x-6 text-white">
          <div className={`relative flex items-center ${isSearchFocused ? 'w-64' : 'w-48'} transition-all duration-300`}>
            <input
              type="text"
              value={query}
              placeholder="Search movies..."
              onChange={handleInput}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 pr-10 
                       placeholder-gray-400 text-white focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 p-1 hover:bg-white/10 rounded-full 
                       transition-colors duration-200"
            >
              <Search size={18} className="text-gray-300 hover:text-white" />
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:bg-white/10 p-2 rounded-full 
                     transition-colors duration-200"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
   

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-black/90 backdrop-blur-sm">
          <div className="flex flex-col text-gray-300 p-4">
            <NavLink
              to="/"
              className="py-2 px-4 hover:text-white hover:bg-white/10 rounded"
            >
              Home
            </NavLink>
            <NavLink
              to="/movies"
              className="py-2 px-4 hover:text-white hover:bg-white/10 rounded"
            >
              Random
              </NavLink>
            <NavLink
              to="/popular"
              className="py-2 px-4 hover:text-white hover:bg-white/10 rounded"
            >
              New & Popular
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
