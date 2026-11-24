import React from 'react';
import {
  CloudRain,
  Wind,
  Thermometer,
  ShieldAlert,
  MapPin,
  Bot,
  CheckSquare,
  Users,
  AlertTriangle,
  ArrowRight,
  Droplets,
  Calendar,
  Clock,
  Sparkles,
  Activity,
  ShieldCheck,
} from 'lucide-react';
import { WeatherData, OfficialAlert, ShelterRecord, ChecklistTask } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { DisasterMap } from '../components/map/DisasterMap';

interface DashboardPageProps {
  weather: WeatherData;
  alerts: OfficialAlert[];
  shelters: ShelterRecord[];
  checklist: ChecklistTask[];
  onNavigate: (tab: string) => void;
  onQuickPrompt: (prompt: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  weather,
  alerts,
  shelters,
  checklist,
  onNavigate,
  onQuickPrompt,
}) => {
  const completedTasks = checklist.filter((t) => t.is_completed).length;
  const progressPercent = checklist.length > 0 ? Math.round((completedTasks / checklist.length) * 100) : 0;
  const activeAlerts = alerts.filter((a) => a.status === 'active');
  const nearestVerifiedShelter = shelters.find((s) => s.is_verified) || shelters[0];

  // Recent simulated AI / system activity
  const recentActivities = [
    {
      time: '10 mins ago',
      title: 'Weather MCP Sync Completed',
      desc: `Precipitation model updated from Open-Meteo for ${weather.location.city}.`,
      type: 'weather',
    },
    {
      time: '25 mins ago',
      title: 'IMD Alert Advisory Ingested',
      desc: 'High astronomical tide & rainfall warning active for coastal sector.',
      type: 'alert',
    },
    {
      time: '1 hour ago',
      title: 'Go-Bag Water Readiness Logged',
      desc: '3-day potable drinking water ration marked as completed.',
      type: 'checklist',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner: Location & Preparedness Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-xl bg-white border border-slate-200/90 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              {weather.location.city}, {weather.location.state || weather.location.country}
            </span>
            <Badge variant="info">Monitored Zone</Badge>
            <Badge variant="success">Open-Meteo Live</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Observation retrieved: {new Date(weather.retrieved_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Provider: {weather.provider}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="navy"
            onClick={() => onQuickPrompt(`Heavy rainfall is expected in my area (${weather.location.city}). Help me prepare.`)}
            leftIcon={<Bot className="w-4 h-4 text-blue-400" />}
          >
            Ask AI Assistant
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onNavigate('map')}
            leftIcon={<MapPin className="w-4 h-4 text-slate-600" />}
          >
            Shelter Map
          </Button>
        </div>
      </div>

      {/* Alert Severity Banner */}
      {activeAlerts.length > 0 && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-red-100 text-red-700 shrink-0 mt-0.5 sm:mt-0">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-red-800 uppercase tracking-wide">
                  OFFICIAL GOVERNMENT WARNING
                </span>
                <Badge variant="danger" size="sm">
                  {activeAlerts[0].source} VERIFIED
                </Badge>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                {activeAlerts[0].title}
              </h4>
              <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                {activeAlerts[0].description}
              </p>
            </div>
          </div>

          <Button
            size="sm"
            variant="danger"
            onClick={() => onNavigate('alerts')}
            className="shrink-0"
          >
            View Alert Directives
          </Button>
        </div>
      )}

      {/* Grid: Weather Card, Checklist Progress, Shelter Card, Emergency Broadcast */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Weather Card */}
        <Card className="flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
              <span className="uppercase tracking-wider">Current Weather</span>
              <span className="text-blue-600 font-semibold">{weather.current.weather_desc}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900">
                {Math.round(weather.current.temperature)}°C
              </span>
              <span className="text-xs text-slate-500">
                Feels like {Math.round(weather.current.feels_like)}°C
              </span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-blue-600" />
                <span>Rain: {weather.current.precipitation} mm/h</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-indigo-600" />
                <span>Wind: {Math.round(weather.current.wind_speed)} km/h</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-semibold">
            <button onClick={() => onNavigate('alerts')} className="hover:underline flex items-center gap-1">
              <span>View 7-Day Forecast</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </Card>

        {/* Preparedness Checklist Card */}
        <Card className="flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
              <span className="uppercase tracking-wider">Emergency Kit Readiness</span>
              <span className="text-blue-600 font-bold font-mono">{progressPercent}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-xs text-slate-700">
              <strong>{completedTasks}</strong> of <strong>{checklist.length}</strong> tasks completed.
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Prescription medicines, IDs & emergency power backup.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-semibold">
            <button onClick={() => onNavigate('checklist')} className="hover:underline flex items-center gap-1">
              <span>Manage Checklist</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </Card>

        {/* Nearest Shelter Card */}
        <Card className="flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
              <span className="uppercase tracking-wider">Nearest Shelter</span>
              {nearestVerifiedShelter.is_verified ? (
                <Badge variant="success" size="sm">
                  Verified
                </Badge>
              ) : (
                <Badge variant="demo" size="sm">
                  DEMO DATA
                </Badge>
              )}
            </div>
            <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
              {nearestVerifiedShelter.name}
            </h4>
            <p className="text-xs text-slate-500 mt-1 line-clamp-1">
              📍 {nearestVerifiedShelter.address}
            </p>
            <div className="mt-2 text-xs text-slate-600 flex items-center justify-between">
              <span>Distance: ~{nearestVerifiedShelter.distance_km || 2} km</span>
              <span>Capacity: {nearestVerifiedShelter.capacity}</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-semibold">
            <button onClick={() => onNavigate('map')} className="hover:underline flex items-center gap-1">
              <span>Inspect Shelter Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </Card>

        {/* Emergency Contacts Card */}
        <Card className="flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
              <span className="uppercase tracking-wider">Emergency Contacts</span>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-sm font-bold text-slate-900">Safety Broadcast Ready</div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Pre-drafted status message ready with explicit confirmation.
            </p>
            <div className="mt-2 text-xs text-slate-600">
              Helpline: <strong className="text-blue-700">1916 (BMC) / 1078 (NDRF)</strong>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-semibold">
            <button onClick={() => onNavigate('contacts')} className="hover:underline flex items-center gap-1">
              <span>Open Contacts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </Card>
      </div>

      {/* Interactive Map Preview & Recent Activity Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Preview (2 Columns) */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              Shelter Map Preview
            </h3>
            <button
              onClick={() => onNavigate('map')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>Full Interactive Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <DisasterMap
            location={weather.location}
            shelters={shelters}
            heightClass="h-[360px]"
            isInteractivePreview={true}
          />
        </div>

        {/* Recent Preparedness & MCP Activity (1 Column) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              Recent System Activity
            </h3>
            <Badge variant="default" size="sm">
              Live Feed
            </Badge>
          </div>

          <Card className="space-y-4 h-[360px] overflow-y-auto">
            {recentActivities.map((act, i) => (
              <div key={i} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                <div className="space-y-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-900">{act.title}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{act.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{act.desc}</p>
                </div>
              </div>
            ))}

            <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-200 text-xs text-blue-900 space-y-1 mt-4">
              <div className="font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>AI Coordination Engine</span>
              </div>
              <p className="text-[11px] text-blue-800">
                Four simulated MCP tools stand ready to assist your household.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
