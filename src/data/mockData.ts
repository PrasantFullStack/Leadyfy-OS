import {
  Client,
  PackagePreset,
  Order,
  Script,
  Creator,
  Shoot,
  VideoProductionItem,
  PaymentInvoice,
  AgencyTask,
  NotificationItem,
  ActivityLog,
  UserProfile
} from '../types';

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'usr-1',
    name: 'Marcus Vance',
    email: 'marcus@leadyfy.agency',
    role: 'owner',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'usr-2',
    name: 'Sarah Chen',
    email: 'sarah@leadyfy.agency',
    role: 'admin',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'usr-3',
    name: 'Leo Ramirez',
    email: 'leo@leadyfy.agency',
    role: 'employee',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'usr-4',
    name: 'Emma Sterling',
    email: 'emma@luminaskin.com',
    role: 'client',
    clientId: 'cli-1',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
  }
];

export const INITIAL_CLIENTS: Client[] = [
  {
    id: 'cli-1',
    companyName: 'Lumina Skin Labs',
    contactPerson: 'Emma Sterling',
    email: 'emma@luminaskin.com',
    phone: '+1 (555) 234-8901',
    industry: 'Beauty & Skincare',
    website: 'https://luminaskin.example.com',
    tier: 'Enterprise',
    status: 'Active',
    onboardingStep: 'Active',
    monthlyBudget: 12500,
    totalOrders: 6,
    brandColors: ['#F59E0B', '#111111', '#FDF2F8'],
    brandGuidelinesUrl: 'https://drive.google.com/luminaskin-brandkit',
    notes: 'Prioritize natural lighting, UGC selfie-style angles, and dermatologist proof hooks.',
    createdAt: '2026-07-10',
  },
  {
    id: 'cli-2',
    companyName: 'Apex Acoustic Gear',
    contactPerson: 'David Kincaid',
    email: 'david@apexacoustics.com',
    phone: '+1 (555) 890-1234',
    industry: 'Consumer Electronics',
    website: 'https://apexacoustics.example.com',
    tier: 'Growth',
    status: 'Active',
    onboardingStep: 'Active',
    monthlyBudget: 7500,
    totalOrders: 3,
    brandColors: ['#111111', '#3B82F6', '#E5E7EB'],
    brandGuidelinesUrl: 'https://drive.google.com/apex-creatives',
    notes: 'Focus on noise cancellation demonstration in noisy subway / coffee shop environments.',
    createdAt: '2026-08-01',
  },
  {
    id: 'cli-3',
    companyName: 'GlowFit Active Nutrition',
    contactPerson: 'Chloe Brooks',
    email: 'chloe@glowfitnutrition.com',
    phone: '+1 (555) 345-6789',
    industry: 'Health & Wellness',
    website: 'https://glowfitnutrition.example.com',
    tier: 'Retainer',
    status: 'Active',
    onboardingStep: 'Active',
    monthlyBudget: 9800,
    totalOrders: 4,
    brandColors: ['#10B981', '#111111', '#FEF3C7'],
    brandGuidelinesUrl: 'https://drive.google.com/glowfit-assets',
    notes: 'Electrolyte sticks tasting reaction hooks, gym locker room context.',
    createdAt: '2026-08-14',
  },
  {
    id: 'cli-4',
    companyName: 'Velocity Flow CRM',
    contactPerson: 'Jason Wright',
    email: 'jason@velocityflow.io',
    phone: '+1 (555) 789-0123',
    industry: 'B2B SaaS',
    website: 'https://velocityflow.io',
    tier: 'Starter',
    status: 'Onboarding',
    onboardingStep: 'Brand Asset Received',
    monthlyBudget: 3500,
    totalOrders: 1,
    brandColors: ['#6366F1', '#111111', '#F3F4F6'],
    notes: 'First time using UGC actors for B2B founder perspective test.',
    createdAt: '2026-09-05',
  },
  {
    id: 'cli-5',
    companyName: 'Bloom Artisan Botanicals',
    contactPerson: 'Sophia Morales',
    email: 'sophia@bloombotanicals.com',
    phone: '+1 (555) 654-3210',
    industry: 'Home & Fragrance',
    website: 'https://bloombotanicals.example.com',
    tier: 'Growth',
    status: 'Active',
    onboardingStep: 'Active',
    monthlyBudget: 6200,
    totalOrders: 2,
    brandColors: ['#D97706', '#262626', '#FFFBEB'],
    notes: 'Aesthetic room unboxing, slow burn candles aesthetic.',
    createdAt: '2026-09-02',
  }
];

export const INITIAL_PACKAGES: PackagePreset[] = [
  {
    id: 'pkg-1',
    name: '3-Video Starter UGC Pack',
    videosCount: 3,
    turnaroundDays: 7,
    price: 1800,
    description: 'Perfect for validating new TikTok and Meta ad angles with 3 distinct creator hooks.',
    features: [
      '3 High-converting hooks tested per video',
      '1 Dedicated vetted UGC creator',
      'Full scripting & concept ideation',
      '9:16 vertical 4K footage',
      '2 Rounds of client revisions',
      'Paid ads raw & finished rights included'
    ]
  },
  {
    id: 'pkg-2',
    name: '5-Video Growth Creative Pack',
    videosCount: 5,
    turnaroundDays: 10,
    price: 3200,
    description: 'Our most popular pack for DTC brands scaling $10k+ monthly ad spend.',
    features: [
      '5 Complete UGC concepts',
      '2 Diverse creators matched to your demographic',
      'Hook testing matrix (15 hooks total)',
      'Subtitles, sound effects & dynamic pacing',
      'Fast 10-day turnaround',
      'Whitelisting / Spark Ads codes ready'
    ]
  },
  {
    id: 'pkg-3',
    name: '10-Video Monthly Retainer Scale',
    videosCount: 10,
    turnaroundDays: 14,
    price: 5800,
    description: 'Continuous fresh ad fatigue-busting creative engine for high-volume performance brands.',
    features: [
      '10 UGC creatives delivered bi-weekly',
      'Up to 4 specialized creators',
      'Weekly creative strategy sprint call',
      'Iterative data-driven variations based on ROAS',
      'Dedicated creative director & senior editor',
      'Priority 48-hour revision turnaround'
    ]
  },
  {
    id: 'pkg-4',
    name: 'TikTok Spark & Organic Viral Pack',
    videosCount: 6,
    turnaroundDays: 9,
    price: 3800,
    description: 'Native trend-jacking and organic style UGC engineered for the FYP algorithm.',
    features: [
      '6 Native organic-style TikTok format videos',
      'Trending audio integration and skits',
      'Spark Ads authorization tokens provided',
      'Creator dark-posting capability'
    ]
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'ORD-2026-101',
    clientId: 'cli-1',
    clientCompanyName: 'Lumina Skin Labs',
    packageName: '5-Video Growth Creative Pack',
    totalVideos: 5,
    stage: 'Client Review',
    amount: 3200,
    paid: true,
    dueDate: '2026-09-24',
    createdAt: '2026-09-11',
    notes: 'Testing anti-aging night serum. Target females 25-45.',
    targetAudience: 'Women 25-45 struggling with dull skin & fine lines',
    keySellingPoints: ['Triple Peptide complex', 'Noticeable glow in 7 nights', 'Zero greasy residue']
  },
  {
    id: 'ord-102',
    orderNumber: 'ORD-2026-102',
    clientId: 'cli-2',
    clientCompanyName: 'Apex Acoustic Gear',
    packageName: '3-Video Starter UGC Pack',
    totalVideos: 3,
    stage: 'Shoot In Progress',
    amount: 1800,
    paid: true,
    dueDate: '2026-09-26',
    createdAt: '2026-09-14',
    notes: 'Apex Wireless Studio Earbuds ANC test.',
    targetAudience: 'Daily commuters, gym-goers, remote workers',
    keySellingPoints: ['40dB Active Noise Cancellation', '36hr battery life', 'IPX7 waterproof']
  },
  {
    id: 'ord-103',
    orderNumber: 'ORD-2026-103',
    clientId: 'cli-3',
    clientCompanyName: 'GlowFit Active Nutrition',
    packageName: '10-Video Monthly Retainer Scale',
    totalVideos: 10,
    stage: 'Editing',
    amount: 5800,
    paid: true,
    dueDate: '2026-09-30',
    createdAt: '2026-09-08',
    notes: 'Monthly retainer batch #2: Rapid Hydration Electrolyte Powders.',
    targetAudience: 'CrossFit, runners, morning fatigue sufferers',
    keySellingPoints: ['3x faster hydration than water', 'Zero sugar, monk fruit sweetened', 'Real fruit extracts']
  },
  {
    id: 'ord-104',
    orderNumber: 'ORD-2026-104',
    clientId: 'cli-4',
    clientCompanyName: 'Velocity Flow CRM',
    packageName: '3-Video Starter UGC Pack',
    totalVideos: 3,
    stage: 'Scripting',
    amount: 1800,
    paid: false,
    dueDate: '2026-10-02',
    createdAt: '2026-09-17',
    notes: 'Agency owner pain points CRM automation script.',
    targetAudience: 'Digital agency owners and solo consultants',
    keySellingPoints: ['Auto-follow up pipeline', 'Saved 12 hours/week on admin', 'Slack integration']
  },
  {
    id: 'ord-105',
    orderNumber: 'ORD-2026-105',
    clientId: 'cli-5',
    clientCompanyName: 'Bloom Artisan Botanicals',
    packageName: '5-Video Growth Creative Pack',
    totalVideos: 5,
    stage: 'Creator Matched',
    amount: 3200,
    paid: true,
    dueDate: '2026-09-29',
    createdAt: '2026-09-15',
    notes: 'Fall Candle Collection aroma unboxing.',
    targetAudience: 'Cozy home aesthetic enthusiasts, gift shoppers',
    keySellingPoints: ['100% natural soy wax', 'Hand-poured in Vermont', 'Wood wick crackle']
  }
];

export const INITIAL_SCRIPTS: Script[] = [
  {
    id: 'scr-1',
    orderId: 'ord-101',
    clientId: 'cli-1',
    clientCompanyName: 'Lumina Skin Labs',
    title: 'Lumina Serum - "Dermatologist Secret" Angle',
    productName: 'Lumina Night Glow Serum',
    status: 'Sent to Client',
    version: 2,
    hooks: [
      {
        id: 'hk-1',
        angle: 'Negative / Warning Hook',
        text: 'Stop rubbing $200 creams on your face until you see this ingredient list...',
        visualCue: 'Creator holds expensive department store jar, shakes head, places Lumina bottle in foreground.'
      },
      {
        id: 'hk-2',
        angle: 'Before/After Reaction',
        text: 'I took a selfie every morning for 7 days using this French peptide serum...',
        visualCue: 'Quick phone camera flash transition showing radiant close-up skin texture.'
      },
      {
        id: 'hk-3',
        angle: 'Problem Agitation',
        text: 'If your foundation is always clinging to dry patches by 2 PM, watch this.',
        visualCue: 'Creator points closely at cheek under natural daylight mirror.'
      }
    ],
    body: `[0:04 - 0:12] "Here is why your skin barrier is actually crying: most moisturizers only sit on top of dead skin cells. Lumina formulated this with triple bio-peptides that penetrate 5 layers deeper."
[0:13 - 0:22] "Look at the texture. It melts like water, absolutely zero sticky residue. I wake up looking like I just drank 2 gallons of water and slept 10 hours."`,
    callToAction: 'Tap the link below right now to get their limited 30-Day Money-Back Starter Bundle before it sells out again.',
    voiceoverNotes: 'Casual, conversational friend tone, energetic pacing, warm smile.',
    clientFeedback: 'Love Hook #2! Could we emphasize that it is cruelty-free in the body script?',
    updatedAt: '2026-09-17'
  },
  {
    id: 'scr-2',
    orderId: 'ord-102',
    clientId: 'cli-2',
    clientCompanyName: 'Apex Acoustic Gear',
    title: 'Apex ANC Earbuds - "Subway Screech Test"',
    productName: 'Apex Wireless Studio Earbuds',
    status: 'Approved',
    version: 1,
    hooks: [
      {
        id: 'hk-4',
        angle: 'Sensory Audio Demonstration',
        text: 'Can these $89 earbuds block the loudest subway train in New York City? Let us find out.',
        visualCue: 'Subway screeches into station, creator pops earbuds in and snaps fingers.'
      },
      {
        id: 'hk-5',
        angle: 'Price Comparison',
        text: 'My $300 AirPods just got replaced by these, and my wallet is mad at me.',
        visualCue: 'Creator holds Apple case in left hand, Apex case in right, throws Apple case gently onto bed.'
      }
    ],
    body: `[0:05 - 0:15] "Active Noise Cancellation under a hundred bucks usually sounds like you are underwater. But Apex tuned dual digital beamforming mics that literally silence the world."
[0:16 - 0:24] "Bass response is punchy without distorting highs, and the battery lasts 36 hours. I only charged them once all week."`,
    callToAction: 'Click shop now and use code APEXVIP for 20% off plus free express shipping.',
    updatedAt: '2026-09-16'
  },
  {
    id: 'scr-3',
    orderId: 'ord-104',
    clientId: 'cli-4',
    clientCompanyName: 'Velocity Flow CRM',
    title: 'Velocity CRM - "Agency Chaos to Autopilot"',
    productName: 'Velocity Flow CRM',
    status: 'Draft',
    version: 1,
    hooks: [
      {
        id: 'hk-6',
        angle: 'Relatable Frustration',
        text: 'I used to spend my entire Sunday night manually following up with lost leads in Google Sheets...',
        visualCue: 'Creator slumps at laptop desk surrounded by sticky notes and cold coffee.'
      }
    ],
    body: `[0:06 - 0:18] "Then my operations lead forced me to set up Velocity Flow. In literally 12 minutes, our entire client intake, proposal tracking, and automated email nudges were automated."`,
    callToAction: 'Try the 14-day free trial without even putting down a credit card.',
    updatedAt: '2026-09-18'
  }
];

export const INITIAL_CREATORS: Creator[] = [
  {
    id: 'crt-1',
    name: 'Maya Lin',
    email: 'maya.ugc@creators.net',
    phone: '+1 (555) 441-2099',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    niche: ['Beauty & Skincare', 'Wellness', 'Fashion'],
    platforms: ['TikTok', 'Instagram'],
    ratePerVideo: 280,
    rating: 4.9,
    completedVideos: 42,
    availability: 'On Shoot',
    shippingAddress: '742 Evergreen Terr, Austin, TX 78704',
    portfolioUrl: 'https://tiktok.com/@maya_ugc_official',
    bio: 'Authentic Gen-Z & Millennial skincare reviewer with 4K ring-light studio setup and natural outdoor sunlight garden.'
  },
  {
    id: 'crt-2',
    name: 'Tyler Brooks',
    email: 'tyler.creator@techvids.com',
    phone: '+1 (555) 882-9011',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    niche: ['Tech & Gadgets', 'Audio', 'Gaming'],
    platforms: ['TikTok', 'YouTube Shorts'],
    ratePerVideo: 320,
    rating: 4.8,
    completedVideos: 38,
    availability: 'Available',
    shippingAddress: '1204 Pine St, Seattle, WA 98101',
    portfolioUrl: 'https://youtube.com/@tylertechtok',
    bio: 'Macro camera specialist, crisp binaural audio tests, high energy tech unboxings.'
  },
  {
    id: 'crt-3',
    name: 'Elena Rostova',
    email: 'elena.fitness@creatorflow.io',
    phone: '+1 (555) 773-4012',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    niche: ['Fitness', 'Supplements', 'Activewear'],
    platforms: ['Instagram', 'TikTok'],
    ratePerVideo: 290,
    rating: 5.0,
    completedVideos: 56,
    availability: 'Booked',
    shippingAddress: '330 Ocean Drive, Miami, FL 33139',
    portfolioUrl: 'https://instagram.com/elenafitlife',
    bio: 'Gym & lifestyle creator with high engagement and aesthetic clean kitchen backgrounds for nutrition.'
  },
  {
    id: 'crt-4',
    name: 'Jordan Vance',
    email: 'jordan.vance@lifestyleugc.com',
    phone: '+1 (555) 234-9911',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    niche: ['Home & Decor', 'B2B', 'Productivity'],
    platforms: ['TikTok', 'Meta'],
    ratePerVideo: 260,
    rating: 4.7,
    completedVideos: 29,
    availability: 'Available',
    shippingAddress: '882 W Adams St, Chicago, IL 60607',
    portfolioUrl: 'https://tiktok.com/@jordanspace',
    bio: 'Calm, minimalist aesthetic, home office desk tours and cozy lifestyle product integration.'
  }
];

export const INITIAL_SHOOTS: Shoot[] = [
  {
    id: 'sht-1',
    orderId: 'ord-101',
    clientId: 'cli-1',
    clientCompanyName: 'Lumina Skin Labs',
    creatorId: 'crt-1',
    creatorName: 'Maya Lin',
    productName: 'Lumina Night Glow Serum (2x 50ml bottles)',
    scheduledDate: '2026-09-18',
    status: 'Filming',
    trackingNumber: '1Z9999999999999999',
    shippingCarrier: 'UPS Next Day Air',
    callSheetNotes: 'Deliver 3 distinct hook variations, 2 B-roll dropper texture shots, 1 bathroom mirror selfie format.',
    rawFootageLink: 'https://drive.google.com/lumina-raw-batch1'
  },
  {
    id: 'sht-2',
    orderId: 'ord-102',
    clientId: 'cli-2',
    clientCompanyName: 'Apex Acoustic Gear',
    creatorId: 'crt-2',
    creatorName: 'Tyler Brooks',
    productName: 'Apex Wireless Studio Earbuds (Matte Black)',
    scheduledDate: '2026-09-20',
    status: 'Product Delivered',
    trackingNumber: '9400100000000000000000',
    shippingCarrier: 'USPS Priority',
    callSheetNotes: 'Subway noise test hook, coffee shop commute test, macro close-up of case opening.',
  },
  {
    id: 'sht-3',
    orderId: 'ord-105',
    clientId: 'cli-5',
    clientCompanyName: 'Bloom Artisan Botanicals',
    creatorId: 'crt-4',
    creatorName: 'Jordan Vance',
    productName: 'Autumn Harvest Trio Candle Set',
    scheduledDate: '2026-09-23',
    status: 'Product Sent',
    trackingNumber: '794611112222',
    shippingCarrier: 'FedEx Express',
    callSheetNotes: 'Soft evening ambient lighting, wood wick lighting sound clip.',
  }
];

export const INITIAL_VIDEOS: VideoProductionItem[] = [
  {
    id: 'vid-1',
    orderId: 'ord-101',
    clientId: 'cli-1',
    clientCompanyName: 'Lumina Skin Labs',
    scriptId: 'scr-1',
    scriptTitle: 'Lumina Serum - "Dermatologist Secret" Angle',
    creatorName: 'Maya Lin',
    title: 'Lumina Glow - V1 Hook 2 (Morning Selfie)',
    stage: 'Client Review',
    version: 1,
    editorName: 'Leo Ramirez',
    durationSeconds: 32,
    aspectRatio: '9:16',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80',
    videoPreviewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    deliveryDownloadUrl: 'https://assets.leadyfy.agency/deliveries/lumina-v1-hook2-master.mp4',
    clientApprovalStatus: 'Pending',
    feedbacks: [
      {
        id: 'fb-1',
        author: 'Leo Ramirez',
        role: 'Senior Editor',
        timestampSeconds: 5,
        text: 'Added snappy zoom cut and custom captions matching brand gold tone.',
        createdAt: '2026-09-17 14:20'
      }
    ],
    dueDate: '2026-09-22',
    updatedAt: '2026-09-17'
  },
  {
    id: 'vid-2',
    orderId: 'ord-101',
    clientId: 'cli-1',
    clientCompanyName: 'Lumina Skin Labs',
    scriptId: 'scr-1',
    scriptTitle: 'Lumina Serum - "Dermatologist Secret" Angle',
    creatorName: 'Maya Lin',
    title: 'Lumina Glow - V1 Hook 1 (Negative Angle)',
    stage: 'Internal QA',
    version: 1,
    editorName: 'Sarah Chen',
    durationSeconds: 28,
    aspectRatio: '9:16',
    thumbnailUrl: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=400&q=80',
    videoPreviewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    clientApprovalStatus: 'Pending',
    feedbacks: [],
    dueDate: '2026-09-22',
    updatedAt: '2026-09-18'
  },
  {
    id: 'vid-3',
    orderId: 'ord-103',
    clientId: 'cli-3',
    clientCompanyName: 'GlowFit Active Nutrition',
    scriptId: 'scr-2',
    scriptTitle: 'Electrolyte Sticks - Gym Fatigue Buster',
    creatorName: 'Elena Rostova',
    title: 'GlowFit - Crossfit Shaker Cut',
    stage: 'First Cut (Editing)',
    version: 1,
    editorName: 'Leo Ramirez',
    durationSeconds: 35,
    aspectRatio: '9:16',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80',
    videoPreviewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    clientApprovalStatus: 'Pending',
    feedbacks: [],
    dueDate: '2026-09-25',
    updatedAt: '2026-09-18'
  },
  {
    id: 'vid-4',
    orderId: 'ord-102',
    clientId: 'cli-2',
    clientCompanyName: 'Apex Acoustic Gear',
    scriptId: 'scr-2',
    scriptTitle: 'Apex ANC Earbuds - "Subway Screech Test"',
    creatorName: 'Tyler Brooks',
    title: 'Apex - NYC Subway Sound Off',
    stage: 'Raw Footage',
    version: 1,
    editorName: 'Unassigned',
    durationSeconds: 40,
    aspectRatio: '9:16',
    thumbnailUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
    clientApprovalStatus: 'Pending',
    feedbacks: [],
    dueDate: '2026-09-26',
    updatedAt: '2026-09-18'
  },
  {
    id: 'vid-5',
    orderId: 'ord-101',
    clientId: 'cli-1',
    clientCompanyName: 'Lumina Skin Labs',
    scriptId: 'scr-1',
    scriptTitle: 'Lumina Serum - Quick Texture ASMR',
    creatorName: 'Maya Lin',
    title: 'Lumina Glow - Dropper ASMR Master',
    stage: 'Delivered',
    version: 2,
    editorName: 'Leo Ramirez',
    durationSeconds: 24,
    aspectRatio: '9:16',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
    videoPreviewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    deliveryDownloadUrl: 'https://assets.leadyfy.agency/deliveries/lumina-dropper-asmr-master.mp4',
    clientApprovalStatus: 'Approved',
    feedbacks: [
      {
        id: 'fb-2',
        author: 'Emma Sterling',
        role: 'Client (Lumina)',
        text: 'This looks exceptional! Approved for Meta and TikTok ad launch immediately.',
        createdAt: '2026-09-16 09:30'
      }
    ],
    dueDate: '2026-09-16',
    updatedAt: '2026-09-16'
  }
];

export const INITIAL_INVOICES: PaymentInvoice[] = [
  {
    id: 'inv-101',
    invoiceNumber: 'INV-2026-088',
    clientId: 'cli-1',
    clientCompanyName: 'Lumina Skin Labs',
    orderId: 'ord-101',
    amount: 3200,
    creatorPayout: 1400,
    agencyMargin: 1800,
    status: 'Paid',
    issueDate: '2026-09-11',
    dueDate: '2026-09-18',
    paidAt: '2026-09-12',
  },
  {
    id: 'inv-102',
    invoiceNumber: 'INV-2026-089',
    clientId: 'cli-2',
    clientCompanyName: 'Apex Acoustic Gear',
    orderId: 'ord-102',
    amount: 1800,
    creatorPayout: 840,
    agencyMargin: 960,
    status: 'Paid',
    issueDate: '2026-09-14',
    dueDate: '2026-09-21',
    paidAt: '2026-09-14',
  },
  {
    id: 'inv-103',
    invoiceNumber: 'INV-2026-090',
    clientId: 'cli-3',
    clientCompanyName: 'GlowFit Active Nutrition',
    orderId: 'ord-103',
    amount: 5800,
    creatorPayout: 2600,
    agencyMargin: 3200,
    status: 'Paid',
    issueDate: '2026-09-08',
    dueDate: '2026-09-15',
    paidAt: '2026-09-09',
  },
  {
    id: 'inv-104',
    invoiceNumber: 'INV-2026-091',
    clientId: 'cli-4',
    clientCompanyName: 'Velocity Flow CRM',
    orderId: 'ord-104',
    amount: 1800,
    creatorPayout: 780,
    agencyMargin: 1020,
    status: 'Pending',
    issueDate: '2026-09-17',
    dueDate: '2026-09-24',
  },
  {
    id: 'inv-105',
    invoiceNumber: 'INV-2026-092',
    clientId: 'cli-5',
    clientCompanyName: 'Bloom Artisan Botanicals',
    orderId: 'ord-105',
    amount: 3200,
    creatorPayout: 1300,
    agencyMargin: 1900,
    status: 'Paid',
    issueDate: '2026-09-15',
    dueDate: '2026-09-22',
    paidAt: '2026-09-15',
  }
];

export const INITIAL_TASKS: AgencyTask[] = [
  {
    id: 'tsk-1',
    title: 'Review Maya Lin raw footage uploads for Lumina Night Glow',
    assignedTo: 'Leo Ramirez',
    roleRequired: 'employee',
    priority: 'Urgent',
    status: 'In Progress',
    dueDate: '2026-09-19',
    relatedOrderId: 'ord-101',
    relatedClientName: 'Lumina Skin Labs'
  },
  {
    id: 'tsk-2',
    title: 'Follow up on Velocity Flow invoice payment (#INV-2026-091)',
    assignedTo: 'Sarah Chen',
    roleRequired: 'admin',
    priority: 'High',
    status: 'Todo',
    dueDate: '2026-09-20',
    relatedOrderId: 'ord-104',
    relatedClientName: 'Velocity Flow CRM'
  },
  {
    id: 'tsk-3',
    title: 'Confirm Tyler Brooks received Apex Earbuds shipping package',
    assignedTo: 'Leo Ramirez',
    roleRequired: 'employee',
    priority: 'Medium',
    status: 'Completed',
    dueDate: '2026-09-18',
    relatedOrderId: 'ord-102',
    relatedClientName: 'Apex Acoustic Gear'
  },
  {
    id: 'tsk-4',
    title: 'Draft 3 hook angles for Bloom Botanicals Autumn Harvest pack',
    assignedTo: 'Sarah Chen',
    roleRequired: 'admin',
    priority: 'High',
    status: 'In Progress',
    dueDate: '2026-09-21',
    relatedOrderId: 'ord-105',
    relatedClientName: 'Bloom Artisan Botanicals'
  },
  {
    id: 'tsk-5',
    title: 'Finalize monthly agency net margin report for Q3',
    assignedTo: 'Marcus Vance',
    roleRequired: 'owner',
    priority: 'Medium',
    status: 'Todo',
    dueDate: '2026-09-28'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Video Ready for Client Review',
    message: 'Lumina Glow - V1 Hook 2 has been sent to client review stage.',
    type: 'video',
    createdAt: '15 minutes ago',
    read: false,
    actionUrl: 'kanban'
  },
  {
    id: 'notif-2',
    title: 'Script Feedback Received',
    message: 'Emma Sterling (Lumina Skin) submitted revision notes for Script #SCR-1.',
    type: 'script',
    createdAt: '1 hour ago',
    read: false,
    actionUrl: 'scripts'
  },
  {
    id: 'notif-3',
    title: 'Shoot Footage Uploaded',
    message: 'Maya Lin uploaded 6 4K raw video files for Order ORD-2026-101.',
    type: 'shoot',
    createdAt: '3 hours ago',
    read: true,
    actionUrl: 'shoots'
  },
  {
    id: 'notif-4',
    title: 'Payment Received ($3,200)',
    message: 'Invoice INV-2026-088 paid in full by Lumina Skin Labs.',
    type: 'payment',
    createdAt: 'Yesterday',
    read: true,
    actionUrl: 'payments'
  }
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'act-1',
    user: 'Leo Ramirez',
    userRole: 'employee',
    action: 'Moved video "Lumina Glow - V1 Hook 2" to stage "Client Review"',
    target: 'Order #ORD-2026-101',
    timestamp: '2026-09-18 10:14',
    category: 'video'
  },
  {
    id: 'act-2',
    user: 'Emma Sterling',
    userRole: 'client',
    action: 'Submitted revision note on Script Hook #2',
    target: 'Lumina Night Glow Serum Script',
    timestamp: '2026-09-18 09:32',
    category: 'script'
  },
  {
    id: 'act-3',
    user: 'Sarah Chen',
    userRole: 'admin',
    action: 'Assigned creator Tyler Brooks to shoot schedule',
    target: 'Apex Acoustic Gear (Order #ORD-102)',
    timestamp: '2026-09-17 16:45',
    category: 'shoot'
  },
  {
    id: 'act-4',
    user: 'Marcus Vance',
    userRole: 'owner',
    action: 'Onboarded new client "Bloom Artisan Botanicals"',
    target: 'Client #cli-5',
    timestamp: '2026-09-15 11:20',
    category: 'client'
  },
  {
    id: 'act-5',
    user: 'System Bot',
    userRole: 'admin',
    action: 'Generated invoice #INV-2026-092 for $3,200',
    target: 'Bloom Artisan Botanicals',
    timestamp: '2026-09-15 11:25',
    category: 'payment'
  }
];
