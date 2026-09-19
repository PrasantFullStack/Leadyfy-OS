import React from 'react';
import { useApp } from '../context/AppContext';
import {
  DollarSign,
  Users,
  Package,
  Video,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Sparkles,
  AlertCircle,
  FileText,
  ChevronRight,
  TrendingUp,
  ShieldAlert
} from 'lucide-react';

interface DashboardViewProps {
  onOpenNewClient?: () => void;
  onOpenNewOrder?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onOpenNewClient, onOpenNewOrder }) => {
  const {
    role,
    clients,
    orders,
    scripts,
    shoots,
    videos,
    invoices,
    tasks,
    activityLogs,
    setCurrentPage,
    setRole,
    setSelectedClientId
  } = useApp();

  // Metrics calculation
  const totalRevenue = invoices
    .filter(i => i.status === 'Paid')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const pendingRevenue = invoices
    .filter(i => i.status === 'Pending')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalCreatorPayouts = invoices
    .filter(i => i.status === 'Paid')
    .reduce((acc, curr) => acc + curr.creatorPayout, 0);

  const netAgencyMargin = totalRevenue - totalCreatorPayouts;
  const marginPercentage = totalRevenue > 0 ? Math.round((netAgencyMargin / totalRevenue) * 100) : 0;

  const activeClientsCount = clients.filter(c => c.status === 'Active').length;
  const inProductionOrders = orders.filter(o => o.stage !== 'Delivered');
  const reviewPendingVideos = videos.filter(v => v.stage === 'Client Review');
  const pendingScripts = scripts.filter(s => s.status === 'Sent to Client' || s.status === 'Draft');

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141414] p-5 rounded-2xl border border-[#262626]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">Agency Operations Command</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/30">
              Live Pipeline
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Tracking UGC deliverables, creator shoot schedules, and client reviews across active retainers.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenNewClient}
            className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-[#111111] font-semibold text-xs rounded-lg transition-colors shadow-sm shadow-amber-500/20 cursor-pointer flex items-center gap-1.5"
            id="dash-add-client-btn"
          >
            <span>+ Onboard Client</span>
          </button>
          <button
            onClick={onOpenNewOrder}
            className="px-3.5 py-2 bg-[#222222] hover:bg-[#2c2c2c] text-neutral-200 font-semibold text-xs rounded-lg transition-colors border border-[#333] cursor-pointer flex items-center gap-1.5"
            id="dash-add-order-btn"
          >
            <span>+ Create Order</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Revenue (Owner/Admin gets full margins) */}
        <div className="bg-[#141414] p-4 rounded-xl border border-[#262626] hover:border-[#333] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-400 font-medium">Billed Revenue (Month)</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tight">
              ${totalRevenue.toLocaleString()}
            </span>
            {pendingRevenue > 0 && (
              <span className="text-[11px] text-amber-400 font-medium">
                +${pendingRevenue.toLocaleString()} pending
              </span>
            )}
          </div>
          <div className="mt-2 text-[11px] text-neutral-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Net Agency Margin: <strong className="text-white">{marginPercentage}%</strong></span>
          </div>
        </div>

        {/* KPI 2: Active Clients */}
        <div className="bg-[#141414] p-4 rounded-xl border border-[#262626] hover:border-[#333] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-400 font-medium">Active Clients</span>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tight">
              {activeClientsCount}
            </span>
            <span className="text-[11px] text-neutral-400">
              of {clients.length} total brands
            </span>
          </div>
          <div className="mt-2 text-[11px] text-neutral-400">
            1 in onboarding setup
          </div>
        </div>

        {/* KPI 3: Orders in Production */}
        <div className="bg-[#141414] p-4 rounded-xl border border-[#262626] hover:border-[#333] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-400 font-medium">Active UGC Orders</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tight">
              {inProductionOrders.length}
            </span>
            <span className="text-[11px] text-amber-400 font-medium">
              26 videos queued
            </span>
          </div>
          <div className="mt-2 text-[11px] text-neutral-400">
            Across 5 client accounts
          </div>
        </div>

        {/* KPI 4: Pending Approvals (Action item) */}
        <div 
          onClick={() => setCurrentPage('kanban')}
          className="bg-[#141414] p-4 rounded-xl border border-amber-500/40 hover:border-amber-500 transition-all cursor-pointer group bg-gradient-to-br from-[#141414] to-amber-950/20"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-amber-300 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              Client Approvals
            </span>
            <div className="p-2 rounded-lg bg-amber-500 text-[#111111] font-bold">
              <Video className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-amber-400 tracking-tight">
              {reviewPendingVideos.length}
            </span>
            <span className="text-[11px] text-neutral-300">
              video cuts waiting
            </span>
          </div>
          <div className="mt-2 text-[11px] text-amber-300/80 flex items-center justify-between">
            <span>Click to review in Kanban</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Main Grid: Pipeline Video Cuts & Shoots Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Video Production Pipeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section: Videos in Pipeline */}
          <div className="bg-[#141414] rounded-xl border border-[#262626] overflow-hidden">
            <div className="p-4 border-b border-[#262626] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Active Video Creatives Pipeline</h3>
              </div>
              <button
                onClick={() => setCurrentPage('kanban')}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
              >
                <span>Open Kanban Board</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-[#222222]">
              {videos.slice(0, 4).map((video) => (
                <div key={video.id} className="p-4 hover:bg-[#1a1a1a] transition-colors flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-16 rounded-lg bg-neutral-800 overflow-hidden flex-shrink-0 relative border border-[#333]">
                      <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 right-1 text-[9px] bg-black/80 text-white px-1 rounded font-mono">
                        {video.durationSeconds}s
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white truncate">{video.title}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-300 font-mono">
                          v{video.version}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                        Client: <strong className="text-neutral-300">{video.clientCompanyName}</strong> • Creator: {video.creatorName}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-neutral-500">Editor: {video.editorName}</span>
                        <span className="text-neutral-600">•</span>
                        <span className="text-[10px] text-neutral-500">Due: {video.dueDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                        video.stage === 'Client Review'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : video.stage === 'Delivered'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'bg-[#242424] text-neutral-300 border-[#383838]'
                      }`}
                    >
                      {video.stage}
                    </span>

                    {video.stage === 'Client Review' && (
                      <button
                        onClick={() => {
                          setRole('client');
                          setSelectedClientId(video.clientId);
                          setCurrentPage('client-portal');
                        }}
                        className="px-2.5 py-1 text-xs rounded bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-700 transition-colors"
                        title="Simulate Client Review as this brand"
                      >
                        Client Portal Review
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Clients Snapshot with `companyName` */}
          <div className="bg-[#141414] rounded-xl border border-[#262626] overflow-hidden">
            <div className="p-4 border-b border-[#262626] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-bold text-white">Active Client Accounts</h3>
                <span className="text-[10px] text-neutral-500 font-mono">
                  (Uses `companyName` ➔ `company_name`)
                </span>
              </div>
              <button
                onClick={() => setCurrentPage('clients')}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
              >
                <span>View All Clients</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#181818] text-neutral-400 text-[11px] uppercase tracking-wider border-b border-[#262626]">
                  <tr>
                    <th className="py-2.5 px-4">Company Name</th>
                    <th className="py-2.5 px-4">Contact</th>
                    <th className="py-2.5 px-4">Tier</th>
                    <th className="py-2.5 px-4">Monthly Budget</th>
                    <th className="py-2.5 px-4">Orders</th>
                    <th className="py-2.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#222222]">
                  {clients.map(client => (
                    <tr key={client.id} className="hover:bg-[#1a1a1a] transition-colors">
                      <td className="py-3 px-4 font-semibold text-white">
                        {client.companyName}
                        <div className="text-[10px] text-neutral-500 font-normal">{client.industry}</div>
                      </td>
                      <td className="py-3 px-4 text-neutral-300">
                        {client.contactPerson}
                        <div className="text-[10px] text-neutral-500">{client.email}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-medium text-[10px]">
                          {client.tier}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-white">
                        ${client.monthlyBudget.toLocaleString()}/mo
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-amber-400">{client.totalOrders}</span> orders
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            setSelectedClientId(client.id);
                            setRole('client');
                            setCurrentPage('client-portal');
                          }}
                          className="text-[11px] text-purple-400 hover:text-purple-300 font-medium underline underline-offset-2"
                        >
                          Launch Portal →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Shoots Upcoming & Agency Tasks */}
        <div className="space-y-6">
          {/* Shoots & Shipping Tracker Preview */}
          <div className="bg-[#141414] rounded-xl border border-[#262626] overflow-hidden">
            <div className="p-4 border-b border-[#262626] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Creator Shoots</h3>
              </div>
              <button
                onClick={() => setCurrentPage('shoots')}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium"
              >
                Schedule →
              </button>
            </div>

            <div className="p-4 space-y-3">
              {shoots.map(shoot => (
                <div key={shoot.id} className="p-3 rounded-lg bg-[#1a1a1a] border border-[#2b2b2b]">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-xs text-white leading-tight">
                      {shoot.creatorName}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                        shoot.status === 'Filming'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : shoot.status === 'Product Delivered'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      {shoot.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-300 mt-1 line-clamp-1">
                    {shoot.productName}
                  </p>
                  <div className="mt-2 text-[10px] text-neutral-500 flex items-center justify-between pt-2 border-t border-[#262626]">
                    <span>Shoot: {shoot.scheduledDate}</span>
                    <span>Client: {shoot.clientCompanyName}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Urgent Agency Tasks */}
          <div className="bg-[#141414] rounded-xl border border-[#262626] overflow-hidden">
            <div className="p-4 border-b border-[#262626] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Ops Task Queue</h3>
              </div>
              <button
                onClick={() => setCurrentPage('tasks')}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium"
              >
                View all ({tasks.length})
              </button>
            </div>

            <div className="divide-y divide-[#222222]">
              {tasks.slice(0, 4).map(task => (
                <div key={task.id} className="p-3 hover:bg-[#1a1a1a] transition-colors flex items-start gap-2.5">
                  <span
                    className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                      task.priority === 'Urgent'
                        ? 'bg-rose-500 animate-pulse'
                        : task.priority === 'High'
                        ? 'bg-amber-500'
                        : 'bg-blue-500'
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs ${task.status === 'Completed' ? 'line-through text-neutral-500' : 'text-neutral-200'}`}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-neutral-500">
                      <span>{task.assignedTo}</span>
                      <span>•</span>
                      <span className="text-amber-400/80 font-medium">{task.priority}</span>
                      <span>•</span>
                      <span>Due {task.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Activity Snippet */}
          <div className="bg-[#141414] rounded-xl border border-[#262626] p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Live Activity Feed</h3>
              <button
                onClick={() => setCurrentPage('activity')}
                className="text-[11px] text-neutral-400 hover:text-white"
              >
                Full Audit →
              </button>
            </div>
            <div className="space-y-2.5">
              {activityLogs.slice(0, 3).map(log => (
                <div key={log.id} className="text-xs text-neutral-400">
                  <span className="font-semibold text-neutral-200">{log.user}: </span>
                  <span className="text-neutral-300">{log.action}</span>
                  <div className="text-[10px] text-neutral-500 mt-0.5 font-mono">{log.timestamp}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
