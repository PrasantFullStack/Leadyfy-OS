import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FolderLock,
  CheckCircle2,
  Clock,
  Video,
  FileText,
  DollarSign,
  Download,
  Play,
  MessageSquare,
  AlertTriangle,
  Building2,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Send,
  X
} from 'lucide-react';
import { VideoProductionItem, Script } from '../types';

export const ClientPortalView: React.FC = () => {
  const {
    clients,
    selectedClientId,
    setSelectedClientId,
    orders,
    scripts,
    videos,
    invoices,
    submitScriptFeedback,
    approveScript,
    clientApproveVideo,
    clientRequestVideoRevision,
    addVideoFeedback,
    role,
    setRole
  } = useApp();

  const [activeTab, setActiveTab] = useState<'pending' | 'videos' | 'scripts' | 'invoices' | 'brand'>('pending');
  const [activeVideoModal, setActiveVideoModal] = useState<VideoProductionItem | null>(null);
  const [activeScriptModal, setActiveScriptModal] = useState<Script | null>(null);

  const [revisionNote, setRevisionNote] = useState('');
  const [scriptRevisionNote, setScriptRevisionNote] = useState('');

  const currentClient = clients.find(c => c.id === selectedClientId) || clients[0];

  // Filter items for THIS client only (Strict Isolation!)
  const clientOrders = orders.filter(o => o.clientId === currentClient?.id);
  const clientScripts = scripts.filter(s => s.clientId === currentClient?.id);
  const clientVideos = videos.filter(v => v.clientId === currentClient?.id);
  const clientInvoices = invoices.filter(i => i.clientId === currentClient?.id);

  // Pending items requiring client action
  const pendingVideos = clientVideos.filter(v => v.stage === 'Client Review' || v.clientApprovalStatus === 'Pending');
  const pendingScripts = clientScripts.filter(s => s.status === 'Sent to Client');
  const totalPendingActions = pendingVideos.length + pendingScripts.length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Brand Header & Portal Identity */}
      <div className="bg-[#141414] rounded-2xl border border-purple-900/40 p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-amber-500 flex items-center justify-center font-bold text-white text-2xl shadow-lg shadow-purple-950/50">
              {currentClient?.companyName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white tracking-tight">{currentClient?.companyName}</h1>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-purple-400" />
                  Isolated Client Portal
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Welcome back, <strong className="text-neutral-200">{currentClient?.contactPerson}</strong>. Review your UGC scripts, test variations, and approve video masters.
              </p>
            </div>
          </div>

          {/* Quick Stats Banner */}
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#1c1c1c] border border-[#2e2e2e] text-left">
              <span className="text-[10px] text-neutral-500 font-medium uppercase">Pending Approvals</span>
              <div className="text-lg font-bold text-amber-400 mt-0.5">
                {totalPendingActions} Items Waiting
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#1c1c1c] border border-[#2e2e2e] text-left">
              <span className="text-[10px] text-neutral-500 font-medium uppercase">Active UGC Creatives</span>
              <div className="text-lg font-bold text-white mt-0.5">
                {clientVideos.length} in Pipeline
              </div>
            </div>

            {/* Quick Agency view switch button for testing */}
            {role === 'client' && (
              <button
                onClick={() => setRole('owner')}
                className="px-3 py-2 rounded-xl bg-[#222] hover:bg-[#2c2c2c] text-neutral-300 text-xs font-semibold border border-[#333] transition-colors"
                title="Switch back to Agency Owner mode"
              >
                Exit to Agency Hub →
              </button>
            )}
          </div>
        </div>

        {/* Portal Tabs Bar */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-[#262626] overflow-x-auto scrollbar-thin">
          {[
            { id: 'pending', label: 'Action Required', badge: totalPendingActions, icon: AlertTriangle },
            { id: 'videos', label: 'Video Creatives', badge: clientVideos.length, icon: Video },
            { id: 'scripts', label: 'Scripts Workflow', badge: clientScripts.length, icon: FileText },
            { id: 'invoices', label: 'Invoices & Billing', badge: clientInvoices.length, icon: DollarSign },
            { id: 'brand', label: 'Brand Kit & Assets', icon: Building2 },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'bg-[#1a1a1a] text-neutral-400 hover:text-white hover:bg-[#222]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-white text-purple-900' : 'bg-[#262626] text-neutral-300'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: PENDING APPROVALS (High Priority) */}
      {activeTab === 'pending' && (
        <div className="space-y-6">
          {totalPendingActions === 0 ? (
            <div className="bg-[#141414] rounded-2xl border border-[#262626] p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">All Caught Up!</h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                There are no pending scripts or video cuts requiring your review right now. Our creative team is currently in production.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Videos waiting for Client Review */}
              {pendingVideos.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Video className="w-4 h-4" />
                    <span>Videos Awaiting Your Review & Approval ({pendingVideos.length})</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pendingVideos.map(video => (
                      <div
                        key={video.id}
                        className="bg-[#141414] rounded-xl border border-amber-500/40 p-4 hover:border-amber-500 transition-all flex flex-col justify-between space-y-3"
                      >
                        <div className="flex gap-3">
                          <div
                            onClick={() => setActiveVideoModal(video)}
                            className="w-20 h-28 rounded-lg bg-neutral-900 overflow-hidden relative cursor-pointer group flex-shrink-0 border border-[#333]"
                          >
                            <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Play className="w-6 h-6 text-amber-400 fill-current" />
                            </div>
                            <span className="absolute bottom-1 right-1 text-[9px] bg-black/80 text-white px-1 rounded font-mono">
                              {video.durationSeconds}s
                            </span>
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-sm text-white truncate">{video.title}</h4>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-300 font-mono">
                                v{video.version}
                              </span>
                            </div>
                            <p className="text-xs text-neutral-400 mt-1">Creator: {video.creatorName}</p>
                            <p className="text-[11px] text-neutral-500 mt-0.5">Due date: {video.dueDate}</p>
                            <div className="mt-2 text-[11px] text-amber-400 font-medium">
                              {video.feedbacks.length} editor notes attached
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2 border-t border-[#262626]">
                          <button
                            onClick={() => setActiveVideoModal(video)}
                            className="flex-1 py-2 rounded-lg bg-[#222] hover:bg-[#2c2c2c] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Play className="w-3.5 h-3.5" />
                            <span>Watch & Give Feedback</span>
                          </button>

                          <button
                            onClick={() => clientApproveVideo(video.id, 'Approved directly via Client Portal.')}
                            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Approve Cut</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Scripts waiting for Client Review */}
              {pendingScripts.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-4 h-4" />
                    <span>Scripts Awaiting Your Sign-Off ({pendingScripts.length})</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pendingScripts.map(script => (
                      <div
                        key={script.id}
                        className="bg-[#141414] rounded-xl border border-amber-500/40 p-4 flex flex-col justify-between space-y-3"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-bold text-sm text-white">{script.title}</h4>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">
                              v{script.version} Sent
                            </span>
                          </div>
                          <p className="text-xs text-neutral-400 mt-1">Product: {script.productName}</p>

                          <div className="mt-2.5 p-2.5 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-xs text-neutral-300">
                            <span className="font-semibold text-amber-400 block mb-1">Testing {script.hooks.length} Hooks:</span>
                            <div className="space-y-1 italic text-neutral-400 text-[11px]">
                              {script.hooks.map((h, i) => (
                                <div key={h.id}>#{i + 1}: "{h.text.slice(0, 70)}..."</div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2 border-t border-[#262626]">
                          <button
                            onClick={() => setActiveScriptModal(script)}
                            className="flex-1 py-2 rounded-lg bg-[#222] hover:bg-[#2c2c2c] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <span>Read Full Script & Suggest Edits</span>
                          </button>

                          <button
                            onClick={() => approveScript(script.id)}
                            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ALL VIDEO CREATIVES & DOWNLOAD DELIVERIES */}
      {activeTab === 'videos' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">All UGC Video Deliverables</h3>
            <span className="text-xs text-neutral-400">High-res 4K masters available for download upon approval</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clientVideos.map(video => {
              const isDelivered = video.stage === 'Delivered';
              return (
                <div
                  key={video.id}
                  className="bg-[#141414] rounded-xl border border-[#262626] p-4 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div
                      onClick={() => setActiveVideoModal(video)}
                      className="relative w-full h-44 rounded-lg bg-black overflow-hidden cursor-pointer group border border-[#333]"
                    >
                      <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-8 h-8 text-amber-400 fill-current" />
                      </div>
                      <span className="absolute top-2 left-2 text-[10px] bg-black/80 text-white px-2 py-0.5 rounded font-mono">
                        {video.aspectRatio}
                      </span>
                      <span className="absolute bottom-2 right-2 text-[10px] bg-black/80 text-white px-2 py-0.5 rounded font-mono">
                        {video.durationSeconds}s
                      </span>
                    </div>

                    <div className="mt-3">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-xs text-white leading-tight">{video.title}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-neutral-800 text-neutral-300">
                          {video.stage}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1">Creator: {video.creatorName}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#262626] flex items-center justify-between">
                    <button
                      onClick={() => setActiveVideoModal(video)}
                      className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
                    >
                      Review Cut →
                    </button>

                    {isDelivered && (
                      <a
                        href={video.deliveryDownloadUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download 4K Master</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: SCRIPTS WORKFLOW */}
      {activeTab === 'scripts' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Your Brand's Formulated UGC Scripts</h3>
          </div>

          <div className="space-y-3">
            {clientScripts.map(script => (
              <div
                key={script.id}
                className="bg-[#141414] rounded-xl border border-[#262626] p-5 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-white">{script.title}</h4>
                    <p className="text-xs text-neutral-400">Product: {script.productName} • Version {script.version}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        script.status === 'Approved'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {script.status}
                    </span>

                    {script.status !== 'Approved' && (
                      <button
                        onClick={() => approveScript(script.id)}
                        className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                      >
                        Approve
                      </button>
                    )}
                  </div>
                </div>

                {/* Hooks */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {script.hooks.map((h, i) => (
                    <div key={h.id} className="p-3 rounded-lg bg-[#191919] border border-[#282828] text-xs">
                      <div className="text-[10px] font-bold text-amber-400 uppercase">Hook Angle #{i + 1}</div>
                      <p className="text-white mt-1 italic">"{h.text}"</p>
                      <div className="text-[10px] text-neutral-500 mt-1">Visual: {h.visualCue}</div>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-lg bg-[#181818] border border-[#262626] text-xs text-neutral-300 font-sans whitespace-pre-line">
                  {script.body}
                </div>

                {script.clientFeedback && (
                  <div className="text-xs text-purple-300 bg-purple-950/30 p-2.5 rounded-lg border border-purple-800/40">
                    <strong>Your feedback:</strong> {script.clientFeedback}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: INVOICES & BILLING */}
      {activeTab === 'invoices' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Invoices & Creative Package Retainers</h3>
          </div>

          <div className="bg-[#141414] rounded-xl border border-[#262626] overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#181818] text-neutral-400 text-[11px] uppercase tracking-wider border-b border-[#262626]">
                <tr>
                  <th className="py-3 px-4">Invoice #</th>
                  <th className="py-3 px-4">Issued</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#222]">
                {clientInvoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-[#1a1a1a]">
                    <td className="py-3 px-4 font-mono font-bold text-white">{inv.invoiceNumber}</td>
                    <td className="py-3 px-4 text-neutral-400">{inv.issueDate}</td>
                    <td className="py-3 px-4 text-neutral-400">{inv.dueDate}</td>
                    <td className="py-3 px-4 font-mono text-white font-bold">${inv.amount.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => alert(`Downloading official PDF receipt for ${inv.invoiceNumber}`)}
                        className="text-amber-400 hover:underline text-xs"
                      >
                        PDF Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: BRAND KIT */}
      {activeTab === 'brand' && (
        <div className="bg-[#141414] rounded-xl border border-[#262626] p-6 space-y-4">
          <h3 className="text-sm font-bold text-white">Brand Guidelines & Shared Creative Assets</h3>
          <p className="text-xs text-neutral-400">
            Assets used by our creators and post-production editors for font pairings, color codes, and approved logos.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-4 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] space-y-2">
              <span className="font-semibold text-neutral-300">Primary Brand Colors</span>
              <div className="flex items-center gap-2 mt-1">
                {(currentClient?.brandColors || ['#F59E0B', '#111111']).map((c, i) => (
                  <div key={i} className="flex items-center gap-1 text-[11px] font-mono">
                    <span className="w-5 h-5 rounded-md border border-neutral-700" style={{ backgroundColor: c }} />
                    <span className="text-neutral-400">{c}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] space-y-2">
              <span className="font-semibold text-neutral-300">Brand Kit Cloud Folder</span>
              {currentClient?.brandGuidelinesUrl ? (
                <a
                  href={currentClient.brandGuidelinesUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Open Drive Folder</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-neutral-500">No folder linked yet.</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* VIDEO PREVIEW & FEEDBACK MODAL */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#141414] border border-[#2e2e2e] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl text-white">
            <div className="px-6 py-4 border-b border-[#262626] flex items-center justify-between bg-[#181818]">
              <div>
                <h3 className="font-bold text-sm text-white">{activeVideoModal.title}</h3>
                <p className="text-xs text-neutral-400">Creator: {activeVideoModal.creatorName} • Version {activeVideoModal.version}</p>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="aspect-[9/16] max-h-[380px] mx-auto bg-black rounded-xl overflow-hidden border border-[#333]">
                {activeVideoModal.videoPreviewUrl ? (
                  <video controls autoPlay src={activeVideoModal.videoPreviewUrl} className="w-full h-full object-contain" />
                ) : (
                  <img src={activeVideoModal.thumbnailUrl} alt="Preview" className="w-full h-full object-cover" />
                )}
              </div>

              {/* Revision remarks input */}
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Revision Request Notes (If changes are required)
                </label>
                <textarea
                  rows={2}
                  value={revisionNote}
                  onChange={(e) => setRevisionNote(e.target.value)}
                  placeholder="e.g. Please swap the opening hook to angle #2, and soften background music during product demo..."
                  className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg p-2.5 border border-[#333] focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-[#262626] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (revisionNote.trim()) {
                      clientRequestVideoRevision(activeVideoModal.id, revisionNote);
                      setRevisionNote('');
                      setActiveVideoModal(null);
                    } else {
                      alert('Please describe what revisions are needed before submitting.');
                    }
                  }}
                  className="px-4 py-2 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-200 text-xs font-bold border border-rose-800/60 cursor-pointer"
                >
                  Request Revision
                </button>

                <button
                  type="button"
                  onClick={() => {
                    clientApproveVideo(activeVideoModal.id, 'Approved by client via Portal.');
                    setActiveVideoModal(null);
                  }}
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve Video Cut</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SCRIPT MODAL */}
      {activeScriptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#141414] border border-[#2e2e2e] rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl text-white">
            <div className="px-6 py-4 border-b border-[#262626] flex items-center justify-between bg-[#181818]">
              <h3 className="font-bold text-sm text-white">{activeScriptModal.title}</h3>
              <button
                onClick={() => setActiveScriptModal(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">3 Hooks Matrix</h4>
                <div className="space-y-2">
                  {activeScriptModal.hooks.map((h, i) => (
                    <div key={h.id} className="p-2.5 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-xs">
                      <span className="font-bold text-white">Hook {i + 1} ({h.angle}): </span>
                      <span className="italic text-neutral-300">"{h.text}"</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Body Script</h4>
                <div className="p-3 rounded-lg bg-[#1a1a1a] text-xs text-neutral-300 font-sans whitespace-pre-line border border-[#2a2a2a]">
                  {activeScriptModal.body}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Script Revision Request</label>
                <textarea
                  rows={2}
                  value={scriptRevisionNote}
                  onChange={(e) => setScriptRevisionNote(e.target.value)}
                  placeholder="e.g. Ensure we mention we ship worldwide, change CTA..."
                  className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg p-2.5 border border-[#333] focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-[#262626] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (scriptRevisionNote.trim()) {
                      submitScriptFeedback(activeScriptModal.id, scriptRevisionNote, true);
                      setScriptRevisionNote('');
                      setActiveScriptModal(null);
                    } else {
                      alert('Please write revision remarks.');
                    }
                  }}
                  className="px-4 py-2 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-200 text-xs font-bold border border-rose-800/60"
                >
                  Send Revision Request
                </button>

                <button
                  type="button"
                  onClick={() => {
                    approveScript(activeScriptModal.id);
                    setActiveScriptModal(null);
                  }}
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve Script</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
