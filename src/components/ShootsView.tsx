import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shoot, ShootStatus } from '../types';
import {
  CalendarDays,
  Plus,
  Truck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Video,
  FileText,
  MapPin,
  X,
  PackageCheck
} from 'lucide-react';

const SHOOT_STATUSES: ShootStatus[] = [
  'Scheduled',
  'Product Sent',
  'Product Delivered',
  'Filming',
  'Raw Uploaded',
  'Completed'
];

export const ShootsView: React.FC = () => {
  const { shoots, creators, clients, orders, scheduleShoot, updateShootStatus } = useApp();
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [activeTrackingEditId, setActiveTrackingEditId] = useState<string | null>(null);
  const [trackingNumberInput, setTrackingNumberInput] = useState('');
  const [rawLinkInput, setRawLinkInput] = useState('');

  // New Shoot Form
  const [clientId, setClientId] = useState(clients[0]?.id || '');
  const [creatorId, setCreatorId] = useState(creators[0]?.id || '');
  const [productName, setProductName] = useState('');
  const [scheduledDate, setScheduledDate] = useState('2026-09-25');
  const [trackingNumber, setTrackingNumber] = useState('1Z9999999999999999');
  const [shippingCarrier, setShippingCarrier] = useState('UPS Express');
  const [callSheetNotes, setCallSheetNotes] = useState('Film 3 distinct hook variations, 2 macro product B-roll shots, 1 lifestyle usage clip.');

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find(c => c.id === clientId);
    const creator = creators.find(cr => cr.id === creatorId);
    const relatedOrder = orders.find(o => o.clientId === clientId);

    scheduleShoot({
      orderId: relatedOrder?.id || 'ord-101',
      clientId: client?.id || 'cli-1',
      clientCompanyName: client?.companyName || 'Lumina Skin Labs',
      creatorId: creator?.id || 'crt-1',
      creatorName: creator?.name || 'Maya Lin',
      productName: productName || 'Hero Brand Product Sample',
      scheduledDate,
      status: 'Scheduled',
      trackingNumber,
      shippingCarrier,
      callSheetNotes
    });

    setIsNewModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141414] p-5 rounded-2xl border border-[#262626]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">Shoot Scheduling & Product Logistics</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/30">
              {shoots.length} Production Shoots
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Track product sample seeding, shipping carrier tracking numbers, creator call sheets, and raw footage intake.
          </p>
        </div>

        <button
          onClick={() => setIsNewModalOpen(true)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-[#111111] font-bold text-xs rounded-lg transition-colors shadow-sm shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Schedule Creator Shoot</span>
        </button>
      </div>

      {/* Shoots Grid / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {shoots.map((shoot) => {
          const creator = creators.find(c => c.id === shoot.creatorId);
          return (
            <div
              key={shoot.id}
              className="bg-[#141414] rounded-xl border border-[#262626] p-5 flex flex-col justify-between hover:border-[#333] transition-all space-y-4"
            >
              <div>
                {/* Header: Creator & Status */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono text-neutral-500">Shoot #{shoot.id}</span>
                    <h3 className="text-sm font-bold text-white mt-0.5">{shoot.creatorName}</h3>
                    <div className="text-[11px] text-amber-400 font-medium">{shoot.clientCompanyName}</div>
                  </div>

                  <select
                    value={shoot.status}
                    onChange={(e) => updateShootStatus(shoot.id, e.target.value as ShootStatus)}
                    className="text-[11px] font-semibold bg-[#222] text-amber-400 border border-[#3a3a3a] rounded-lg px-2 py-1 focus:outline-none"
                  >
                    {SHOOT_STATUSES.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                {/* Product & Date */}
                <div className="mt-3 p-3 rounded-lg bg-[#1a1a1a] border border-[#2b2b2b] space-y-1.5 text-xs">
                  <div className="text-neutral-400">
                    <span className="text-neutral-500 font-medium">Product: </span>
                    <span className="text-white font-semibold">{shoot.productName}</span>
                  </div>
                  <div className="text-neutral-400 flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5 text-amber-400" />
                    <span>Target Shoot Date: <strong className="text-white">{shoot.scheduledDate}</strong></span>
                  </div>
                </div>

                {/* Shipping logistics tracker */}
                <div className="mt-3 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-neutral-400 flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-blue-400" />
                      <span>{shoot.shippingCarrier || 'USPS Priority'}</span>
                    </span>
                    <span className="font-mono text-neutral-300">{shoot.trackingNumber || 'Pending Label'}</span>
                  </div>

                  {creator && (
                    <div className="text-[10px] text-neutral-500 flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{creator.shippingAddress}</span>
                    </div>
                  )}
                </div>

                {/* Call sheet notes */}
                {shoot.callSheetNotes && (
                  <div className="mt-3 p-2.5 rounded-lg bg-[#181818] border border-[#262626] text-[11px] text-neutral-300">
                    <span className="font-semibold text-neutral-400 block mb-0.5">Call Sheet Brief:</span>
                    {shoot.callSheetNotes}
                  </div>
                )}
              </div>

              {/* Footage link or Upload Action */}
              <div className="pt-3 border-t border-[#262626] flex items-center justify-between text-xs">
                {shoot.rawFootageLink ? (
                  <a
                    href={shoot.rawFootageLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-400 hover:underline flex items-center gap-1 font-semibold text-[11px]"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Raw Footage Folder →</span>
                  </a>
                ) : (
                  <button
                    onClick={() => {
                      const link = prompt('Paste Google Drive / Dropbox link for raw footage uploads:');
                      if (link) updateShootStatus(shoot.id, 'Raw Uploaded', { rawFootageLink: link });
                    }}
                    className="text-[11px] text-neutral-400 hover:text-white underline"
                  >
                    + Attach Footage Link
                  </button>
                )}

                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                    shoot.status === 'Completed' || shoot.status === 'Raw Uploaded'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-amber-500/10 text-amber-400'
                  }`}
                >
                  {shoot.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* SCHEDULE SHOOT MODAL */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#141414] border border-[#2e2e2e] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl text-white">
            <div className="px-6 py-4 border-b border-[#262626] flex items-center justify-between bg-[#181818]">
              <h2 className="text-base font-bold text-white">Schedule Creator UGC Shoot</h2>
              <button
                onClick={() => setIsNewModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleScheduleSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Client Brand</label>
                <select
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2.5 border border-[#333] focus:border-amber-500 focus:outline-none"
                >
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.companyName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Assign Vetted Creator</label>
                <select
                  value={creatorId}
                  onChange={(e) => setCreatorId(e.target.value)}
                  className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2.5 border border-[#333] focus:border-amber-500 focus:outline-none"
                >
                  {creators.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.niche.join(', ')}) - ${c.ratePerVideo}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Product Sample Shipped</label>
                <input
                  type="text"
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. Night Glow Serum (2x bottles)"
                  className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2 border border-[#333] focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">Shipping Carrier</label>
                  <input
                    type="text"
                    value={shippingCarrier}
                    onChange={(e) => setShippingCarrier(e.target.value)}
                    placeholder="UPS / FedEx / USPS"
                    className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2 border border-[#333] focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">Tracking Number</label>
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="1Z99999999..."
                    className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2 border border-[#333] focus:border-amber-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Target Filming Date</label>
                <input
                  type="date"
                  required
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2 border border-[#333] focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Call Sheet & Shot List Brief</label>
                <textarea
                  rows={2}
                  value={callSheetNotes}
                  onChange={(e) => setCallSheetNotes(e.target.value)}
                  className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg p-2.5 border border-[#333] focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-[#262626] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#222] text-neutral-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-[#111] text-xs font-bold transition-colors cursor-pointer"
                >
                  Schedule & Dispatch Brief
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
