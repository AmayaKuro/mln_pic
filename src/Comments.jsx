import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, User, Clock } from 'lucide-react';

// Using real Firebase service for production
import { addComment, subscribeToComments, generateAnonymousUsername } from './commentService';

const Comments = ({ artworkId, artworkTitle }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(true);
  const commentsRef = useRef(null);

  // Auto-generate a new username on each page view
  useEffect(() => {
    const generatedUsername = generateAnonymousUsername();
    setUserName(generatedUsername);
  }, [artworkId]); // Regenerate when artwork changes

  // Subscribe to real-time comments
  useEffect(() => {
    if (!artworkId) return;

    console.log('Setting up real-time comments for artwork:', artworkId);
    setError(null);
    setIsConnected(true);

    const unsubscribe = subscribeToComments(artworkId, (newComments) => {
      console.log('Received comments update:', newComments.length);
      setComments(newComments);
      setIsConnected(true);
      setError(null);
    });

    // Connection error handling
    const handleConnectionError = () => {
      setIsConnected(false);
      setError('Connection lost. Comments may not be up to date.');
    };

    window.addEventListener('offline', handleConnectionError);

    return () => {
      unsubscribe();
      window.removeEventListener('offline', handleConnectionError);
    };
  }, [artworkId]);

  // Auto-scroll to bottom when new comments are added
  useEffect(() => {
    if (commentsRef.current) {
      commentsRef.current.scrollTop = commentsRef.current.scrollHeight;
    }
  }, [comments]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim() || !userName.trim()) return;

    setIsSubmitting(true);
    setError(null);
    
    try {
      console.log('Submitting comment for artwork:', artworkId);
      await addComment(artworkId, newComment.trim(), userName.trim());
      setNewComment('');
      console.log('Comment submitted successfully');
    } catch (error) {
      console.error('Failed to add comment:', error);
      setError(`Failed to add comment: ${error.message}`);
      
      // Auto-clear error after 5 seconds
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUserName(newUsername);
    // Remove localStorage saving since we want fresh names each time
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Just now';
    
    let date;
    if (timestamp.toDate) {
      // Firestore timestamp
      date = timestamp.toDate();
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else {
      // ISO string fallback
      date = new Date(timestamp);
    }
    
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="backdrop-blur-md bg-gradient-to-br from-white/10 to-gray-600/10 rounded-2xl sm:rounded-3xl border border-white/15 shadow-xl hover:bg-gradient-to-br hover:from-white/15 hover:to-gray-600/15 transition-all duration-500">
      {/* Header - Always visible, no click functionality */}
      <div className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors duration-300 rounded-t-2xl sm:rounded-t-3xl">
        <div className="flex items-center space-x-3">
          <MessageCircle className="w-5 h-5 text-white" />
          <h3 className="text-xl font-bold text-white">Comments</h3>
          <span className="bg-white/20 text-white px-2 py-1 rounded-full text-sm">
            {comments.length}
          </span>
          {/* Connection status indicator */}
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} 
               title={isConnected ? 'Connected' : 'Disconnected'} />
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mx-6 mb-4 p-3 bg-red-500/20 border border-red-400/30 rounded-lg text-red-200 text-sm">
          {error}
        </div>
      )}

      {/* Comments Content - Always visible */}
      <div className="px-6 pb-6">
          {/* Comments List */}
          <div 
            ref={commentsRef}
            className="space-y-4 max-h-64 overflow-y-auto mb-6 pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
          >
            {comments.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No comments yet. Be the first to share your thoughts!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <div 
                  key={comment.id}
                  className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors duration-300 border border-white/10"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gradient-to-br from-white/20 to-gray-300/20 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-white">
                          {comment.userName}
                        </span>
                        <div className="flex items-center space-x-1 text-gray-400">
                          <Clock className="w-3 h-3" />
                          <span className="text-xs">
                            {formatTimestamp(comment.timestamp || comment.createdAt)}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-200 text-sm leading-relaxed">
                        {comment.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Comment Form */}
          <form onSubmit={handleSubmitComment} className="space-y-4">
            {/* Username Input - Separated and styled */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2">
                Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={handleUsernameChange}
                placeholder="Enter your name"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300 text-sm"
                maxLength={50}
              />
            </div>

            {/* Comment Input - Maximized */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Comment
              </label>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={`Share your thoughts about "${artworkTitle}"...`}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300 resize-none text-sm leading-relaxed"
                rows="6"
                maxLength={500}
                disabled={isSubmitting}
              />
              
              {/* Character count */}
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-400">
                  {newComment.length}/500 characters
                </span>
                <button
                  type="submit"
                  disabled={!newComment.trim() || !userName.trim() || isSubmitting}
                  className="bg-gradient-to-r from-white/20 to-gray-300/20 hover:from-white/30 hover:to-gray-300/30 disabled:from-gray-500/20 disabled:to-gray-600/20 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105 disabled:hover:scale-100 flex items-center space-x-2 text-sm font-medium"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Posting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Post Comment</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
    </div>
  );
};

export default Comments;