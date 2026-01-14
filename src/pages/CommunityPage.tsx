import { useState, useRef, useEffect } from 'react';
import { FiThumbsUp, FiShare2, FiMessageCircle, FiSend, FiImage, FiLink2, FiMoreHorizontal } from 'react-icons/fi';
import { FaUserCircle, FaRegSmile, FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

const CommunityPage = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'John Doe',
      avatar: null,
      role: 'Senior UX Designer at Google',
      time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      content: 'Just landed an amazing job at Google! The interview process was tough but worth it. Happy to share my experience if anyone is interested. #career #google #hiring',
      likes: 24,
      comments: 8,
      shares: 3,
      isLiked: false,
      isBookmarked: false,
      image: null,
      tags: ['#career', '#google', '#hiring']
    },
    {
      id: 2,
      user: 'Sarah Wilson',
      avatar: null,
      role: 'Senior Developer at TechCorp',
      time: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      content: 'Looking for advice on negotiating salary for a senior developer position. The company is offering $120k but I was expecting closer to $140k. Any tips?',
      likes: 15,
      comments: 12,
      shares: 2,
      isLiked: true,
      isBookmarked: true,
      image: null,
      tags: ['#salary', '#careeradvice', '#negotiation']
    },
    {
      id: 3,
      user: 'Mike Chen',
      avatar: null,
      role: 'Engineering Manager at StartupX',
      time: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      content: 'Sharing a great resource I found for system design interviews. It helped me a lot in my recent interviews!',
      resource: {
        title: 'System Design Primer',
        url: 'https://github.com/donnemartin/system-design-primer',
        description: 'Learn how to design large-scale systems. Prep for the system design interview.'
      },
      likes: 42,
      comments: 5,
      shares: 18,
      isLiked: false,
      isBookmarked: false,
      image: 'https://miro.medium.com/max/1400/1*LJKoJmFd3U6tVoNxCFcdzA.png',
      tags: ['#systemdesign', '#interview', '#resources']
    },
  ]);

  const [newPost, setNewPost] = useState('');
  const [activeTab, setActiveTab] = useState('trending');
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [commentText, setCommentText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newPost]);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    
    const newPostObj = {
      id: posts.length + 1,
      user: 'You',
      avatar: null,
      time: 'Just now',
      content: newPost,
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
    };
    
    setPosts([newPostObj, ...posts]);
    setNewPost('');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const formatPostTime = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const toggleBookmark = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, isBookmarked: !post.isBookmarked };
      }
      return post;
    }));
  };

  const toggleExpandPost = (postId: number) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  const handleAddComment = (postId: number) => {
    if (!commentText.trim()) return;
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments + 1
        };
      }
      return post;
    }));
    
    setCommentText('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">Community Hub</h1>
          <p className="text-lg text-gray-600">Connect, share, and learn with professionals in your field</p>
        </motion.div>

        {/* Create Post */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-100"
        >
          <form onSubmit={handleSubmitPost}>
            <div className="p-5">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <FaUserCircle className="h-12 w-12 text-gray-300" />
                </div>
                <div className="flex-1">
                  <textarea
                    ref={textareaRef}
                    className="w-full border-0 text-gray-800 placeholder-gray-400 text-lg focus:ring-0 resize-none min-h-[60px] max-h-40 overflow-y-auto"
                    rows={1}
                    placeholder="What's on your mind?"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmitPost(e);
                      }
                    }}
                  />
                </div>
              </div>
              
              {/* Post actions */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  >
                    <FiImage className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  >
                    <FiLink2 className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  >
                    <FaRegSmile className="h-5 w-5" />
                  </button>
                </div>
                <button
                  type="submit"
                  className={`px-5 py-2 rounded-lg font-medium transition-all duration-200 ${
                    newPost.trim() 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!newPost.trim()}
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-1 mb-6 inline-flex border border-gray-200"
        >
          <div className="flex space-x-1">
            {['trending', 'recent', 'following'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-blue-50 text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Posts */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-5"
        >
          <AnimatePresence>
            {posts.map((post) => (
              <motion.div 
                key={post.id}
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300"
              >
                <div className="p-5">
                  {/* Post Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <FaUserCircle className={`h-12 w-12 ${post.id % 2 === 0 ? 'text-blue-500' : 'text-indigo-500'}`} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">{post.user}</h3>
                          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                            {post.role.split(' at ')[1]}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">{formatPostTime(post.time)} · <span className="text-blue-500">Follow</span></p>
                      </div>
                    </div>
                    <button 
                      onClick={() => toggleBookmark(post.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full"
                    >
                      {post.isBookmarked ? (
                        <FaBookmark className="h-5 w-5 text-yellow-400" />
                      ) : (
                        <FaRegBookmark className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {/* Post Content */}
                  <div 
                    className={`mt-4 text-gray-800 ${expandedPost === post.id ? '' : 'line-clamp-3'} transition-all duration-300`}
                    onClick={() => toggleExpandPost(post.id)}
                  >
                    {post.content.split(' ').map((word, i) => {
                      if (word.startsWith('#')) {
                        return <span key={i} className="text-blue-500 hover:underline cursor-pointer">{word} </span>;
                      }
                      return <span key={i}>{word} </span>;
                    })}
                  </div>

                  {/* Resource Card */}
                  {post.resource && (
                    <div className="mt-3 border border-gray-100 rounded-lg overflow-hidden">
                      <div className="p-4">
                        <h4 className="font-medium text-gray-900">{post.resource.title}</h4>
                        <p className="text-sm text-gray-500 mt-1">{post.resource.description}</p>
                        <div className="mt-2 text-xs text-blue-500">{new URL(post.resource.url).hostname.replace('www.', '')}</div>
                      </div>
                    </div>
                  )}

                  {/* Post Image */}
                  {post.image && (
                    <div className="mt-3 rounded-lg overflow-hidden">
                      <img 
                        src={post.image} 
                        alt="Post content" 
                        className="w-full h-auto rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                      />
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {post.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-gray-50 text-gray-600 px-2.5 py-1 rounded-full hover:bg-gray-100 cursor-pointer">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                        post.isLiked 
                          ? 'text-blue-500 bg-blue-50' 
                          : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <FiThumbsUp className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
                      <span className="text-sm font-medium">{post.likes}</span>
                    </button>
                    
                    <button 
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-gray-500 hover:bg-gray-50"
                      onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                    >
                      <FiMessageCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">{post.comments} comments</span>
                    </button>
                    
                    <button className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-gray-500 hover:bg-gray-50">
                      <FiShare2 className="h-5 w-5" />
                      <span className="text-sm font-medium">Share</span>
                    </button>
                  </div>

                  {/* Comment Section */}
                  {expandedPost === post.id && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-3 border-t border-gray-100"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <FaUserCircle className="h-8 w-8 text-gray-300" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center border border-gray-200 rounded-full px-4 py-2 bg-gray-50">
                            <input
                              type="text"
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              placeholder="Write a comment..."
                              className="w-full bg-transparent border-0 focus:ring-0 text-sm text-gray-800 placeholder-gray-400"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault();
                                  handleAddComment(post.id);
                                }
                              }}
                            />
                            <button 
                              type="button"
                              onClick={() => handleAddComment(post.id)}
                              className="ml-2 text-blue-500 hover:text-blue-600"
                            >
                              <FiSend className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityPage;
