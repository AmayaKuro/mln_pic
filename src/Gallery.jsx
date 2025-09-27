import './Gallery.css';
import { useNavigate } from 'react-router-dom';

const Gallery = () => {
  const navigate = useNavigate();
  const artMovements = [
    {
      name: 'Art',
      image: './asset/mln_1.jpg',
    },
    {
      name: 'Art',
      image: './asset/mln_2.jpg',
    },
    {
      name: 'Art',
      image: './asset/mln_3.jpg',
    },
    {
      name: 'Art', 
      image: './asset/mln_4.jpg',
    },
  ];

  const handleCardClick = (details) => {
    navigate('/detail', { state: { artwork: details } });
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
        {artMovements.map((movement, index) => (
          <div 
            key={index} 
            className="card" 
            onClick={() => handleCardClick(movement.details)}
          >
            <div 
              className="image" 
              style={{ backgroundImage: `url(${movement.image})` }}
            >
              <div className="overlay">{movement.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;