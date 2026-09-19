import React from 'react';
import { useApp, PageId } from '../context/AppContext';
import {
  LayoutDashboard,
  Users,
  Package,
  FileText,
  Video,
  CalendarDays,
  Columns3,
  CreditCard,
  CheckSquare,
  Bell,
  History,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  LogOut,
  FolderLock
} from 'lucide-react';

interface SidebarProps {
  onOpenLoginModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenLoginModal }) => {
  const {
    role,
    setRole,
    currentPage,
    setCurrentPage,
    clients,
    orders,
    scripts,
    videos,
    tasks,
    notifications,
    selectedClientId
  } = useApp();

  const currentClient = clients.find(c => c.id === selectedClientId) || clients[0];

  // Calculated counters
  const clientReviewVideosCount = videos.filter(v => v.stage === 'Client Review').length;
  const pendingScriptsCount = scripts.filter(s => s.status === 'Sent to Client' || s.status === 'Revision Requested').length;
  const openTasksCount = tasks.filter(t => t.status !== 'Completed').length;
  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  const agencyNavItems: { id: PageId; label: string; icon: any; badge?: number; badgeColor?: string; rolesAllowed: string[] }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, rolesAllowed: ['owner', 'admin', 'employee'] },
    { id: 'clients', label: 'Clients & CRM', icon: Users, badge: clients.length, rolesAllowed: ['owner', 'admin', 'employee'] },
    { id: 'orders', label: 'Orders & Packages', icon: Package, badge: orders.length, rolesAllowed: ['owner', 'admin', 'employee'] },
    { id: 'scripts', label: 'Scripts Workflow', icon: FileText, badge: pendingScriptsCount > 0 ? pendingScriptsCount : undefined, badgeColor: 'bg-amber-500/20 text-amber-400', rolesAllowed: ['owner', 'admin', 'employee'] },
    { id: 'creators', label: 'Creators & Roster', icon: Users, rolesAllowed: ['owner', 'admin', 'employee'] },
    { id: 'shoots', label: 'Shoot Scheduling', icon: CalendarDays, rolesAllowed: ['owner', 'admin', 'employee'] },
    { id: 'kanban', label: 'Video Kanban', icon: Columns3, badge: clientReviewVideosCount > 0 ? clientReviewVideosCount : undefined, badgeColor: 'bg-amber-500 text-[#111111]', rolesAllowed: ['owner', 'admin', 'employee'] },
    { id: 'client-portal', label: 'Client Portal View', icon: ExternalLink, rolesAllowed: ['owner', 'admin', 'employee'] },
    { id: 'payments', label: 'Payments & Margins', icon: CreditCard, rolesAllowed: ['owner', 'admin'] },
    { id: 'tasks', label: 'Agency Tasks', icon: CheckSquare, badge: openTasksCount > 0 ? openTasksCount : undefined, rolesAllowed: ['owner', 'admin', 'employee'] },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotifsCount > 0 ? unreadNotifsCount : undefined, badgeColor: 'bg-amber-500 text-[#111111]', rolesAllowed: ['owner', 'admin', 'employee'] },
    { id: 'activity', label: 'Activity Logs', icon: History, rolesAllowed: ['owner', 'admin', 'employee'] },
  ];

  return (
    <aside className="w-64 bg-[#111111] border-r border-[#262626] flex flex-col justify-between select-none flex-shrink-0 min-h-[calc(100vh-64px)]">
      {/* Top section */}
      <div className="p-3">
        {/* If Role is Client, show Isolated Client Portal Notice */}
        {role === 'client' ? (
          <div className="mb-4 p-3 rounded-lg bg-purple-950/30 border border-purple-800/50">
            <div className="flex items-center gap-2 text-purple-300 font-semibold text-xs mb-1">
              <FolderLock className="w-4 h-4" />
              <span>Isolated Client Portal</span>
            </div>
            <p className="text-[11px] text-purple-200/80 leading-snug">
              Logged in as <strong className="text-white">{currentClient?.companyName}</strong>. Internal agency financials and creator margins are protected.
            </p>
          </div>
        ) : (
          <div className="mb-3 px-3 py-1.5 flex items-center justify-between text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            <span>Operations Hub</span>
            <span className="text-[10px] bg-[#1f1f1f] text-neutral-400 px-1.5 py-0.5 rounded border border-[#333]">
              {role.toUpperCase()}
            </span>
          </div>
        )}

        {/* Navigation list */}
        <nav className="space-y-1">
          {role === 'client' ? (
            // Dedicated Client View Items
            <div className="space-y-1">
              <button
                onClick={() => setCurrentPage('client-portal')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                  currentPage === 'client-portal'
                    ? 'bg-amber-500 text-[#111111] font-semibold shadow-sm shadow-amber-500/20'
                    : 'text-neutral-300 hover:bg-[#1c1c1c] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Client Portal Home</span>
                </div>
                {clientReviewVideosCount > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#111111] text-amber-400 font-bold">
                    Action Needed
                  </span>
                )}
              </button>

              <button
                onClick={() => setCurrentPage('client-portal')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-neutral-300 hover:bg-[#1c1c1c] hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-neutral-400" />
                  <span>Script Approvals</span>
                </div>
              </button>

              <button
                onClick={() => setCurrentPage('client-portal')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-neutral-300 hover:bg-[#1c1c1c] hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Video className="w-4 h-4 text-neutral-400" />
                  <span>Video Revisions & Approvals</span>
                </div>
              </button>

              <button
                onClick={() => setCurrentPage('notifications')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  currentPage === 'notifications'
                    ? 'bg-[#222222] text-amber-400 font-semibold'
                    : 'text-neutral-300 hover:bg-[#1c1c1c] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Bell className="w-4 h-4" />
                  <span>Portal Alerts</span>
                </div>
                {unreadNotifsCount > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold">
                    {unreadNotifsCount}
                  </span>
                )}
              </button>

              {/* Notice of agency isolation */}
              <div className="mt-8 p-3 rounded-lg bg-[#181818] border border-[#2a2a2a] text-neutral-400 text-[11px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-neutral-300 mb-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  <span>Role Access Guard</span>
                </div>
                Agency creator compensation & financial margins are strictly isolated from client view.
                <div className="mt-2.5 pt-2 border-t border-[#262626]">
                  <button
                    onClick={() => setRole('owner')}
                    className="w-full text-center py-1 rounded bg-[#252525] hover:bg-[#333] text-white text-[11px] font-medium transition-colors"
                  >
                    Switch to Owner View →
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Full Agency Items
            agencyNavItems.map(item => {
              const Icon = item.icon;
              const isAllowed = item.rolesAllowed.includes(role);
              if (!isAllowed) return null;

              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-amber-500 text-[#111111] font-semibold shadow-sm shadow-amber-500/20'
                      : 'text-neutral-300 hover:bg-[#1c1c1c] hover:text-white'
                  }`}
                  id={`sidebar-link-${item.id}`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#111111]' : 'text-neutral-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        isActive
                          ? 'bg-[#111111] text-amber-400'
                          : item.badgeColor || 'bg-[#262626] text-neutral-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </nav>
      </div>

      {/* Bottom section: User Role quick Switcher & Status */}
      <div className="p-3 border-t border-[#262626] bg-[#0e0e0e]">
        <div className="p-2.5 rounded-lg bg-[#181818] border border-[#2b2b2b]">
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="text-neutral-400">Leadyfy Engine</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              v2.4 Online
            </span>
          </div>
          <p className="text-[10px] text-neutral-500 leading-tight">
            UGC Pipeline, Scripts & Client Review synced.
          </p>

          <button
            onClick={() => {
              if (onOpenLoginModal) onOpenLoginModal();
            }}
            className="w-full mt-2 py-1.5 px-2 rounded bg-[#242424] hover:bg-[#303030] text-neutral-200 text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5 text-neutral-400" />
            <span>Switch Account / Login</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
