import { useMemo, useState } from "react";
import { 
  Calendar, Clock, MoreHorizontal, Filter, Search,
  Instagram, Twitter, Linkedin, Facebook, Edit3, Trash2
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { motion } from "framer-motion";

interface ScheduledPost {
  id: string;
  title: string;
  platform: 'instagram' | 'twitter' | 'linkedin' | 'facebook';
  date: string; // ISO String
  content: string;
  thumbnail?: string;
}

const MOCK_SCHEDULED_POSTS: ScheduledPost[] = [
  {
    id: "1",
    title: "Product Launch Announcement",
    platform: "instagram",
    date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    content: "Something big is coming... 🚀 #Launch #NewProduct",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "Weekly Insights",
    platform: "linkedin",
    date: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
    content: "Here are 5 trends reshaping the industry in 2024. Read the full article below! 👇",
  },
  {
    id: "3",
    title: "Community Poll",
    platform: "twitter",
    date: new Date(Date.now() + 259200000).toISOString(), // 3 days later
    content: "What features do you value most? Vote now!",
  },
  {
    id: "4",
    title: "Behind The Scenes",
    platform: "facebook",
    date: new Date(Date.now() + 345600000).toISOString(), // 4 days later
    content: "Meet the team making magic happen! ✨",
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60"
  }
];

const platformConfig = {
  instagram: { icon: Instagram, color: "text-pink-600", bg: "bg-pink-100" },
  twitter: { icon: Twitter, color: "text-blue-400", bg: "bg-blue-100" },
  linkedin: { icon: Linkedin, color: "text-blue-700", bg: "bg-blue-100" },
  facebook: { icon: Facebook, color: "text-blue-600", bg: "bg-blue-100" }
};

interface SocialAgentProps {
  onNavigate?: (page: string) => void;
}

export function SocialAgent({ onNavigate }: SocialAgentProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPlatform, setFilterPlatform] = useState<string>("all");

  const filteredPosts = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase();
    return MOCK_SCHEDULED_POSTS.filter(post => {
      const matchesSearch =
        post.title.toLowerCase().includes(normalizedSearch) ||
        post.content.toLowerCase().includes(normalizedSearch);
      const matchesPlatform = filterPlatform === "all" || post.platform === filterPlatform;
      return matchesSearch && matchesPlatform;
    });
  }, [searchTerm, filterPlatform]);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-display">Scheduled Posts</h1>
          <p className="text-gray-500 mt-1">Manage your upcoming content calendar.</p>
        </div>
        
        {/* Stats */}
        <div className="flex gap-4">
          <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
             <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Scheduled</div>
             <div className="text-2xl font-bold text-gray-900">{MOCK_SCHEDULED_POSTS.length}</div>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
             <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Next Post</div>
             <div className="text-sm font-semibold text-blue-600 mt-1">
               {new Date(MOCK_SCHEDULED_POSTS[0].date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
             </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Search scheduled posts..." 
            className="pl-10 h-10 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          <Button 
            variant={filterPlatform === 'all' ? 'default' : 'outline'}
            onClick={() => setFilterPlatform('all')}
            className="rounded-full"
          >
            All
          </Button>
          {Object.keys(platformConfig).map(p => (
            <Button
              key={p}
              variant={filterPlatform === p ? 'default' : 'outline'}
              onClick={() => setFilterPlatform(p)}
              className="capitalize rounded-full"
            >
              {p}
            </Button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => {
          const PlatformIcon = platformConfig[post.platform].icon;
          const dateObj = new Date(post.date);
          
          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden group flex flex-col"
            >
              {/* Header / Thumbnail */}
              <div className="relative h-40 bg-gray-50 border-b border-gray-100 flex items-center justify-center overflow-hidden">
                {post.thumbnail ? (
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <PlatformIcon className={`w-12 h-12 ${platformConfig[post.platform].color} opacity-20`} />
                )}
                
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white/90 text-gray-700 backdrop-blur-sm shadow-sm hover:bg-white">
                    <Clock className="w-3 h-3 mr-1" />
                    {dateObj.toLocaleDateString()}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`p-1.5 rounded-full ${platformConfig[post.platform].bg}`}>
                    <PlatformIcon className={`w-3.5 h-3.5 ${platformConfig[post.platform].color}`} />
                  </div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{post.platform}</span>
                </div>

                <h3 className="font-bold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{post.content}</p>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                   <div className="text-sm font-medium text-gray-900 flex items-center">
                     <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                     {dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                   </div>
                   
                   <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-blue-600">
                       <Edit3 className="w-4 h-4" />
                     </Button>
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-600">
                       <Trash2 className="w-4 h-4" />
                     </Button>
                   </div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {filteredPosts.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No scheduled posts found</h3>
            <p className="text-gray-500">Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
