import React from 'react';
import {
  ShieldAlert,
  CloudLightning,
  MapPin,
  Bot,
  CheckCircle2,
  Users,
  Radio,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  HeartPulse,
  Sparkles,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';

interface LandingPageProps {
  onEnterApp: () => void;
  selectedCity: string;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp, selectedCity }) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-14 pb-12 overflow-hidden text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold mb-6 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
          <span>AI-Powered Disaster Preparedness & Multi-Tool Coordination</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight sm:leading-tight">
          Calm, Verified Preparedness <br />
          <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 bg-clip-text text-transparent">
            Before The Disaster Strikes.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          <strong>resQnet</strong> unites real-time meteorological intelligence, verified government alerts from IMD and NDMA, interactive shelter routing, and intelligent AI coordination into one reliable command center.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            size="lg"
            variant="navy"
            onClick={onEnterApp}
            rightIcon={<ArrowRight className="w-5 h-5" />}
          >
            Launch Preparedness Dashboard
          </Button>

          <Button
            size="lg"
            variant="secondary"
            onClick={onEnterApp}
            leftIcon={<Bot className="w-5 h-5 text-blue-600" />}
          >
            Try AI Assistant
          </Button>
        </div>

        {/* Live Active Threat Radar Bar */}
        <div className="mt-12 p-4 rounded-xl bg-white border border-slate-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-700">
              <CloudLightning className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                  Active Meteorological Watch
                </span>
                <Badge variant="warning" size="sm">
                  Orange Advisory
                </Badge>
              </div>
              <div className="text-sm font-semibold text-slate-900 mt-0.5">
                {selectedCity}: Severe Inundation & Coastal Weather Warning
              </div>
            </div>
          </div>

          <Button size="sm" variant="secondary" onClick={onEnterApp}>
            Inspect Monitored Zone
          </Button>
        </div>
      </section>

      {/* How It Works Step Progression */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            How resQnet Coordinates Your Safety
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Four coordinated steps connecting verified sources to household preparedness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 font-bold font-mono">
              01
            </div>
            <h4 className="font-bold text-slate-900 text-base">Weather & Alerts</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fetches rainfall radar and verified warnings directly from IMD, NDMA SACHET, and Open-Meteo.
            </p>
          </Card>

          <Card className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold font-mono">
              02
            </div>
            <h4 className="font-bold text-slate-900 text-base">AI Coordination</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Executes multi-tool reasoning to translate technical advisories into calm, practical family actions.
            </p>
          </Card>

          <Card className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold font-mono">
              03
            </div>
            <h4 className="font-bold text-slate-900 text-base">Shelter Routing</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Finds verified community cyclone shelters and flood relief triage hubs with live capacity and contacts.
            </p>
          </Card>

          <Card className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 font-bold font-mono">
              04
            </div>
            <h4 className="font-bold text-slate-900 text-base">Emergency Broadcast</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pre-drafts verified SOS messages with user-approved confirmation—never sending without consent.
            </p>
          </Card>
        </div>
      </section>

      {/* Pillars of resQnet */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Enterprise-Grade Disaster Architecture
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Strict verification separation: never mix raw weather models with official civil defence mandates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="space-y-3">
            <div className="p-3 w-fit rounded-lg bg-blue-50 border border-blue-200 text-blue-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Official Alert Verification
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Directly links to official portals: IMD Mausam, NDMA SACHET, and Central Water Commission. Demo records are clearly isolated and labeled.
            </p>
          </Card>

          <Card className="space-y-3">
            <div className="p-3 w-fit rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Interactive OpenStreetMap
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              High-performance Leaflet map showing community evacuation shelters, distance calculations, and clear verification indicators.
            </p>
          </Card>

          <Card className="space-y-3">
            <div className="p-3 w-fit rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Model Context Protocol (MCP)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Built on the open Model Context Protocol to orchestrate Weather, Government Alerts, Maps/Shelters, and Checklist tools seamlessly.
            </p>
          </Card>
        </div>
      </section>

      {/* Call To Action */}
      <section className="max-w-4xl mx-auto px-4 p-10 rounded-2xl bg-gradient-to-br from-slate-900 to-navy-950 text-white text-center space-y-4 shadow-xl">
        <h3 className="text-2xl font-bold">
          Ready to Coordinate Your Disaster Resilience?
        </h3>
        <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Open the resQnet dashboard to inspect live weather indicators, review essential go-bag supplies, and communicate safely with your family.
        </p>
        <div className="pt-2">
          <Button variant="primary" size="lg" onClick={onEnterApp}>
            Open resQnet Dashboard
          </Button>
        </div>
      </section>
    </div>
  );
};
