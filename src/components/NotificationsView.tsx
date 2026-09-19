import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { NotificationItem } from '../types';
import {
  Bell,
  CheckCircle2,
  Clock,
  Video,
  FileText,
  DollarSign,
  Truck,
  MessageSquare,
  Sparkles,
  Check
} from 'lucide-react';

export const NotificationsView: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead, setCurrentPage } = useApp();
  const [typeFilter, setTypeFilter] = useState<string>('All');

  const filtered = notifications.filter(n => {
    if (typeFilter === 'All') return true;
    return n.type === typeFilter;
  });

  const getTypeIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'script':
        return <FileText className="w-4 h-4 text-amber-400" />;
      case 'video':
        return <Video className="w-4 h-4 text-purple-400" />;
      case 'payment':
        return <DollarSign className="w-4 h-4 text-emerald-400" />;
      case 'shoot':
        return <Truck className="w-4 h-4 text-blue-400" />;
      default:
        return <Bell className="w-4 h-4 text-neutral-400" />;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141414] p-5 rounded-2xl border border-[#262626]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">Notifications & Agency Alerts</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/30">
              {notifications.filter(n => !n.read).length} Unread
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Real-time feed of client revisions, video approvals, raw footage uploads, and payments.
          </p>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="px-3.5 py-2 bg-[#1f1f1f] hover:bg-[#282828] text-neutral-200 text-xs font-semibold rounded-lg transition-colors border border-[#333] flex items-center gap-1.5 cursor-pointer"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Mark All as Read</span>
        </button>
      </div>

      {/* Type Filter */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin">
        {['All', 'video', 'script', 'payment', 'shoot', 'order', 'system'].map(cat => (
          <button
            key={cat}
            onClick={() => setTypeFilter(cat)}
            className={`px-3 py-1 rounded-lg text-xs capitalize transition-colors ${
              typeFilter === cat
                ? 'bg-amber-500 text-[#111] font-bold'
                : 'bg-[#141414] border border-[#262626] text-neutral-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-[#141414] rounded-xl border border-[#262626] overflow-hidden divide-y divide-[#222]">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-xs text-neutral-500">
            No notifications in this category.
          </div>
        ) : (
          filtered.map(notif => (
            <div
              key={notif.id}
              onClick={() => {
                markNotificationRead(notif.id);
                if (notif.actionUrl) {
                  setCurrentPage(notif.actionUrl as any);
                }
              }}
              className={`p-4 hover:bg-[#181818] transition-colors flex items-start gap-4 cursor-pointer ${
                !notif.read ? 'bg-[#171717]/80' : ''
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-[#202020] border border-[#333] flex items-center justify-center flex-shrink-0 mt-0.5">
                {getTypeIcon(notif.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className={`text-xs font-bold truncate ${!notif.read ? 'text-amber-400' : 'text-white'}`}>
                    {notif.title}
                  </h4>
                  <span className="text-[10px] text-neutral-500 font-mono whitespace-nowrap">{notif.createdAt}</span>
                </div>
                <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">{notif.message}</p>
              </div>

              {!notif.read && (
                <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
