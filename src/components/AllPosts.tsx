import { useMemo, useState } from "react";
import { 
  Search, Filter, MoreHorizontal, Calendar, 
  MapPin, Heart, MessageCircle, Share2, 
  Edit3, Trash2, ExternalLink
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { motion, AnimatePresence } from "framer-motion";

interface Post {
  id: string;
  title: string;
  content: string;
  platform: 'instagram' | 'twitter' | 'linkedin' | 'facebook';
  status: 'published' | 'scheduled' | 'draft';
  date: string;
  image?: string;
  stats?: {
    likes: number;
    comments: number;
    shares: number;
  };
}

const MOCK_POSTS: Post[] = [
  {
    id: "1",
    title: "Future of AI in Education",
    content: "🚀 Transforming the future of education with Artificial Intelligence! Imagine a classroom where every student gets a personalized tutor. #EdTech #AI",
    platform: "linkedin",
    status: "published",
    date: "2024-03-10",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=60",
    stats: { likes: 124, comments: 45, shares: 12 }
  },
  {
    id: "2",
    title: "Eco-Friendly Living Tips",
    content: "Small changes make a big impact! 🌿 Here are 5 easy ways to reduce your carbon footprint starting today. Swipe to learn more! 👉 #Sustainability #GreenLiving",
    platform: "instagram",
    status: "scheduled",
    date: "2024-03-15",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "3",
    title: "Tech Startup Launch",
    content: "We are thrilled to announce our beta launch! Join us on this journey to redefine productivity. Link in bio! 💻✨",
    platform: "twitter",
    status: "draft",
    date: "2024-03-20",
  },
  {
    id: "4",
    title: "Monday Motivation",
    content: "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill 💪 #MondayMotivation",
    platform: "facebook",
    status: "published",
    date: "2024-03-08",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60",
    stats: { likes: 89, comments: 12, shares: 5 }
  },
  {
    id: "5",
    title: "Behind the Scenes",
    content: "A quick look at our team brainstorming session today! Great ideas coming your way soon. 💡",
    platform: "instagram",
    status: "published",
    date: "2024-03-05",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=60",
    stats: { likes: 256, comments: 34, shares: 0 }
  }
];

export function AllPosts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPlatform, setFilterPlatform] = useState<string>("all");

  const platformColors = {
    instagram: "bg-pink-100 text-pink-700",
    twitter: "bg-blue-100 text-blue-700",
    linkedin: "bg-blue-900/10 text-blue-900",
    facebook: "bg-blue-600/10 text-blue-600"
  };

  const statusColors = {
    published: "bg-green-100 text-green-700 border-green-200",
    scheduled: "bg-yellow-100 text-yellow-700 border-yellow-200",
    draft: "bg-gray-100 text-gray-700 border-gray-200"
  };

  const filteredPosts = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase();
    return MOCK_POSTS.filter(post => {
      const matchesSearch =
        post.title.toLowerCase().includes(normalizedSearch) ||
        post.content.toLowerCase().includes(normalizedSearch);
      const matchesStatus = filterStatus === "all" || post.status === filterStatus;
      const matchesPlatform = filterPlatform === "all" || post.platform === filterPlatform;
      return matchesSearch && matchesStatus && matchesPlatform;
    });
  }, [searchTerm, filterStatus, filterPlatform]);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-display">All Posts</h1>
          <p className="text-gray-500">Manage and oversee all your social media content.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20">
          <Edit3 className="w-4 h-4 mr-2" />
          Create New Post
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search posts..." 
            className="pl-10 h-10 bg-gray-50 border-gray-200 focus:bg-white transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <select 
            className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="scheduled">Scheduled</option>
            <option value="draft">Draft</option>
          </select>

          <select 
            className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value)}
          >
            <option value="all">All Platforms</option>
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter</option>
            <option value="linkedin">LinkedIn</option>
            <option value="facebook">Facebook</option>
          </select>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              layout
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden group flex flex-col h-full"
            >
              {/* Image Header */}
              {post.image && (
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-4 right-4">
                     <Badge className={`capitalize shadow-sm ${platformColors[post.platform]}`}>
                      {post.platform}
                    </Badge>
                  </div>
                </div>
              )}
              
              {!post.image && (
                 <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500" />
              )}

              <div className="p-5 flex-1 flex flex-col">
                {/* Header info if no image */}
                {!post.image && (
                   <div className="flex justify-between items-start mb-4">
                     <Badge className={`capitalize ${platformColors[post.platform]}`}>
                        {post.platform}
                      </Badge>
                   </div>
                )}

                <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{post.title}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-3 flex-1">{post.content}</p>
                
                {/* Stats Row */}
                {post.status === 'published' && post.stats && (
                  <div className="flex items-center gap-4 py-3 border-t border-gray-100 mb-3">
                    <div className="flex items-center text-gray-400 text-xs font-medium">
                      <Heart className="w-3.5 h-3.5 mr-1" />
                      {post.stats.likes}
                    </div>
                    <div className="flex items-center text-gray-400 text-xs font-medium">
                      <MessageCircle className="w-3.5 h-3.5 mr-1" />
                      {post.stats.comments}
                    </div>
                     <div className="flex items-center text-gray-400 text-xs font-medium">
                      <Share2 className="w-3.5 h-3.5 mr-1" />
                      {post.stats.shares}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 mt-auto border-t border-gray-50">
                   <Badge variant="outline" className={statusColors[post.status]}>
                    {post.status}
                  </Badge>
                  <span className="text-xs text-gray-400 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {post.date}
                  </span>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600">
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-green-600">
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-red-500">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No posts found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
