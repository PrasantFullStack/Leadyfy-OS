import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AgencyTask, Role } from '../types';
import {
  CheckSquare,
  Plus,
  Calendar,
  User,
  AlertCircle,
  CheckCircle2,
  Clock,
  Filter,
  X
} from 'lucide-react';

export const TasksView: React.FC = () => {
  const { tasks, addTask, updateTaskStatus, toggleTaskStatus } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'All' | AgencyTask['status']>('All');
  const [priorityFilter, setPriorityFilter] = useState<'All' | AgencyTask['priority']>('All');

  // New task inputs
  const [title, setTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState('Alex Rivera');
  const [roleRequired, setRoleRequired] = useState<Role>('employee');
  const [priority, setPriority] = useState<AgencyTask['priority']>('Medium');
  const [dueDate, setDueDate] = useState('2026-09-28');
  const [relatedClientName, setRelatedClientName] = useState('Lumina Skin Labs');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title,
      assignedTo,
      roleRequired,
      priority,
      status: 'Todo',
      dueDate,
      relatedClientName
    });

    setTitle('');
    setIsModalOpen(false);
  };

  const filteredTasks = tasks.filter(t => {
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;
    return matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141414] p-5 rounded-2xl border border-[#262626]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">Internal Agency Tasks</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/30">
              {tasks.filter(t => t.status !== 'Completed').length} Pending
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Track daily deliverables, product shipment follow-ups, and editor assignments.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-[#111111] font-bold text-xs rounded-lg transition-colors shadow-sm shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Task</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-[#141414] p-4 rounded-xl border border-[#262626] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400 font-medium">Status:</span>
          {(['All', 'Todo', 'In Progress', 'Completed'] as const).map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                statusFilter === st
                  ? 'bg-amber-500 text-[#111] font-bold'
                  : 'bg-[#1e1e1e] text-neutral-300 hover:bg-[#282828]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400 font-medium">Priority:</span>
          {(['All', 'Urgent', 'High', 'Medium', 'Low'] as const).map(pr => (
            <button
              key={pr}
              onClick={() => setPriorityFilter(pr)}
              className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                priorityFilter === pr
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'bg-[#1e1e1e] text-neutral-400 hover:text-white'
              }`}
            >
              {pr}
            </button>
          ))}
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-[#141414] rounded-xl border border-[#262626] overflow-hidden">
        <div className="divide-y divide-[#222]">
          {filteredTasks.map(task => {
            const isDone = task.status === 'Completed';
            return (
              <div
                key={task.id}
                className="p-4 hover:bg-[#181818] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <button
                    onClick={() => toggleTaskStatus(task.id)}
                    className={`w-5 h-5 rounded flex items-center justify-center transition-colors mt-0.5 sm:mt-0 ${
                      isDone ? 'bg-emerald-600 text-white' : 'border border-[#444] hover:border-amber-500'
                    }`}
                  >
                    {isDone && <CheckCircle2 className="w-4 h-4" />}
                  </button>

                  <div>
                    <h3 className={`text-xs font-bold text-white ${isDone ? 'line-through text-neutral-500' : ''}`}>
                      {task.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-neutral-400">
                      <span className="text-neutral-500">Assigned to: {task.assignedTo} ({task.roleRequired})</span>
                      {task.relatedClientName && (
                        <>
                          <span className="text-neutral-600">•</span>
                          <span className="text-amber-400 font-medium">{task.relatedClientName}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pl-8 sm:pl-0">
                  <span className="text-xs text-neutral-400 font-mono flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{task.dueDate}</span>
                  </span>

                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                    task.priority === 'Urgent' || task.priority === 'High'
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      : task.priority === 'Medium'
                      ? 'bg-amber-500/10 text-amber-400'
                      : 'bg-neutral-800 text-neutral-400'
                  }`}>
                    {task.priority}
                  </span>

                  <select
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task.id, e.target.value as AgencyTask['status'])}
                    className="bg-[#202020] text-xs text-neutral-300 border border-[#333] rounded px-2 py-1 focus:outline-none"
                  >
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* NEW TASK MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#141414] border border-[#2e2e2e] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl text-white">
            <div className="px-6 py-4 border-b border-[#262626] flex items-center justify-between bg-[#181818]">
              <h2 className="text-base font-bold text-white">Create Agency Task</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Task Description</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Export 9:16 and 1:1 cut variations for Lumina"
                  className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2 border border-[#333] focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">Assigned Person</label>
                  <input
                    type="text"
                    required
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    placeholder="e.g. Alex Rivera"
                    className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2 border border-[#333] focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">Role Required</label>
                  <select
                    value={roleRequired}
                    onChange={(e) => setRoleRequired(e.target.value as Role)}
                    className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2 border border-[#333] focus:border-amber-500 focus:outline-none"
                  >
                    <option value="owner">Owner</option>
                    <option value="admin">Admin</option>
                    <option value="employee">Employee</option>
                    <option value="client">Client</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as AgencyTask['priority'])}
                    className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2 border border-[#333] focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Urgent">Urgent</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2 border border-[#333] focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Related Client Brand</label>
                <input
                  type="text"
                  value={relatedClientName}
                  onChange={(e) => setRelatedClientName(e.target.value)}
                  placeholder="e.g. Lumina Skin Labs"
                  className="w-full bg-[#1c1c1c] text-white text-xs rounded-lg px-3 py-2 border border-[#333] focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-[#262626] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#222] text-neutral-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-[#111] text-xs font-bold transition-colors cursor-pointer"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
