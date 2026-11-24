import React from 'react';
import {
  ShieldAlert,
  MapPin,
  Bell,
  Search,
  Menu,
  X,
  Cpu,
  Settings,
} from 'lucide-react';
import { Badge } from '../ui/Badge';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedCity: string;
  onCitySearch: (city: string) => void;
  mcpConnected: boolean;
  alertCount: number;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedCity,
  onCitySearch,
  mcpConnected,
  alertCount,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const [searchInput, setSearchInput] = React.useState(selectedCity);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onCitySearch(searchInput.trim());
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div
            className="flex items-center gap-2.5 cursor-pointer select-none"
            onClick={() => setActiveTab('dashboard')}
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-slate-900 text-white shadow-sm shadow-slate-900/20">
              <ShieldAlert className="w-5 h-5 text-blue-400" />
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-slate-900 font-mono">
                  resQ<span className="text-blue-600">net</span>
                </span>
                <Badge variant="navy" size="sm">
                  AI MVP
                </Badge>
              </div>
              <p className="text-[10px] text-slate-500 tracking-wide uppercase font-semibold hidden sm:block">
                Disaster Preparedness Coordinator
              </p>
            </div>
          </div>
        </div>

        {/* Center: Search City Location */}
        <form onSubmit={handleSubmit} className="hidden md:flex items-center relative max-w-sm w-full">
          <MapPin className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search location (e.g. Mumbai, Chennai, Delhi)..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-8 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-1 focus:ring-blue-600 transition shadow-inner"
          />
          <button
            type="submit"
            className="absolute right-2.5 p-1 text-slate-400 hover:text-blue-600 transition"
            title="Search Location"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Right Status Actions */}
        <div className="flex items-center gap-2.5">
          {/* Simulated MCP Status Badge */}
          <button
            onClick={() => setActiveTab('ai-assistant')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 transition"
            title="Simulated Model Context Protocol"
          >
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline font-sans font-medium text-slate-600">MCP:</span>
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Active (4)
            </span>
          </button>

          {/* Active Alerts Bell */}
          <button
            onClick={() => setActiveTab('alerts')}
            className="relative p-2 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 transition"
            title="Official Warnings"
          >
            <Bell className="w-4 h-4 text-amber-600" />
            {alertCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white shadow-sm">
                {alertCount}
              </span>
            )}
          </button>

          {/* Settings */}
          <button
            onClick={() => setActiveTab('settings')}
            className="p-2 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 transition"
            title="Settings & Preferences"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
