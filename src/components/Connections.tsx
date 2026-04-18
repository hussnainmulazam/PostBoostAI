import { Button } from "./ui/button";
import { 
  CheckCircle, AlertCircle, RefreshCw, Link2, ExternalLink, Plus
} from "lucide-react";
import { 
  SiInstagram, SiTiktok, SiX, SiLinkedin, SiYoutube, SiFacebook, SiPinterest, SiThreads 
} from "react-icons/si";
import { useState } from "react";
import { motion } from "framer-motion";

interface ConnectionsProps {
  onNavigate: (page: string) => void;
}

const platforms = [
  { 
    id: "instagram", 
    name: "Instagram", 
    icon: SiInstagram, 
    color: "#E4405F", 
    status: "connected", 
    username: "@postboost_app",
    lastSync: "2 mins ago"
  },
  { 
    id: "linkedin", 
    name: "LinkedIn", 
    icon: SiLinkedin, 
    color: "#0A66C2", 
    status: "connected", 
    username: "PostBoost Inc.",
    lastSync: "1 hour ago"
  },
  { 
    id: "twitter", 
    name: "X (Twitter)", 
    icon: SiX, 
    color: "#000000", 
    status: "disconnected", 
    username: "",
    lastSync: "-"
  },
  { 
    id: "tiktok", 
    name: "TikTok", 
    icon: SiTiktok, 
    color: "#000000", 
    status: "disconnected", 
    username: "",
    lastSync: "-"
  },
  { 
    id: "facebook", 
    name: "Facebook", 
    icon: SiFacebook, 
    color: "#1877F2", 
    status: "connected", 
    username: "PostBoost Official",
    lastSync: "5 mins ago"
  },
  { 
    id: "youtube", 
    name: "YouTube", 
    icon: SiYoutube, 
    color: "#FF0000", 
    status: "disconnected", 
    username: "",
    lastSync: "-"
  },
];

export function Connections({ onNavigate }: ConnectionsProps) {
  const [connectingId, setConnectingId] = useState<string | null>(null);

  const handleConnect = (id: string) => {
    setConnectingId(id);
    setTimeout(() => {
      setConnectingId(null);
    }, 2000);
  };

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Connections</h1>
          <p className="text-sm text-gray-500">Manage your social media integrations</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Add New Platform
        </Button>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform, idx) => (
          <motion.div
            key={platform.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-6">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${platform.color}10` }}
              >
                <platform.icon className="w-6 h-6" style={{ color: platform.color }} />
              </div>
              <div className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${
                platform.status === 'connected' 
                  ? 'bg-green-50 text-green-700 border border-green-100' 
                  : 'bg-gray-50 text-gray-600 border border-gray-100'
              }`}>
                {platform.status === 'connected' ? (
                  <>
                    <CheckCircle className="w-3 h-3" />
                    Connected
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-3 h-3" />
                    Disconnected
                  </>
                )}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 text-lg mb-1">{platform.name}</h3>
              {platform.status === 'connected' ? (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Link2 className="w-3 h-3" />
                  {platform.username}
                </div>
              ) : (
                <p className="text-sm text-gray-500">Connect to start posting</p>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="text-xs text-gray-400">
                {platform.status === 'connected' ? `Synced ${platform.lastSync}` : 'Not synced'}
              </div>
              <Button 
                variant={platform.status === 'connected' ? "outline" : "default"}
                size="sm"
                onClick={() => handleConnect(platform.id)}
                className={platform.status === 'connected' 
                  ? "border-gray-200 text-gray-700 hover:bg-gray-50"
                  : "bg-gray-900 text-white hover:bg-gray-800"
                }
                disabled={connectingId === platform.id}
              >
                {connectingId === platform.id ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : platform.status === 'connected' ? (
                  "Manage"
                ) : (
                  "Connect"
                )}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Help Section */}
      <div className="mt-12 rounded-2xl border border-blue-100 bg-blue-50/50 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-1">Need help connecting?</h3>
            <p className="text-blue-700 text-sm">Read our documentation on how to set up API keys and permissions.</p>
          </div>
          <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-100 bg-white">
            View Documentation
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
