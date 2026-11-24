import React from 'react';
import {
  LayoutDashboard,
  CloudLightning,
  Map,
  Bot,
  CheckSquare,
  Users,
  Settings,
  Info,
  ShieldCheck,
  Compass,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  alertCount: number;
  checklistProgress: number;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  alertCount,
  checklistProgress,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    {
      id: 'ai-assistant',
      label: 'AI Assistant',
      icon: Bot,
      highlight: true,
      badge: 'MCP',
      badgeColor: 'bg-blue-50 text-blue-700 border border-blue-200',
    },
    { id: 'map', label: 'Shelter Map', icon: Map },
    {
      id: 'alerts',
      label: 'Disaster Alerts',
      icon: CloudLightning,
      badge: alertCount > 0 ? `${alertCount}` : undefined,
      badgeColor: 'bg-red-50 text-red-700 border border-red-200',
    },
    {
      id: 'checklist',
      label: 'Preparedness Checklist',
      icon: CheckSquare,
      badge: `${checklistProgress}%`,
      badgeColor: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    },
    { id: 'contacts', label: 'Emergency Contacts', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'about', label: 'About & Sources', icon: Info },
  ];

  const handleSelect = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 shrink-0 bg-white border-r border-slate-200/90 p-4 flex flex-col justify-between transition-transform duration-200 ${
          mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          <div>
            <p className="px-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase font-mono mb-2">
              Preparedness Platform
            </p>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 ${
                          isActive ? 'text-blue-400' : 'text-slate-400'
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold ${item.badgeColor}`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Transparency Card */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <div className="flex items-center gap-1.5 text-slate-900 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified Data Notice</span>
            </div>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Demonstration records are clearly tagged. Follow live directives issued by NDMA, IMD, or local municipal police.
            </p>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400">
          <div className="flex items-center justify-between font-mono">
            <span>resQnet Platform</span>
            <span className="text-slate-500 font-semibold">MVP v1.0</span>
          </div>
        </div>
      </aside>
    </>
  );
};
