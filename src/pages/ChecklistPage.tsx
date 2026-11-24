import React, { useState } from 'react';
import {
  CheckSquare,
  RotateCcw,
  Plus,
  AlertCircle,
  FileText,
  Utensils,
  HeartPulse,
  Radio,
  Home,
  CheckCircle2,
} from 'lucide-react';
import { ChecklistTask } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

interface ChecklistPageProps {
  checklist: ChecklistTask[];
  onToggleTask: (id: string, completed: boolean) => void;
  onResetChecklist: () => void;
  onAddTask: (task: Omit<ChecklistTask, 'id'>) => void;
  selectedCity: string;
}

export const ChecklistPage: React.FC<ChecklistPageProps> = ({
  checklist,
  onToggleTask,
  onResetChecklist,
  onAddTask,
  selectedCity,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState<ChecklistTask['category']>('household');

  const categories = [
    { id: 'all', label: 'All Items', icon: CheckSquare },
    { id: 'documents', label: 'Documents & IDs', icon: FileText },
    { id: 'food_water', label: 'Food & Water', icon: Utensils },
    { id: 'medical', label: 'First-Aid & Medical', icon: HeartPulse },
    { id: 'communication', label: 'Power & Comms', icon: Radio },
    { id: 'household', label: 'Household Prep', icon: Home },
  ];

  const filteredTasks =
    activeCategory === 'all'
      ? checklist
      : checklist.filter((t) => t.category === activeCategory);

  const completedCount = checklist.filter((t) => t.is_completed).length;
  const progressPercent =
    checklist.length > 0 ? Math.round((completedCount / checklist.length) * 100) : 0;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddTask({
      title: newTitle.trim(),
      description: newDescription.trim() || 'Custom preparedness item added by user.',
      category: newCategory,
      category_name: categories.find((c) => c.id === newCategory)?.label || 'General',
      is_completed: false,
      is_critical: false,
      custom: true,
    });

    setNewTitle('');
    setNewDescription('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <CheckSquare className="w-7 h-7 text-blue-600" />
            72-Hour Preparedness Checklist
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Categorized action tasks saved to local storage for resilient offline readiness in {selectedCity}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={onResetChecklist}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Reset All
          </Button>
          <Button
            size="sm"
            variant="navy"
            onClick={() => setIsAdding(!isAdding)}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Add Custom Task
          </Button>
        </div>
      </div>

      {/* Progress Card */}
      <Card className="p-5 bg-white border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="font-semibold text-slate-900">
            Household Readiness Score: <strong>{progressPercent}% Complete</strong>
          </span>
          <span className="font-mono text-blue-600 font-bold">
            {completedCount} / {checklist.length} Completed
          </span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </Card>

      {/* Add Custom Task Form */}
      {isAdding && (
        <Card className="p-4 border-blue-300 bg-blue-50/20 space-y-3">
          <h4 className="text-sm font-bold text-slate-900">Add New Preparedness Task</h4>
          <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-600 mb-1 font-medium">Task Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Fill secondary clean water containers and store in high cabinet"
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-blue-600"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 mb-1 font-medium">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-blue-600"
                >
                  <option value="documents">Documents & IDs</option>
                  <option value="food_water">Food & Drinking Water</option>
                  <option value="medical">First-Aid & Medical</option>
                  <option value="communication">Communication & Power</option>
                  <option value="household">Household Preparation</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-600 mb-1 font-medium">Notes / Instructions</label>
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Optional details..."
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
              <Button size="sm" variant="navy" type="submit">
                Save Task
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Category Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((c) => {
          const Icon = c.icon;
          const isActive = activeCategory === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{c.label}</span>
            </button>
          );
        })}
      </div>

      {/* Checklist Tasks List */}
      <div className="space-y-2.5">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            onClick={() => onToggleTask(task.id, !task.is_completed)}
            className={`p-4 rounded-xl border transition-all cursor-pointer select-none flex items-start gap-3.5 ${
              task.is_completed
                ? 'bg-slate-50 border-slate-200 opacity-60'
                : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-sm'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              <input
                type="checkbox"
                checked={task.is_completed}
                onChange={() => {}}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
              />
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-sm font-semibold ${
                    task.is_completed ? 'line-through text-slate-400' : 'text-slate-900'
                  }`}
                >
                  {task.title}
                </span>

                {task.is_critical && !task.is_completed && (
                  <Badge variant="danger" size="sm">
                    CRITICAL
                  </Badge>
                )}
                {task.custom && (
                  <Badge variant="outline" size="sm">
                    Custom
                  </Badge>
                )}
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                {task.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
