import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; // Make sure to install lucide-react
import './Introduction.css';

const Introduction = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="introduction-modal">
      {/* Back button styled like Detail page */}
      <button className="back-button" onClick={handleBack}>
        <ArrowLeft size={20} />
        <span>Back to Home</span>
      </button>

      <div className="introduction-content">
        <div className="introduction-text-container">
          <h3>TRIỂN LÃM "CON NGƯỜI TRƯỚC LỰA CHỌN"</h3>
          <img
            src="./assets/lotus.jpg"
            alt="Lotus Painting"
            className="introduction-image"
          />
          <div className="introduction-text">
            <p>
              Họa sĩ Nguyễn Như Đức, thế hệ 80 sinh ra ở Hà Nội và tiếp thu mĩ thuật
              tại đó, rồi trên bước đường khám phá bản thân của mình, anh lưu lạc đến
              Hội An những năm 2014, "Đức Bẹt", nghệ danh của anh cũng chọn
              nơi đây làm quê hương thứ hai của mình và bắt đầu hành trình hội họa.
            </p>
            <p>
              Mười một năm sống ở Hội An, anh dành một nửa để vẽ sau những việc
              đời thường khác nhau, đủ loại ngành nghề cốt yếu nuôi giấc mơ về những
              tác phẩm ấp ủ sau này. Nguyễn Như Đức vì vốn mình mà chính gặp phải
              Hội An, lập gia đình và từ đây, ý tưởng đời.
            </p>
            <p>
              Toàn bộ hệ thống chất liệu xuyên suốt của bộ tác phẩm hơn 30 bức tranh,
              trong 5 năm Đức phát triển mà Đức cho là gần gũi, chạm được mỗi ngày
              bình lặng ở Hội An như cuộc hương thứ hai của mình, đó là gia đình. Cuộc sống
              mới là điểm tựa vững chắc cho anh.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;