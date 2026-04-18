import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { ArrowLeft, Bell, Brain, CheckCircle, AlertCircle, Info, User, Calendar, FileText } from "lucide-react";

interface NotificationsProps {
  onNavigate: (page: string) => void;
}

const notifications = [
  { 
    id: 1, 
    type: "ai", 
    title: "Content generated successfully", 
    message: "Your blog post 'AI Trends 2025' is ready", 
    time: "2 min ago",
    read: false,
    icon: Brain,
    color: "#00F5FF"
  },
  { 
    id: 2, 
    type: "system", 
    title: "System update completed", 
    message: "New features are now available", 
    time: "15 min ago",
    read: false,
    icon: CheckCircle,
    color: "#00FF00"
  },
  { 
    id: 3, 
    type: "user", 
    title: "Profile updated", 
    message: "Your resume has been updated successfully", 
    time: "1 hour ago",
    read: true,
    icon: User,
    color: "#C084FC"
  },
  { 
    id: 4, 
    type: "ai", 
    title: "Task reminder", 
    message: "You have 3 pending tasks due today", 
    time: "2 hours ago",
    read: true,
    icon: Calendar,
    color: "#3B82F6"
  },
  { 
    id: 5, 
    type: "system", 
    title: "Backup completed", 
    message: "Your data has been backed up", 
    time: "5 hours ago",
    read: true,
    icon: CheckCircle,
    color: "#00FF00"
  },
  { 
    id: 6, 
    type: "ai", 
    title: "Content suggestion", 
    message: "Based on trends, consider writing about 'AI Ethics'", 
    time: "Yesterday",
    read: true,
    icon: FileText,
    color: "#00F5FF"
  },
];

const logs = [
  { time: "10:45 AM", event: "User logged in", status: "success", details: "Login from Chrome on Mac" },
  { time: "10:32 AM", event: "Content generated", status: "success", details: "Blog post created" },
  { time: "10:15 AM", event: "Task completed", status: "success", details: "Review PR #234" },
  { time: "09:58 AM", event: "API rate limit warning", status: "warning", details: "80% of daily quota used" },
  { time: "09:30 AM", event: "Session started", status: "info", details: "AI Agent initialized" },
  { time: "09:15 AM", event: "Profile updated", status: "success", details: "Resume section modified" },
];

export function Notifications({ onNavigate }: NotificationsProps) {
  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="rounded-xl p-2 hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Notifications & Logs</h1>
            <p className="text-sm text-gray-500">Stay updated with your activity</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Live Updates</span>
          <Switch defaultChecked className="data-[state=checked]:bg-[#00F5FF]" />
        </div>
      </div>

      {/* Content */}
      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <TabsList className="bg-gray-100 p-1 rounded-xl flex-wrap h-auto">
            <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-500">
              All Notifications
            </TabsTrigger>
            <TabsTrigger value="ai" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-500">
              AI
            </TabsTrigger>
            <TabsTrigger value="system" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-500">
              System
            </TabsTrigger>
            <TabsTrigger value="user" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-500">
              User
            </TabsTrigger>
            <TabsTrigger value="logs" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-500">
              Activity Logs
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-50">
              Mark All Read
            </Button>
            <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-50">
              Clear All
            </Button>
          </div>
        </div>

        {/* All Notifications */}
        <TabsContent value="all" className="space-y-3">
          {notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`rounded-2xl border border-gray-200 bg-white p-5 hover:shadow-md transition-all cursor-pointer ${
                !notif.read ? 'ring-1 ring-[#00F5FF]/30 bg-blue-50/30' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${notif.color}20, ${notif.color}10)` }}
                >
                  <notif.icon className="w-6 h-6" style={{ color: notif.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="flex items-center gap-2 font-medium text-gray-900">
                      {notif.title}
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-[#00F5FF]" />
                      )}
                    </h3>
                    <span className="text-sm text-gray-500">{notif.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{notif.message}</p>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>

        {/* AI Notifications */}
        <TabsContent value="ai" className="space-y-3">
          {notifications.filter(n => n.type === 'ai').map((notif) => (
            <div 
              key={notif.id} 
              className="rounded-2xl border border-gray-200 bg-white p-5 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${notif.color}20, ${notif.color}10)` }}
                >
                  <notif.icon className="w-6 h-6" style={{ color: notif.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-medium text-gray-900">{notif.title}</h3>
                    <span className="text-sm text-gray-500">{notif.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{notif.message}</p>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>

        {/* System Notifications */}
        <TabsContent value="system" className="space-y-3">
          {notifications.filter(n => n.type === 'system').map((notif) => (
            <div 
              key={notif.id} 
              className="rounded-2xl border border-gray-200 bg-white p-5 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${notif.color}20, ${notif.color}10)` }}
                >
                  <notif.icon className="w-6 h-6" style={{ color: notif.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-medium text-gray-900">{notif.title}</h3>
                    <span className="text-sm text-gray-500">{notif.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{notif.message}</p>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>

        {/* User Notifications */}
        <TabsContent value="user" className="space-y-3">
          {notifications.filter(n => n.type === 'user').map((notif) => (
            <div 
              key={notif.id} 
              className="rounded-2xl border border-gray-200 bg-white p-5 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${notif.color}20, ${notif.color}10)` }}
                >
                  <notif.icon className="w-6 h-6" style={{ color: notif.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-medium text-gray-900">{notif.title}</h3>
                    <span className="text-sm text-gray-500">{notif.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{notif.message}</p>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>

        {/* Activity Logs */}
        <TabsContent value="logs" className="space-y-0">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="space-y-6">
              {logs.map((log, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${
                      log.status === 'success' ? 'bg-green-500' :
                      log.status === 'warning' ? 'bg-yellow-500' :
                      log.status === 'error' ? 'bg-red-500' :
                      'bg-blue-500'
                    }`} />
                    {idx < logs.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-200 my-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-900">{log.event}</h3>
                      <span className="text-xs text-gray-500">{log.time}</span>
                    </div>
                    <p className="text-sm text-gray-500">{log.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
