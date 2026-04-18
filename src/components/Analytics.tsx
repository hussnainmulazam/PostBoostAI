import { Button } from "./ui/button";
import { ArrowLeft, Download, TrendingUp, Clock, Target, Zap, Calendar, Brain } from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface AnalyticsProps {
  onNavigate: (page: string) => void;
}

const productivityData = [
  { name: 'Week 1', tasks: 24, content: 12, meetings: 8 },
  { name: 'Week 2', tasks: 28, content: 15, meetings: 10 },
  { name: 'Week 3', tasks: 22, content: 18, meetings: 7 },
  { name: 'Week 4', tasks: 32, content: 20, meetings: 12 },
];

const timeData = [
  { name: 'Mon', hours: 6.5 },
  { name: 'Tue', hours: 7.2 },
  { name: 'Wed', hours: 5.8 },
  { name: 'Thu', hours: 8.1 },
  { name: 'Fri', hours: 6.9 },
  { name: 'Sat', hours: 3.2 },
  { name: 'Sun', hours: 2.5 },
];

const categoryData = [
  { name: 'Content Creation', value: 35, color: '#00F5FF' },
  { name: 'Task Management', value: 28, color: '#3B82F6' },
  { name: 'Meetings', value: 18, color: '#C084FC' },
  { name: 'Research', value: 12, color: '#80FFEA' },
  { name: 'Other', value: 7, color: '#9CA3AF' },
];

export function Analytics({ onNavigate }: AnalyticsProps) {
  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900">
      <div className="w-full">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => onNavigate('dashboard')}
                className="rounded-xl p-2 hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl mb-1 text-gray-900 font-semibold">Analytics & Reports</h1>
                <p className="text-xs sm:text-sm text-gray-500">Track your productivity and insights</p>
              </div>
            </div>
            <div className="hidden sm:flex gap-3">
              <Button variant="outline" className="border-gray-200 bg-white text-gray-700 hover:bg-gray-50">
                <Calendar className="w-4 h-4 mr-2" />
                Last 30 Days
              </Button>
              <Button className="bg-gradient-to-r from-[#00F5FF] to-[#3B82F6] text-white hover:opacity-90">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="w-full p-4 sm:p-6 lg:p-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { 
                icon: Target, 
                label: "Tasks Completed", 
                value: "156", 
                change: "+23%",
                trend: "up",
                color: "#00F5FF" 
              },
              { 
                icon: Clock, 
                label: "Total Time", 
                value: "87.5h", 
                change: "+12%",
                trend: "up",
                color: "#3B82F6" 
              },
              { 
                icon: Zap, 
                label: "AI Sessions", 
                value: "342", 
                change: "+18%",
                trend: "up",
                color: "#C084FC" 
              },
              { 
                icon: TrendingUp, 
                label: "Efficiency", 
                value: "94%", 
                change: "+7%",
                trend: "up",
                color: "#80FFEA" 
              },
            ].map((metric, idx) => (
              <div key={idx} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${metric.color}20, ${metric.color}10)` }}
                  >
                    <metric.icon className="w-6 h-6" style={{ color: metric.color }} />
                  </div>
                  <div className="flex items-center gap-1 text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <TrendingUp className="w-3 h-3" />
                    <span>{metric.change}</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
                <div className="text-sm text-gray-500">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Charts Row 1 */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Productivity Trends */}
            <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-1 text-gray-900">Productivity Trends</h2>
                <p className="text-sm text-gray-500">Weekly breakdown by category</p>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={productivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      background: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="tasks" fill="#00F5FF" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="content" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="meetings" fill="#C084FC" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Activity Distribution */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-1 text-gray-900">Activity Distribution</h2>
                <p className="text-sm text-gray-500">Time by category</p>
              </div>
              <div className="flex items-center justify-center mb-6">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {categoryData.map((cat, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="text-gray-700">{cat.name}</span>
                    </div>
                    <span className="font-medium text-gray-900">{cat.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Time Tracking */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-1 text-gray-900">Time Tracking</h2>
                <p className="text-sm text-gray-500">Daily working hours</p>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={timeData}>
                  <defs>
                    <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C084FC" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#C084FC" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      background: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="hours" 
                    stroke="#C084FC" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorTime)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* AI Usage Stats */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-1 text-gray-900">AI Usage Statistics</h2>
                <p className="text-sm text-gray-500">Sessions by AI agent</p>
              </div>
              <div className="space-y-4">
                {[
                  { name: "Content Agent", sessions: 124, percentage: 85, color: "#00F5FF" },
                  { name: "Task Agent", sessions: 98, percentage: 72, color: "#3B82F6" },
                  { name: "Resume Agent", sessions: 67, percentage: 58, color: "#C084FC" },
                  { name: "Social Agent", sessions: 53, percentage: 45, color: "#80FFEA" },
                ].map((agent, idx) => (
                  <div key={idx} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Brain className="w-5 h-5" style={{ color: agent.color }} />
                        <span className="font-medium text-gray-900">{agent.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">{agent.sessions} sessions</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${agent.percentage}%`,
                          background: `linear-gradient(90deg, ${agent.color}, ${agent.color}80)`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Insights Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 border-l-4 border-[#00F5FF] shadow-sm">
              <h3 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
                <TrendingUp className="w-5 h-5 text-[#00F5FF]" />
                Peak Productivity
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Your most productive hours are between 9 AM - 12 PM on Thursdays
              </p>
              <Button variant="ghost" size="sm" className="text-[#00F5FF] hover:bg-[#00F5FF]/10 hover:text-[#00F5FF]">
                View Details
              </Button>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 border-l-4 border-[#C084FC] shadow-sm">
              <h3 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
                <Target className="w-5 h-5 text-[#C084FC]" />
                Goal Progress
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                You're 78% toward your monthly goal of 200 completed tasks
              </p>
              <Button variant="ghost" size="sm" className="text-[#C084FC] hover:bg-[#C084FC]/10 hover:text-[#C084FC]">
                Adjust Goals
              </Button>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 border-l-4 border-[#80FFEA] shadow-sm">
              <h3 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
                <Zap className="w-5 h-5 text-[#80FFEA]" />
                AI Recommendations
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Consider automating 3 recurring tasks to save 4.5 hours per week
              </p>
              <Button variant="ghost" size="sm" className="text-teal-600 hover:bg-teal-50 hover:text-teal-700">
                See Suggestions
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
