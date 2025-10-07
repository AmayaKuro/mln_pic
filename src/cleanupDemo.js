// Cleanup script to remove demo data and prepare for Firebase
// Run this in browser console if you want to clear old demo data

export const cleanupDemoData = () => {
  try {
    // Remove demo comments from localStorage
    localStorage.removeItem('mln_demo_comments');
    console.log('Demo comments cleared from localStorage');
    
    // Keep the username for continuity
    const username = localStorage.getItem('mln_username');
    if (username) {
      console.log(`Keeping username: ${username}`);
    }
    
    console.log('Cleanup complete! Ready for Firebase real-time comments.');
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
};

// Auto-run cleanup when this module is imported
if (typeof window !== 'undefined') {
  cleanupDemoData();
}