import Camus_1 from './assets/camus.jpg'
import Sartre_1 from './assets/sartre.jpg'
import Kierkegaard_1 from './assets/kierkegaard.jpg'
import Nietzsche_1 from './assets/nietzsche.jpg'

// Artwork data for the gallery (based on doc)
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
    meaning: "Bức tranh cho thấy con người như bị “mắc kẹt” trong vòng xoáy thời gian và sự phi lý. Nhưng thay vì sụp đổ, nhân vật đứng bất động, đối diện thẳng với nó – đây chính là tinh thần Camus: chấp nhận sự phi lý, và sống hết mình trong nó. Người xem có thể cảm nhận sự căng thẳng và nghịch lý ngay cả khi chưa biết triết học, và từ đó nảy sinh tò mò để tìm hiểu thêm."
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
    meaning: "Bức tranh muốn thể hiện rõ tinh thần Sartre: con người không thể trốn tránh tự do. Dù có lo âu và bất an, chúng ta vẫn phải chọn, và chính những lựa chọn đó tạo nên bản chất của mình. Người xem khi nhìn tranh sẽ cảm thấy vừa tò mò, vừa bất an, và tự đặt câu hỏi: “Nếu là mình, mình sẽ chọn cánh cửa nào?” – từ đó mở ra sự quan tâm đến triết học Sartre."
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
    meaning: "Bức tranh muốn khắc họa cảm giác con người khi đứng trước sự vô hạn: vừa sợ hãi, vừa khao khát. Chỉ khi dám tin và bước vào bất định, con người mới vượt qua được sự lo âu hiện sinh. Người xem, khi nhìn thấy nhân vật cô độc trước vực thẳm và bầu trời đêm, sẽ cảm nhận được sự bấp bênh nhưng cũng thấy lóe lên một hy vọng mong manh – chính là tinh thần Kierkegaard."
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
    meaning: "Bức tranh thể hiện khoảnh khắc con người bùng nổ sức mạnh ý chí, phá bỏ mọi trói buộc cũ để tự kiến tạo giá trị mới – tinh thần “siêu nhân” của Nietzsche. Người xem, khi nhìn thấy sự dữ dội và bi tráng của hình ảnh này, sẽ cảm nhận được tinh thần nổi loạn, khát khao vượt thoát, và được gợi mở để tìm hiểu sâu hơn về triết học Nietzsche."
  }
];

// Helper functions
export const getArtworkById = (id) => artworks.find(a => a.id === parseInt(id));
export const getArtworkByBlob = (blob) => artworks.find(a => a.blob === blob);
export const getAllArtworks = () => artworks;
