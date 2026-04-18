import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { 
  Users, Activity, Database, FileText, Settings, Bell, Search, 
  TrendingUp, AlertCircle, CheckCircle, Brain, BarChart3, Download
} from "lucide-react";
import { PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

const usageData = [
  { name: 'Mon', value: 450 },
  { name: 'Tue', value: 520 },
  { name: 'Wed', value: 480 },
  { name: 'Thu', value: 650 },
  { name: 'Fri', value: 580 },
  { name: 'Sat', value: 420 },
  { name: 'Sun', value: 380 },
];

const agentData = [
  { name: 'Content', value: 35, color: '#00F5FF' },
  { name: 'Task', value: 28, color: '#3B82F6' },
  { name: 'Resume', value: 22, color: '#C084FC' },
  { name: 'Social', value: 15, color: '#80FFEA' },
];

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", plan: "Pro", status: "active", sessions: 247 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", plan: "Free", status: "active", sessions: 89 },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", plan: "Enterprise", status: "active", sessions: 456 },
  { id: 4, name: "Alice Brown", email: "alice@example.com", plan: "Pro", status: "inactive", sessions: 12 },
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com", plan: "Free", status: "active", sessions: 34 },
];

const recentLogs = [
  { type: "success", message: "User registration completed", time: "2 min ago" },
  { type: "warning", message: "High API usage detected", time: "15 min ago" },
  { type: "info", message: "System backup completed", time: "1 hour ago" },
  { type: "error", message: "Failed login attempt", time: "2 hours ago" },
];

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Monitor and manage your AI platform</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-200 rounded-xl pl-10 pr-4 py-2 bg-white focus:outline-none focus:border-[#00F5FF] transition-colors w-64 text-sm"
            />
          </div>
          <button className="border border-gray-200 bg-white rounded-xl p-2.5 hover:bg-gray-50 transition-colors relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { icon: Users, label: "Total Users", value: "12,458", change: "+234", color: "#00F5FF" },
          { icon: Brain, label: "Active Agents", value: "847", change: "+56", color: "#3B82F6" },
          { icon: Activity, label: "API Requests", value: "1.2M", change: "+12%", color: "#C084FC" },
          { icon: TrendingUp, label: "System Load", value: "67%", change: "-5%", color: "#80FFEA" },
        ].map((stat, idx) => (
          <div key={idx} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)` }}
              >
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
              <Badge className="bg-[#00F5FF]/10 text-[#00F5FF] border-0 hover:bg-[#00F5FF]/20">
                {stat.change}
              </Badge>
            </div>
            <div className="text-3xl font-bold mb-1 text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Usage Chart */}
        <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-1 text-gray-900">Platform Usage</h2>
              <p className="text-sm text-gray-500">Daily API requests</p>
            </div>
            <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={usageData}>
              <defs>
                <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00F5FF" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00F5FF" stopOpacity={0}/>
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
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  color: '#111827'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#00F5FF" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorUsage)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top AI Agents */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Top AI Agents</h2>
          <div className="flex items-center justify-center mb-6">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={agentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {agentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    background: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    color: '#111827'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {agentData.map((agent, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: agent.color }}
                  />
                  <span className="text-sm text-gray-700">{agent.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{agent.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Users Table & Logs */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* User Management */}
        <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-50">
                Filter
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-[#00F5FF] to-[#3B82F6] text-white hover:opacity-90">
                Add User
              </Button>
            </div>
          </div>
          
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead>User</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sessions</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={`${
                          user.plan === 'Enterprise' ? 'bg-[#C084FC]/10 text-[#C084FC]' :
                          user.plan === 'Pro' ? 'bg-[#3B82F6]/10 text-[#3B82F6]' :
                          'bg-gray-100 text-gray-600'
                        } border-0`}
                      >
                        {user.plan}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={`${
                          user.status === 'active' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-red-100 text-red-600'
                        } border-0`}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">{user.sessions}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* System Logs */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">System Logs</h2>
            <Button variant="ghost" size="sm" className="text-[#00F5FF] hover:bg-[#00F5FF]/10">
              View All
            </Button>
          </div>
          
          <div className="space-y-4">
            {recentLogs.map((log, idx) => (
              <div key={idx} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-start gap-3">
                  {log.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />}
                  {log.type === 'warning' && <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />}
                  {log.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />}
                  {log.type === 'info' && <Activity className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />}
                  <div className="flex-1">
                    <p className="text-sm mb-1 text-gray-900">{log.message}</p>
                    <span className="text-xs text-gray-500">{log.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
