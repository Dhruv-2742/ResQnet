import React, { useState } from 'react';
import {
  CloudLightning,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Clock,
  Wind,
  Droplets,
  CloudRain,
  Radio,
  Filter,
} from 'lucide-react';
import { WeatherData, OfficialAlert } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

interface WeatherAlertsPageProps {
  weather: WeatherData;
  alerts: OfficialAlert[];
  selectedCity: string;
}

export const WeatherAlertsPage: React.FC<WeatherAlertsPageProps> = ({
  weather,
  alerts,
  selectedCity,
}) => {
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');

  const filteredAlerts =
    severityFilter === 'ALL'
      ? alerts
      : alerts.filter((a) => a.severity === severityFilter);

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <CloudLightning className="w-7 h-7 text-blue-600" />
            Official Disaster Alerts & Meteorological Intelligence
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time meteorological forecast and verified government disaster warnings for {selectedCity}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="success">Open-Meteo Verified</Badge>
          <Badge variant="info">IMD/NDMA Linked</Badge>
        </div>
      </div>

      {/* Official Government Alerts Section with Severity Filter */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Radio className="w-5 h-5 text-red-600" />
              Official Disaster Warnings ({filteredAlerts.length})
            </h3>
            <p className="text-xs text-slate-500">
              Only verified official feeds are represented. Demo records are strictly isolated.
            </p>
          </div>

          {/* Severity Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            <span className="text-slate-400 font-semibold mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {['ALL', 'WARNING', 'ALERT', 'WATCH', 'ADVISORY'].map((sev) => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(sev)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  severityFilter === sev
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        {filteredAlerts.length === 0 ? (
          <div className="p-8 rounded-xl bg-white border border-slate-200 text-center text-slate-500 text-xs space-y-2 shadow-sm">
            <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto" />
            <p className="font-semibold text-slate-700">No active warnings for this severity filter.</p>
            <p className="text-slate-400">
              If an external live feed is momentarily unavailable, please check the official portals directly.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredAlerts.map((alert) => {
              const isDanger = alert.severity === 'WARNING';
              return (
                <Card
                  key={alert.id}
                  borderVariant={isDanger ? 'danger' : 'warning'}
                  className="space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant={isDanger ? 'danger' : 'warning'}>
                        {alert.severity}
                      </Badge>
                      <Badge variant={alert.is_verified ? 'success' : 'demo'}>
                        {alert.is_verified ? `${alert.source_name} (VERIFIED)` : 'DEMO DATA'}
                      </Badge>
                      <span className="text-xs text-slate-500 font-mono">
                        Issued: {new Date(alert.issued_at).toLocaleString()}
                      </span>
                    </div>

                    <a
                      href={alert.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-blue-700 hover:text-blue-900 font-semibold"
                    >
                      <span>Official Source Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-slate-900">{alert.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                      {alert.description}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                    <strong className="text-blue-900">Affected Zones:</strong> {alert.affected_area}
                  </div>

                  {alert.instructions && alert.instructions.length > 0 && (
                    <div className="pt-2">
                      <div className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-1.5">
                        Civil Action Directives:
                      </div>
                      <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                        {alert.instructions.map((inst, idx) => (
                          <li key={idx}>{inst}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* 7-Day Inundation & Precipitation Forecast */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          7-Day Weather & Precipitation Radar
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {weather.forecast.map((day, idx) => (
            <Card key={idx} className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-800">
                  {new Date(day.date).toLocaleDateString(undefined, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
                <span className="font-mono text-blue-600 font-semibold">
                  {day.precipitation_probability_max}% Rain Prob
                </span>
              </div>

              <div className="text-sm font-semibold text-slate-900">
                {day.weather_desc}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
                <span>
                  High: <strong className="text-slate-900">{Math.round(day.temp_max)}°C</strong> | Low: <strong className="text-slate-500">{Math.round(day.temp_min)}°C</strong>
                </span>
                <span className="flex items-center gap-1 text-blue-700 font-semibold">
                  <Droplets className="w-3.5 h-3.5" />
                  {day.precipitation_sum} mm
                </span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
