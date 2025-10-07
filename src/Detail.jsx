import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ZoomIn } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArtworkById, getArtworkByBlob } from './artworks';
import Comments from './Comments';
import './Detail.css'; // Assuming you have some custom styles
import './Comments.css'; // Comments component styles
import './cleanupDemo'; // Clean up demo data for Firebase

const ArtDetailPage = () => {
  const { blob } = useParams();
  const navigate = useNavigate();
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  // Get artwork data based on blob, fallback to first artwork if no blob
  const artwork = getArtworkByBlob(blob)

  // Handle case where artwork is not found
  if (!artwork) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Artwork Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-white/20 backdrop-blur-md rounded-lg px-6 py-3 hover:bg-white/30 transition-all duration-300"
          >
            Return to Gallery
          </button>
        </div>
      </div>
    );
  }

  const handleBackToGallery = () => {
    navigate('/');
  };

  useEffect(() => {
    // Trigger animations on component mount
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-white/5 to-gray-300/5 rounded-full blur-3xl animate-pulse animate-bounce delay-300"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-gray-400/5 to-white/5 rounded-full blur-3xl animate-pulse animate-bounce delay-700"></div>
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-white/3 rounded-full blur-2xl animate-pulse animate-ping delay-1000"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-gray-300/3 rounded-full blur-xl animate-pulse animate-ping delay-1500"></div>

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-white/20 rounded-full animate-bounce duration-3000 delay-500"></div>
        <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-gray-300/30 rounded-full animate-bounce duration-4000 delay-1200"></div>
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-white/15 rounded-full animate-bounce duration-3500 delay-800"></div>
      </div>

      {/* Navigation Bar with entrance animation */}
      <nav className={`relative z-10 p-3 sm:p-6 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}>
        <div className="backdrop-blur-md bg-white/10 rounded-2xl sm:rounded-3xl border border-white/20 shadow-xl px-4 py-3 sm:px-6 sm:py-4 hover:bg-white/15 transition-all duration-300 hover:scale-105">
          <div className="flex items-center">
            <button
              onClick={handleBackToGallery}
              className="flex items-center space-x-2 sm:space-x-3 text-white hover:text-gray-300 transition-all duration-300 hover:scale-105 group"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-medium text-sm sm:text-base">Back to Gallery</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 px-3 pb-6 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Mobile-first layout */}
          <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">

            {/* Image Section with entrance animation */}
            <div className={`space-y-4 sm:space-y-6 transform transition-all duration-1200 delay-300 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
              }`}>
              <div
                ref={containerRef}
                className={`relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl bg-gradient-to-br from-white/20 to-gray-500/10 backdrop-blur-lg border border-white/30 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-3xl group ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
                  }`}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <div className="aspect-square sm:aspect-[4/5] relative overflow-hidden">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className={`w-full h-full object-cover transition-all duration-700 group-hover:brightness-110 ${isZoomed ? 'scale-150' : 'scale-100'
                      }`}
                    style={{
                      transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/10 transition-all duration-500"></div>
                </div>

                {/* Enhanced zoom indicator */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 transform transition-all duration-300 group-hover:scale-110">
                  <div className="backdrop-blur-md bg-black/40 rounded-full p-1.5 sm:p-2 animate-pulse">
                    <ZoomIn className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section with staggered animations */}
            <div className={`space-y-4 sm:space-y-6 transform transition-all duration-1200 delay-500 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
              }`}>
              {/* Title Card with hover effects */}
              <div className={`backdrop-blur-md bg-gradient-to-br from-white/15 to-gray-500/10 rounded-2xl sm:rounded-3xl border border-white/20 shadow-xl p-6 sm:p-8 hover:bg-gradient-to-br hover:from-white/20 hover:to-gray-500/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                } delay-700`}>
                <div className="space-y-3 sm:space-y-4">
                  <div className="inline-block animate-pulse">
                    <span className="bg-gradient-to-r from-white to-gray-300 text-black px-3 py-1 sm:px-4 rounded-full text-xs sm:text-sm font-medium hover:scale-110 transition-transform duration-300 inline-block">
                      {artwork.category}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight hover:from-gray-100 hover:to-white transition-all duration-500">
                    {artwork.title}
                  </h1>
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-lg sm:text-xl text-gray-200 font-medium hover:text-white transition-colors duration-300">{artwork.artist}</p>
                    <p className="text-sm sm:text-base text-gray-400 hover:text-gray-300 transition-colors duration-300">{artwork.year} • {artwork.medium}</p>
                    <p className="text-sm sm:text-base text-gray-400 hover:text-gray-300 transition-colors duration-300">{artwork.location}</p>
                  </div>
                </div>
              </div>

              {/* Description Card with typing animation effect */}
              <div className={`backdrop-blur-md bg-gradient-to-br from-white/10 to-gray-600/10 rounded-2xl sm:rounded-3xl border border-white/15 shadow-xl p-6 sm:p-8 hover:bg-gradient-to-br hover:from-white/15 hover:to-gray-600/15 transition-all duration-500 hover:scale-105 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                } delay-900`}>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 hover:text-gray-100 transition-colors duration-300">About This Work</h2>
                <div className="space-y-3 sm:space-y-4 text-gray-200 leading-relaxed text-sm sm:text-base hover:text-gray-100 transition-colors duration-500">
                  <p className="transform transition-all duration-300 hover:translate-x-2">
                    {artwork.description.overview}
                  </p>
                  <p className="transform transition-all duration-300 hover:translate-x-2">
                    {artwork.description.technique}
                  </p>
                  <p className="transform transition-all duration-300 hover:translate-x-2">
                    {artwork.description.significance}
                  </p>
                </div>
              </div>

              {/* Technical Details with animated counters */}
              <div className={`backdrop-blur-md bg-gradient-to-br from-white/10 to-gray-600/10 rounded-2xl sm:rounded-3xl border border-white/15 shadow-xl p-6 sm:p-8 hover:bg-gradient-to-br hover:from-white/15 hover:to-gray-600/15 transition-all duration-500 hover:scale-105 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                } delay-1100`}>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 hover:text-gray-100 transition-colors duration-300">Technical Details</h2>
                <div className="grid grid-cols-2 gap-4 sm:gap-6 text-center">
                  <div className="space-y-2 hover:scale-110 transition-transform duration-300">
                    <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent hover:from-gray-100 hover:to-white transition-all duration-300 animate-pulse">{artwork.year}</div>
                    <div className="text-xs sm:text-sm text-gray-400 hover:text-gray-300 transition-colors duration-300">Year Created</div>
                  </div>
                  <div className="space-y-2 hover:scale-110 transition-transform duration-300">
                    <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent hover:from-gray-100 hover:to-white transition-all duration-300 animate-pulse">{artwork.dimensions}</div>
                    <div className="text-xs sm:text-sm text-gray-400 hover:text-gray-300 transition-colors duration-300">Dimensions</div>
                  </div>
                </div>
                <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                  {artwork.techniques.map((technique, index) => (
                    <div key={index} className="flex items-center space-x-3 group hover:translate-x-2 transition-transform duration-300">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-white to-gray-300 rounded-full group-hover:animate-ping"></div>
                      <span className="text-gray-200 text-sm sm:text-base group-hover:text-white transition-colors duration-300">{technique}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real-time Comments Section */}
              <div className={`transform transition-all duration-1200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                } delay-1300`}>
                <Comments 
                  artworkId={artwork.blob} 
                  artworkTitle={artwork.title} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtDetailPage;