import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ZoomIn } from 'lucide-react';
import './Detail.css'; // Assuming you have some custom styles
const ArtDetailPage = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

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
      <nav className={`relative z-10 p-3 sm:p-6 transform transition-all duration-1000 ${
        isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="backdrop-blur-md bg-white/10 rounded-2xl sm:rounded-3xl border border-white/20 shadow-xl px-4 py-3 sm:px-6 sm:py-4 hover:bg-white/15 transition-all duration-300 hover:scale-105">
          <div className="flex items-center">
            <button className="flex items-center space-x-2 sm:space-x-3 text-white hover:text-gray-300 transition-all duration-300 hover:scale-105 group">
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
            <div className={`space-y-4 sm:space-y-6 transform transition-all duration-1200 delay-300 ${
              isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
            }`}>
              <div 
                ref={containerRef}
                className={`relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl bg-gradient-to-br from-white/20 to-gray-500/10 backdrop-blur-lg border border-white/30 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-3xl group ${
                  isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <div className="aspect-square sm:aspect-[4/5] relative overflow-hidden">
                  <img 
                    src="./asset/mln_1.jpg"
                    alt="Abstract Expressionist Painting"
                    className={`w-full h-full object-cover transition-all duration-700 group-hover:brightness-110 ${
                      isZoomed ? 'scale-150' : 'scale-100'
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
            <div className={`space-y-4 sm:space-y-6 transform transition-all duration-1200 delay-500 ${
              isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`}>
              {/* Title Card with hover effects */}
              <div className={`backdrop-blur-md bg-gradient-to-br from-white/15 to-gray-500/10 rounded-2xl sm:rounded-3xl border border-white/20 shadow-xl p-6 sm:p-8 hover:bg-gradient-to-br hover:from-white/20 hover:to-gray-500/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl transform ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              } delay-700`}>
                <div className="space-y-3 sm:space-y-4">
                  <div className="inline-block animate-pulse">
                    <span className="bg-gradient-to-r from-white to-gray-300 text-black px-3 py-1 sm:px-4 rounded-full text-xs sm:text-sm font-medium hover:scale-110 transition-transform duration-300 inline-block">
                      Contemporary Art
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight hover:from-gray-100 hover:to-white transition-all duration-500">
                    Chromatic Resonance
                  </h1>
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-lg sm:text-xl text-gray-200 font-medium hover:text-white transition-colors duration-300">Maria Rodriguez</p>
                    <p className="text-sm sm:text-base text-gray-400 hover:text-gray-300 transition-colors duration-300">2023 • Acrylic on canvas</p>
                    <p className="text-sm sm:text-base text-gray-400 hover:text-gray-300 transition-colors duration-300">Contemporary Art Museum</p>
                  </div>
                </div>
              </div>

              {/* Description Card with typing animation effect */}
              <div className={`backdrop-blur-md bg-gradient-to-br from-white/10 to-gray-600/10 rounded-2xl sm:rounded-3xl border border-white/15 shadow-xl p-6 sm:p-8 hover:bg-gradient-to-br hover:from-white/15 hover:to-gray-600/15 transition-all duration-500 hover:scale-105 transform ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              } delay-900`}>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 hover:text-gray-100 transition-colors duration-300">About This Work</h2>
                <div className="space-y-3 sm:space-y-4 text-gray-200 leading-relaxed text-sm sm:text-base hover:text-gray-100 transition-colors duration-500">
                  <p className="transform transition-all duration-300 hover:translate-x-2">
                    "Chromatic Resonance" explores the dynamic interplay between color, emotion, and human perception. The artist employs bold, sweeping brushstrokes to create a sense of movement and energy that seems to pulse with life.
                  </p>
                  <p className="transform transition-all duration-300 hover:translate-x-2">
                    The composition draws viewers into a dialogue between warm and cool tones, representing the eternal dance between opposing forces in nature and human experience. Each layer of paint tells a story of spontaneity and deliberate choice.
                  </p>
                  <p className="transform transition-all duration-300 hover:translate-x-2">
                    Rodriguez's technique combines traditional expressionist methods with contemporary color theory, creating a work that bridges historical artistic movements with modern sensibilities. The result is a piece that speaks to both the intellect and the emotions.
                  </p>
                </div>
              </div>

              {/* Technical Details with animated counters */}
              <div className={`backdrop-blur-md bg-gradient-to-br from-white/10 to-gray-600/10 rounded-2xl sm:rounded-3xl border border-white/15 shadow-xl p-6 sm:p-8 hover:bg-gradient-to-br hover:from-white/15 hover:to-gray-600/15 transition-all duration-500 hover:scale-105 transform ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              } delay-1100`}>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 hover:text-gray-100 transition-colors duration-300">Technical Details</h2>
                <div className="grid grid-cols-2 gap-4 sm:gap-6 text-center">
                  <div className="space-y-2 hover:scale-110 transition-transform duration-300">
                    <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent hover:from-gray-100 hover:to-white transition-all duration-300 animate-pulse">2023</div>
                    <div className="text-xs sm:text-sm text-gray-400 hover:text-gray-300 transition-colors duration-300">Year Created</div>
                  </div>
                  <div className="space-y-2 hover:scale-110 transition-transform duration-300">
                    <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent hover:from-gray-100 hover:to-white transition-all duration-300 animate-pulse">120×90</div>
                    <div className="text-xs sm:text-sm text-gray-400 hover:text-gray-300 transition-colors duration-300">cm</div>
                  </div>
                </div>
                <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                  <div className="flex items-center space-x-3 group hover:translate-x-2 transition-transform duration-300">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-white to-gray-300 rounded-full group-hover:animate-ping"></div>
                    <span className="text-gray-200 text-sm sm:text-base group-hover:text-white transition-colors duration-300">Abstract Expressionism</span>
                  </div>
                  <div className="flex items-center space-x-3 group hover:translate-x-2 transition-transform duration-300">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-gray-300 to-white rounded-full group-hover:animate-ping"></div>
                    <span className="text-gray-200 text-sm sm:text-base group-hover:text-white transition-colors duration-300">Heavy Impasto Technique</span>
                  </div>
                  <div className="flex items-center space-x-3 group hover:translate-x-2 transition-transform duration-300">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-white to-gray-400 rounded-full group-hover:animate-ping"></div>
                    <span className="text-gray-200 text-sm sm:text-base group-hover:text-white transition-colors duration-300">Mixed Media Elements</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtDetailPage;