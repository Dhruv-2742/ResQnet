import React from 'react';
import { Shield, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200/90 bg-white py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-600" />
          <span className="font-semibold text-slate-900">resQnet</span>
          <span>– AI-Powered Disaster Preparedness & Coordination Platform</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://mausam.imd.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition flex items-center gap-1 font-medium text-slate-600"
          >
            IMD Mausam <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
          <a
            href="https://sachet.ndma.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition flex items-center gap-1 font-medium text-slate-600"
          >
            NDMA SACHET <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
          <a
            href="https://cwc.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition flex items-center gap-1 font-medium text-slate-600"
          >
            CWC Floods <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
          <a
            href="https://open-meteo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition flex items-center gap-1 font-medium text-slate-600"
          >
            Open-Meteo <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>

        <div className="text-slate-400 font-mono text-[11px]">
          Demo Data Clearly Separated • Hackathon MVP
        </div>
      </div>
    </footer>
  );
};
