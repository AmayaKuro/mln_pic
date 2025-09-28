import './Gallery.css';
import { useNavigate } from 'react-router-dom';
import { getAllArtworks } from './artworks';

const Gallery = () => {
  const navigate = useNavigate();
  const artworks = getAllArtworks();

  const handleCardClick = (artworkId) => {
    navigate(`/detail/${artworkId}`);
  };

  return (
    <div className="gallery">
      {/* Add animated background elements */}
      <div className="background-effects">
        <div className="blur-effect-1"></div>
        <div className="blur-effect-2"></div>
        <div className="blur-effect-3"></div>
      </div>

      <div className="grid">
        {artworks.map((artwork, index) => (
          <div 
            key={artwork.id} 
            className="card" 
            onClick={() => handleCardClick(artwork.blob)}
          >
            <div 
              className="image" 
              style={{ backgroundImage: `url(${artwork.image})` }}
            >
              <div className="overlay">
                <div className="artwork-info">
                  <h3>{artwork.title}</h3>
                  <p>{artwork.artist}</p>
                  <span>{artwork.year}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;