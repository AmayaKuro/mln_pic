import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import './Introduction.css';

const Introduction = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="introduction-modal">
      <button className="back-button" onClick={handleBack}>
        <ArrowLeft size={20} />
        <span>Back to Home</span>
      </button>

      <div className="introduction-content">
        <div className="introduction-text-container">
          <h3>TRIỂN LÃM "CON NGƯỜI TRƯỚC LỰA CHỌN"</h3>
          <div className="symbol-container">
  <Compass size={100} strokeWidth={1.2} className="introduction-symbol" />
</div>
          <div className="introduction-text">
            <p>
              Trong hành trình tồn tại, mỗi con người đều đứng trước những ngã rẽ...
            </p>
            <p>
              Thông qua những tác phẩm nghệ thuật trừu tượng kết hợp cùng triết học...
            </p>
            <p>
              Đây không chỉ là triển lãm nghệ thuật, mà còn là một cuộc đối thoại...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;