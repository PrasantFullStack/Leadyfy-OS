import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PaymentInvoice } from '../types';
import {
  DollarSign,
  Plus,
  TrendingUp,
  CreditCard,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  Filter,
  X
} from 'lucide-react';

export const PaymentsView: React.FC = () => {
  const { invoices, clients, orders, markInvoicePaid, createInvoice, role } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Paid' | 'Pending'>('All');

  // New invoice state
  const [selectedClientId, setSelectedClientId] = useState(clients[0]?.id || '');
  const [amount, setAmount] = useState(3200);
  const [creatorPayout, setCreatorPayout] = useState(1400);
  const [dueDate, setDueDate] = useState('2026-09-30');

  // Calculations
  const totalBilled = invoices.reduce((acc, curr) => acc + curr.amount, 0);
  const paidRevenue = invoices.filter(i => i.status === 'Paid').reduce((acc, curr) => acc + curr.amount, 0);
  const pendingRevenue = invoices.filter(i => i.status === 'Pending').reduce((acc, curr) => acc + curr.amount, 0);
  const totalCreatorPayouts = invoices.reduce((acc, curr) => acc + curr.creatorPayout, 0);
  const totalGrossMargin = totalBilled - totalCreatorPayouts;
  const marginPct = totalBilled > 0 ? Math.round((totalGrossMargin / totalBilled) * 100) : 0;

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find(c => c.id === selectedClientId);
    if (!client) return;

    createInvoice({
      clientId: client.id,
      clientCompanyName: client.companyName,
      orderId: 'ord-101',
      amount,
      creatorPayout,
      agencyMargin: amount - creatorPayout,
      status: 'Pending',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate
    });

    setIsModalOpen(false);
  };

  const filteredInvoices = invoices.filter(inv => {
    if (statusFilter === 'All') return true;
    return inv.status === statusFilter;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141414] p-5 rounded-2xl border border-[#262626]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">Payments & Agency Margin Tracking</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/30">
              ${paidRevenue.toLocaleString()} Collected
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Client billing, creator compensation payouts, and net agency margin analytics.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-[#111111] font-bold text-xs rounded-lg transition-colors shadow-sm shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Issue Client Invoice</span>
        </button>
      </div>

      {/* Financial Health KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#141414] p-4 rounded-xl border border-[#262626]">
          <span className="text-xs text-neutral-400 font-medium">Total Billed Revenue</span>
          <div className="text-2xl font-bold text-white mt-1.5">${totalBilled.toLocaleString()}</div>
          <p className="text-[11px] text-neutral-500 mt-1">Across all retainer packages</p>
        </div>

        <div className="bg-[#141414] p-4 rounded-xl border border-[#262626]">
          <span className="text-xs text-neutral-400 font-medium">Pending Invoices</span>
          <div className="text-2xl font-bold text-amber-400 mt-1.5">${pendingRevenue.toLocaleString()}</div>
          <p className="text-[11px] text-amber-400/80 mt-1">Due within 7 days</p>
        </div>

        <div className="bg-[#141414] p-4 rounded-xl border border-[#262626]">
          <span className="text-xs text-neutral-400 font-medium">Creator Compensation</span>
          <div className="text-2xl font-bold text-neutral-300 mt-1.5">${totalCreatorPayouts.toLocaleString()}</div>
          <p className="text-[11px] text-neutral-500 mt-1">Direct UGC creator talent costs</p>
        </div>

        <div className="bg-[#141414] p-4 rounded-xl border border-[#262626] bg-gradient-to-br from-[#141414] to-emerald-950/20">
          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Net Agency Margin</span>
          </span>
          <div className="text-2xl font-bold text-white mt-1.5">${totalGrossMargin.toLocaleString()}</div>
          <p className="text-[11px] text-emerald-400/90 mt-1 font-bold">{marginPct}% Net Retention</p>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-[#141414] rounded-xl border border-[#262626] overflow-hidden">
        <div className="p-4 border-b border-[#262626] flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Invoices & Payment Status</h3>
          <div className="flex items-center gap-1.5 text-xs">
            {(['All', 'Paid', 'Pending'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                  statusFilter === tab
                    ? 'bg-amber-500 text-[#111] font-bold'
                    : 'bg-[#202020] text-neutral-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#181818] text-neutral-400 text-[11px] uppercase tracking-wider border-b border-[#262626]">
              <tr>
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Client Company</th>
                <th className="py-3 px-4">Issued / Due</th>
                <th className="py-3 px-4">Billed Amount</th>
                <th className="py-3 px-4">Creator Cost</th>
                <th className="py-3 px-4">Agency Net</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222]">
              {filteredInvoices.map(inv => (
                <tr key={inv.id} className="hover:bg-[#1a1a1a] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-white">{inv.invoiceNumber}</td>
                  <td className="py-3.5 px-4 font-semibold text-neutral-200">{inv.clientCompanyName}</td>
                  <td className="py-3.5 px-4 text-neutral-400">
                    <div>{inv.issueDate}</div>
                    <div className="text-[10px] text-neutral-500">Due {inv.dueDate}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-white">${inv.amount.toLocaleString()}</td>
                  <td className="py-3.5 px-4 font-mono text-neutral-400">${inv.creatorPayout.toLocaleString()}</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-400 font-semibold">+${inv.agencyMargin.toLocaleString()}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      inv.status === 'Paid'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {inv.status === 'Pending' ? (
                      <button
                        onClick={() => markInvoicePaid(inv.id)}
                        className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] transition-colors"
                      >
                        Mark as Paid
                      </button>
                    ) : (
                      <span className="text-[11px] text-neutral-500 font-mono">
                        Paid on {inv.paidAt || inv.dueDate}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* NEW INVOICE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#141414] border border-[#2e2e2e] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl text-white">
            <div className="px-6 py-4 border-b border-[#262626] flex items-center justify-between bg-[#181818]">
              <h2 className="text-base font-bold text-white">Generate Client Invoice</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Select Client</label>
                <select
                  value={selectedClientId}
                  onChange={(e) => setSelectedClientId(e.target.value)}
                  className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2 border border-[#333] focus:border-amber-500 focus:outline-none"
                >
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.companyName}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">Invoice Amount ($)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2 border border-[#333] focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">Creator Payout ($)</label>
                  <input
                    type="number"
                    value={creatorPayout}
                    onChange={(e) => setCreatorPayout(Number(e.target.value))}
                    className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2 border border-[#333] focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Payment Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2 border border-[#333] focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="p-3 rounded-lg bg-[#181818] border border-[#262626] text-xs space-y-1">
                <div className="flex justify-between text-neutral-400">
                  <span>Projected Net Margin:</span>
                  <span className="font-mono text-emerald-400 font-bold">${(amount - creatorPayout).toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#262626] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#222] text-neutral-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-[#111] text-xs font-bold transition-colors cursor-pointer"
                >
                  Issue Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
