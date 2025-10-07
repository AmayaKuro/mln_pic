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
              Trong hành trình tồn tại, mỗi con người đều đứng trước những ngã rẽ — giữa niềm tin và hoài nghi, giữa tự do và trách nhiệm, giữa lý trí và cảm xúc. Triển lãm “Con người trước lựa chọn” là lời mời bước vào thế giới nội tâm của con người hiện sinh: nơi không có câu trả lời tuyệt đối, chỉ còn sự giằng co giữa ý nghĩa và phi lý, giữa khát vọng sống và nỗi lo âu về chính sự tồn tại của mình.
            </p>
            <p>
              Thông qua những tác phẩm nghệ thuật trừu tượng kết hợp cùng triết học hiện sinh của Camus, Sartre, Kierkegaard, Nietzsche, triển lãm tái hiện những khoảnh khắc con người đối diện với chính bản thân – khi phải tự mình kiến tạo ý nghĩa cho cuộc đời trong một thế giới không sẵn câu trả lời.
            </p>
            <p>
              Đây không chỉ là triển lãm nghệ thuật, mà còn là một cuộc đối thoại thầm lặng giữa người xem và chính mình – nơi mỗi bức tranh là một tấm gương phản chiếu những lựa chọn, những do dự, và cả niềm tin sâu kín nhất trong tâm hồn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;