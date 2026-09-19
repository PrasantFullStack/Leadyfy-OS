export type Role = 'owner' | 'admin' | 'employee' | 'client';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  clientId?: string; // If role === 'client', points to client company
}

export type ClientTier = 'Starter' | 'Growth' | 'Enterprise' | 'Retainer';
export type OnboardingStatus = 'Invited' | 'Form Submitted' | 'Brand Asset Received' | 'Kickoff Done' | 'Active';

export interface Client {
  id: string;
  // NOTE: Requirement: "Ensure the Client form uses companyName consistently and is ready for backend mapping to company_name"
  companyName: string; 
  contactPerson: string;
  email: string;
  phone: string;
  industry: string;
  website: string;
  tier: ClientTier;
  status: 'Active' | 'Onboarding' | 'Paused' | 'Archived';
  onboardingStep: OnboardingStatus;
  monthlyBudget: number;
  totalOrders: number;
  brandColors?: string[];
  brandGuidelinesUrl?: string;
  notes?: string;
  createdAt: string;
}

// Helper to demonstrate and enforce the backend mapping requirement
export interface BackendClientPayload {
  id?: string;
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  industry: string;
  website: string;
  tier: ClientTier;
  status: 'Active' | 'Onboarding' | 'Paused' | 'Archived';
  onboarding_step: OnboardingStatus;
  monthly_budget: number;
  total_orders: number;
  brand_colors?: string[];
  brand_guidelines_url?: string;
  notes?: string;
  created_at?: string;
}

export function mapClientToApi(client: Partial<Client>): BackendClientPayload {
  return {
    ...(client.id ? { id: client.id } : {}),
    company_name: client.companyName ?? '',
    contact_person: client.contactPerson ?? '',
    email: client.email ?? '',
    phone: client.phone ?? '',
    industry: client.industry ?? '',
    website: client.website ?? '',
    tier: client.tier ?? 'Growth',
    status: client.status ?? 'Active',
    onboarding_step: client.onboardingStep ?? 'Active',
    monthly_budget: client.monthlyBudget ?? 0,
    total_orders: client.totalOrders ?? 0,
    brand_colors: client.brandColors,
    brand_guidelines_url: client.brandGuidelinesUrl,
    notes: client.notes,
    created_at: client.createdAt ?? new Date().toISOString(),
  };
}

export function mapApiToClient(payload: BackendClientPayload): Client {
  return {
    id: payload.id || `cli-${Date.now()}`,
    companyName: payload.company_name || 'Unnamed Company',
    contactPerson: payload.contact_person || '',
    email: payload.email || '',
    phone: payload.phone || '',
    industry: payload.industry || 'DTC E-commerce',
    website: payload.website || '',
    tier: payload.tier || 'Growth',
    status: payload.status || 'Active',
    onboardingStep: payload.onboarding_step || 'Active',
    monthlyBudget: payload.monthly_budget || 0,
    totalOrders: payload.total_orders || 1,
    brandColors: payload.brand_colors,
    brandGuidelinesUrl: payload.brand_guidelines_url,
    notes: payload.notes,
    createdAt: payload.created_at || new Date().toISOString().split('T')[0],
  };
}

export interface PackagePreset {
  id: string;
  name: string;
  videosCount: number;
  turnaroundDays: number;
  price: number;
  description: string;
  features: string[];
}

export type OrderStage = 
  | 'Onboarding' 
  | 'Order Placed' 
  | 'Scripting' 
  | 'Creator Matched' 
  | 'Product Shipping' 
  | 'Shoot In Progress' 
  | 'Editing' 
  | 'Client Review' 
  | 'Revisions' 
  | 'Approved' 
  | 'Delivered';

export interface Order {
  id: string;
  orderNumber: string;
  clientId: string;
  clientCompanyName: string;
  packageName: string;
  totalVideos: number;
  stage: OrderStage;
  amount: number;
  paid: boolean;
  dueDate: string;
  createdAt: string;
  notes?: string;
  targetAudience?: string;
  keySellingPoints?: string[];
}

export type ScriptStatus = 'Draft' | 'Internal Review' | 'Sent to Client' | 'Revision Requested' | 'Approved';

export interface ScriptHook {
  id: string;
  angle: string;
  text: string;
  visualCue: string;
}

export interface Script {
  id: string;
  orderId: string;
  clientId: string;
  clientCompanyName: string;
  title: string;
  productName: string;
  status: ScriptStatus;
  version: number;
  hooks: ScriptHook[];
  body: string;
  callToAction: string;
  voiceoverNotes?: string;
  clientFeedback?: string;
  updatedAt: string;
}

export type CreatorAvailability = 'Available' | 'Booked' | 'On Shoot' | 'On Break';

export interface Creator {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  niche: string[];
  platforms: ('TikTok' | 'Instagram' | 'YouTube Shorts' | 'Meta')[];
  ratePerVideo: number;
  rating: number;
  completedVideos: number;
  availability: CreatorAvailability;
  shippingAddress: string;
  portfolioUrl: string;
  bio: string;
}

export type ShootStatus = 'Scheduled' | 'Product Sent' | 'Product Delivered' | 'Filming' | 'Raw Uploaded' | 'Completed';

export interface Shoot {
  id: string;
  orderId: string;
  clientId: string;
  clientCompanyName: string;
  creatorId: string;
  creatorName: string;
  productName: string;
  scheduledDate: string;
  status: ShootStatus;
  trackingNumber?: string;
  shippingCarrier?: string;
  callSheetNotes?: string;
  rawFootageLink?: string;
}

export type KanbanStage = 
  | 'Raw Footage' 
  | 'First Cut (Editing)' 
  | 'Internal QA' 
  | 'Client Review' 
  | 'Revisions' 
  | 'Approved' 
  | 'Delivered';

export interface VideoFeedback {
  id: string;
  author: string;
  role: string;
  timestampSeconds?: number;
  text: string;
  createdAt: string;
}

export interface VideoProductionItem {
  id: string;
  orderId: string;
  clientId: string;
  clientCompanyName: string;
  scriptId: string;
  scriptTitle: string;
  creatorName: string;
  title: string;
  stage: KanbanStage;
  version: number;
  editorName: string;
  durationSeconds: number;
  aspectRatio: '9:16' | '16:9' | '1:1';
  thumbnailUrl: string;
  videoPreviewUrl?: string;
  deliveryDownloadUrl?: string;
  clientApprovalStatus: 'Pending' | 'Revision Requested' | 'Approved';
  feedbacks: VideoFeedback[];
  dueDate: string;
  updatedAt: string;
}

export interface PaymentInvoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientCompanyName: string;
  orderId: string;
  amount: number;
  creatorPayout: number;
  agencyMargin: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  issueDate: string;
  dueDate: string;
  paidAt?: string;
}

export interface AgencyTask {
  id: string;
  title: string;
  assignedTo: string;
  roleRequired: Role;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Todo' | 'In Progress' | 'Completed';
  dueDate: string;
  relatedOrderId?: string;
  relatedClientName?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'script' | 'shoot' | 'video' | 'payment' | 'system';
  createdAt: string;
  read: boolean;
  actionUrl?: string;
}

export interface ActivityLog {
  id: string;
  user: string;
  userRole: Role;
  action: string;
  target: string;
  timestamp: string;
  category: 'client' | 'order' | 'script' | 'shoot' | 'video' | 'payment' | 'task';
}
