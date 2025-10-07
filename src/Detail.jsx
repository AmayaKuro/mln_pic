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

  const artwork = getArtworkByBlob(blob);

  if (!artwork) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy tác phẩm</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-white/20 backdrop-blur-md rounded-lg px-6 py-3 hover:bg-white/30 transition-all duration-300"
          >
            Quay lại Phòng Trưng Bày
          </button>
        </div>
      </div>
    );
  }

  const handleBackToGallery = () => {
    navigate('/');
  };

  useEffect(() => {
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
      {/* Thanh điều hướng */}
      <nav
        className={`relative z-10 p-2 sm:p-4 transition-all duration-700 ${
          isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="backdrop-blur-md bg-black/40 rounded-xl border border-white/20 shadow px-3 py-2 sm:px-4 sm:py-3">
          <button
            onClick={handleBackToGallery}
            className="flex items-center text-white text-sm sm:text-base hover:text-gray-300 transition"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Quay lại
          </button>
        </div>
      </nav>

      <div className="relative z-10 px-3 pb-6 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
            {/* Hình ảnh */}
            <div
              className={`transition-all duration-1000 ${
                isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
              }`}
            >
              <div
                ref={containerRef}
                className={`relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg bg-black/40 border border-white/20 ${
                  isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <div className="aspect-square sm:aspect-[4/5] relative">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      isZoomed ? 'scale-150' : 'scale-100'
                    }`}
                    style={{ transformOrigin: `${mousePosition.x}% ${mousePosition.y}%` }}
                  />
                </div>
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                  <div className="backdrop-blur-md bg-black/60 rounded-full p-1.5 sm:p-2">
                    <ZoomIn className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Nội dung */}
            <div
              className={`space-y-4 sm:space-y-6 transition-all duration-1000 delay-200 ${
                isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
              }`}
            >
              {/* Thông tin */}
              <div className="backdrop-blur-md bg-black/40 rounded-xl sm:rounded-2xl border border-white/20 shadow p-4 sm:p-6">
                <span className="inline-block bg-gradient-to-r from-white to-gray-300 text-black px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                  {artwork.category}
                </span>
                <h1 className="text-xl sm:text-3xl font-bold text-white mt-2">
                  {artwork.title}
                </h1>
                <p className="text-sm sm:text-lg text-gray-200">{artwork.artist}</p>
                <p className="text-xs sm:text-sm text-gray-400">
                  {artwork.year} • {artwork.medium}
                </p>
                <p className="text-xs sm:text-sm text-gray-400">{artwork.location}</p>
              </div>

              {/* Ý nghĩa triết học */}
              <div className="backdrop-blur-md bg-black/40 rounded-xl sm:rounded-2xl border border-white/10 shadow p-4 sm:p-6">
                <h2 className="text-lg sm:text-2xl font-bold text-white mb-2">
                  Ý Nghĩa Triết Học
                </h2>
                <p className="text-gray-100 text-sm sm:text-base mb-2">
                  {artwork.description.overview}
                </p>
                <p className="text-gray-200 text-sm sm:text-base">
                  {artwork.description.technique}
                </p>
              </div>

              {/* Ý nghĩa muốn truyền tải */}
              <div className="backdrop-blur-md bg-black/40 rounded-xl sm:rounded-2xl border border-white/10 shadow p-4 sm:p-6">
                <h2 className="text-lg sm:text-2xl font-bold text-white mb-2">
                  Ý Nghĩa Muốn Truyền Tải
                </h2>
                <p className="text-gray-100 text-sm sm:text-base leading-relaxed">
                  {artwork.meaning}
                </p>
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
