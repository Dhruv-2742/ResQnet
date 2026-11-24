import React, { useState, useEffect } from 'react';
import {
  WeatherData,
  OfficialAlert,
  ShelterRecord,
  ChecklistTask,
  EmergencyContact,
  ChatMessage,
  MCPStatus,
  UserLocation,
} from './types';
import {
  api,
  FALLBACK_WEATHER,
  FALLBACK_ALERTS,
  FALLBACK_SHELTERS,
  FALLBACK_CHECKLIST,
  FALLBACK_CONTACTS,
  FALLBACK_MCP_STATUS,
  generateFallbackAssistantResponse,
} from './services/api';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { WeatherAlertsPage } from './pages/WeatherAlertsPage';
import { MapPage } from './pages/MapPage';
import { AssistantPage } from './pages/AssistantPage';
import { ChecklistPage } from './pages/ChecklistPage';
import { ContactsPage } from './pages/ContactsPage';
import { SettingsPage } from './pages/SettingsPage';
import { AboutPage } from './pages/AboutPage';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [selectedCity, setSelectedCity] = useState<string>('Mumbai');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Core Data States
  const [weather, setWeather] = useState<WeatherData>(FALLBACK_WEATHER);
  const [alerts, setAlerts] = useState<OfficialAlert[]>(FALLBACK_ALERTS);
  const [shelters, setShelters] = useState<ShelterRecord[]>(FALLBACK_SHELTERS);
  const [checklist, setChecklist] = useState<ChecklistTask[]>(FALLBACK_CHECKLIST);
  const [contacts, setContacts] = useState<EmergencyContact[]>(FALLBACK_CONTACTS);
  const [mcpStatus, setMcpStatus] = useState<MCPStatus>(FALLBACK_MCP_STATUS);

  // AI Chat Messages
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      content: `Hello! I am **resQnet AI**, your calm disaster preparedness coordinator for **${selectedCity}**.\n\nI monitor verified IMD weather warnings, Open-Meteo precipitation models, emergency shelter records, and your 72-hour family go-bag.\n\n*Notice: All simulated MCP multi-tool stages in this demo are clearly tagged with sample verified references.*`,
      timestamp: new Date().toISOString(),
      tools_used: ['Weather MCP', 'Government Alerts MCP', 'Maps MCP'],
      citations: [
        { title: 'India Meteorological Department (IMD)', url: 'https://mausam.imd.gov.in', verified: true },
        { title: 'NDMA SACHET Disaster Portal', url: 'https://sachet.ndma.gov.in', verified: true },
      ],
      suggested_actions: [
        'Heavy rainfall is expected in my area. Help me prepare.',
        'Find nearby emergency shelters.',
        'Create my flood preparedness checklist.',
      ],
    },
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Load initial data
  useEffect(() => {
    loadCityData(selectedCity);
    loadAppData();
  }, [selectedCity]);

  const loadCityData = async (city: string) => {
    try {
      const [w, a, s] = await Promise.all([
        api.getWeather(city),
        api.getAlerts(city),
        api.getShelters(city),
      ]);
      setWeather(w);
      setAlerts(a);
      setShelters(s);
    } catch {
      // Fallback already in place
    }
  };

  const loadAppData = async () => {
    try {
      const [chk, cts, mcp] = await Promise.all([
        api.getChecklist(),
        api.getContacts(),
        api.getMCPStatus(),
      ]);
      setChecklist(chk);
      setContacts(cts);
      setMcpStatus(mcp);
    } catch {
      // Fallback already in place
    }
  };

  const handleCitySearch = (city: string) => {
    setSelectedCity(city);
    loadCityData(city);
  };

  const handleSendMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsChatLoading(true);

    try {
      // Simulate realistic network latency with multi-stage MCP tooling
      await new Promise((resolve) => setTimeout(resolve, 2500));
      const response = await api.sendChatMessage(text, {
        city: selectedCity,
        lat: weather.location.lat,
        lon: weather.location.lon,
      });
      setMessages((prev) => [...prev, response]);
    } catch (err) {
      const fallbackResponse = generateFallbackAssistantResponse(text, selectedCity);
      setMessages((prev) => [...prev, fallbackResponse]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setActiveTab('ai-assistant');
    handleSendMessage(prompt);
  };

  const handleToggleTask = async (id: string, completed: boolean) => {
    setChecklist((prev) =>
      prev.map((t) => (t.id === id ? { ...t, is_completed: completed } : t))
    );
    await api.updateChecklistTask(id, completed);
  };

  const handleResetChecklist = async () => {
    const reset = await api.resetChecklist();
    setChecklist(reset);
  };

  const handleAddTask = (task: Omit<ChecklistTask, 'id'>) => {
    const newTask: ChecklistTask = {
      ...task,
      id: `custom-${Date.now()}`,
    };
    setChecklist((prev) => [newTask, ...prev]);
  };

  const handleAddContact = async (contact: Omit<EmergencyContact, 'id'>) => {
    const added = await api.addContact(contact);
    setContacts((prev) => [...prev, added]);
  };

  const handleDeleteContact = async (id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
    await api.deleteContact(id);
  };

  const completedChecklistCount = checklist.filter((t) => t.is_completed).length;
  const checklistProgress =
    checklist.length > 0 ? Math.round((completedChecklistCount / checklist.length) * 100) : 0;
  const activeAlertCount = alerts.filter((a) => a.status === 'active').length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCity={selectedCity}
        onCitySearch={handleCitySearch}
        mcpConnected={mcpStatus.connected}
        alertCount={activeAlertCount}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          alertCount={activeAlertCount}
          checklistProgress={checklistProgress}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* Dynamic Main Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeTab === 'landing' && (
            <LandingPage
              onEnterApp={() => setActiveTab('dashboard')}
              selectedCity={selectedCity}
            />
          )}

          {activeTab === 'dashboard' && (
            <DashboardPage
              weather={weather}
              alerts={alerts}
              shelters={shelters}
              checklist={checklist}
              onNavigate={setActiveTab}
              onQuickPrompt={handleQuickPrompt}
            />
          )}

          {activeTab === 'ai-assistant' && (
            <AssistantPage
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isChatLoading}
              selectedCity={selectedCity}
            />
          )}

          {activeTab === 'map' && (
            <MapPage
              location={weather.location}
              shelters={shelters}
              selectedCity={selectedCity}
            />
          )}

          {activeTab === 'alerts' && (
            <WeatherAlertsPage
              weather={weather}
              alerts={alerts}
              selectedCity={selectedCity}
            />
          )}

          {activeTab === 'checklist' && (
            <ChecklistPage
              checklist={checklist}
              onToggleTask={handleToggleTask}
              onResetChecklist={handleResetChecklist}
              onAddTask={handleAddTask}
              selectedCity={selectedCity}
            />
          )}

          {activeTab === 'contacts' && (
            <ContactsPage
              contacts={contacts}
              onAddContact={handleAddContact}
              onDeleteContact={handleDeleteContact}
              selectedCity={selectedCity}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsPage
              selectedCity={selectedCity}
              onCityChange={handleCitySearch}
            />
          )}

          {activeTab === 'about' && <AboutPage />}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
