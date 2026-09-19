import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Role,
  UserProfile,
  Client,
  Order,
  Script,
  Creator,
  Shoot,
  VideoProductionItem,
  PaymentInvoice,
  AgencyTask,
  NotificationItem,
  ActivityLog,
  KanbanStage,
  mapClientToApi,
  BackendClientPayload
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_CLIENTS,
  INITIAL_PACKAGES,
  INITIAL_ORDERS,
  INITIAL_SCRIPTS,
  INITIAL_CREATORS,
  INITIAL_SHOOTS,
  INITIAL_VIDEOS,
  INITIAL_INVOICES,
  INITIAL_TASKS,
  INITIAL_NOTIFICATIONS,
  INITIAL_ACTIVITY_LOGS
} from '../data/mockData';

export type PageId = 
  | 'dashboard'
  | 'clients'
  | 'orders'
  | 'scripts'
  | 'creators'
  | 'shoots'
  | 'kanban'
  | 'client-portal'
  | 'payments'
  | 'tasks'
  | 'notifications'
  | 'activity';

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  currentUser: UserProfile;
  selectedClientId: string; // Used when role is client, or to filter client portal
  setSelectedClientId: (id: string) => void;
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Data states
  clients: Client[];
  orders: Order[];
  scripts: Script[];
  creators: Creator[];
  shoots: Shoot[];
  videos: VideoProductionItem[];
  invoices: PaymentInvoice[];
  tasks: AgencyTask[];
  notifications: NotificationItem[];
  activityLogs: ActivityLog[];

  // Client CRUD
  addClient: (client: Omit<Client, 'id' | 'createdAt'>) => BackendClientPayload;
  updateClient: (id: string, updates: Partial<Client>) => BackendClientPayload;
  deleteClient: (id: string) => void;

  // Order Operations
  createOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => void;
  updateOrderStatus: (id: string, stage: Order['stage']) => void;

  // Script Operations
  addScript: (script: Omit<Script, 'id' | 'updatedAt'>) => void;
  updateScript: (id: string, updates: Partial<Script>) => void;
  submitScriptFeedback: (id: string, feedback: string, requestRevision: boolean) => void;
  approveScript: (id: string) => void;

  // Creator & Shoot Operations
  updateCreatorAvailability: (id: string, availability: Creator['availability']) => void;
  addCreator: (creator: Omit<Creator, 'id' | 'completedVideos'>) => void;
  scheduleShoot: (shoot: Omit<Shoot, 'id'>) => void;
  updateShootStatus: (id: string, status: Shoot['status'], extra?: { trackingNumber?: string; rawFootageLink?: string }) => void;

  // Video Kanban & Review Operations
  moveVideoStage: (id: string, newStage: KanbanStage) => void;
  addVideoFeedback: (videoId: string, text: string, timestampSeconds?: number) => void;
  clientApproveVideo: (videoId: string, notes?: string) => void;
  clientRequestVideoRevision: (videoId: string, revisionNotes: string) => void;
  deliverVideoItem: (videoId: string) => void;

  // Payments & Invoices
  markInvoicePaid: (id: string) => void;
  createInvoice: (invoice: Omit<PaymentInvoice, 'id' | 'invoiceNumber'>) => void;

  // Tasks
  toggleTaskStatus: (id: string) => void;
  updateTaskStatus: (id: string, status: AgencyTask['status']) => void;
  addTask: (task: Omit<AgencyTask, 'id'>) => void;

  // Notifications & Audit Logs
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  logActivity: (action: string, target: string, category: ActivityLog['category']) => void;

  // Demo state reset
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_PREFIX = 'leadyfy_os_v1_';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<Role>(() => {
    return (localStorage.getItem(`${STORAGE_PREFIX}role`) as Role) || 'owner';
  });

  const [selectedClientId, setSelectedClientIdState] = useState<string>(() => {
    return localStorage.getItem(`${STORAGE_PREFIX}selectedClientId`) || 'cli-1';
  });

  const [currentPage, setCurrentPageState] = useState<PageId>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}page`) as PageId;
    return saved || 'dashboard';
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Data states with local storage caching
  const [clients, setClients] = useState<Client[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}clients`);
    return saved ? JSON.parse(saved) : INITIAL_CLIENTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}orders`);
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [scripts, setScripts] = useState<Script[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}scripts`);
    return saved ? JSON.parse(saved) : INITIAL_SCRIPTS;
  });

  const [creators, setCreators] = useState<Creator[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}creators`);
    return saved ? JSON.parse(saved) : INITIAL_CREATORS;
  });

  const [shoots, setShoots] = useState<Shoot[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}shoots`);
    return saved ? JSON.parse(saved) : INITIAL_SHOOTS;
  });

  const [videos, setVideos] = useState<VideoProductionItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}videos`);
    return saved ? JSON.parse(saved) : INITIAL_VIDEOS;
  });

  const [invoices, setInvoices] = useState<PaymentInvoice[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}invoices`);
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  const [tasks, setTasks] = useState<AgencyTask[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}tasks`);
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}notifications`);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}activityLogs`);
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITY_LOGS;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}role`, role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}selectedClientId`, selectedClientId);
  }, [selectedClientId]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}page`, currentPage);
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}clients`, JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}orders`, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}scripts`, JSON.stringify(scripts));
  }, [scripts]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}creators`, JSON.stringify(creators));
  }, [creators]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}shoots`, JSON.stringify(shoots));
  }, [shoots]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}videos`, JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}invoices`, JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}tasks`, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}notifications`, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}activityLogs`, JSON.stringify(activityLogs));
  }, [activityLogs]);

  const currentUser: UserProfile = INITIAL_USERS.find(u => u.role === role) || {
    id: 'usr-default',
    name: 'Marcus Vance',
    email: 'marcus@leadyfy.agency',
    role: role,
    clientId: role === 'client' ? selectedClientId : undefined
  };

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    if (newRole === 'client') {
      setCurrentPageState('client-portal');
    } else if (currentPage === 'client-portal') {
      setCurrentPageState('dashboard');
    }
  };

  const setSelectedClientId = (id: string) => {
    setSelectedClientIdState(id);
  };

  const setCurrentPage = (page: PageId) => {
    setCurrentPageState(page);
  };

  const logActivity = (action: string, target: string, category: ActivityLog['category']) => {
    const newLog: ActivityLog = {
      id: `act-${Date.now()}`,
      user: currentUser.name,
      userRole: role,
      action,
      target,
      timestamp: new Date().toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      category
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  // CLIENT CRUD (Ensuring `companyName` is used consistently & mapped to `company_name`)
  const addClient = (clientData: Omit<Client, 'id' | 'createdAt'>): BackendClientPayload => {
    const newClient: Client = {
      ...clientData,
      id: `cli-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      totalOrders: clientData.totalOrders || 0,
    };
    setClients(prev => [newClient, ...prev]);
    logActivity(`Created new client profile "${newClient.companyName}"`, newClient.companyName, 'client');
    // Map to backend specification payload
    const backendPayload = mapClientToApi(newClient);
    return backendPayload;
  };

  const updateClient = (id: string, updates: Partial<Client>): BackendClientPayload => {
    let updatedPayload: BackendClientPayload = {} as BackendClientPayload;
    setClients(prev => prev.map(c => {
      if (c.id === id) {
        const updated = { ...c, ...updates };
        updatedPayload = mapClientToApi(updated);
        return updated;
      }
      return c;
    }));
    logActivity(`Updated client details for "${updates.companyName || id}"`, id, 'client');
    return updatedPayload;
  };

  const deleteClient = (id: string) => {
    const client = clients.find(c => c.id === id);
    setClients(prev => prev.filter(c => c.id !== id));
    logActivity(`Archived client account "${client?.companyName || id}"`, id, 'client');
  };

  // ORDERS
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => {
    const newOrderNumber = `ORD-2026-${100 + orders.length + 1}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: newOrderNumber,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setOrders(prev => [newOrder, ...prev]);

    // Update client order count
    setClients(prev => prev.map(c => c.id === orderData.clientId ? { ...c, totalOrders: c.totalOrders + 1 } : c));

    logActivity(`Generated order ${newOrderNumber} for ${orderData.clientCompanyName}`, newOrderNumber, 'order');
  };

  const updateOrderStatus = (id: string, stage: Order['stage']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, stage } : o));
    logActivity(`Progressed order to stage "${stage}"`, id, 'order');
  };

  // SCRIPTS
  const addScript = (scriptData: Omit<Script, 'id' | 'updatedAt'>) => {
    const newScript: Script = {
      ...scriptData,
      id: `scr-${Date.now()}`,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setScripts(prev => [newScript, ...prev]);
    logActivity(`Drafted new script concept "${newScript.title}"`, newScript.title, 'script');
  };

  const updateScript = (id: string, updates: Partial<Script>) => {
    setScripts(prev => prev.map(s => s.id === id ? { ...s, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : s));
    logActivity(`Updated script formulation`, id, 'script');
  };

  const submitScriptFeedback = (id: string, feedback: string, requestRevision: boolean) => {
    setScripts(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          clientFeedback: feedback,
          status: requestRevision ? 'Revision Requested' : 'Approved',
          version: requestRevision ? s.version + 1 : s.version,
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return s;
    }));

    logActivity(
      requestRevision ? `Client requested script revisions` : `Client approved script`,
      id,
      'script'
    );

    // Create notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: requestRevision ? 'Script Revision Requested' : 'Script Approved by Client',
      message: feedback || 'Client updated status on script draft.',
      type: 'script',
      createdAt: 'Just now',
      read: false,
      actionUrl: 'scripts'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const approveScript = (id: string) => {
    submitScriptFeedback(id, 'Approved as submitted.', false);
  };

  // CREATORS & SHOOTS
  const updateCreatorAvailability = (id: string, availability: Creator['availability']) => {
    setCreators(prev => prev.map(c => c.id === id ? { ...c, availability } : c));
    logActivity(`Updated creator availability to "${availability}"`, id, 'shoot');
  };

  const addCreator = (creatorData: Omit<Creator, 'id' | 'completedVideos'>) => {
    const newCreator: Creator = {
      ...creatorData,
      id: `crt-${Date.now()}`,
      completedVideos: 0
    };
    setCreators(prev => [newCreator, ...prev]);
    logActivity(`Onboarded creator ${newCreator.name}`, newCreator.name, 'shoot');
  };

  const scheduleShoot = (shootData: Omit<Shoot, 'id'>) => {
    const newShoot: Shoot = {
      ...shootData,
      id: `sht-${Date.now()}`
    };
    setShoots(prev => [newShoot, ...prev]);
    logActivity(`Scheduled shoot with ${newShoot.creatorName} for ${newShoot.productName}`, newShoot.id, 'shoot');
  };

  const updateShootStatus = (id: string, status: Shoot['status'], extra?: { trackingNumber?: string; rawFootageLink?: string }) => {
    setShoots(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status,
          ...(extra?.trackingNumber ? { trackingNumber: extra.trackingNumber } : {}),
          ...(extra?.rawFootageLink ? { rawFootageLink: extra.rawFootageLink } : {})
        };
      }
      return s;
    }));
    logActivity(`Shoot status updated to "${status}"`, id, 'shoot');
  };

  // VIDEO KANBAN & CLIENT REVIEW
  const moveVideoStage = (id: string, newStage: KanbanStage) => {
    setVideos(prev => prev.map(v => {
      if (v.id === id) {
        return {
          ...v,
          stage: newStage,
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return v;
    }));
    logActivity(`Moved video to "${newStage}"`, id, 'video');
  };

  const addVideoFeedback = (videoId: string, text: string, timestampSeconds?: number) => {
    const feedbackItem = {
      id: `fb-${Date.now()}`,
      author: currentUser.name,
      role: currentUser.role === 'client' ? 'Client' : 'Agency Lead',
      text,
      timestampSeconds,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setVideos(prev => prev.map(v => {
      if (v.id === videoId) {
        return {
          ...v,
          feedbacks: [...v.feedbacks, feedbackItem],
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return v;
    }));

    logActivity(`Added feedback note on video (${timestampSeconds ? `${timestampSeconds}s` : 'General'})`, videoId, 'video');
  };

  const clientApproveVideo = (videoId: string, notes?: string) => {
    setVideos(prev => prev.map(v => {
      if (v.id === videoId) {
        return {
          ...v,
          stage: 'Approved',
          clientApprovalStatus: 'Approved',
          feedbacks: notes ? [...v.feedbacks, {
            id: `fb-${Date.now()}`,
            author: currentUser.name,
            role: 'Client',
            text: notes,
            createdAt: 'Just now'
          }] : v.feedbacks,
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return v;
    }));

    logActivity(`Client APPROVED final video cut!`, videoId, 'video');

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Video Approved by Client!',
      message: `Client has approved the creative cut for final export.`,
      type: 'video',
      createdAt: 'Just now',
      read: false,
      actionUrl: 'kanban'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const clientRequestVideoRevision = (videoId: string, revisionNotes: string) => {
    setVideos(prev => prev.map(v => {
      if (v.id === videoId) {
        return {
          ...v,
          stage: 'Revisions',
          clientApprovalStatus: 'Revision Requested',
          version: v.version + 1,
          feedbacks: [...v.feedbacks, {
            id: `fb-${Date.now()}`,
            author: currentUser.name,
            role: 'Client',
            text: revisionNotes,
            createdAt: 'Just now'
          }],
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return v;
    }));

    logActivity(`Client requested revisions on video`, videoId, 'video');

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Video Revision Requested',
      message: revisionNotes,
      type: 'video',
      createdAt: 'Just now',
      read: false,
      actionUrl: 'kanban'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const deliverVideoItem = (videoId: string) => {
    setVideos(prev => prev.map(v => {
      if (v.id === videoId) {
        return {
          ...v,
          stage: 'Delivered',
          deliveryDownloadUrl: v.deliveryDownloadUrl || 'https://assets.leadyfy.agency/deliveries/master-cut.mp4',
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return v;
    }));
    logActivity(`Delivered master assets to client`, videoId, 'video');
  };

  // INVOICES & PAYMENTS
  const markInvoicePaid = (id: string) => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id === id) {
        return {
          ...inv,
          status: 'Paid',
          paidAt: new Date().toISOString().split('T')[0]
        };
      }
      return inv;
    }));
    logActivity(`Marked invoice ${id} as PAID`, id, 'payment');
  };

  const createInvoice = (invData: Omit<PaymentInvoice, 'id' | 'invoiceNumber'>) => {
    const invNumber = `INV-2026-0${90 + invoices.length + 1}`;
    const newInv: PaymentInvoice = {
      ...invData,
      id: `inv-${Date.now()}`,
      invoiceNumber: invNumber,
    };
    setInvoices(prev => [newInv, ...prev]);
    logActivity(`Generated invoice ${invNumber} for $${invData.amount.toLocaleString()}`, invNumber, 'payment');
  };

  // TASKS
  const toggleTaskStatus = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'Completed' ? 'In Progress' : 'Completed';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const updateTaskStatus = (id: string, status: AgencyTask['status']) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  const addTask = (taskData: Omit<AgencyTask, 'id'>) => {
    const newTask: AgencyTask = {
      ...taskData,
      id: `tsk-${Date.now()}`
    };
    setTasks(prev => [newTask, ...prev]);
    logActivity(`Created task "${newTask.title}"`, newTask.title, 'task');
  };

  // NOTIFICATIONS
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const resetDemoData = () => {
    localStorage.clear();
    setClients(INITIAL_CLIENTS);
    setOrders(INITIAL_ORDERS);
    setScripts(INITIAL_SCRIPTS);
    setCreators(INITIAL_CREATORS);
    setShoots(INITIAL_SHOOTS);
    setVideos(INITIAL_VIDEOS);
    setInvoices(INITIAL_INVOICES);
    setTasks(INITIAL_TASKS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setActivityLogs(INITIAL_ACTIVITY_LOGS);
    setRoleState('owner');
    setCurrentPageState('dashboard');
    setSelectedClientIdState('cli-1');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentUser,
        selectedClientId,
        setSelectedClientId,
        currentPage,
        setCurrentPage,
        searchQuery,
        setSearchQuery,
        clients,
        orders,
        scripts,
        creators,
        shoots,
        videos,
        invoices,
        tasks,
        notifications,
        activityLogs,
        addClient,
        updateClient,
        deleteClient,
        createOrder,
        updateOrderStatus,
        addScript,
        updateScript,
        submitScriptFeedback,
        approveScript,
        updateCreatorAvailability,
        addCreator,
        scheduleShoot,
        updateShootStatus,
        moveVideoStage,
        addVideoFeedback,
        clientApproveVideo,
        clientRequestVideoRevision,
        deliverVideoItem,
        markInvoicePaid,
        createInvoice,
        toggleTaskStatus,
        updateTaskStatus,
        addTask,
        markNotificationRead,
        markAllNotificationsRead,
        logActivity,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
