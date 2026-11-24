import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  MapPin,
  Bell,
  Lock,
  User,
  Save,
  Check,
  ShieldCheck,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

interface SettingsPageProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  selectedCity,
  onCityChange,
}) => {
  const [cityInput, setCityInput] = useState(selectedCity);
  const [enableSound, setEnableSound] = useState(true);
  const [enableAlertPush, setEnableAlertPush] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityInput.trim()) {
      onCityChange(cityInput.trim());
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
          <SettingsIcon className="w-7 h-7 text-blue-600" />
          Platform Settings & Location Preferences
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Configure default disaster monitoring regions, audio briefings, and privacy preferences.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <Card className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <User className="w-5 h-5 text-blue-600" />
            <span>User Profile & Household Lead</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-600 mb-1 font-medium">Household Coordinator Name</label>
              <input
                type="text"
                defaultValue="Aarav Sharma"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800"
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1 font-medium">Emergency Contact Email</label>
              <input
                type="email"
                defaultValue="aarav.sharma@example.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800"
              />
            </div>
          </div>
        </Card>

        {/* Location Preferences */}
        <Card className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span>Monitored Region & Geo-Fencing</span>
          </div>

          <div className="max-w-md text-xs">
            <label className="block text-slate-600 mb-1 font-medium">
              Primary City / Municipality
            </label>
            <input
              type="text"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              placeholder="e.g. Mumbai, Chennai, Kolkata, Delhi"
              className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-blue-600"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Weather models and NDMA advisories default to this geographic coordinate.
            </p>
          </div>
        </Card>

        {/* Notifications & Audio Briefings */}
        <Card className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <Bell className="w-5 h-5 text-blue-600" />
            <span>Notifications & Audio Briefings</span>
          </div>

          <div className="space-y-3 text-xs text-slate-700">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={enableAlertPush}
                onChange={(e) => setEnableAlertPush(e.target.checked)}
                className="rounded border-slate-300 text-blue-600"
              />
              <span className="font-medium">Receive browser push banner when Red/Orange Alert is issued</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={enableSound}
                onChange={(e) => setEnableSound(e.target.checked)}
                className="rounded border-slate-300 text-blue-600"
              />
              <span className="font-medium">Enable Web Speech audio voice readout in AI Assistant</span>
            </label>
          </div>
        </Card>

        {/* Privacy & Safety Mandates */}
        <Card className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <Lock className="w-5 h-5 text-blue-600" />
            <span>Privacy & Emergency Data Sovereignty</span>
          </div>

          <div className="space-y-2 text-xs text-slate-600">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={dataSharing}
                onChange={(e) => setDataSharing(e.target.checked)}
                className="rounded border-slate-300 text-blue-600"
              />
              <span className="font-medium">Allow anonymous telemetry for regional disaster readiness heatmaps</span>
            </label>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-[11px] leading-relaxed text-slate-500 mt-2">
              All checklist records and emergency contact telephone numbers remain stored strictly client-side / local database. No unauthorized messaging is ever conducted.
            </div>
          </div>
        </Card>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          {saved && (
            <span className="text-xs text-emerald-700 flex items-center gap-1 font-semibold">
              <Check className="w-4 h-4 text-emerald-600" /> Preferences saved!
            </span>
          )}
          <Button variant="navy" type="submit" leftIcon={<Save className="w-4 h-4" />}>
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
};
