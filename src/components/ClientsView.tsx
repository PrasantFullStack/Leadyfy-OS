import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Client, ClientTier, OnboardingStatus, mapClientToApi, BackendClientPayload } from '../types';
import {
  Users,
  Plus,
  Search,
  Building2,
  Mail,
  Phone,
  Globe,
  ExternalLink,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  Sparkles,
  Code2,
  X,
  FileText,
  DollarSign
} from 'lucide-react';

interface ClientsViewProps {
  initialOpenNewModal?: boolean;
}

export const ClientsView: React.FC<ClientsViewProps> = ({ initialOpenNewModal = false }) => {
  const {
    clients,
    addClient,
    updateClient,
    deleteClient,
    orders,
    scripts,
    videos,
    setRole,
    setSelectedClientId,
    setCurrentPage,
    searchQuery
  } = useApp();

  const [localSearch, setLocalSearch] = useState('');
  const [filterTier, setFilterTier] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(initialOpenNewModal);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [selectedClientDetail, setSelectedClientDetail] = useState<Client | null>(null);
  const [backendPayloadPreview, setBackendPayloadPreview] = useState<BackendClientPayload | null>(null);

  // Form State using `companyName` consistently
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    industry: 'Beauty & Skincare',
    website: 'https://',
    tier: 'Growth' as ClientTier,
    status: 'Active' as Client['status'],
    onboardingStep: 'Active' as OnboardingStatus,
    monthlyBudget: 5000,
    totalOrders: 1,
    brandGuidelinesUrl: '',
    notes: '',
  });

  const handleOpenNew = () => {
    setEditingClient(null);
    setFormData({
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      industry: 'Beauty & Skincare',
      website: 'https://',
      tier: 'Growth',
      status: 'Active',
      onboardingStep: 'Active',
      monthlyBudget: 5000,
      totalOrders: 0,
      brandGuidelinesUrl: '',
      notes: '',
    });
    setBackendPayloadPreview(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (client: Client) => {
    setEditingClient(client);
    setFormData({
      companyName: client.companyName,
      contactPerson: client.contactPerson,
      email: client.email,
      phone: client.phone,
      industry: client.industry,
      website: client.website,
      tier: client.tier,
      status: client.status,
      onboardingStep: client.onboardingStep,
      monthlyBudget: client.monthlyBudget,
      totalOrders: client.totalOrders,
      brandGuidelinesUrl: client.brandGuidelinesUrl || '',
      notes: client.notes || '',
    });
    setBackendPayloadPreview(mapClientToApi(client));
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName.trim()) return;

    if (editingClient) {
      const payload = updateClient(editingClient.id, formData);
      setBackendPayloadPreview(payload);
    } else {
      const payload = addClient(formData);
      setBackendPayloadPreview(payload);
    }

    setTimeout(() => {
      setIsModalOpen(false);
    }, 1200);
  };

  // Filter logic
  const effectiveQuery = (searchQuery || localSearch).toLowerCase();
  const filteredClients = clients.filter(client => {
    const matchesSearch =
      client.companyName.toLowerCase().includes(effectiveQuery) ||
      client.contactPerson.toLowerCase().includes(effectiveQuery) ||
      client.email.toLowerCase().includes(effectiveQuery) ||
      client.industry.toLowerCase().includes(effectiveQuery);

    const matchesTier = filterTier === 'All' || client.tier === filterTier;
    const matchesStatus = filterStatus === 'All' || client.status === filterStatus;

    return matchesSearch && matchesTier && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header with Title and Create Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141414] p-5 rounded-2xl border border-[#262626]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">Client CRM & Onboarding</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/30">
              {clients.length} Accounts
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Manage agency brand accounts, onboarding pipelines, budgets, and launch isolated client portals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1c1c1c] border border-[#2e2e2e] text-[11px] text-amber-300 font-mono">
            <Code2 className="w-3.5 h-3.5 text-amber-400" />
            <span>companyName ➔ company_name ready</span>
          </div>

          <button
            onClick={handleOpenNew}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-[#111111] font-bold text-xs rounded-lg transition-colors shadow-sm shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer"
            id="onboard-new-client-btn"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Onboard New Client</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#141414] p-4 rounded-xl border border-[#262626] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder="Search by company, contact, email..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full bg-[#1c1c1c] text-neutral-100 placeholder-neutral-500 text-xs rounded-lg pl-9 pr-3 py-2 border border-[#303030] focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <span>Tier:</span>
            <select
              value={filterTier}
              onChange={(e) => setFilterTier(e.target.value)}
              className="bg-[#1c1c1c] text-neutral-200 text-xs rounded-lg px-2.5 py-1.5 border border-[#303030] focus:outline-none focus:border-amber-500"
            >
              <option value="All">All Tiers</option>
              <option value="Starter">Starter</option>
              <option value="Growth">Growth</option>
              <option value="Enterprise">Enterprise</option>
              <option value="Retainer">Retainer</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <span>Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-[#1c1c1c] text-neutral-200 text-xs rounded-lg px-2.5 py-1.5 border border-[#303030] focus:outline-none focus:border-amber-500"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Onboarding">Onboarding</option>
              <option value="Paused">Paused</option>
            </select>
          </div>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-[#141414] rounded-xl border border-[#262626] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#181818] text-neutral-400 text-[11px] uppercase tracking-wider border-b border-[#262626]">
              <tr>
                <th className="py-3 px-4">Company Name (`companyName`)</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Industry & Web</th>
                <th className="py-3 px-4">Tier & Budget</th>
                <th className="py-3 px-4">Onboarding Step</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222222]">
              {filteredClients.map((client) => {
                const clientOrdersCount = orders.filter(o => o.clientId === client.id).length;
                return (
                  <tr key={client.id} className="hover:bg-[#1a1a1a] transition-colors group">
                    {/* Company Name */}
                    <td className="py-3.5 px-4 font-semibold text-white">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold">
                          {client.companyName.charAt(0)}
                        </div>
                        <div>
                          <div 
                            onClick={() => setSelectedClientDetail(client)}
                            className="text-white hover:text-amber-400 cursor-pointer transition-colors font-bold"
                          >
                            {client.companyName}
                          </div>
                          <div className="text-[10px] text-neutral-500 font-mono">
                            ID: {client.id}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Contact Person */}
                    <td className="py-3.5 px-4 text-neutral-300">
                      <div>{client.contactPerson}</div>
                      <div className="text-[10px] text-neutral-500 flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3" />
                        <span>{client.email}</span>
                      </div>
                    </td>

                    {/* Industry */}
                    <td className="py-3.5 px-4 text-neutral-300">
                      <div>{client.industry}</div>
                      {client.website && (
                        <a
                          href={client.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] text-amber-400/80 hover:underline flex items-center gap-1 mt-0.5"
                        >
                          <Globe className="w-3 h-3" />
                          <span>{client.website.replace('https://', '')}</span>
                        </a>
                      )}
                    </td>

                    {/* Tier & Budget */}
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-semibold text-[10px] border border-[#333]">
                        {client.tier}
                      </span>
                      <div className="text-[11px] font-mono text-white mt-1">
                        ${client.monthlyBudget.toLocaleString()}/mo
                      </div>
                    </td>

                    {/* Onboarding Step */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            client.onboardingStep === 'Active'
                              ? 'bg-emerald-400'
                              : 'bg-amber-400 animate-pulse'
                          }`}
                        />
                        <span className="text-neutral-300 text-[11px]">
                          {client.onboardingStep}
                        </span>
                      </div>
                      <div className="text-[10px] text-neutral-500 mt-0.5">
                        {clientOrdersCount} Active UGC Orders
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          client.status === 'Active'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {client.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Launch Portal as Client */}
                        <button
                          onClick={() => {
                            setSelectedClientId(client.id);
                            setRole('client');
                            setCurrentPage('client-portal');
                          }}
                          className="px-2 py-1 rounded bg-purple-950/50 hover:bg-purple-900/80 text-purple-300 border border-purple-800/70 text-[11px] transition-colors"
                          title="Open Isolated Client Portal for this brand"
                        >
                          Portal
                        </button>

                        <button
                          onClick={() => handleOpenEdit(client)}
                          className="p-1.5 rounded hover:bg-[#282828] text-neutral-400 hover:text-white transition-colors"
                          title="Edit Client"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => deleteClient(client.id)}
                          className="p-1.5 rounded hover:bg-rose-950/40 text-neutral-400 hover:text-rose-400 transition-colors"
                          title="Archive Client"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT CLIENT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#141414] border border-[#2e2e2e] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl text-white max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#262626] flex items-center justify-between bg-[#181818]">
              <div>
                <h2 className="text-base font-bold text-white">
                  {editingClient ? `Edit Client: ${editingClient.companyName}` : 'Onboard New Brand Client'}
                </h2>
                <p className="text-xs text-neutral-400">
                  Form uses consistent <code className="text-amber-400 font-mono">companyName</code> for API parity.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#252525]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="p-6 overflow-y-auto space-y-4">
              {/* Special Specification Requirement Note */}
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
                <Code2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-amber-300">Backend Mapping Guard: </span>
                  Input field bound to <code>companyName</code>. When sent to API endpoint, automatically transforms to <code>company_name</code> as per specification fix.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Company Name <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="companyName"
                    id="client-form-companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Lumina Skin Labs"
                    className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2.5 border border-[#333] focus:border-amber-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-neutral-500 mt-1 block">Key: formData.companyName</span>
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Contact Person Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="e.g. Emma Sterling"
                    className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2.5 border border-[#333] focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="client@brand.com"
                    className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2.5 border border-[#333] focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2.5 border border-[#333] focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Industry
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2.5 border border-[#333] focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Beauty & Skincare">Beauty & Skincare</option>
                    <option value="Health & Wellness">Health & Wellness</option>
                    <option value="Consumer Electronics">Consumer Electronics</option>
                    <option value="B2B SaaS">B2B SaaS</option>
                    <option value="Home & Fragrance">Home & Fragrance</option>
                    <option value="Apparel & Fashion">Apparel & Fashion</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Website URL
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://brand.com"
                    className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2.5 border border-[#333] focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Agency Tier
                  </label>
                  <select
                    value={formData.tier}
                    onChange={(e) => setFormData({ ...formData, tier: e.target.value as ClientTier })}
                    className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2.5 border border-[#333] focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Starter">Starter ($2k - $4k/mo)</option>
                    <option value="Growth">Growth ($4k - $8k/mo)</option>
                    <option value="Enterprise">Enterprise ($8k - $15k/mo)</option>
                    <option value="Retainer">Continuous Retainer</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Monthly Budget ($)
                  </label>
                  <input
                    type="number"
                    value={formData.monthlyBudget}
                    onChange={(e) => setFormData({ ...formData, monthlyBudget: Number(e.target.value) })}
                    className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2.5 border border-[#333] focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Onboarding Pipeline Stage
                  </label>
                  <select
                    value={formData.onboardingStep}
                    onChange={(e) => setFormData({ ...formData, onboardingStep: e.target.value as OnboardingStatus })}
                    className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2.5 border border-[#333] focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Invited">Invited to Portal</option>
                    <option value="Form Submitted">Form Submitted</option>
                    <option value="Brand Asset Received">Brand Asset Received</option>
                    <option value="Kickoff Done">Kickoff Done</option>
                    <option value="Active">Active / Onboarding Complete</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Brand Assets / Guidelines Folder URL
                  </label>
                  <input
                    type="url"
                    value={formData.brandGuidelinesUrl}
                    onChange={(e) => setFormData({ ...formData, brandGuidelinesUrl: e.target.value })}
                    placeholder="https://drive.google.com/folder"
                    className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2.5 border border-[#333] focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Creative & Targeting Notes
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Key hooks preferences, forbidden phrases, brand voice nuances..."
                  className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg p-2.5 border border-[#333] focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Real-time backend mapping JSON viewer */}
              {backendPayloadPreview && (
                <div className="mt-3 p-3 bg-neutral-900 rounded-lg border border-neutral-700 font-mono text-[11px]">
                  <div className="text-emerald-400 font-semibold mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Transformed to Backend API Payload (company_name verified):</span>
                  </div>
                  <pre className="text-neutral-300 max-h-28 overflow-y-auto">
                    {JSON.stringify(backendPayloadPreview, null, 2)}
                  </pre>
                </div>
              )}

              {/* Footer */}
              <div className="pt-4 border-t border-[#262626] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#222] hover:bg-[#2d2d2d] text-neutral-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-[#111111] text-xs font-bold transition-colors cursor-pointer"
                  id="save-client-btn"
                >
                  {editingClient ? 'Save Changes' : 'Save & Map to Backend'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CLIENT DETAIL OVERVIEW DRAWER */}
      {selectedClientDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#141414] border-l border-[#2e2e2e] w-full max-w-xl h-full overflow-y-auto p-6 text-white space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#262626]">
              <div>
                <h3 className="text-lg font-bold text-white">{selectedClientDetail.companyName}</h3>
                <p className="text-xs text-neutral-400">Client Overview & Associated UGC Assets</p>
              </div>
              <button
                onClick={() => setSelectedClientDetail(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#252525]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-[#1c1c1c] border border-[#2c2c2c]">
                <span className="text-neutral-500">Contact</span>
                <p className="font-semibold text-white mt-0.5">{selectedClientDetail.contactPerson}</p>
                <p className="text-neutral-400 text-[11px]">{selectedClientDetail.email}</p>
              </div>
              <div className="p-3 rounded-lg bg-[#1c1c1c] border border-[#2c2c2c]">
                <span className="text-neutral-500">Budget</span>
                <p className="font-semibold text-amber-400 mt-0.5">${selectedClientDetail.monthlyBudget.toLocaleString()}/mo</p>
                <p className="text-neutral-400 text-[11px]">Tier: {selectedClientDetail.tier}</p>
              </div>
            </div>

            {/* Linked Orders */}
            <div>
              <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                Active UGC Orders ({orders.filter(o => o.clientId === selectedClientDetail.id).length})
              </h4>
              <div className="space-y-2">
                {orders.filter(o => o.clientId === selectedClientDetail.id).map(order => (
                  <div key={order.id} className="p-3 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{order.packageName}</div>
                      <div className="text-[11px] text-neutral-400 font-mono mt-0.5">{order.orderNumber} • Due {order.dueDate}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-semibold text-[10px]">
                      {order.stage}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Linked Scripts */}
            <div>
              <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                Scripts Formulated
              </h4>
              <div className="space-y-2">
                {scripts.filter(s => s.clientId === selectedClientDetail.id).map(script => (
                  <div key={script.id} className="p-3 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{script.title}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 font-medium">
                        {script.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-400 mt-1">
                      Hooks tested: {script.hooks.length} angles
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#262626]">
              <button
                onClick={() => {
                  setSelectedClientId(selectedClientDetail.id);
                  setRole('client');
                  setCurrentPage('client-portal');
                }}
                className="w-full py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Launch Client Portal for {selectedClientDetail.companyName} →</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
