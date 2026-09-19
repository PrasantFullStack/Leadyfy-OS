import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Role } from '../types';
import {
  Shield,
  Briefcase,
  UserCheck,
  Building2,
  X,
  Lock,
  Mail,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { role, setRole, setSelectedClientId, clients } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedSimulatedRole, setSelectedSimulatedRole] = useState<Role>(role);

  if (!isOpen) return null;

  const handleQuickLogin = (targetRole: Role, clientId?: string) => {
    setRole(targetRole);
    if (clientId) {
      setSelectedClientId(clientId);
    }
    onClose();
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(selectedSimulatedRole);
    if (selectedSimulatedRole === 'client' && clients.length > 0) {
      setSelectedClientId(clients[0].id);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#141414] border border-[#2e2e2e] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl text-white">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#262626] flex items-center justify-between bg-[#181818]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center text-[#111111] font-bold text-lg">
              L
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-tight">Leadyfy OS Authentication</h2>
              <p className="text-xs text-neutral-400">Select simulated role or test credentials</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#252525] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* 1-Click Quick Role Switchers */}
          <div>
            <label className="text-xs font-semibold text-neutral-300 block mb-2.5 uppercase tracking-wider">
              Quick Role Simulation (1-Click)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickLogin('owner')}
                className="p-3 rounded-xl bg-[#1c1c1c] hover:bg-[#252525] border border-[#333] hover:border-amber-500/50 text-left transition-all group flex items-start gap-3"
              >
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-105 transition-transform">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white">Owner</span>
                    {role === 'owner' && <span className="text-[10px] text-amber-400 font-semibold">• Current</span>}
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-tight mt-0.5">
                    Full agency control, margins & payout audits
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="p-3 rounded-xl bg-[#1c1c1c] hover:bg-[#252525] border border-[#333] hover:border-blue-500/50 text-left transition-all group flex items-start gap-3"
              >
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:scale-105 transition-transform">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white">Admin</span>
                    {role === 'admin' && <span className="text-[10px] text-blue-400 font-semibold">• Current</span>}
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-tight mt-0.5">
                    Operations, orders, billing & shoot logistics
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('employee')}
                className="p-3 rounded-xl bg-[#1c1c1c] hover:bg-[#252525] border border-[#333] hover:border-emerald-500/50 text-left transition-all group flex items-start gap-3"
              >
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-105 transition-transform">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white">Employee / Editor</span>
                    {role === 'employee' && <span className="text-[10px] text-emerald-400 font-semibold">• Current</span>}
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-tight mt-0.5">
                    Video editing, scripts review, tasks execution
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('client', 'cli-1')}
                className="p-3 rounded-xl bg-purple-950/20 hover:bg-purple-950/40 border border-purple-800/40 hover:border-purple-500 text-left transition-all group flex items-start gap-3"
              >
                <div className="p-2 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 group-hover:scale-105 transition-transform">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-purple-200">Client Portal</span>
                    {role === 'client' && <span className="text-[10px] text-purple-400 font-semibold">• Current</span>}
                  </div>
                  <p className="text-[11px] text-purple-300/80 leading-tight mt-0.5">
                    Isolated client view for Lumina Skin Labs
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Form divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#262626]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#141414] px-2 text-neutral-500 text-[10px] font-semibold tracking-wider">
                Or Sign In With Custom Email
              </span>
            </div>
          </div>

          {/* Custom Credentials Form */}
          <form onSubmit={handleCustomSubmit} className="space-y-3.5">
            <div>
              <label className="text-xs text-neutral-300 font-medium block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operator@leadyfy.agency"
                  className="w-full bg-[#1c1c1c] text-neutral-100 placeholder-neutral-500 text-xs rounded-lg pl-9 pr-3 py-2.5 border border-[#333] focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-neutral-300 font-medium block mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#1c1c1c] text-neutral-100 placeholder-neutral-500 text-xs rounded-lg pl-9 pr-3 py-2.5 border border-[#333] focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="pt-1">
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-[#111111] font-bold text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Enter Leadyfy OS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
