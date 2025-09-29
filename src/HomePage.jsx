import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './HomePage.css';
import Gallery from './Gallery';

const HomePage = () => {
  const [showGallery, setShowGallery] = useState(true); // Hiển thị gallery mặc định
const navigate = useNavigate();
const handleIntroClick = () => {
    navigate('/introduction'); // Navigate to introduction route
  };
  return (
    <div className="homepage">
      {/* Hero Section với background từ CSS */}
      <div className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">Con người trước lựa chọn</h1>
            <p className="hero-subtitle">Triết học hiện sinh và nghệ thuật</p>
            
            {/* Buttons Navigation */}
            <div className="hero-buttons">
              <button 
                className="btn-primary"
                onClick={handleIntroClick} // Changed onClick handler
              >
                Giới thiệu
              </button>
              
              <button 
                className="btn-secondary"
                onClick={() => setShowGallery(!showGallery)}
              >
                {showGallery ? 'Ẩn' : 'Xem'} Tác phẩm
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <section className={`gallery-section ${!showGallery ? 'hidden' : ''}`}>
        <div className="section-header">
          <h2 className="section-title">Danh sách tác phẩm</h2>
          <p className="section-subtitle">Khám phá bộ sưu tập nghệ thuật</p>
        </div>
        {showGallery && <Gallery />}
      </section>




     
    </div>
  );
};

export default HomePage;