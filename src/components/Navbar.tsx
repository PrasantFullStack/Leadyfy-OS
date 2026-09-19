import React, { useState } from 'react';
import { useApp, PageId } from '../context/AppContext';
import { Role } from '../types';
import {
  Bell,
  Search,
  UserCheck,
  Building2,
  Shield,
  Briefcase,
  ChevronDown,
  RotateCcw,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Plus
} from 'lucide-react';

interface NavbarProps {
  onOpenNewModal?: (type: 'client' | 'order' | 'script' | 'shoot' | 'task') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenNewModal }) => {
  const {
    role,
    setRole,
    currentUser,
    selectedClientId,
    setSelectedClientId,
    clients,
    notifications,
    markNotificationRead,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    resetDemoData
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showClientDropdown, setShowClientDropdown] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;
  const currentClient = clients.find(c => c.id === selectedClientId) || clients[0];

  const roles: { key: Role; label: string; desc: string; icon: any; color: string }[] = [
    { key: 'owner', label: 'Owner', desc: 'Full agency access & margins', icon: Shield, color: 'text-amber-500 bg-amber-500/10' },
    { key: 'admin', label: 'Admin', desc: 'Operations, orders & billing', icon: Briefcase, color: 'text-blue-500 bg-blue-500/10' },
    { key: 'employee', label: 'Employee', desc: 'Creative, scripts, editing & shoots', icon: UserCheck, color: 'text-emerald-500 bg-emerald-500/10' },
    { key: 'client', label: 'Client', desc: 'Isolated Client Portal access only', icon: Building2, color: 'text-purple-500 bg-purple-500/10' },
  ];

  return (
    <header className="h-16 bg-[#111111] text-white border-b border-[#262626] px-4 lg:px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Left: Brand Identity & Quick Role Badge */}
      <div className="flex items-center gap-4">
        <div 
          onClick={() => setCurrentPage(role === 'client' ? 'client-portal' : 'dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group"
          id="nav-brand-logo"
        >
          <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center font-bold text-[#111111] shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <span className="text-xl tracking-tighter">L</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-white">Leadyfy</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-semibold tracking-wide border border-amber-500/30">
                OS
              </span>
            </div>
            <p className="text-[10px] text-neutral-400 hidden sm:block font-medium tracking-wide">
              UGC & Digital Marketing Operations
            </p>
          </div>
        </div>

        {/* Vertical divider */}
        <div className="h-6 w-[1px] bg-[#262626] hidden md:block" />

        {/* Fast Role Switcher Indicator */}
        <div className="relative">
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-[#1c1c1c] hover:bg-[#252525] border border-[#333333] transition-colors text-xs text-neutral-200"
            title="Switch User Role to test permissions"
            id="role-switcher-btn"
          >
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-neutral-400 font-medium">Role:</span>
            <span className="font-semibold text-white capitalize">{role}</span>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
          </button>

          {showRoleDropdown && (
            <div className="absolute left-0 mt-2 w-64 bg-[#181818] border border-[#333333] rounded-lg shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-1">
              <div className="px-3 py-1.5 border-b border-[#2a2a2a] text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                Simulate Role Access
              </div>
              {roles.map((r) => {
                const Icon = r.icon;
                const isCurrent = role === r.key;
                return (
                  <button
                    key={r.key}
                    onClick={() => {
                      setRole(r.key);
                      setShowRoleDropdown(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-start gap-2.5 hover:bg-[#252525] transition-colors ${
                      isCurrent ? 'bg-amber-500/10 border-l-2 border-amber-500' : ''
                    }`}
                  >
                    <div className={`p-1 rounded ${r.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white">{r.label}</span>
                        {isCurrent && <span className="text-[10px] text-amber-400 font-medium">(Active)</span>}
                      </div>
                      <p className="text-[11px] text-neutral-400 leading-tight mt-0.5">{r.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* If in Client Role, allow switching active client preview */}
        {role === 'client' && (
          <div className="relative hidden sm:block">
            <button
              onClick={() => setShowClientDropdown(!showClientDropdown)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-purple-950/40 border border-purple-800/60 text-xs text-purple-200 hover:bg-purple-900/50 transition-colors"
            >
              <Building2 className="w-3.5 h-3.5 text-purple-400" />
              <span className="font-medium truncate max-w-[140px]">{currentClient?.companyName}</span>
              <ChevronDown className="w-3 h-3 text-purple-400" />
            </button>

            {showClientDropdown && (
              <div className="absolute left-0 mt-2 w-56 bg-[#181818] border border-[#333333] rounded-lg shadow-2xl py-1 z-50">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider border-b border-[#2a2a2a]">
                  Switch Client Account
                </div>
                {clients.map(c => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedClientId(c.id);
                      setShowClientDropdown(false);
                    }}
                    className={`w-full px-3 py-1.5 text-left text-xs hover:bg-[#252525] flex items-center justify-between ${
                      c.id === selectedClientId ? 'text-amber-400 font-semibold bg-amber-500/10' : 'text-neutral-200'
                    }`}
                  >
                    <span className="truncate">{c.companyName}</span>
                    {c.id === selectedClientId && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Middle: Search */}
      <div className="hidden md:flex items-center max-w-md w-full mx-4">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder={role === 'client' ? "Search your scripts & videos..." : "Search clients, orders, scripts, shoots..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#181818] text-neutral-100 placeholder-neutral-500 text-xs rounded-lg pl-9 pr-4 py-2 border border-[#2b2b2b] focus:outline-none focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/50 transition-all"
            id="global-search-input"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded hover:text-white"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5">
        {/* Quick Create Button for Admin/Owner/Employee */}
        {role !== 'client' && onOpenNewModal && (
          <div className="relative group">
            <button
              onClick={() => onOpenNewModal('client')}
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-[#111111] font-semibold text-xs px-3 py-1.5 rounded-lg transition-colors shadow-sm shadow-amber-500/20 cursor-pointer"
              id="quick-create-btn"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="hidden sm:inline">New Client</span>
            </button>
          </div>
        )}

        {/* Client Portal direct link if in agency view */}
        {role !== 'client' && (
          <button
            onClick={() => {
              setRole('client');
              setCurrentPage('client-portal');
            }}
            className="hidden lg:flex items-center gap-1 text-xs text-neutral-300 hover:text-amber-400 px-2.5 py-1.5 rounded-md hover:bg-[#1f1f1f] transition-colors border border-transparent hover:border-[#333]"
            title="Preview Client Portal as a client"
          >
            <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
            <span>Client Portal View</span>
          </button>
        )}

        {/* Reset Demo Data Button */}
        <button
          onClick={resetDemoData}
          className="p-2 text-neutral-400 hover:text-white hover:bg-[#222222] rounded-lg transition-colors text-xs flex items-center gap-1"
          title="Reset prototype state to initial demo data"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden xl:inline text-[11px]">Reset Data</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-[#222222] transition-colors relative"
            id="notifications-bell-btn"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-[#111111]" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#181818] border border-[#333333] rounded-xl shadow-2xl py-2 z-50">
              <div className="px-4 py-2 border-b border-[#2b2b2b] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs text-white">Agency Notifications</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] bg-amber-500/20 text-amber-400 font-bold px-1.5 py-0.2 rounded border border-amber-500/30">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    notifications.forEach(n => markNotificationRead(n.id));
                  }}
                  className="text-[11px] text-neutral-400 hover:text-amber-400"
                >
                  Mark all read
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-[#262626]">
                {notifications.length === 0 ? (
                  <div className="py-6 text-center text-xs text-neutral-500">No notifications</div>
                ) : (
                  notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationRead(n.id);
                        if (n.actionUrl) setCurrentPage(n.actionUrl as PageId);
                        setShowNotifications(false);
                      }}
                      className={`px-4 py-3 hover:bg-[#222222] cursor-pointer transition-colors ${
                        !n.read ? 'bg-amber-500/[0.04]' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-xs ${!n.read ? 'font-semibold text-white' : 'text-neutral-300'}`}>
                          {n.title}
                        </p>
                        <span className="text-[10px] text-neutral-500 whitespace-nowrap">{n.createdAt}</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                        {n.message}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <div className="px-4 py-2 border-t border-[#2b2b2b] text-center">
                <button
                  onClick={() => {
                    setCurrentPage('notifications');
                    setShowNotifications(false);
                  }}
                  className="text-xs text-amber-400 hover:underline font-medium"
                >
                  View all alerts & history →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar & Info */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-[#262626]">
          <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 overflow-hidden flex items-center justify-center text-xs font-bold text-amber-400">
            {currentUser.avatarUrl ? (
              <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover" />
            ) : (
              currentUser.name.charAt(0)
            )}
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-semibold text-white leading-tight">{currentUser.name}</div>
            <div className="text-[10px] text-neutral-400 capitalize">{currentUser.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
};
