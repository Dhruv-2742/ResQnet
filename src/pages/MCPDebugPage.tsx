import React, { useState } from 'react';
import {
  Cpu,
  RefreshCw,
  Play,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Terminal,
  Server,
  Layers,
} from 'lucide-react';
import { MCPStatus } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { api } from '../services/api';

interface MCPDebugPageProps {
  mcpStatus: MCPStatus;
  onRefresh: () => void;
  selectedCity: string;
}

export const MCPDebugPage: React.FC<MCPDebugPageProps> = ({
  mcpStatus,
  onRefresh,
  selectedCity,
}) => {
  const [selectedTool, setSelectedTool] = useState<string>('get_current_weather');
  const [paramInput, setParamInput] = useState<string>(`{"location": "${selectedCity}"}`);
  const [invoking, setInvoking] = useState(false);
  const [invocationResult, setInvocationResult] = useState<any>(null);

  const handleRunTool = async () => {
    setInvoking(true);
    setInvocationResult(null);
    try {
      let parsedParams = {};
      try {
        parsedParams = JSON.parse(paramInput);
      } catch {
        parsedParams = { location: selectedCity };
      }

      const toolObj = mcpStatus.discovered_tools.find((t) => t.tool_name === selectedTool);
      const serverName = toolObj?.server_name || 'Weather-MCP-Server';

      const res = await api.invokeMCPTool(serverName, selectedTool, parsedParams);
      setInvocationResult(res);
    } catch (err: any) {
      setInvocationResult({ error: err.message || 'Execution error' });
    } finally {
      setInvoking(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Cpu className="w-7 h-7 text-cyan-400" />
            Model Context Protocol (MCP) Live Inspector
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real MCP server endpoints running on Python MCP SDK communicating with the FastAPI orchestrator.
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={onRefresh}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
        >
          Rescan Servers & Tools
        </Button>
      </div>

      {/* Server Health Status Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {mcpStatus.servers.map((srv, idx) => (
          <Card key={idx} className="p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white font-mono">{srv.name}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Status: <strong className="text-emerald-400">{srv.status}</strong></span>
              <span>{srv.tools_count} Tools</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Discovered Tools Catalog */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-400" />
          Discovered MCP Tool Catalog ({mcpStatus.discovered_tools.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mcpStatus.discovered_tools.map((tool, idx) => (
            <Card
              key={idx}
              onClick={() => {
                setSelectedTool(tool.tool_name);
                if (tool.tool_name.includes('weather') || tool.tool_name.includes('alert')) {
                  setParamInput(JSON.stringify({ location: selectedCity }, null, 2));
                } else if (tool.tool_name.includes('shelter')) {
                  setParamInput(JSON.stringify({ lat: 19.076, lon: 72.8777, radius_km: 15 }, null, 2));
                } else if (tool.tool_name.includes('checklist')) {
                  setParamInput(JSON.stringify({ category: 'flood_heavy_rain' }, null, 2));
                } else {
                  setParamInput(JSON.stringify({ location: selectedCity, situation: 'Safe' }, null, 2));
                }
              }}
              className={`space-y-2 cursor-pointer transition ${
                selectedTool === tool.tool_name
                  ? 'border-cyan-500 bg-cyan-950/20'
                  : 'hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-cyan-300">
                  {tool.tool_name}
                </span>
                <Badge variant="success" size="sm">
                  Connected
                </Badge>
              </div>

              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {tool.description}
              </p>

              <div className="text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-800">
                Server: {tool.server_name}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Live Tool Invocation Playground */}
      <Card borderVariant="highlight" className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">
              MCP Tool Execution Playground
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Target: {selectedTool}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Tool Input Parameters (JSON Schema Validated):
            </label>
            <textarea
              rows={6}
              value={paramInput}
              onChange={(e) => setParamInput(e.target.value)}
              className="w-full bg-slate-950 font-mono text-xs text-cyan-300 border border-slate-800 rounded-lg p-3 focus:outline-none focus:border-cyan-500"
            />
            <div className="mt-3">
              <Button
                variant="primary"
                onClick={handleRunTool}
                isLoading={invoking}
                leftIcon={<Play className="w-4 h-4" />}
              >
                Invoke MCP Tool
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Structured Tool Execution Result:
            </label>
            <div className="h-[180px] overflow-y-auto bg-slate-950 font-mono text-xs text-slate-300 border border-slate-800 rounded-lg p-3">
              {invoking ? (
                <div className="flex items-center gap-2 text-cyan-400">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Invoking {selectedTool} on MCP Server...</span>
                </div>
              ) : invocationResult ? (
                <pre className="whitespace-pre-wrap">
                  {JSON.stringify(invocationResult, null, 2)}
                </pre>
              ) : (
                <span className="text-slate-400">
                  Click 'Invoke MCP Tool' to test live execution.
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
