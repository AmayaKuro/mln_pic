import MLN_1 from './assets/mln_1.jpg'
import MLN_2 from './assets/mln_2.jpg'
import MLN_3 from './assets/mln_3.jpg'
import MLN_4 from './assets/mln_4.jpg'

// Artwork data for the gallery
export const artworks = [
  {
    id: 1,
    blob: "chromatic_resonance",
    title: "Chromatic Resonance",
    artist: "Maria Rodriguez",
    year: 2023,
    medium: "Acrylic on canvas",
    dimensions: "120×90 cm",
    location: "Contemporary Art Museum",
    category: "Contemporary Art",
    image: MLN_1,
    description: {
      overview: "\"Chromatic Resonance\" explores the dynamic interplay between color, emotion, and human perception. The artist employs bold, sweeping brushstrokes to create a sense of movement and energy that seems to pulse with life.",
      technique: "The composition draws viewers into a dialogue between warm and cool tones, representing the eternal dance between opposing forces in nature and human experience. Each layer of paint tells a story of spontaneity and deliberate choice.",
      significance: "Rodriguez's technique combines traditional expressionist methods with contemporary color theory, creating a work that bridges historical artistic movements with modern sensibilities. The result is a piece that speaks to both the intellect and the emotions."
    },
    techniques: [
      "Abstract Expressionism",
      "Heavy Impasto Technique",
      "Mixed Media Elements"
    ]
  },
  {
    id: 2,
    blob: "ethereal_whispers",
    title: "Ethereal Whispers",
    artist: "James Chen",
    year: 2024,
    medium: "Oil on canvas",
    dimensions: "100×150 cm",
    location: "Modern Art Gallery",
    category: "Abstract Art",
    image: MLN_2,
    description: {
      overview: "\"Ethereal Whispers\" captures the fleeting moments between dreams and reality. Chen's masterful use of translucent layers creates depth that seems to shift with the viewer's perspective.",
      technique: "The artist employs a unique glazing technique that allows light to penetrate multiple layers of paint, creating an almost luminous quality that changes throughout the day.",
      significance: "This piece represents Chen's evolution from traditional portraiture to abstract expressionism, marking a pivotal moment in his artistic journey."
    },
    techniques: [
      "Glazing Technique",
      "Layered Composition",
      "Light Manipulation"
    ]
  },
  {
    id: 3,
    blob: "urban_symphony",
    title: "Urban Symphony",
    artist: "Elena Vasquez",
    year: 2023,
    medium: "Mixed media on canvas",
    dimensions: "130×100 cm",
    location: "City Art Center",
    category: "Urban Art",
    image: MLN_3,
    description: {
      overview: "\"Urban Symphony\" is a vibrant celebration of city life, capturing the rhythm and energy of metropolitan existence through bold colors and dynamic forms.",
      technique: "Vasquez incorporates found materials from urban environments, creating texture that tells the story of the city itself. The composition flows like music, with each element contributing to the overall harmony.",
      significance: "This work challenges traditional boundaries between street art and gallery art, bringing the voice of the city into the refined space of the museum."
    },
    techniques: [
      "Mixed Media Collage",
      "Urban Material Integration",
      "Rhythmic Composition"
    ]
  },
  {
    id: 4,
    blob: "cosmic_dance",
    title: "Cosmic Dance",
    artist: "David Kumar",
    year: 2024,
    medium: "Digital art on canvas",
    dimensions: "110×80 cm",
    location: "Future Arts Museum",
    category: "Digital Art",
    image: MLN_4,
    description: {
      overview: "\"Cosmic Dance\" explores the intersection of technology and traditional artistic expression. Kumar uses digital tools to create patterns that echo both cosmic phenomena and ancient artistic traditions.",
      technique: "The piece is created through a combination of algorithmic generation and manual refinement, resulting in patterns that feel both calculated and organic.",
      significance: "This work represents the future of art-making, where technology serves as both tool and collaborator in the creative process."
    },
    techniques: [
      "Digital Art Techniques",
      "Algorithmic Patterns",
      "Technology Integration"
    ]
  }
];

// Helper function to get artwork by ID
export const getArtworkById = (id) => {
  return artworks.find(artwork => artwork.id === parseInt(id));
};

export const getArtworkByBlob = (blob) => {
  return artworks.find(artwork => artwork.blob === blob);
};


// Helper function to get all artworks
export const getAllArtworks = () => {
  return artworks;
};