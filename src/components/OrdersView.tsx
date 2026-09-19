import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Order, OrderStage, PackagePreset } from '../types';
import { INITIAL_PACKAGES } from '../data/mockData';
import {
  Package,
  Plus,
  CheckCircle2,
  Clock,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Calendar,
  X,
  FileText,
  DollarSign
} from 'lucide-react';

const ORDER_STAGES: OrderStage[] = [
  'Onboarding',
  'Order Placed',
  'Scripting',
  'Creator Matched',
  'Product Shipping',
  'Shoot In Progress',
  'Editing',
  'Client Review',
  'Revisions',
  'Approved',
  'Delivered'
];

interface OrdersViewProps {
  initialOpenNewModal?: boolean;
}

export const OrdersView: React.FC<OrdersViewProps> = ({ initialOpenNewModal = false }) => {
  const { orders, clients, createOrder, updateOrderStatus } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(initialOpenNewModal);
  const [selectedPackage, setSelectedPackage] = useState<PackagePreset>(INITIAL_PACKAGES[1]);
  const [selectedClientId, setSelectedClientId] = useState<string>(clients[0]?.id || '');
  const [dueDate, setDueDate] = useState<string>('2026-10-05');
  const [targetAudience, setTargetAudience] = useState<string>('Gen Z & Millennial consumers, active lifestyle');
  const [notes, setNotes] = useState<string>('');

  const handleCreateOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find(c => c.id === selectedClientId);
    if (!client) return;

    createOrder({
      clientId: client.id,
      clientCompanyName: client.companyName,
      packageName: selectedPackage.name,
      totalVideos: selectedPackage.videosCount,
      stage: 'Order Placed',
      amount: selectedPackage.price,
      paid: false,
      dueDate,
      notes,
      targetAudience,
      keySellingPoints: ['High organic retention hook', 'Subtitles & sound design', 'Conversion CTA']
    });

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141414] p-5 rounded-2xl border border-[#262626]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">Orders & UGC Packages</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/30">
              {orders.length} Active Pipelines
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Manage agency creative packages, delivery schedules, and client production stages.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-[#111111] font-bold text-xs rounded-lg transition-colors shadow-sm shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer"
          id="create-order-btn"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Client Order</span>
        </button>
      </div>

      {/* Packages Presets Showcase */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
            Standard UGC Packages Catalog
          </h2>
          <span className="text-xs text-neutral-500">Fixed rate deliverables</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {INITIAL_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-[#141414] p-4 rounded-xl border border-[#262626] hover:border-amber-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-sm text-white">{pkg.name}</h3>
                  <span className="text-xs font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded">
                    ${pkg.price.toLocaleString()}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-1.5 leading-relaxed">
                  {pkg.description}
                </p>

                <div className="mt-3 space-y-1.5">
                  {pkg.features.slice(0, 3).map((feat, i) => (
                    <div key={i} className="text-[11px] text-neutral-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-amber-500 flex-shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#262626] flex items-center justify-between">
                <span className="text-[10px] text-neutral-500 font-mono">
                  {pkg.videosCount} Videos • {pkg.turnaroundDays}d turnaround
                </span>
                <button
                  onClick={() => {
                    setSelectedPackage(pkg);
                    setIsModalOpen(true);
                  }}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300"
                >
                  Book →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Orders List & Flow Tracker */}
      <div className="bg-[#141414] rounded-xl border border-[#262626] overflow-hidden">
        <div className="p-4 border-b border-[#262626]">
          <h2 className="text-sm font-bold text-white">Active Client Orders & Progression</h2>
        </div>

        <div className="divide-y divide-[#222222]">
          {orders.map((order) => {
            const currentStageIndex = ORDER_STAGES.indexOf(order.stage);
            return (
              <div key={order.id} className="p-5 hover:bg-[#181818] transition-colors space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-400">{order.orderNumber}</span>
                      <span className="text-sm font-bold text-white">{order.packageName}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-medium">
                        {order.totalVideos} Creatives
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Client: <strong className="text-white">{order.clientCompanyName}</strong> • Amount: ${order.amount.toLocaleString()} {order.paid ? '(Paid)' : '(Invoice Pending)'}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-[11px] text-neutral-400">Target Delivery</div>
                      <div className="text-xs font-semibold text-white font-mono">{order.dueDate}</div>
                    </div>

                    {/* Fast stage stepper select */}
                    <select
                      value={order.stage}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStage)}
                      className="bg-[#222] hover:bg-[#282828] text-amber-400 border border-[#383838] text-xs rounded-lg px-2.5 py-1.5 font-semibold focus:outline-none focus:border-amber-500"
                    >
                      {ORDER_STAGES.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 11-step visual progression bar */}
                <div className="pt-2">
                  <div className="flex items-center justify-between text-[10px] text-neutral-500 mb-1 font-medium">
                    <span>Order Inception</span>
                    <span className="text-amber-400 font-semibold">Stage: {order.stage}</span>
                    <span>Master Delivery</span>
                  </div>
                  <div className="w-full bg-[#222] h-2 rounded-full overflow-hidden flex">
                    <div
                      className="bg-amber-500 h-full rounded-full transition-all duration-300 shadow-sm shadow-amber-500/50"
                      style={{
                        width: `${Math.max(8, ((currentStageIndex + 1) / ORDER_STAGES.length) * 100)}%`
                      }}
                    />
                  </div>
                </div>

                {order.targetAudience && (
                  <div className="text-[11px] text-neutral-400 bg-[#1c1c1c] p-2 rounded-lg border border-[#2b2b2b]">
                    <span className="text-neutral-300 font-semibold">Audience Focus: </span>
                    {order.targetAudience}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* NEW ORDER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#141414] border border-[#2e2e2e] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl text-white">
            <div className="px-6 py-4 border-b border-[#262626] flex items-center justify-between bg-[#181818]">
              <h2 className="text-base font-bold text-white">Create New Client Order</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#252525]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateOrderSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Select Client</label>
                <select
                  value={selectedClientId}
                  onChange={(e) => setSelectedClientId(e.target.value)}
                  className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2.5 border border-[#333] focus:border-amber-500 focus:outline-none"
                  required
                >
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.companyName} ({c.contactPerson})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Select Package</label>
                <select
                  value={selectedPackage.id}
                  onChange={(e) => {
                    const found = INITIAL_PACKAGES.find(p => p.id === e.target.value);
                    if (found) setSelectedPackage(found);
                  }}
                  className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2.5 border border-[#333] focus:border-amber-500 focus:outline-none"
                >
                  {INITIAL_PACKAGES.map(p => (
                    <option key={p.id} value={p.id}>{p.name} - ${p.price} ({p.videosCount} vids)</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">Package Price ($)</label>
                  <input
                    type="number"
                    readOnly
                    value={selectedPackage.price}
                    className="w-full bg-[#202020] text-amber-400 font-bold text-xs rounded-lg px-3 py-2.5 border border-[#333]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">Target Delivery Date</label>
                  <input
                    type="date"
                    required
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2.5 border border-[#333] focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Target Audience & Niche</label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g. Females 25-40 with dry skin"
                  className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2.5 border border-[#333] focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Specific Brief Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Key products to shoot, shipping guidelines..."
                  className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg p-2.5 border border-[#333] focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-[#262626] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#222] text-neutral-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-[#111111] text-xs font-bold transition-colors cursor-pointer"
                >
                  Create & Initialize Pipeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
