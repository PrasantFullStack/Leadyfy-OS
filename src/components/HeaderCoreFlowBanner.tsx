import React from 'react';
import { useApp, PageId } from '../context/AppContext';
import { ChevronRight } from 'lucide-react';

interface Step {
  id: string;
  label: string;
  targetPage: PageId;
  description: string;
}

const FLOW_STEPS: Step[] = [
  { id: 'client', label: 'Client', targetPage: 'clients', description: 'Intake & CRM' },
  { id: 'onboarding', label: 'Onboarding', targetPage: 'clients', description: 'Brand kit & assets' },
  { id: 'order', label: 'Order', targetPage: 'orders', description: 'UGC packages' },
  { id: 'script', label: 'Script', targetPage: 'scripts', description: 'Hooks & formulation' },
  { id: 'creator', label: 'Creator', targetPage: 'creators', description: 'Matching & roster' },
  { id: 'shoot', label: 'Shoot', targetPage: 'shoots', description: 'Product shipping & filming' },
  { id: 'editing', label: 'Editing', targetPage: 'kanban', description: 'Post-production' },
  { id: 'review', label: 'Client Review', targetPage: 'client-portal', description: 'Isolated portal feedback' },
  { id: 'revision', label: 'Revision', targetPage: 'kanban', description: 'Editor fine-tuning' },
  { id: 'approval', label: 'Approval', targetPage: 'client-portal', description: 'Sign-off' },
  { id: 'delivery', label: 'Delivery', targetPage: 'client-portal', description: '4K Masters & Spark codes' },
];

export const HeaderCoreFlowBanner: React.FC = () => {
  const { currentPage, setCurrentPage, role } = useApp();

  // If in client role, they see a client-friendly pipeline
  return (
    <div className="bg-[#141414] border-b border-[#262626] px-4 py-2.5 overflow-x-auto scrollbar-thin">
      <div className="max-w-7xl mx-auto flex items-center justify-between min-w-[850px]">
        <div className="flex items-center gap-1 text-[11px] font-medium text-neutral-400">
          <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] mr-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Core Flow
          </span>

          {FLOW_STEPS.map((step, idx) => {
            const isActive = 
              (step.targetPage === currentPage) ||
              (currentPage === 'client-portal' && ['review', 'approval', 'delivery'].includes(step.id)) ||
              (currentPage === 'kanban' && ['editing', 'revision'].includes(step.id));

            return (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => setCurrentPage(step.targetPage)}
                  className={`px-2 py-1 rounded transition-all flex items-center gap-1 text-left ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40 shadow-sm'
                      : 'hover:bg-[#202020] hover:text-white text-neutral-400'
                  }`}
                  title={`${step.label}: ${step.description}`}
                >
                  <span className="text-[10px] opacity-60">0{idx + 1}.</span>
                  <span className="whitespace-nowrap">{step.label}</span>
                </button>

                {idx < FLOW_STEPS.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-neutral-600 flex-shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {role === 'client' && (
          <div className="ml-4 px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/80 text-[10px] text-purple-300 font-medium whitespace-nowrap">
            Client Portal Mode Active
          </div>
        )}
      </div>
    </div>
  );
};
