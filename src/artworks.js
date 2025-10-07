import Camus_1 from './assets/camus.jpg'
import Sartre_1 from './assets/sartre.jpg'
import Kierkegaard_1 from './assets/kierkegaard.jpg'
import Nietzsche_1 from './assets/nietzsche.jpg'

// Artwork data for the gallery (existentialism collection)
export const artworks = [
  {
    id: 1,
    blob: "camus_absurd",
    title: "Sự phi lý",
    artist: "Dựa theo Albert Camus",
    year: 2024,
    medium: "Sơn dầu + AI",
    dimensions: "120×90 cm",
    location: "Triển lãm Triết học & Nghệ thuật",
    category: "Triết học Hiện sinh",
    image: Camus_1,
    description: {
      overview: "Con người luôn tìm kiếm ý nghĩa, trong khi thế giới im lặng. Tác phẩm gợi vòng xoáy hỗn loạn của thời gian và sự phi lý.",
      technique: "Đồng hồ vỡ, xoáy tròn màu cam – xanh – đen, nhân vật đứng thẳng đối diện sự phi lý."
    },
    meaning: "Bức tranh thể hiện con người đối diện trực tiếp với sự phi lý của cuộc sống – mắc kẹt trong vòng xoáy thời gian và vô nghĩa, nhưng vẫn đứng vững, sống trọn vẹn trong nó. Đó là tinh thần Camus: chấp nhận phi lý để tìm tự do và hạnh phúc trong chính nó."
  },
  {
    id: 2,
    blob: "sartre_freedom",
    title: "Tự do & Trách nhiệm",
    artist: "Dựa theo Jean-Paul Sartre",
    year: 2024,
    medium: "Sơn dầu + AI",
    dimensions: "100×140 cm",
    location: "Triển lãm Triết học & Nghệ thuật",
    category: "Triết học Hiện sinh",
    image: Sartre_1,
    description: {
      overview: "Con người bị kết án phải tự do – không có bản chất định sẵn, phải tự định nghĩa mình bằng hành động.",
      technique: "Hành lang vô số cánh cửa, mỗi cửa mở ra khoảng trống mơ hồ. Nhân vật nhỏ bé, đơn độc giữa lựa chọn."
    },
    meaning: "Bức tranh khắc họa con người cô độc giữa vô số lựa chọn – biểu tượng cho tự do tuyệt đối và trách nhiệm không thể trốn tránh. Mỗi lựa chọn định hình bản chất ta, gợi người xem tự hỏi: “Mình sẽ chọn cánh cửa nào?”"
  },
  {
    id: 3,
    blob: "kierkegaard_faith",
    title: "Lo âu & Niềm tin",
    artist: "Dựa theo Søren Kierkegaard",
    year: 2024,
    medium: "Sơn dầu + AI",
    dimensions: "110×100 cm",
    location: "Triển lãm Triết học & Nghệ thuật",
    category: "Triết học Hiện sinh",
    image: Kierkegaard_1,
    description: {
      overview: "Lo âu hiện sinh là khi con người đối diện vực thẳm của sự vô hạn. Chỉ qua bước nhảy đức tin mới vượt qua được lo âu.",
      technique: "Nhân vật quỳ gối bên mép vực, bầu trời đêm u tối với ánh trăng mờ và sao thưa."
    },
    meaning: "Bức tranh tái hiện khoảnh khắc con người đối diện vực thẳm của bất định. Giữa lo âu và sợ hãi, chỉ đức tin mới giúp ta vượt qua và tìm thấy ý nghĩa sống – tinh thần “bước nhảy đức tin” của Kierkegaard."
  },
  {
    id: 4,
    blob: "nietzsche_overman",
    title: "Siêu nhân",
    artist: "Dựa theo Friedrich Nietzsche",
    year: 2024,
    medium: "Sơn dầu + AI",
    dimensions: "130×90 cm",
    location: "Triển lãm Triết học & Nghệ thuật",
    category: "Triết học Hiện sinh",
    image: Nietzsche_1,
    description: {
      overview: "Con người phải phá bỏ giá trị cũ, xiềng xích ràng buộc, để tự kiến tạo giá trị mới bằng ý chí.",
      technique: "Nhân vật trần trụi, phá vỡ xiềng xích, ánh sáng tỏa từ đầu, gam màu đỏ – xanh tương phản dữ dội."
    },
    meaning: "Bức tranh tượng trưng cho con người phá bỏ xiềng xích của những giá trị cũ, bùng nổ sức mạnh ý chí để tự kiến tạo bản thân – tinh thần “siêu nhân” đầy dũng cảm và sáng tạo của Nietzsche."
  }
];

// Helper functions
export const getArtworkById = (id) => artworks.find(a => a.id === parseInt(id));
export const getArtworkByBlob = (blob) => artworks.find(a => a.blob === blob);
export const getAllArtworks = () => artworks;
