import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ActivityLog } from '../types';
import {
  Activity,
  Search,
  Filter,
  Shield,
  Clock,
  User,
  CheckCircle2,
  FileText,
  Video,
  DollarSign
} from 'lucide-react';

export const ActivityLogsView: React.FC = () => {
  const { activityLogs } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || log.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141414] p-5 rounded-2xl border border-[#262626]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">System & Activity Audit Logs</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/30">
              {activityLogs.length} Events Logged
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Immutable trace of creative approvals, status changes, script iterations, and role simulations.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-[#141414] p-4 rounded-xl border border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search activity by user, action, or target..."
            className="w-full bg-[#1c1c1c] text-white text-xs pl-9 pr-3 py-2 rounded-lg border border-[#333] focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400 font-medium">Category:</span>
          {['All', 'client', 'order', 'script', 'shoot', 'video', 'payment', 'task'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs capitalize transition-colors ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-[#111] font-bold'
                  : 'bg-[#1e1e1e] text-neutral-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-[#141414] rounded-xl border border-[#262626] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#181818] text-neutral-400 text-[11px] uppercase tracking-wider border-b border-[#262626]">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Target Entity</th>
                <th className="py-3 px-4 text-right">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222]">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-[#1a1a1a] transition-colors">
                  <td className="py-3 px-4 font-mono text-neutral-400 whitespace-nowrap">{log.timestamp}</td>
                  <td className="py-3 px-4 font-semibold text-white">{log.user}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#222] text-amber-400 border border-[#333] uppercase">
                      {log.userRole}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-neutral-200">{log.action}</td>
                  <td className="py-3 px-4 text-neutral-300 text-[11px] max-w-xs font-mono truncate">{log.target}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-[10px] text-neutral-500 uppercase font-mono">{log.category}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
