import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Sparkles,
  Volume2,
  VolumeX,
  ExternalLink,
  ShieldCheck,
  Cpu,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { ChatMessage } from '../../types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { voiceService } from '../../services/voice';

interface ChatBoxProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => Promise<void>;
  isLoading: boolean;
  selectedCity: string;
}

export const ChatBox: React.FC<ChatBoxProps> = ({
  messages,
  onSendMessage,
  isLoading,
  selectedCity,
}) => {
  const [input, setInput] = useState('');
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [activeToolStage, setActiveToolStage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const primarySuggestedQueries = [
    'Heavy rainfall is expected in my area. Help me prepare.',
    'Find nearby emergency shelters.',
    'Create my flood preparedness checklist.',
    'What should I pack in a 72-hour emergency go-bag?',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, activeToolStage]);

  // Simulate MCP tool execution stages for educational & demonstration clarity
  useEffect(() => {
    if (isLoading) {
      setActiveToolStage('Weather MCP: Querying current rainfall & radar forecasts...');
      const t1 = setTimeout(() => {
        setActiveToolStage('Government Alerts MCP: Scanning IMD & NDMA SACHET feeds...');
      }, 700);
      const t2 = setTimeout(() => {
        setActiveToolStage('Maps & Shelter MCP: Resolving verified triage records...');
      }, 1400);
      const t3 = setTimeout(() => {
        setActiveToolStage('Checklist MCP: Generating prioritized household action items...');
      }, 2100);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    } else {
      setActiveToolStage(null);
    }
  }, [isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    const msg = input.trim();
    setInput('');
    await onSendMessage(msg);
  };

  const handleQueryClick = (q: string) => {
    setInput(q);
  };

  const handleVoiceToggle = (msg: ChatMessage) => {
    if (speakingMsgId === msg.id) {
      voiceService.stop();
      setSpeakingMsgId(null);
    } else {
      voiceService.stop();
      setSpeakingMsgId(msg.id);
      voiceService.speak(
        msg.content,
        () => setSpeakingMsgId(msg.id),
        () => setSpeakingMsgId(null),
        () => setSpeakingMsgId(null)
      );
    }
  };

  return (
    <div className="flex flex-col h-[700px] bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      {/* Header Bar */}
      <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-900 text-white shadow-sm">
            <Bot className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-sm">
                resQnet AI Disaster Coordinator
              </h3>
              <Badge variant="info" size="sm">
                Simulated MCP Pipeline
              </Badge>
            </div>
            <p className="text-xs text-slate-500">
              Calm, verified disaster decision support for {selectedCity}
            </p>
          </div>
        </div>

        {/* Clear Demonstration Notice Badge */}
        <div className="hidden sm:flex items-center gap-2">
          <Badge variant="demo" size="sm">
            SIMULATED DEMO ACTIVITY
          </Badge>
          <span className="text-xs text-slate-400 font-mono">📍 {selectedCity}</span>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/40">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const isSpeaking = speakingMsgId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${
                isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-semibold ${
                  isUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-blue-400 border border-slate-700'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200/90 text-slate-800 shadow-sm'
                }`}
              >
                {/* Assistant Simulated Tool Execution Stage Chip */}
                {!isUser && msg.tools_used && msg.tools_used.length > 0 && (
                  <div className="mb-3 pb-2 border-b border-slate-100 flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
                    <Cpu className="w-3.5 h-3.5 text-blue-600" />
                    <span className="font-semibold text-slate-700">Simulated MCP Tools:</span>
                    {msg.tools_used.map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-700 font-mono text-[11px]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                )}

                {/* Message Body */}
                <div className="whitespace-pre-wrap space-y-2">{msg.content}</div>

                {/* Source References */}
                {!isUser && msg.citations && msg.citations.length > 0 && (
                  <div className="mt-3.5 pt-2.5 border-t border-slate-100 space-y-1.5">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Referenced Official Frameworks</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {msg.citations.map((cite, i) => (
                        <a
                          key={i}
                          href={cite.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-50 border border-slate-200 text-xs text-blue-600 hover:text-blue-800 transition font-medium"
                        >
                          <span>{cite.title}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer Controls: Audio Playback & Timestamp */}
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>

                  {!isUser && (
                    <button
                      onClick={() => handleVoiceToggle(msg)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded transition text-xs ${
                        isSpeaking
                          ? 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold'
                          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                      }`}
                      title={isSpeaking ? 'Stop voice read-out' : 'Listen with Voice Briefing'}
                    >
                      {isSpeaking ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-blue-600" />
                          <span>Stop Briefing</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Voice Readout</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Live Loading & Multi-Stage Simulated MCP Activity */}
        {isLoading && (
          <div className="flex gap-3 max-w-lg items-start">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-blue-400 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-700 shadow-sm space-y-2 w-full">
              <div className="flex items-center gap-2 font-semibold text-slate-900">
                <RefreshCw className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                <span>Model Context Protocol Execution in Progress...</span>
              </div>
              {activeToolStage && (
                <div className="p-2.5 rounded-lg bg-blue-50/70 border border-blue-200/80 text-blue-800 font-mono text-[11px] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                  <span>{activeToolStage}</span>
                </div>
              )}
              <p className="text-[10px] text-slate-400">
                *Simulated MCP pipeline demonstrating real multi-tool workflow.
              </p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Inquiries Toolbar */}
      <div className="px-4 py-2.5 border-t border-slate-100 bg-white flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
        <span className="text-[11px] uppercase font-bold text-slate-400 shrink-0 font-mono flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          Suggested:
        </span>
        {primarySuggestedQueries.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleQueryClick(q)}
            className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 font-medium shrink-0 text-xs transition active:scale-95 border border-slate-200/60"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Large Input Box */}
      <form
        onSubmit={handleSend}
        className="p-4 border-t border-slate-200/90 bg-white flex items-center gap-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask resQnet about storm preparedness, safe shelters, or checklists in ${selectedCity}...`}
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-1 focus:ring-blue-600 transition shadow-inner"
        />
        <Button
          type="submit"
          disabled={!input.trim() || isLoading}
          variant="navy"
          size="lg"
          rightIcon={<Send className="w-4 h-4" />}
        >
          Ask AI
        </Button>
      </form>
    </div>
  );
};
