import './gallery.css';
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
    // Add more art movements with details as needed
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
      <div className="grid">
        {artMovements.map((movement, index) => (
          <div key={index} className="card" onClick={() => handleCardClick(movement.details)}>
            <div className="image" style={{ backgroundImage: `url(${movement.image})` }}>
              <div className="overlay">{movement.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;