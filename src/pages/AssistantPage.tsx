import React from 'react';
import { ChatBox } from '../components/assistant/ChatBox';
import { ChatMessage } from '../types';

interface AssistantPageProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => Promise<void>;
  isLoading: boolean;
  selectedCity: string;
}

export const AssistantPage: React.FC<AssistantPageProps> = ({
  messages,
  onSendMessage,
  isLoading,
  selectedCity,
}) => {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900">
          AI Disaster Preparedness Coordinator
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Evidence-grounded conversational assistant querying simulated Weather, Official Alerts, Maps/Shelter, and Checklist tools.
        </p>
      </div>

      <ChatBox
        messages={messages}
        onSendMessage={onSendMessage}
        isLoading={isLoading}
        selectedCity={selectedCity}
      />
    </div>
  );
};
