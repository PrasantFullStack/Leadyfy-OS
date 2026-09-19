import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VideoProductionItem, KanbanStage } from '../types';
import {
  Columns3,
  Video,
  Play,
  CheckCircle2,
  Clock,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  X,
  ExternalLink,
  Sparkles,
  Download,
  AlertCircle,
  Plus
} from 'lucide-react';

const KANBAN_STAGES: KanbanStage[] = [
  'Raw Footage',
  'First Cut (Editing)',
  'Internal QA',
  'Client Review',
  'Revisions',
  'Approved',
  'Delivered'
];

export const KanbanView: React.FC = () => {
  const {
    videos,
    moveVideoStage,
    addVideoFeedback,
    clientApproveVideo,
    clientRequestVideoRevision,
    deliverVideoItem,
    setRole,
    setSelectedClientId,
    setCurrentPage
  } = useApp();

  const [activeVideoModal, setActiveVideoModal] = useState<VideoProductionItem | null>(null);
  const [timestampSeconds, setTimestampSeconds] = useState<number>(5);
  const [feedbackText, setFeedbackText] = useState<string>('');

  const handleStageMove = (videoId: string, currentStage: KanbanStage, direction: 'next' | 'prev') => {
    const currentIndex = KANBAN_STAGES.indexOf(currentStage);
    const targetIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (targetIndex >= 0 && targetIndex < KANBAN_STAGES.length) {
      moveVideoStage(videoId, KANBAN_STAGES[targetIndex]);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeVideoModal || !feedbackText.trim()) return;

    addVideoFeedback(activeVideoModal.id, feedbackText, timestampSeconds);
    setFeedbackText('');

    // Keep active modal synced
    const updated = videos.find(v => v.id === activeVideoModal.id);
    if (updated) {
      setActiveVideoModal(updated);
    }
  };

  return (
    <div className="space-y-6 max-w-[1700px] mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141414] p-5 rounded-2xl border border-[#262626]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">Video Production Kanban Board</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/30">
              {videos.length} Creatives Active
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            End-to-end UGC post-production tracking from raw footage to first cut, internal QA, client review, and final delivery.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-neutral-400">
            Click any card to play video, add timecode notes, or trigger approvals.
          </div>
        </div>
      </div>

      {/* Kanban Board Horizontal Scroll Container */}
      <div className="overflow-x-auto pb-6 scrollbar-thin">
        <div className="flex gap-4 min-w-[1500px]">
          {KANBAN_STAGES.map((stage) => {
            const stageVideos = videos.filter(v => v.stage === stage);
            const isReviewStage = stage === 'Client Review';
            const isDeliveredStage = stage === 'Delivered';

            return (
              <div
                key={stage}
                className="w-72 flex-shrink-0 bg-[#141414] rounded-xl border border-[#262626] flex flex-col max-h-[800px]"
              >
                {/* Column Header */}
                <div
                  className={`p-3.5 border-b border-[#262626] flex items-center justify-between ${
                    isReviewStage
                      ? 'bg-amber-500/10 border-b-amber-500/30'
                      : isDeliveredStage
                      ? 'bg-emerald-500/10 border-b-emerald-500/30'
                      : 'bg-[#181818]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isReviewStage
                          ? 'bg-amber-400 animate-pulse'
                          : isDeliveredStage
                          ? 'bg-emerald-400'
                          : 'bg-neutral-500'
                      }`}
                    />
                    <h3 className="font-bold text-xs text-white truncate max-w-[160px]">{stage}</h3>
                  </div>
                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                      isReviewStage
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {stageVideos.length}
                  </span>
                </div>

                {/* Cards List */}
                <div className="p-3 space-y-3 overflow-y-auto flex-1">
                  {stageVideos.length === 0 ? (
                    <div className="py-8 text-center text-xs text-neutral-600 border border-dashed border-[#222] rounded-lg">
                      No videos in this stage
                    </div>
                  ) : (
                    stageVideos.map((video) => (
                      <div
                        key={video.id}
                        className="bg-[#1c1c1c] rounded-lg border border-[#2c2c2c] hover:border-amber-500/50 p-3 shadow-md hover:shadow-xl transition-all cursor-pointer group"
                        onClick={() => setActiveVideoModal(video)}
                      >
                        {/* Thumbnail & Video Badges */}
                        <div className="relative w-full h-36 rounded-md bg-neutral-900 overflow-hidden mb-2.5 border border-[#333]">
                          <img
                            src={video.thumbnailUrl}
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-[#111] shadow-lg">
                              <Play className="w-5 h-5 fill-current ml-0.5" />
                            </div>
                          </div>

                          <span className="absolute top-1.5 left-1.5 text-[9px] font-bold bg-black/80 text-white px-1.5 py-0.5 rounded font-mono">
                            {video.aspectRatio}
                          </span>
                          <span className="absolute bottom-1.5 right-1.5 text-[9px] bg-black/80 text-neutral-300 px-1.5 py-0.5 rounded font-mono">
                            {video.durationSeconds}s • v{video.version}
                          </span>
                        </div>

                        {/* Title & Brand */}
                        <h4 className="font-bold text-xs text-white leading-tight line-clamp-1 group-hover:text-amber-400 transition-colors">
                          {video.title}
                        </h4>
                        <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                          Client: <strong className="text-neutral-300">{video.clientCompanyName}</strong>
                        </p>

                        {/* Meta info */}
                        <div className="mt-2 text-[10px] text-neutral-500 flex items-center justify-between pt-2 border-t border-[#262626]">
                          <span>Creator: {video.creatorName}</span>
                          <span>Editor: {video.editorName}</span>
                        </div>

                        {/* Feedback count & Quick Stage Steppers */}
                        <div className="mt-2.5 flex items-center justify-between gap-1">
                          <div className="flex items-center gap-1 text-[10px] text-neutral-400">
                            <MessageSquare className="w-3 h-3 text-amber-400" />
                            <span>{video.feedbacks.length} notes</span>
                          </div>

                          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                            {stage !== 'Raw Footage' && (
                              <button
                                onClick={() => handleStageMove(video.id, video.stage, 'prev')}
                                className="p-1 rounded bg-[#252525] hover:bg-[#333] text-neutral-300 transition-colors"
                                title="Move to previous stage"
                              >
                                <ChevronLeft className="w-3 h-3" />
                              </button>
                            )}

                            {stage !== 'Delivered' && (
                              <button
                                onClick={() => handleStageMove(video.id, video.stage, 'next')}
                                className="px-2 py-0.5 rounded bg-amber-500 hover:bg-amber-400 text-[#111] font-bold text-[10px] flex items-center gap-0.5 transition-colors"
                                title="Move to next stage"
                              >
                                <span>Advance</span>
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* INTERACTIVE VIDEO REVIEW & TIMECODED FEEDBACK MODAL */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#141414] border border-[#2e2e2e] rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl text-white max-h-[95vh] flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#262626] flex items-center justify-between bg-[#181818]">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-white">{activeVideoModal.title}</h2>
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono font-bold">
                    v{activeVideoModal.version}.0
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-semibold">
                    {activeVideoModal.stage}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Client: <strong className="text-white">{activeVideoModal.clientCompanyName}</strong> • Creator: {activeVideoModal.creatorName} • Editor: {activeVideoModal.editorName}
                </p>
              </div>

              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#252525]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Player + Comments */}
            <div className="p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Video Player */}
              <div className="lg:col-span-7 space-y-4">
                <div className="aspect-[9/16] max-h-[480px] mx-auto bg-black rounded-xl overflow-hidden border border-[#2e2e2e] relative flex items-center justify-center shadow-2xl">
                  {activeVideoModal.videoPreviewUrl ? (
                    <video
                      controls
                      autoPlay
                      src={activeVideoModal.videoPreviewUrl}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <img
                      src={activeVideoModal.thumbnailUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Workflow Status Actions Bar */}
                <div className="p-3.5 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-400">Current Stage:</span>
                    <select
                      value={activeVideoModal.stage}
                      onChange={(e) => {
                        const newSt = e.target.value as KanbanStage;
                        moveVideoStage(activeVideoModal.id, newSt);
                        setActiveVideoModal({ ...activeVideoModal, stage: newSt });
                      }}
                      className="bg-[#222] text-amber-400 border border-[#383838] text-xs rounded-lg px-2.5 py-1 font-semibold focus:outline-none"
                    >
                      {KANBAN_STAGES.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Approve button */}
                    <button
                      onClick={() => {
                        clientApproveVideo(activeVideoModal.id, 'Approved for final export by review lead.');
                        setActiveVideoModal(null);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve Creative</span>
                    </button>

                    {/* Deliver button */}
                    <button
                      onClick={() => {
                        deliverVideoItem(activeVideoModal.id);
                        setActiveVideoModal(null);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-[#111] font-bold text-xs flex items-center gap-1 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Deliver to Client</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Timecoded Feedback Notes */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                      <span>Timestamped Notes & Feedback</span>
                    </h3>
                    <span className="text-[11px] text-neutral-500 font-mono">
                      {activeVideoModal.feedbacks.length} comments
                    </span>
                  </div>

                  {/* Feedback stream */}
                  <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                    {activeVideoModal.feedbacks.length === 0 ? (
                      <div className="py-8 text-center text-xs text-neutral-500 bg-[#181818] rounded-lg border border-[#222]">
                        No feedback notes yet. Add timecode revisions below.
                      </div>
                    ) : (
                      activeVideoModal.feedbacks.map(fb => (
                        <div key={fb.id} className="p-3 rounded-lg bg-[#191919] border border-[#282828] text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-white">{fb.author} ({fb.role})</span>
                            {fb.timestampSeconds !== undefined && (
                              <span className="text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/30">
                                0:{fb.timestampSeconds < 10 ? `0${fb.timestampSeconds}` : fb.timestampSeconds}
                              </span>
                            )}
                          </div>
                          <p className="text-neutral-300 leading-relaxed text-[11px]">{fb.text}</p>
                          <span className="text-[9px] text-neutral-500 block pt-0.5">{fb.createdAt}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Add Timecoded Revision Form */}
                <form onSubmit={handleAddComment} className="pt-3 border-t border-[#262626] space-y-2.5">
                  <div className="flex items-center gap-2">
                    <label className="text-[11px] text-neutral-400">Timestamp:</label>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-neutral-500">0:</span>
                      <input
                        type="number"
                        min={0}
                        max={activeVideoModal.durationSeconds}
                        value={timestampSeconds}
                        onChange={(e) => setTimestampSeconds(Number(e.target.value))}
                        className="w-16 bg-[#1c1c1c] text-white text-xs rounded px-2 py-1 border border-[#333] font-mono text-center"
                      />
                      <span className="text-xs text-neutral-500">sec</span>
                    </div>
                  </div>

                  <textarea
                    rows={2}
                    required
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="e.g. Cut 1 second off the intro hook, add louder chime SFX..."
                    className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg p-2.5 border border-[#333] focus:border-amber-500 focus:outline-none"
                  />

                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        clientRequestVideoRevision(activeVideoModal.id, feedbackText || 'Revisions needed per timecode remarks.');
                        setActiveVideoModal(null);
                      }}
                      className="text-xs px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 transition-colors"
                    >
                      Request Revisions
                    </button>

                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-[#111] font-bold text-xs transition-colors cursor-pointer"
                    >
                      Post Note
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
