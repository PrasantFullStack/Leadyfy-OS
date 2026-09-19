import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Script, ScriptStatus, ScriptHook } from '../types';
import {
  FileText,
  Plus,
  Sparkles,
  CheckCircle2,
  Clock,
  MessageSquare,
  Send,
  Eye,
  Edit3,
  X,
  ChevronRight,
  Flame,
  AlertTriangle
} from 'lucide-react';

export const ScriptsView: React.FC = () => {
  const { scripts, clients, orders, addScript, updateScript, approveScript, submitScriptFeedback, role } = useApp();
  const [selectedScriptId, setSelectedScriptId] = useState<string>(scripts[0]?.id || '');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [feedbackInput, setFeedbackInput] = useState('');

  // New script form state
  const [newOrderClientId, setNewOrderClientId] = useState(clients[0]?.id || '');
  const [newTitle, setNewTitle] = useState('');
  const [newProductName, setNewProductName] = useState('');
  const [newHook1, setNewHook1] = useState('Stop scrolling if you are still using outdated moisturizers...');
  const [newHook2, setNewHook2] = useState('I tested 4 different peptide serums so you do not have to...');
  const [newHook3, setNewHook3] = useState('The #1 reason your makeup pills by midday...');
  const [newBody, setNewBody] = useState('[0:05] "Most people have no idea that harsh surfactants destroy your moisture barrier."\n[0:15] "Here is the exact formula dermatologists are raving about."');
  const [newCta, setNewCta] = useState('Tap the link below to get 20% off your starter kit before it sells out.');

  const currentScript = scripts.find(s => s.id === selectedScriptId) || scripts[0];

  const handleCreateScript = (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find(c => c.id === newOrderClientId);
    const relatedOrder = orders.find(o => o.clientId === newOrderClientId);

    addScript({
      orderId: relatedOrder?.id || 'ord-101',
      clientId: client?.id || 'cli-1',
      clientCompanyName: client?.companyName || 'Lumina Skin Labs',
      title: newTitle || `${newProductName} - Performance UGC Concept`,
      productName: newProductName || 'Hero Product',
      status: 'Draft',
      version: 1,
      hooks: [
        { id: `hk-${Date.now()}-1`, angle: 'Scroll-Stopper Warning', text: newHook1, visualCue: 'Extreme close up, urgent hand gesture.' },
        { id: `hk-${Date.now()}-2`, angle: 'Curiosity / Comparison', text: newHook2, visualCue: 'Product comparison side-by-side.' },
        { id: `hk-${Date.now()}-3`, angle: 'Relatable Frustration', text: newHook3, visualCue: 'Real-life lighting mirror reflection.' }
      ],
      body: newBody,
      callToAction: newCta,
      voiceoverNotes: 'Casual, fast-paced, high energy, zero monotone.'
    });

    setIsNewModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141414] p-5 rounded-2xl border border-[#262626]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">Scripts & UGC Formulation Workflow</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/30">
              {scripts.length} Concepts
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Formulate high-converting UGC 3-hook test matrices, body persuasion blocks, and client approval rounds.
          </p>
        </div>

        <button
          onClick={() => setIsNewModalOpen(true)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-[#111111] font-bold text-xs rounded-lg transition-colors shadow-sm shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Draft New Script</span>
        </button>
      </div>

      {/* Script Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Script directory list */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider px-1">
            Script Catalog & Status
          </div>

          <div className="space-y-2.5">
            {scripts.map((script) => {
              const isSelected = script.id === currentScript?.id;
              return (
                <div
                  key={script.id}
                  onClick={() => setSelectedScriptId(script.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-[#1e1e1e] border-amber-500/60 shadow-lg'
                      : 'bg-[#141414] border-[#262626] hover:border-[#383838]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-white leading-snug line-clamp-1">
                      {script.title}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border whitespace-nowrap ${
                        script.status === 'Approved'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : script.status === 'Sent to Client'
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                          : script.status === 'Revision Requested'
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                          : 'bg-[#222] text-neutral-400 border-[#333]'
                      }`}
                    >
                      {script.status}
                    </span>
                  </div>

                  <div className="text-[11px] text-neutral-400 mt-1">
                    Client: <strong className="text-neutral-300">{script.clientCompanyName}</strong>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-neutral-500 mt-2.5 pt-2 border-t border-[#262626]">
                    <span>v{script.version} • {script.hooks.length} Hooks</span>
                    <span>Updated {script.updatedAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column: Script Detail & Hooks Matrix Editor */}
        <div className="lg:col-span-8">
          {currentScript ? (
            <div className="bg-[#141414] rounded-xl border border-[#262626] p-6 space-y-6">
              {/* Script Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#262626]">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-white">{currentScript.title}</h2>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                      v{currentScript.version}.0
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Product: <span className="text-white font-semibold">{currentScript.productName}</span> • Client: {currentScript.clientCompanyName}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {/* Status update buttons */}
                  {currentScript.status !== 'Approved' && (
                    <button
                      onClick={() => approveScript(currentScript.id)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve Script</span>
                    </button>
                  )}

                  <select
                    value={currentScript.status}
                    onChange={(e) => updateScript(currentScript.id, { status: e.target.value as ScriptStatus })}
                    className="bg-[#202020] text-amber-400 border border-[#383838] text-xs rounded-lg px-2.5 py-1.5 font-semibold focus:outline-none focus:border-amber-500"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Internal Review">Internal Review</option>
                    <option value="Sent to Client">Sent to Client</option>
                    <option value="Revision Requested">Revision Requested</option>
                    <option value="Approved">Approved</option>
                  </select>
                </div>
              </div>

              {/* Client Revision Notice if exists */}
              {currentScript.clientFeedback && (
                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-800/40 text-xs text-purple-200">
                  <div className="flex items-center gap-2 font-bold text-purple-300 mb-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>Client Feedback / Revision Request Notes:</span>
                  </div>
                  <p className="italic text-purple-200/90 pl-6">"{currentScript.clientFeedback}"</p>
                </div>
              )}

              {/* UGC 3-Hooks Test Matrix */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                      UGC 3-Hook Testing Matrix (0:00 - 0:03)
                    </h3>
                  </div>
                  <span className="text-[11px] text-neutral-500">Filmed first by creator for ad testing</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {currentScript.hooks.map((hook, index) => (
                    <div key={hook.id} className="p-3.5 rounded-xl bg-[#1a1a1a] border border-[#2c2c2c] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                          Hook #{index + 1}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono">3 sec</span>
                      </div>
                      <div className="text-[11px] font-semibold text-neutral-300">
                        {hook.angle}
                      </div>
                      <p className="text-xs text-white leading-snug italic bg-[#111] p-2.5 rounded-lg border border-[#222]">
                        "{hook.text}"
                      </p>
                      <div className="text-[11px] text-neutral-400 pt-1">
                        <span className="text-neutral-500 font-medium">Visual cue: </span>
                        {hook.visualCue}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Script Body */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Script Body & Pacing (0:04 - 0:24)
                </h3>
                <div className="p-4 rounded-xl bg-[#191919] border border-[#282828] font-sans text-xs text-neutral-200 leading-relaxed whitespace-pre-line">
                  {currentScript.body}
                </div>
              </div>

              {/* Call to Action */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Call To Action (CTA)
                </h3>
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-300">
                  {currentScript.callToAction}
                </div>
              </div>

              {/* Voiceover & Pacing Direction */}
              {currentScript.voiceoverNotes && (
                <div className="text-xs text-neutral-400 bg-[#171717] p-3 rounded-lg border border-[#262626]">
                  <strong className="text-neutral-300">Creator Delivery Notes: </strong>
                  {currentScript.voiceoverNotes}
                </div>
              )}

              {/* Quick Feedback Reply Box */}
              <div className="pt-4 border-t border-[#262626]">
                <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                  Add Internal or Client Revision Note
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={feedbackInput}
                    onChange={(e) => setFeedbackInput(e.target.value)}
                    placeholder="e.g. Modify Hook #1 to mention 7-day guarantee..."
                    className="flex-1 bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2 border border-[#333] focus:outline-none focus:border-amber-500"
                  />
                  <button
                    onClick={() => {
                      if (feedbackInput.trim()) {
                        submitScriptFeedback(currentScript.id, feedbackInput, true);
                        setFeedbackInput('');
                      }
                    }}
                    className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-[#111] font-bold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Note</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#141414] rounded-xl border border-[#262626] p-12 text-center text-neutral-400">
              Select a script to view details
            </div>
          )}
        </div>
      </div>

      {/* DRAFT SCRIPT MODAL */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#141414] border border-[#2e2e2e] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl text-white max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-[#262626] flex items-center justify-between bg-[#181818]">
              <h2 className="text-base font-bold text-white">Draft UGC Script & Hooks Matrix</h2>
              <button
                onClick={() => setIsNewModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateScript} className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">Target Client Brand</label>
                  <select
                    value={newOrderClientId}
                    onChange={(e) => setNewOrderClientId(e.target.value)}
                    className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2.5 border border-[#333] focus:border-amber-500 focus:outline-none"
                  >
                    {clients.map(c => (
                      <option key={c.id} value={c.id}>{c.companyName}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    placeholder="e.g. Rapid Repair Bio-Serum"
                    className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2.5 border border-[#333] focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Concept Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Dermatologist Secret Reaction Angle"
                  className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2.5 border border-[#333] focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* 3 Hooks inputs */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  UGC 3-Hook Variations
                </div>

                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Hook 1 (Negative / Scroll-Stopper)</label>
                  <input
                    type="text"
                    value={newHook1}
                    onChange={(e) => setNewHook1(e.target.value)}
                    className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2 border border-[#333] focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Hook 2 (Curiosity / Comparison)</label>
                  <input
                    type="text"
                    value={newHook2}
                    onChange={(e) => setNewHook2(e.target.value)}
                    className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2 border border-[#333] focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Hook 3 (Relatable Pain Point)</label>
                  <input
                    type="text"
                    value={newHook3}
                    onChange={(e) => setNewHook3(e.target.value)}
                    className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2 border border-[#333] focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Script Body Breakdown</label>
                <textarea
                  rows={3}
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg p-2.5 border border-[#333] focus:border-amber-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Call To Action (CTA)</label>
                <input
                  type="text"
                  value={newCta}
                  onChange={(e) => setNewCta(e.target.value)}
                  className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2 border border-[#333] focus:border-amber-500 focus:outline-none"
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
                  Create Script Concept
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
