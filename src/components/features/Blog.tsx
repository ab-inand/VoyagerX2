'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBookmark, FiShare2, FiHeart, FiMessageCircle, FiSearch } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
  likes: number;
  comments: number;
  isBookmarked?: boolean;
  isLiked?: boolean;
}

const articles: Article[] = [
  {
    id: '1',
    title: 'The Ultimate Guide to Paris',
    excerpt: 'Discover the hidden gems and must-visit spots in the City of Light.',
    content: '...',
    author: 'Sarah Johnson',
    date: '2024-03-15',
    category: 'Destinations',
    image: '/blog/paris.jpg',
    readTime: '8 min read',
    likes: 0,
    comments: 0,
    isBookmarked: false,
    isLiked: false
  },
  {
    id: '2',
    title: 'Travel Photography Tips',
    excerpt: 'Learn how to capture stunning travel photos with your smartphone.',
    content: '...',
    author: 'Mike Chen',
    date: '2024-03-14',
    category: 'Tips & Tricks',
    image: '/blog/photography.jpg',
    readTime: '6 min read',
    likes: 0,
    comments: 0,
    isBookmarked: false,
    isLiked: false
  },
  {
    id: '3',
    title: 'Sustainable Travel Guide',
    excerpt: 'How to travel responsibly and reduce your environmental impact.',
    content: '...',
    author: 'Emma Green',
    date: '2024-03-13',
    category: 'Sustainability',
    image: '/blog/sustainable.jpg',
    readTime: '7 min read',
    likes: 0,
    comments: 0,
    isBookmarked: false,
    isLiked: false
  },
  {
    id: '4',
    title: 'Best Street Food in Tokyo',
    excerpt: 'A foodie\'s guide to the most delicious street food in Tokyo.',
    content: '...',
    author: 'David Kim',
    date: '2024-03-12',
    category: 'Food & Drink',
    image: '/blog/tokyo-food.jpg',
    readTime: '5 min read',
    likes: 0,
    comments: 0,
    isBookmarked: false,
    isLiked: false
  },
  {
    id: '5',
    title: 'Wellness Retreats in Bali',
    excerpt: 'Find your inner peace at these luxurious wellness retreats.',
    content: '...',
    author: 'Sophie Chen',
    date: '2024-03-11',
    category: 'Wellness',
    image: '/blog/bali-wellness.jpg',
    readTime: '6 min read',
    likes: 0,
    comments: 0,
    isBookmarked: false,
    isLiked: false
  },
  {
    id: '6',
    title: 'Luxury Travel in Dubai',
    excerpt: 'Experience the epitome of luxury in the desert oasis.',
    content: '...',
    author: 'Ahmed Hassan',
    date: '2024-03-10',
    category: 'Luxury',
    image: '/blog/dubai-luxury.jpg',
    readTime: '7 min read',
    likes: 0,
    comments: 0,
    isBookmarked: false,
    isLiked: false
  },
  {
    id: '7',
    title: 'Broadway Shows Guide',
    excerpt: 'Your complete guide to experiencing Broadway in NYC.',
    content: '...',
    author: 'Jessica Smith',
    date: '2024-03-09',
    category: 'Entertainment',
    image: '/blog/nyc-broadway.jpg',
    readTime: '5 min read',
    likes: 0,
    comments: 0,
    isBookmarked: false,
    isLiked: false
  },
  {
    id: '8',
    title: 'Sydney Harbor Adventures',
    excerpt: 'Explore the iconic landmarks of Sydney Harbor.',
    content: '...',
    author: 'James Wilson',
    date: '2024-03-08',
    category: 'Destinations',
    image: '/blog/sydney-harbor.jpg',
    readTime: '6 min read',
    likes: 0,
    comments: 0,
    isBookmarked: false,
    isLiked: false
  },
  {
    id: '9',
    title: 'Mountain Hiking Guide',
    excerpt: 'Essential tips for your next mountain adventure.',
    content: '...',
    author: 'Alex Thompson',
    date: '2024-03-07',
    category: 'Adventure',
    image: '/blog/adventure-hiking.jpg',
    readTime: '8 min read',
    likes: 0,
    comments: 0,
    isBookmarked: false,
    isLiked: false
  },
  {
    id: '10',
    title: 'Asian Temple Architecture',
    excerpt: 'Discover the beauty of ancient temple designs.',
    content: '...',
    author: 'Ling Wei',
    date: '2024-03-06',
    category: 'Culture',
    image: '/blog/culture-temple.jpg',
    readTime: '7 min read',
    likes: 0,
    comments: 0,
    isBookmarked: false,
    isLiked: false
  },
  {
    id: '11',
    title: 'Tropical Beach Paradise',
    excerpt: 'Find your perfect beach getaway destination.',
    content: '...',
    author: 'Maria Garcia',
    date: '2024-03-05',
    category: 'Beach',
    image: '/blog/beach-paradise.jpg',
    readTime: '5 min read',
    likes: 0,
    comments: 0,
    isBookmarked: false,
    isLiked: false
  },
  {
    id: '12',
    title: 'Local Food Markets Guide',
    excerpt: 'Explore the world\'s best local food markets.',
    content: '...',
    author: 'Tom Anderson',
    date: '2024-03-04',
    category: 'Food & Drink',
    image: '/blog/food-markets.jpg',
    readTime: '6 min read',
    likes: 0,
    comments: 0,
    isBookmarked: false,
    isLiked: false
  }
];

const categories = [
  'All',
  'Destinations',
  'Tips & Tricks',
  'Sustainability',
  'Food & Drink',
  'Adventure',
  'Culture',
  'Wellness',
  'Luxury',
  'Entertainment',
  'Beach'
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'likes'>('date');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<{ id: string; text: string; author: string; date: string }[]>([]);
  
  const articlesPerPage = 6;
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const filteredArticles = articles
    .filter(article => 
      (selectedCategory === 'All' || article.category === selectedCategory) &&
      (searchQuery === '' || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'likes') {
        return b.likes - a.likes;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  const paginatedArticles = filteredArticles.slice(0, currentPage * articlesPerPage);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsLoading(false);
      }, 1000);
    }
  }, [isLoading, hasMore]);

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView, loadMore]);

  useEffect(() => {
    setHasMore(paginatedArticles.length < filteredArticles.length);
  }, [paginatedArticles.length, filteredArticles.length]);

  const handleLike = (articleId: string) => {
    const article = articles.find(a => a.id === articleId);
    if (article) {
      article.isLiked = !article.isLiked;
      article.likes += article.isLiked ? 1 : -1;
    }
  };

  const handleBookmark = (articleId: string) => {
    const article = articles.find(a => a.id === articleId);
    if (article) {
      article.isBookmarked = !article.isBookmarked;
    }
  };

  const handleShare = async (article: Article) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      setShowShareMenu(true);
    }
  };

  const handleComment = (articleId: string) => {
    if (commentText.trim()) {
      setComments(prev => [...prev, {
        id: Date.now().toString(),
        text: commentText,
        author: 'You',
        date: new Date().toLocaleDateString()
      }]);
      setCommentText('');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Travel Blog</h1>
          <p className="text-xl text-gray-300">
            Discover travel tips, guides, and stories from around the world
          </p>
        </div>

        {/* Search and Sort */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full bg-white/10 rounded-full pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <select
            className="bg-white/10 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'likes')}
          >
            <option value="date">Sort by Date</option>
            <option value="likes">Sort by Likes</option>
          </select>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                  : 'bg-white/10'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Featured Article */}
        {paginatedArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl overflow-hidden mb-12 cursor-pointer"
            onClick={() => setSelectedArticle(paginatedArticles[0])}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={paginatedArticles[0].image}
                  alt={paginatedArticles[0].title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-blue-400">{paginatedArticles[0].category}</span>
                  <span className="text-gray-400">{paginatedArticles[0].readTime}</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">{paginatedArticles[0].title}</h2>
                <p className="text-gray-300 mb-6">{paginatedArticles[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500" />
                    <span>{paginatedArticles[0].author}</span>
                  </div>
                  <span className="text-gray-400">{paginatedArticles[0].date}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedArticles.slice(1).map((article) => (
            <motion.div
              key={article.id}
              whileHover={{ scale: 1.02 }}
              className="glass rounded-xl overflow-hidden cursor-pointer"
              onClick={() => setSelectedArticle(article)}
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={article.image}
                  alt={article.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-blue-400">{article.category}</span>
                  <span className="text-gray-400">{article.readTime}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                <p className="text-gray-300 mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500" />
                    <span className="text-sm">{article.author}</span>
                  </div>
                  <span className="text-sm text-gray-400">{article.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Trigger */}
        {hasMore && (
          <div ref={ref} className="flex justify-center mt-12">
            {isLoading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
            ) : (
              <button
                className="px-6 py-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
                onClick={loadMore}
              >
                Load More
              </button>
            )}
          </div>
        )}
      </div>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-blue-400">{selectedArticle.category}</span>
                  <span className="text-gray-400">{selectedArticle.readTime}</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">{selectedArticle.title}</h2>
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500" />
                    <span>{selectedArticle.author}</span>
                  </div>
                  <span className="text-gray-400">{selectedArticle.date}</span>
                </div>

                {/* Interactive Features */}
                <div className="flex items-center gap-6 mb-8">
                  <button
                    className={`flex items-center gap-2 ${selectedArticle.isLiked ? 'text-red-500' : 'text-gray-400'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(selectedArticle.id);
                    }}
                  >
                    <FiHeart className="w-5 h-5" />
                    <span>{selectedArticle.likes}</span>
                  </button>
                  <button
                    className={`flex items-center gap-2 ${selectedArticle.isBookmarked ? 'text-blue-500' : 'text-gray-400'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmark(selectedArticle.id);
                    }}
                  >
                    <FiBookmark className="w-5 h-5" />
                  </button>
                  <button
                    className="flex items-center gap-2 text-gray-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(selectedArticle);
                    }}
                  >
                    <FiShare2 className="w-5 h-5" />
                  </button>
                  <button
                    className="flex items-center gap-2 text-gray-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowComments(!showComments);
                    }}
                  >
                    <FiMessageCircle className="w-5 h-5" />
                    <span>{selectedArticle.comments}</span>
                  </button>
                </div>

                <div className="prose prose-invert max-w-none">
                  {selectedArticle.content}
                </div>

                {/* Comments Section */}
                {showComments && (
                  <div className="mt-8 border-t border-gray-800 pt-8">
                    <h3 className="text-xl font-bold mb-4">Comments</h3>
                    <div className="space-y-4 mb-6">
                      {comments.map(comment => (
                        <div key={comment.id} className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-blue-500" />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{comment.author}</span>
                              <span className="text-sm text-gray-400">{comment.date}</span>
                            </div>
                            <p className="text-gray-300">{comment.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        className="flex-1 bg-white/10 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <button
                        className="px-6 py-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleComment(selectedArticle.id);
                        }}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Menu */}
      <AnimatePresence>
        {showShareMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setShowShareMenu(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4">Share Article</h3>
              <div className="space-y-4">
                <button className="w-full flex items-center gap-2 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <FiShare2 className="w-5 h-5" />
                  <span>Copy Link</span>
                </button>
                <button className="w-full flex items-center gap-2 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <FiShare2 className="w-5 h-5" />
                  <span>Share on Twitter</span>
                </button>
                <button className="w-full flex items-center gap-2 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <FiShare2 className="w-5 h-5" />
                  <span>Share on Facebook</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 