// Demo version of comment service for testing without Firebase setup
// This uses localStorage to simulate real-time behavior

const COMMENTS_STORAGE_KEY = 'mln_demo_comments';

/**
 * Get stored comments from localStorage
 * @returns {Array} - Array of comments
 */
const getStoredComments = () => {
  try {
    const stored = localStorage.getItem(COMMENTS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading stored comments:', error);
    return [];
  }
};

/**
 * Store comments to localStorage
 * @param {Array} comments - Array of comments to store
 */
const storeComments = (comments) => {
  try {
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(comments));
  } catch (error) {
    console.error('Error storing comments:', error);
  }
};

/**
 * Add a new comment to an artwork (Demo version)
 * @param {string} artworkId - The ID of the artwork
 * @param {string} comment - The comment text
 * @param {string} userName - The name of the commenter
 * @param {string} userEmail - The email of the commenter (optional)
 * @returns {Promise} - Promise that resolves when comment is added
 */
export const addComment = async (artworkId, comment, userName, userEmail = null) => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const comments = getStoredComments();
      const newComment = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        artworkId,
        comment,
        userName,
        userEmail,
        timestamp: new Date(),
        createdAt: new Date().toISOString()
      };
      
      comments.push(newComment);
      storeComments(comments);
      
      // Trigger storage event to simulate real-time updates
      window.dispatchEvent(new CustomEvent('commentsUpdated', { 
        detail: { artworkId, comments: comments.filter(c => c.artworkId === artworkId) }
      }));
      
      resolve(newComment.id);
    }, 300);
  });
};

/**
 * Subscribe to real-time comments for a specific artwork (Demo version)
 * @param {string} artworkId - The ID of the artwork
 * @param {function} callback - Callback function to handle comment updates
 * @returns {function} - Unsubscribe function
 */
export const subscribeToComments = (artworkId, callback) => {
  // Initial load
  const allComments = getStoredComments();
  const artworkComments = allComments
    .filter(comment => comment.artworkId === artworkId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  callback(artworkComments);

  // Listen for updates
  const handleCommentsUpdate = (event) => {
    if (event.detail.artworkId === artworkId) {
      const sortedComments = event.detail.comments
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      callback(sortedComments);
    }
  };

  window.addEventListener('commentsUpdated', handleCommentsUpdate);

  // Return unsubscribe function
  return () => {
    window.removeEventListener('commentsUpdated', handleCommentsUpdate);
  };
};

/**
 * Generate a random user name for anonymous users
 * @returns {string} - Random username
 */
export const generateAnonymousUsername = () => {
  const adjectives = ['Art', 'Creative', 'Curious', 'Passionate', 'Inspired', 'Thoughtful'];
  const nouns = ['Lover', 'Enthusiast', 'Viewer', 'Admirer', 'Observer', 'Critic'];
  const numbers = Math.floor(Math.random() * 999) + 1;
  
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  
  return `${adjective}${noun}${numbers}`;
};