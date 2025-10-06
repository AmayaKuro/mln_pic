import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './HomePage.css';
import Gallery from './Gallery';

const HomePage = () => {
  const navigate = useNavigate();
  
  const handleIntroClick = () => {
    navigate('/introduction');
  };

  return (
    <div className="homepage">
      <div className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">Con người trước lựa chọn</h1>
            <p className="hero-subtitle">Triết học hiện sinh và nghệ thuật</p>
            
            <div className="hero-buttons">
              <button 
                className="btn-primary"
                onClick={handleIntroClick}
              >
                Giới thiệu
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section - Now always visible */}
      <section className="gallery-section">
        <div className="section-header">
          <h2 className="section-title">Danh sách tác phẩm</h2>
          <p className="section-subtitle">Khám phá bộ sưu tập nghệ thuật</p>
        </div>
        <Gallery />
      </section>
    </div>
  );
};

export default HomePage;