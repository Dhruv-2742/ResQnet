import React from 'react';
import {
  ShieldAlert,
  Info,
  ExternalLink,
  Cpu,
  Layers,
  Database,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Title */}
      <div className="pb-4 border-b border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
          <ShieldAlert className="w-7 h-7 text-blue-600" />
          About resQnet & Transparency Standards
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Open AI Disaster Preparedness & Multi-Tool Coordination Platform.
        </p>
      </div>

      {/* Problem & Solution */}
      <Card className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900">The Problem & Our Solution</h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          During natural disasters—such as urban floods, cloudbursts, and cyclones—citizens face contradictory information. Weather apps provide raw millimetres of rainfall without context; social feeds spread unvetted rumors; and official PDFs from government departments are buried across multiple state portals.
        </p>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          <strong>resQnet</strong> solves this by serving as an <em>AI-powered preparedness coordinator</em>. It unifies weather forecasts, verified official alerts, shelter locations, emergency checklists, and safe communication into one authoritative dashboard.
        </p>
      </Card>

      {/* Data Transparency Table */}
      <Card borderVariant="highlight" className="space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h3 className="text-base font-bold text-slate-900">
            Transparency: Verified Feeds vs Demo Fallbacks
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-mono">
                <th className="py-2.5 px-3">Subsystem</th>
                <th className="py-2.5 px-3">Source & Protocol</th>
                <th className="py-2.5 px-3">Status In MVP</th>
                <th className="py-2.5 px-3">Demo Fallback Behavior</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-900">Weather Forecast</td>
                <td className="py-2.5 px-3">Open-Meteo REST API</td>
                <td className="py-2.5 px-3"><Badge variant="success" size="sm">LIVE & VERIFIED</Badge></td>
                <td className="py-2.5 px-3 text-slate-500">High-res cached ECMWF models if network drops</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-900">Disaster Warnings</td>
                <td className="py-2.5 px-3">IMD, NDMA SACHET, CWC</td>
                <td className="py-2.5 px-3"><Badge variant="warning" size="sm">VERIFIED DIRECTIVES</Badge></td>
                <td className="py-2.5 px-3 text-slate-500">Clearly tagged official advisories with direct portal links</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-900">Shelters & Relief Hubs</td>
                <td className="py-2.5 px-3">BMC / NDMA Registry</td>
                <td className="py-2.5 px-3"><Badge variant="demo" size="sm">DEMO / UNVERIFIED TAGGED</Badge></td>
                <td className="py-2.5 px-3 text-slate-500">Green for verified; Amber explicitly marked DEMO DATA</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-900">Model Context Protocol</td>
                <td className="py-2.5 px-3">Simulated MCP Pipeline</td>
                <td className="py-2.5 px-3"><Badge variant="info" size="sm">SIMULATED MCP PIPELINE</Badge></td>
                <td className="py-2.5 px-3 text-slate-500">Simulates Weather, Alerts, Maps, and Checklist tool stages</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-900">Emergency Broadcast</td>
                <td className="py-2.5 px-3">Client-Side SMS / Copy Intent</td>
                <td className="py-2.5 px-3"><Badge variant="default" size="sm">USER CONFIRMED</Badge></td>
                <td className="py-2.5 px-3 text-slate-500">Never sends background messages without review</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Official Government Portals Reference */}
      <Card className="space-y-3">
        <h3 className="text-base font-bold text-slate-900">Official National Disaster Portals (India)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
          <a
            href="https://mausam.imd.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 text-slate-800 flex items-center justify-between"
          >
            <div>
              <strong className="block text-slate-900">IMD Mausam</strong>
              <span className="text-[11px] text-slate-500">Met Department</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
          </a>

          <a
            href="https://sachet.ndma.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 text-slate-800 flex items-center justify-between"
          >
            <div>
              <strong className="block text-slate-900">NDMA SACHET</strong>
              <span className="text-[11px] text-slate-500">National Early Warning</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
          </a>

          <a
            href="https://cwc.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 text-slate-800 flex items-center justify-between"
          >
            <div>
              <strong className="block text-slate-900">CWC Floods</strong>
              <span className="text-[11px] text-slate-500">Water Commission</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
          </a>
        </div>
      </Card>
    </div>
  );
};
