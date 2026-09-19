import React, { useState } from 'react';
import { AppProvider, useApp, PageId } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { HeaderCoreFlowBanner } from './components/HeaderCoreFlowBanner';
import { LoginModal } from './components/LoginModal';

// Views
import { DashboardView } from './components/DashboardView';
import { ClientsView } from './components/ClientsView';
import { OrdersView } from './components/OrdersView';
import { ScriptsView } from './components/ScriptsView';
import { CreatorsView } from './components/CreatorsView';
import { ShootsView } from './components/ShootsView';
import { KanbanView } from './components/KanbanView';
import { ClientPortalView } from './components/ClientPortalView';
import { PaymentsView } from './components/PaymentsView';
import { TasksView } from './components/TasksView';
import { NotificationsView } from './components/NotificationsView';
import { ActivityLogsView } from './components/ActivityLogsView';

import { Menu, X, ShieldAlert } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentPage, setCurrentPage, role } = useApp();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [quickCreateType, setQuickCreateType] = useState<'client' | 'order' | 'script' | 'shoot' | 'task' | null>(null);

  // Render current view
  const renderCurrentView = () => {
    // If role is Client, only allow Client Portal and Notifications views
    if (role === 'client' && currentPage !== 'client-portal' && currentPage !== 'notifications') {
      return <ClientPortalView />;
    }

    switch (currentPage) {
      case 'dashboard':
        return <DashboardView />;
      case 'clients':
        return <ClientsView initialOpenNewModal={quickCreateType === 'client'} />;
      case 'orders':
        return <OrdersView initialOpenNewModal={quickCreateType === 'order'} />;
      case 'scripts':
        return <ScriptsView />;
      case 'creators':
        return <CreatorsView />;
      case 'shoots':
        return <ShootsView />;
      case 'kanban':
        return <KanbanView />;
      case 'client-portal':
        return <ClientPortalView />;
      case 'payments':
        // Guard payments for employee
        if (role === 'employee') {
          return (
            <div className="bg-[#141414] p-8 rounded-2xl border border-[#262626] text-center max-w-md mx-auto my-12">
              <ShieldAlert className="w-10 h-10 text-amber-500 mx-auto mb-3" />
              <h2 className="text-base font-bold text-white">Access Restricted</h2>
              <p className="text-xs text-neutral-400 mt-1">
                Agency financial margins and creator payout ledgers are restricted to Owner and Admin roles.
              </p>
            </div>
          );
        }
        return <PaymentsView />;
      case 'tasks':
        return <TasksView />;
      case 'notifications':
        return <NotificationsView />;
      case 'activity':
        return <ActivityLogsView />;
      default:
        return <DashboardView />;
    }
  };

  const handleQuickCreate = (type: 'client' | 'order' | 'script' | 'shoot' | 'task') => {
    if (type === 'client') {
      setCurrentPage('clients');
      setQuickCreateType('client');
    } else if (type === 'order') {
      setCurrentPage('orders');
      setQuickCreateType('order');
    } else if (type === 'script') {
      setCurrentPage('scripts');
      setQuickCreateType('script');
    } else if (type === 'shoot') {
      setCurrentPage('shoots');
      setQuickCreateType('shoot');
    } else if (type === 'task') {
      setCurrentPage('tasks');
      setQuickCreateType('task');
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-neutral-100 flex flex-col font-sans antialiased selection:bg-amber-500 selection:text-[#111111]">
      {/* Top Navigation Bar */}
      <Navbar onOpenNewModal={handleQuickCreate} />

      {/* Main Agency Core Flow Pipeline Banner (Clickable visual stepper) */}
      <HeaderCoreFlowBanner />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Left Sidebar */}
        <div className="hidden lg:block">
          <Sidebar onOpenLoginModal={() => setIsLoginModalOpen(true)} />
        </div>

        {/* Mobile Sidebar Toggle Button */}
        <div className="lg:hidden fixed bottom-5 right-5 z-40">
          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="p-3 bg-amber-500 text-[#111111] rounded-full shadow-lg shadow-amber-500/30 font-bold flex items-center justify-center cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Slide-Over Drawer */}
        {isMobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-40 flex">
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-xs"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <div className="relative w-72 bg-[#111111] border-r border-[#262626] h-full z-50 overflow-y-auto">
              <div className="p-3 flex justify-end">
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-1 rounded text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <Sidebar
                onOpenLoginModal={() => {
                  setIsMobileSidebarOpen(false);
                  setIsLoginModalOpen(true);
                }}
              />
            </div>
          </div>
        )}

        {/* Dynamic Main Stage View */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#0d0d0d]">
          {renderCurrentView()}
        </main>
      </div>

      {/* Authentication & Role Simulator Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
