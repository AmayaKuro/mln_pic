import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  where,
  limit,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';
import { db } from './firebase';

// Collection name for comments
const COMMENTS_COLLECTION = 'artwork_comments';

/**
 * Add a new comment to an artwork
 * @param {string} artworkId - The ID of the artwork
 * @param {string} comment - The comment text
 * @param {string} userName - The name of the commenter
 * @param {string} userEmail - The email of the commenter (optional)
 * @returns {Promise} - Promise that resolves when comment is added
 */
export const addComment = async (artworkId, comment, userName, userEmail = null) => {
  try {
    // Validate input
    if (!artworkId || !comment.trim() || !userName.trim()) {
      throw new Error('Missing required fields');
    }

    if (comment.length > 500) {
      throw new Error('Comment too long (max 500 characters)');
    }

    if (userName.length > 50) {
      throw new Error('Username too long (max 50 characters)');
    }

    const docRef = await addDoc(collection(db, COMMENTS_COLLECTION), {
      artworkId: artworkId.toString(),
      comment: comment.trim(),
      userName: userName.trim(),
      userEmail,
      timestamp: serverTimestamp(),
      createdAt: new Date().toISOString(), // Fallback for immediate display
      edited: false,
      editedAt: null
    });

    console.log('Comment added successfully:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw new Error(`Failed to add comment: ${error.message}`);
  }
};

/**
 * Subscribe to real-time comments for a specific artwork
 * @param {string} artworkId - The ID of the artwork
 * @param {function} callback - Callback function to handle comment updates
 * @param {number} maxComments - Maximum number of comments to fetch (default: 100)
 * @returns {function} - Unsubscribe function
 */
export const subscribeToComments = (artworkId, callback, maxComments = 100) => {
  try {
    if (!artworkId) {
      console.error('No artworkId provided for comment subscription');
      callback([]);
      return () => {};
    }

    const q = query(
      collection(db, COMMENTS_COLLECTION),
      where('artworkId', '==', artworkId.toString()),
      orderBy('timestamp', 'desc'),
      limit(maxComments)
    );

    console.log('Subscribing to comments for artwork:', artworkId);

    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const comments = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          comments.push({
            id: doc.id,
            ...data,
            // Ensure timestamp is properly handled
            timestamp: data.timestamp || data.createdAt
          });
        });
        
        console.log(`Received ${comments.length} comments for artwork ${artworkId}`);
        callback(comments);
      }, 
      (error) => {
        console.error('Error in comment subscription:', error);
        // Provide user-friendly error handling
        if (error.code === 'permission-denied') {
          console.error('Permission denied - check Firestore security rules');
        } else if (error.code === 'unavailable') {
          console.error('Firestore unavailable - check internet connection');
        }
        callback([]);
      }
    );

    return unsubscribe;
  } catch (error) {
    console.error('Error setting up comment subscription:', error);
    callback([]);
    return () => {};
  }
};

/**
 * Delete a comment (if user owns it)
 * @param {string} commentId - The ID of the comment to delete
 * @returns {Promise} - Promise that resolves when comment is deleted
 */
export const deleteComment = async (commentId) => {
  try {
    await deleteDoc(doc(db, COMMENTS_COLLECTION, commentId));
    console.log('Comment deleted successfully:', commentId);
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw new Error(`Failed to delete comment: ${error.message}`);
  }
};

/**
 * Edit a comment
 * @param {string} commentId - The ID of the comment to edit
 * @param {string} newComment - The new comment text
 * @returns {Promise} - Promise that resolves when comment is updated
 */
export const editComment = async (commentId, newComment) => {
  try {
    if (!newComment.trim()) {
      throw new Error('Comment cannot be empty');
    }

    if (newComment.length > 500) {
      throw new Error('Comment too long (max 500 characters)');
    }

    await updateDoc(doc(db, COMMENTS_COLLECTION, commentId), {
      comment: newComment.trim(),
      edited: true,
      editedAt: serverTimestamp()
    });
    
    console.log('Comment edited successfully:', commentId);
  } catch (error) {
    console.error('Error editing comment:', error);
    throw new Error(`Failed to edit comment: ${error.message}`);
  }
};

/**
 * Generate a random user name for anonymous users
 * @returns {string} - Random username
 */
export const generateAnonymousUsername = () => {
  const adjectives = ['Art', 'Creative', 'Curious', 'Passionate', 'Inspired', 'Thoughtful', 'Modern', 'Classic', 'Bold', 'Elegant'];
  const nouns = ['Lover', 'Enthusiast', 'Viewer', 'Admirer', 'Observer', 'Critic', 'Connoisseur', 'Explorer', 'Dreamer', 'Seeker'];
  const numbers = Math.floor(Math.random() * 999) + 1;
  
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  
  return `${adjective}${noun}${numbers}`;
};

/**
 * Get comment count for an artwork
 * @param {string} artworkId - The ID of the artwork
 * @returns {Promise<number>} - Promise that resolves to comment count
 */
export const getCommentCount = async (artworkId) => {
  try {
    const q = query(
      collection(db, COMMENTS_COLLECTION),
      where('artworkId', '==', artworkId.toString())
    );
    
    return new Promise((resolve) => {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        resolve(querySnapshot.size);
        unsubscribe();
      });
    });
  } catch (error) {
    console.error('Error getting comment count:', error);
    return 0;
  }
};