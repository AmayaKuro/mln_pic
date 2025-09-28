import './Gallery.css';
import { useNavigate } from 'react-router-dom';
import MLN_1 from './assets/mln_1.jpg'
import MLN_2 from './assets/mln_2.jpg'
import MLN_3 from './assets/mln_3.jpg'
import MLN_4 from './assets/mln_4.jpg';

const Gallery = () => {
  const navigate = useNavigate();
  const artMovements = [
    {
      name: 'Art',
      image: MLN_1,
    },
    {
      name: 'Art',
      image: MLN_2,
    },
    {
      name: 'Art',
      image: MLN_3,
    },
    {
      name: 'Art',
      image: MLN_4,
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