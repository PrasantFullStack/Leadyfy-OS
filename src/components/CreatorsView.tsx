import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Creator, CreatorAvailability } from '../types';
import {
  Users,
  Plus,
  Star,
  DollarSign,
  MapPin,
  ExternalLink,
  Video,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  X
} from 'lucide-react';

export const CreatorsView: React.FC = () => {
  const { creators, shoots, updateCreatorAvailability, addCreator } = useApp();
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [selectedNiche, setSelectedNiche] = useState<string>('All');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('All');

  // New creator form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [ratePerVideo, setRatePerVideo] = useState(280);
  const [nicheInput, setNicheInput] = useState('Beauty & Skincare');
  const [shippingAddress, setShippingAddress] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('https://tiktok.com/@');
  const [bio, setBio] = useState('');

  const handleCreateCreator = (e: React.FormEvent) => {
    e.preventDefault();
    addCreator({
      name,
      email,
      phone,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      niche: [nicheInput],
      platforms: ['TikTok', 'Instagram'],
      ratePerVideo,
      rating: 5.0,
      availability: 'Available',
      shippingAddress: shippingAddress || '123 Creative Studio Way, Los Angeles, CA',
      portfolioUrl: portfolioUrl || 'https://tiktok.com/@creator',
      bio: bio || 'Professional UGC creator specializing in high conversion ads.'
    });

    setIsNewModalOpen(false);
  };

  const filteredCreators = creators.filter(c => {
    const matchesNiche = selectedNiche === 'All' || c.niche.some(n => n.includes(selectedNiche));
    const matchesAvail = selectedAvailability === 'All' || c.availability === selectedAvailability;
    return matchesNiche && matchesAvail;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141414] p-5 rounded-2xl border border-[#262626]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">Creators & Talent Availability</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/30">
              {creators.length} Vetted UGC Creators
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Manage creator roster, rates, shipping addresses for product seedings, and shoot availability.
          </p>
        </div>

        <button
          onClick={() => setIsNewModalOpen(true)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-[#111111] font-bold text-xs rounded-lg transition-colors shadow-sm shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Onboard New Creator</span>
        </button>
      </div>

      {/* Filter bar */}
      <div className="bg-[#141414] p-4 rounded-xl border border-[#262626] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400 font-medium">Niche:</span>
          {['All', 'Beauty', 'Tech', 'Fitness', 'Home'].map(niche => (
            <button
              key={niche}
              onClick={() => setSelectedNiche(niche)}
              className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                selectedNiche === niche
                  ? 'bg-amber-500 text-[#111] font-bold'
                  : 'bg-[#1e1e1e] text-neutral-300 hover:bg-[#282828]'
              }`}
            >
              {niche}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400 font-medium">Status:</span>
          {['All', 'Available', 'Booked', 'On Shoot'].map(status => (
            <button
              key={status}
              onClick={() => setSelectedAvailability(status)}
              className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                selectedAvailability === status
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                  : 'bg-[#1e1e1e] text-neutral-400 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Creators Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCreators.map((creator) => {
          const activeShoots = shoots.filter(s => s.creatorId === creator.id);

          return (
            <div
              key={creator.id}
              className="bg-[#141414] rounded-xl border border-[#262626] hover:border-[#383838] p-5 flex flex-col justify-between transition-all"
            >
              <div>
                {/* Header with Avatar & Availability */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/40"
                    />
                    <div>
                      <h3 className="font-bold text-sm text-white">{creator.name}</h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="flex items-center text-amber-400 text-xs">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span className="font-bold text-[11px] ml-1">{creator.rating}</span>
                        </div>
                        <span className="text-neutral-600">•</span>
                        <span className="text-[11px] text-neutral-400">{creator.completedVideos} videos</span>
                      </div>
                    </div>
                  </div>

                  {/* Availability Dropdown */}
                  <select
                    value={creator.availability}
                    onChange={(e) => updateCreatorAvailability(creator.id, e.target.value as CreatorAvailability)}
                    className={`text-[11px] font-semibold rounded-lg px-2 py-1 border focus:outline-none ${
                      creator.availability === 'Available'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : creator.availability === 'On Shoot'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-neutral-800 text-neutral-300 border-neutral-700'
                    }`}
                  >
                    <option value="Available">Available</option>
                    <option value="Booked">Booked</option>
                    <option value="On Shoot">On Shoot</option>
                    <option value="On Break">On Break</option>
                  </select>
                </div>

                {/* Bio */}
                <p className="text-xs text-neutral-300 mt-3 line-clamp-2 leading-relaxed">
                  {creator.bio}
                </p>

                {/* Niches & Platforms */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {creator.niche.map((n, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[10px] font-medium">
                      {n}
                    </span>
                  ))}
                  {creator.platforms.map((p, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] font-medium border border-amber-500/20">
                      {p}
                    </span>
                  ))}
                </div>

                {/* Shipping & Rate info */}
                <div className="mt-4 pt-3 border-t border-[#262626] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Agency Video Rate:</span>
                    <span className="font-mono font-bold text-white text-sm">
                      ${creator.ratePerVideo} <span className="text-[10px] text-neutral-400 font-normal">/ UGC cut</span>
                    </span>
                  </div>

                  <div className="flex items-start gap-1.5 text-[11px] text-neutral-400">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-1">{creator.shippingAddress}</span>
                  </div>
                </div>
              </div>

              {/* Footer with Active Shoots & Portfolio */}
              <div className="mt-4 pt-3 border-t border-[#262626] flex items-center justify-between text-xs">
                {activeShoots.length > 0 ? (
                  <span className="text-[11px] text-amber-400 font-medium flex items-center gap-1">
                    <Video className="w-3.5 h-3.5" />
                    <span>{activeShoots.length} Active Shoot</span>
                  </span>
                ) : (
                  <span className="text-[11px] text-emerald-400 font-medium">
                    Ready for Assignment
                  </span>
                )}

                <a
                  href={creator.portfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 text-[11px]"
                >
                  <span>TikTok / Portfolio</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* ONBOARD CREATOR MODAL */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#141414] border border-[#2e2e2e] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl text-white">
            <div className="px-6 py-4 border-b border-[#262626] flex items-center justify-between bg-[#181818]">
              <h2 className="text-base font-bold text-white">Onboard New UGC Creator</h2>
              <button
                onClick={() => setIsNewModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCreator} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">Creator Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rachel Adams"
                    className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2 border border-[#333] focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">Rate Per Video ($)</label>
                  <input
                    type="number"
                    value={ratePerVideo}
                    onChange={(e) => setRatePerVideo(Number(e.target.value))}
                    className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2 border border-[#333] focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="creator@tiktok.com"
                    className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2 border border-[#333] focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">Primary Niche</label>
                  <select
                    value={nicheInput}
                    onChange={(e) => setNicheInput(e.target.value)}
                    className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2 border border-[#333] focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Beauty & Skincare">Beauty & Skincare</option>
                    <option value="Tech & Gadgets">Tech & Gadgets</option>
                    <option value="Fitness & Health">Fitness & Health</option>
                    <option value="Home & Fragrance">Home & Fragrance</option>
                    <option value="B2B & Productivity">B2B & Productivity</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Shipping Address (For Product Sample Seedings)</label>
                <input
                  type="text"
                  required
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Street, City, State, ZIP"
                  className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2 border border-[#333] focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">TikTok / Portfolio Link</label>
                <input
                  type="url"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  placeholder="https://tiktok.com/@handle"
                  className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2 border border-[#333] focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Bio & Camera Setup</label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Lighting, audio mic setup, aesthetic..."
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
                  Save Creator
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
