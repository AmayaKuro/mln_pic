// Demo data seeder for comments
import { addComment } from './commentServiceDemo';

const demoComments = [
  {
    artworkId: "chromatic_resonance",
    comment: "The vibrant colors in this piece really speak to me. The way the artist has layered the paint creates such depth and emotion.",
    userName: "ArtLover42"
  },
  {
    artworkId: "chromatic_resonance", 
    comment: "This reminds me of the abstract expressionist movement. Beautiful use of color theory!",
    userName: "CreativeObserver"
  },
  {
    artworkId: "ethereal_whispers",
    comment: "The ethereal quality of this painting is mesmerizing. It feels like looking into a dream.",
    userName: "InspiredViewer123"
  },
  {
    artworkId: "ethereal_whispers",
    comment: "James Chen's technique is incredible. The way light plays through the layers is masterful.",
    userName: "ThoughtfulCritic"
  }
];

export const seedDemoComments = async () => {
  const existingComments = JSON.parse(localStorage.getItem('mln_demo_comments') || '[]');
  
  // Only seed if no comments exist
  if (existingComments.length === 0) {
    console.log('Seeding demo comments...');
    
    for (const demo of demoComments) {
      await addComment(demo.artworkId, demo.comment, demo.userName);
      // Add delay between comments to make timestamps different
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('Demo comments seeded successfully!');
  }
};

// Auto-seed on import (only runs once)
seedDemoComments();