import { Button } from "./ui/button";
import { 
  CheckSquare, Plus, MoreVertical, Clock, TrendingUp, ArrowLeft, Sparkles, AlertTriangle
} from "lucide-react";

interface TaskAgentProps {
  onNavigate: (page: string) => void;
}

const tasks = [
  { id: 1, title: "Review PR #234", status: "review", priority: "high" },
  { id: 2, title: "Update documentation", status: "in-progress", priority: "medium" },
  { id: 3, title: "Design new feature", status: "in-progress", priority: "high" },
  { id: 4, title: "Bug fix: Login issue", status: "done", priority: "urgent" },
  { id: 5, title: "Team meeting prep", status: "todo", priority: "low" },
  { id: 6, title: "Ship onboarding emails", status: "todo", priority: "medium" },
  { id: 7, title: "QA regression suite", status: "review", priority: "urgent" },
  { id: 8, title: "Plan Q2 roadmap", status: "done", priority: "high" },
];

const columns = [
  { key: "todo", label: "Backlog", dot: "bg-blue-400" },
  { key: "in-progress", label: "In Progress", dot: "bg-purple-400" },
  { key: "review", label: "Review", dot: "bg-amber-400" },
  { key: "done", label: "Done", dot: "bg-emerald-400" },
] as const;

const priorityConfig = {
  urgent: { label: "Urgent", className: "bg-rose-500/20 text-rose-100 border border-rose-500/30" },
  high: { label: "High", className: "bg-orange-500/20 text-orange-100 border border-orange-500/30" },
  medium: { label: "Medium", className: "bg-blue-500/20 text-blue-100 border border-blue-500/30" },
  low: { label: "Low", className: "bg-white/5 text-white border border-white/10" },
} as const;

export function TaskAgent({ onNavigate }: TaskAgentProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-16 right-10 h-72 w-72 rounded-full bg-blue-500/40 blur-[140px]" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-purple-500/30 blur-[160px]" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="glass border-b border-white/10 px-4 py-6 sm:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => onNavigate('dashboard')}
                className="glass rounded-xl p-2 transition-colors hover:bg-white/10"
              >
                <ArrowLeft className="h-5 w-5 text-white" />
              </button>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/60">Workflows</p>
                <h1 className="text-3xl font-semibold text-white">Task Command Center</h1>
                <p className="text-sm text-white/60">Visualize, prioritize, and unblock every deliverable.</p>
              </div>
            </div>
            <Button className="hidden bg-white/10 text-white hover:bg-white/20 sm:inline-flex">
              <Sparkles className="mr-2 h-4 w-4" />
              Automations
            </Button>
          </div>
        </header>

        {/* Alert */}
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-8">
          <div className="glass-strong flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm text-white/80">
            <AlertTriangle className="h-4 w-4 text-amber-300" />
            <span>3 high-priority tasks are blocked. Send nudges with one click.</span>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-amber-200 hover:bg-amber-400/10">
                View blockers
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                Notify owners
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-4">
            {columns.map((column) => {
              const columnTasks = tasks.filter((task) => task.status === column.key);

              return (
                <div
                  key={column.key}
                  className="glass-strong rounded-3xl border border-white/10 p-5"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-white/60">
                        <span className={`h-2 w-2 rounded-full ${column.dot}`} />
                        {column.label}
                      </div>
                      <p className="text-lg font-semibold text-white">{columnTasks.length} tasks</p>
                    </div>
                    <button className="rounded-xl border border-white/10 p-2 text-white/70 transition hover:bg-white/10">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {columnTasks.map((task) => (
                      <div
                        key={task.id}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:border-white/30 hover:bg-white/10"
                      >
                        <div className="mb-2 flex items-start justify-between gap-3">
                          <p className="text-sm font-medium text-white">{task.title}</p>
                          <button className="text-white/50 transition hover:text-white">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs capitalize ${priorityConfig[task.priority as keyof typeof priorityConfig].className}`}
                          >
                            {priorityConfig[task.priority as keyof typeof priorityConfig].label}
                          </span>
                          <span className="text-xs text-white/50">#{task.id.toString().padStart(3, "0")}</span>
                        </div>
                      </div>
                    ))}

                    {columnTasks.length === 0 && (
                      <div className="rounded-2xl border border-dashed border-white/15 p-6 text-center text-sm text-white/40">
                        No tasks here. Drag one over or create a task.
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Task Stats */}
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="glass-strong rounded-3xl border border-white/10 p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/20">
                  <CheckSquare className="h-6 w-6 text-blue-200" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/60">Completed</p>
                  <p className="text-3xl font-semibold text-white">24</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-200">
                <TrendingUp className="h-4 w-4" />
                <span>+15% vs last week</span>
              </div>
            </div>

            <div className="glass-strong rounded-3xl border border-white/10 p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/20">
                  <Clock className="h-6 w-6 text-purple-200" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/60">Avg duration</p>
                  <p className="text-3xl font-semibold text-white">8.5h</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-purple-200">
                <TrendingUp className="h-4 w-4" />
                <span>-20% quicker</span>
              </div>
            </div>

            <div className="glass-strong rounded-3xl border border-white/10 p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20">
                  <TrendingUp className="h-6 w-6 text-emerald-200" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/60">On-time</p>
                  <p className="text-3xl font-semibold text-white">94%</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-200">
                <TrendingUp className="h-4 w-4" />
                <span>+8% improvement</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

