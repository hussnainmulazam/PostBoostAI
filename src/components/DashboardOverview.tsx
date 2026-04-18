import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart as ReBarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { Brain, Calendar, Download, Target, TrendingUp, Zap } from "lucide-react";
import { Button } from "./ui/button";

const weeklyActivityData = [
  { name: "Mon", sessions: 45, tasks: 12, content: 8, chats: 15 },
  { name: "Tue", sessions: 52, tasks: 18, content: 10, chats: 22 },
  { name: "Wed", sessions: 48, tasks: 15, content: 7, chats: 19 },
  { name: "Thu", sessions: 65, tasks: 22, content: 14, chats: 28 },
  { name: "Fri", sessions: 58, tasks: 19, content: 11, chats: 25 },
  { name: "Sat", sessions: 70, tasks: 8, content: 5, chats: 12 },
  { name: "Sun", sessions: 62, tasks: 6, content: 4, chats: 10 },
];

const agentUsageData = [
  { name: "Content Agent", sessions: 124, percentage: 35, color: "#00F5FF" },
  { name: "Social Agent", sessions: 53, percentage: 15, color: "#80FFEA" },
  { name: "Chat Assistant", sessions: 12, percentage: 3, color: "#9CA3AF" },
];

const productivityData = [
  { name: "Week 1", tasks: 24, content: 12, meetings: 8 },
  { name: "Week 2", tasks: 28, content: 15, meetings: 10 },
  { name: "Week 3", tasks: 22, content: 18, meetings: 7 },
  { name: "Week 4", tasks: 32, content: 20, meetings: 12 },
];

const timeData = [
  { name: "Mon", hours: 6.5 },
  { name: "Tue", hours: 7.2 },
  { name: "Wed", hours: 5.8 },
  { name: "Thu", hours: 8.1 },
  { name: "Fri", hours: 6.9 },
  { name: "Sat", hours: 3.2 },
  { name: "Sun", hours: 2.5 },
];

const StatCard = ({ icon: Icon, label, value, change, color, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="group rounded-2xl border border-gray-200 bg-white/60 backdrop-blur-sm p-6 shadow-sm transition-all hover:shadow-md hover:border-gray-300 hover:bg-white/80"
  >
    <div className="mb-4 flex items-start justify-between">
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
        style={{ background: `linear-gradient(135deg, ${color}20, ${color}10)` }}
      >
        <Icon className="h-6 w-6" style={{ color }} />
      </div>
      <div className="flex items-center gap-1 text-xs font-medium" style={{ color }}>
        <TrendingUp className="h-3 w-3" />
        <span>{change}</span>
      </div>
    </div>
    <div className="mb-1 text-3xl font-bold text-gray-900">{value}</div>
    <div className="text-sm text-gray-500">{label}</div>
  </motion.div>
);

export function DashboardOverview() {
  const [dateRange, setDateRange] = useState<string>("7d");

  const statsData = useMemo(
    () => [
      { icon: Brain, label: "AI Sessions", value: "247", change: "+12%", color: "#00F5FF" },
      { icon: Target, label: "Tasks Completed", value: "89", change: "+8%", color: "#3B82F6" },
      { icon: Calendar, label: "Posts Generated", value: "34", change: "+23%", color: "#C084FC" },
      { icon: TrendingUp, label: "Productivity", value: "94%", change: "+5%", color: "#80FFEA" },
    ],
    [],
  );

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900 font-display">Welcome back, John! 👋</h1>
          <p className="text-gray-500">Here's what's happening with your AI workspace today</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-gray-200 bg-white text-gray-700 hover:bg-gray-50">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 Days
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 border-0">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statsData.map((stat, idx) => (
          <StatCard key={idx} {...stat} delay={idx * 0.1} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white/60 backdrop-blur-sm p-6 shadow-sm">
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="mb-1 text-xl font-semibold text-gray-900">Weekly Activity</h2>
              <p className="text-sm text-gray-500">AI sessions and productivity breakdown</p>
            </div>
            <Button
              variant="outline"
              className="text-xs sm:text-sm w-full sm:w-auto border-gray-200 text-gray-700 hover:bg-gray-50"
              onClick={() => setDateRange(dateRange === "7d" ? "30d" : "7d")}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {dateRange === "7d" ? "Last 7 Days" : "Last 30 Days"}
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <ReBarChart data={weeklyActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend wrapperStyle={{ color: "#374151" }} />
              <Bar dataKey="sessions" fill="#00F5FF" radius={[4, 4, 0, 0]} />
              <Bar dataKey="tasks" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="content" fill="#C084FC" radius={[4, 4, 0, 0]} />
              <Bar dataKey="chats" fill="#80FFEA" radius={[4, 4, 0, 0]} />
            </ReBarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white/60 backdrop-blur-sm p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="mb-1 text-xl font-semibold text-gray-900">Agent Usage</h2>
            <p className="text-sm text-gray-500">Sessions by agent type</p>
          </div>
          <div className="flex items-center justify-center mb-6">
            <ResponsiveContainer width="100%" height={200}>
              <RePieChart>
                <Pie data={agentUsageData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="sessions">
                  {agentUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-gray-200 bg-white/60 backdrop-blur-sm p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl mb-1 font-semibold text-gray-900">Time Tracking</h2>
            <p className="text-sm text-gray-500">Daily working hours</p>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={timeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Area type="monotone" dataKey="hours" stroke="#C084FC" strokeWidth={2} fillOpacity={0.2} fill="#C084FC" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white/60 backdrop-blur-sm p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl mb-1 font-semibold text-gray-900">Productivity Trends</h2>
            <p className="text-sm text-gray-500">Weekly breakdown by category</p>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <ReBarChart data={productivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend wrapperStyle={{ color: "#374151" }} />
              <Bar dataKey="tasks" fill="#00F5FF" radius={[4, 4, 0, 0]} />
              <Bar dataKey="content" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="meetings" fill="#C084FC" radius={[4, 4, 0, 0]} />
            </ReBarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-gray-200 bg-white/60 backdrop-blur-sm p-6 border-l-4 border-[#00F5FF] shadow-sm">
          <h3 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
            <TrendingUp className="w-5 h-5 text-[#00F5FF]" />
            Peak Productivity
          </h3>
          <p className="text-sm text-gray-500">Your most productive hours are between 9 AM - 12 PM on Thursdays</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white/60 backdrop-blur-sm p-6 border-l-4 border-[#C084FC] shadow-sm">
          <h3 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
            <Target className="w-5 h-5 text-[#C084FC]" />
            Goal Progress
          </h3>
          <p className="text-sm text-gray-500">You're 78% toward your monthly goal of 200 completed tasks</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white/60 backdrop-blur-sm p-6 border-l-4 border-[#80FFEA] shadow-sm">
          <h3 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
            <Zap className="w-5 h-5 text-[#80FFEA]" />
            AI Recommendations
          </h3>
          <p className="text-sm text-gray-500">Consider automating 3 recurring tasks to save 4.5 hours per week</p>
        </div>
      </div>
    </div>
  );
}
