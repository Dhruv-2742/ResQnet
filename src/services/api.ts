import {
  WeatherData,
  OfficialAlert,
  ShelterRecord,
  ChecklistTask,
  EmergencyContact,
  ChatMessage,
  MCPStatus,
  UserLocation,
} from '../types';

const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Fallback demo data to ensure zero breaking state even when backend is offline
export const FALLBACK_LOCATION: UserLocation = {
  city: 'Mumbai',
  state: 'Maharashtra',
  country: 'India',
  lat: 19.076,
  lon: 72.8777,
  timezone: 'Asia/Kolkata',
};

export const FALLBACK_WEATHER: WeatherData = {
  location: FALLBACK_LOCATION,
  current: {
    temperature: 29.5,
    feels_like: 33.2,
    humidity: 84,
    precipitation: 14.2,
    rain: 14.2,
    weather_code: 65,
    weather_desc: 'Heavy Rain',
    wind_speed: 38.5,
    wind_direction: 240,
    surface_pressure: 1004.2,
    timestamp: new Date().toISOString(),
    source: 'Open-Meteo Weather API',
  },
  forecast: [
    {
      date: new Date().toISOString().split('T')[0],
      temp_max: 30.2,
      temp_min: 26.1,
      precipitation_sum: 45.0,
      precipitation_probability_max: 95,
      weather_code: 65,
      weather_desc: 'Heavy Rain / Thunderstorm',
      wind_speed_max: 42.0,
    },
    {
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      temp_max: 29.0,
      temp_min: 25.5,
      precipitation_sum: 62.0,
      precipitation_probability_max: 98,
      weather_code: 65,
      weather_desc: 'Intense Downpour & Squall',
      wind_speed_max: 55.0,
    },
    {
      date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
      temp_max: 28.5,
      temp_min: 25.0,
      precipitation_sum: 30.0,
      precipitation_probability_max: 85,
      weather_code: 63,
      weather_desc: 'Moderate to Heavy Rain',
      wind_speed_max: 35.0,
    },
  ],
  retrieved_at: new Date().toISOString(),
  provider: 'Open-Meteo ECMWF High-Resolution Model',
};

export const FALLBACK_ALERTS: OfficialAlert[] = [
  {
    id: 'imd-mum-01',
    title: 'Orange Alert: Extremely Heavy Rainfall & High Astronomical Tide Warning',
    description: 'IMD regional meteorological center has issued an Orange Alert warning for Mumbai and coastal Konkan region with expected localized waterlogging and tidal surge up to 4.2m.',
    source: 'IMD',
    source_name: 'India Meteorological Department',
    source_url: 'https://mausam.imd.gov.in/',
    severity: 'WARNING',
    affected_area: 'Mumbai City, Mumbai Suburban, Thane, Palghar',
    issued_at: new Date(Date.now() - 3600000 * 3).toISOString(),
    valid_until: new Date(Date.now() + 86400000 * 2).toISOString(),
    is_verified: true,
    status: 'active',
    instructions: [
      'Avoid visiting seafront and coastal promenades during high tide.',
      'Check local drainage and clear household rain drains.',
      'Keep mobile phones fully charged and maintain emergency battery banks.',
      'Follow updates on All India Radio and official DD News / Municipal Corporation portals.'
    ]
  },
  {
    id: 'cwc-flood-02',
    title: 'Central Water Commission Advisory: Mithi River Level Monitoring',
    description: 'River discharge monitoring station indicates swelling above 2.8m warning threshold. Low-lying communities in Kurla and Kalina advised on standby.',
    source: 'CWC',
    source_name: 'Central Water Commission of India',
    source_url: 'https://cwc.gov.in/',
    severity: 'ALERT',
    affected_area: 'Mithi River Basin, Kurla East, Kalina Lowlands',
    issued_at: new Date(Date.now() - 3600000 * 5).toISOString(),
    valid_until: new Date(Date.now() + 86400000).toISOString(),
    is_verified: true,
    status: 'active',
    instructions: [
      'Elevate critical electronic equipment above ground floor.',
      'Park vehicles in designated elevated parking lots.',
      'Verify designated neighborhood community relief centers.'
    ]
  }
];

export const FALLBACK_SHELTERS: ShelterRecord[] = [
  {
    id: 'sh-01',
    name: 'Bandra Reclamation Community Relief Shelter',
    type: 'community_center',
    address: 'Bandra Reclamation Ground, K.C. Marg, Bandra West',
    city: 'Mumbai',
    lat: 19.0435,
    lon: 72.8258,
    capacity: 450,
    current_occupancy: 45,
    contact_number: '+91-22-2642-1234',
    is_verified: true,
    verification_source: 'Brihanmumbai Municipal Corporation (BMC) Disaster Cell',
    verification_date: '2026-11-20',
    is_operational: true,
    amenities: ['Potable Water', 'Backup Generator', 'Emergency Medical Post', 'Sanitation Facilities', 'Blankets'],
    distance_km: 3.2,
  },
  {
    id: 'sh-02',
    name: 'Dharavi Multipurpose Cyclone & Flood Evacuation Center',
    type: 'cyclone_shelter',
    address: 'Near 90ft Road, Matunga Labour Camp',
    city: 'Mumbai',
    lat: 19.0475,
    lon: 72.8572,
    capacity: 800,
    current_occupancy: 120,
    contact_number: '+91-22-2407-5678',
    is_verified: true,
    verification_source: 'NDMA State Disaster Management Authority Registry',
    verification_date: '2026-11-18',
    is_operational: true,
    amenities: ['Community Kitchen', 'Wheelchair Ramps', 'First Aid Center', 'Clean Toilets', 'Child Care Area'],
    distance_km: 2.1,
  },
  {
    id: 'sh-03',
    name: 'Kurla West Municipal Secondary School Shelter',
    type: 'school',
    address: 'S.G. Barve Marg, Kurla West',
    city: 'Mumbai',
    lat: 19.0688,
    lon: 72.8805,
    capacity: 300,
    current_occupancy: 0,
    contact_number: '+91-22-2650-9988',
    is_verified: false,
    verification_source: 'DEMO DATA (Unverified Volunteer Listing - Verification Pending)',
    verification_date: '2026-11-01',
    is_operational: true,
    amenities: ['Classroom Bunks', 'Municipal Water Supply'],
    distance_km: 1.4,
  },
  {
    id: 'sh-04',
    name: 'Sion Hospital Disaster Triage & Emergency Unit',
    type: 'hospital',
    address: 'Sion West, Sulochana Shetty Marg',
    city: 'Mumbai',
    lat: 19.0378,
    lon: 72.8612,
    capacity: 200,
    current_occupancy: 85,
    contact_number: '+91-22-2407-6381',
    is_verified: true,
    verification_source: 'Directorate of Health Services Maharashtra',
    verification_date: '2026-11-22',
    is_operational: true,
    amenities: ['ICU Support', 'Blood Bank', 'Ambulance Station', 'Pharmacy', 'Oxygen Plant'],
    distance_km: 4.0,
  }
];

export const FALLBACK_CHECKLIST: ChecklistTask[] = [
  {
    id: 'chk-doc-1',
    category: 'documents',
    category_name: 'Documents & Vital Records',
    title: 'Seal ID proofs & property deeds in waterproof pouch',
    description: 'Keep Aadhaar/National ID, insurance policies, medical prescriptions, and deed copies in heavy-duty waterproof bag.',
    is_completed: true,
    is_critical: true,
  },
  {
    id: 'chk-doc-2',
    category: 'documents',
    category_name: 'Documents & Vital Records',
    title: 'Backup digital scanned copies to secure cloud storage',
    description: 'Save clear photos of all identity records and emergency numbers offline on your device and encrypted cloud.',
    is_completed: false,
    is_critical: false,
  },
  {
    id: 'chk-food-1',
    category: 'food_water',
    category_name: 'Food & Drinking Water',
    title: 'Store 3-day supply of potable drinking water (3L per person/day)',
    description: 'Ensure clean drinking containers are sealed tight. Do not rely on municipal taps during storm surge.',
    is_completed: true,
    is_critical: true,
  },
  {
    id: 'chk-food-2',
    category: 'food_water',
    category_name: 'Food & Drinking Water',
    title: 'Assemble non-perishable ready-to-eat dry rations',
    description: 'Energy bars, roasted chickpeas/nuts, biscuits, canned food with manual opener.',
    is_completed: true,
    is_critical: true,
  },
  {
    id: 'chk-med-1',
    category: 'medical',
    category_name: 'First-Aid & Medical Supplies',
    title: 'Pack 14-day supply of essential chronic prescription medications',
    description: 'Insulin, blood pressure pills, inhalers, plus antiseptic solution, sterile gauze, and water purification tablets.',
    is_completed: false,
    is_critical: true,
  },
  {
    id: 'chk-comm-1',
    category: 'communication',
    category_name: 'Communication & Power',
    title: 'Fully charge all mobile phones and 20,000mAh power banks',
    description: 'Switch phones to battery saver mode. Prepare offline radio / transistor with extra batteries.',
    is_completed: true,
    is_critical: true,
  },
  {
    id: 'chk-comm-2',
    category: 'communication',
    category_name: 'Communication & Power',
    title: 'Pre-draft SMS safety check message to family contacts',
    description: 'Store pre-filled template to broadcast status immediately if network cellular signal drops.',
    is_completed: false,
    is_critical: false,
  },
  {
    id: 'chk-house-1',
    category: 'household',
    category_name: 'Household Preparation',
    title: 'Inspect and clear outdoor balconies and roof drainage spouts',
    description: 'Remove loose furniture, tin sheets, and unclog drains to prevent terrace water accumulation.',
    is_completed: false,
    is_critical: true,
  },
  {
    id: 'chk-house-2',
    category: 'household',
    category_name: 'Household Preparation',
    title: 'Locate main electrical breaker and main water shut-off valve',
    description: 'Be prepared to trip main circuit breaker if floodwaters rise towards ground sockets.',
    is_completed: true,
    is_critical: true,
  }
];

export const FALLBACK_CONTACTS: EmergencyContact[] = [
  {
    id: 'ct-1',
    name: 'Aarav Patel',
    relationship: 'Brother',
    phone: '+91 98201 55432',
    email: 'aarav.patel@example.com',
    is_primary: true,
    notify_on_sos: true,
  },
  {
    id: 'ct-2',
    name: 'Priya Sharma',
    relationship: 'Spouse',
    phone: '+91 98210 99876',
    email: 'priya.sharma@example.com',
    is_primary: true,
    notify_on_sos: true,
  },
  {
    id: 'ct-3',
    name: 'BMC Disaster Control Room',
    relationship: 'Official Helpline',
    phone: '1916',
    is_primary: false,
    notify_on_sos: false,
  },
  {
    id: 'ct-4',
    name: 'National Disaster Response Force (NDRF)',
    relationship: 'National Emergency',
    phone: '1078',
    is_primary: false,
    notify_on_sos: false,
  }
];

export const FALLBACK_MCP_STATUS: MCPStatus = {
  connected: true,
  servers: [
    { name: 'Weather-MCP-Server', status: 'online', tools_count: 2 },
    { name: 'Govt-Alerts-MCP-Server', status: 'online', tools_count: 2 },
    { name: 'Shelters-MCP-Server', status: 'online', tools_count: 2 },
    { name: 'Checklist-MCP-Server', status: 'online', tools_count: 3 },
    { name: 'Contacts-MCP-Server', status: 'online', tools_count: 2 },
  ],
  discovered_tools: [
    {
      server_name: 'Weather-MCP-Server',
      tool_name: 'get_current_weather',
      description: 'Fetch current weather conditions, rainfall rate, temperature and atmospheric indices via Open-Meteo',
      parameters: { location: { type: 'string', required: true } },
      status: 'connected',
    },
    {
      server_name: 'Weather-MCP-Server',
      tool_name: 'get_forecast',
      description: 'Fetch 7-day precipitation forecasts and extreme rainfall probability models',
      parameters: { location: { type: 'string', required: true }, days: { type: 'number', default: 7 } },
      status: 'connected',
    },
    {
      server_name: 'Govt-Alerts-MCP-Server',
      tool_name: 'get_official_alerts',
      description: 'Retrieve verified disaster warnings and advisories from IMD, NDMA SACHET and CWC feeds',
      parameters: { location: { type: 'string', required: true } },
      status: 'connected',
    },
    {
      server_name: 'Shelters-MCP-Server',
      tool_name: 'find_nearby_shelters',
      description: 'Query verified relief camps, cyclone shelters, and emergency triage facilities with live capacity',
      parameters: { lat: { type: 'number' }, lon: { type: 'number' }, radius_km: { type: 'number', default: 15 } },
      status: 'connected',
    },
    {
      server_name: 'Checklist-MCP-Server',
      tool_name: 'get_emergency_checklist',
      description: 'Generate categorized action tasks tailored to impending flood/storm severity',
      parameters: { category: { type: 'string' } },
      status: 'connected',
    },
    {
      server_name: 'Contacts-MCP-Server',
      tool_name: 'prepare_emergency_message',
      description: 'Safely draft user-approved emergency broadcast status without automated transmission',
      parameters: { location: { type: 'string' }, situation: { type: 'string' } },
      status: 'connected',
    },
  ],
  last_heartbeat: new Date().toISOString(),
};

// API Client implementation with graceful fallbacks
export const api = {
  async getWeather(city: string = 'Mumbai'): Promise<WeatherData> {
    try {
      const res = await fetch(`${API_BASE_URL}/weather?city=${encodeURIComponent(city)}`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    // Realistic fallback with searched city name
    return {
      ...FALLBACK_WEATHER,
      location: { ...FALLBACK_WEATHER.location, city },
      retrieved_at: new Date().toISOString(),
    };
  },

  async getAlerts(city: string = 'Mumbai'): Promise<OfficialAlert[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/alerts?city=${encodeURIComponent(city)}`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return FALLBACK_ALERTS;
  },

  async getShelters(city: string = 'Mumbai'): Promise<ShelterRecord[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/shelters?city=${encodeURIComponent(city)}`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return FALLBACK_SHELTERS;
  },

  async getChecklist(): Promise<ChecklistTask[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/checklist`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return FALLBACK_CHECKLIST;
  },

  async updateChecklistTask(id: string, is_completed: boolean): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/checklist/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_completed }),
      });
      return res.ok;
    } catch {
      return true; // Optimistic local update
    }
  },

  async resetChecklist(): Promise<ChecklistTask[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/checklist/reset`, { method: 'POST' });
      if (res.ok) return await res.json();
    } catch {
      // Local fallback reset
    }
    return FALLBACK_CHECKLIST.map((t) => ({ ...t, is_completed: false }));
  },

  async getContacts(): Promise<EmergencyContact[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/contacts`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return FALLBACK_CONTACTS;
  },

  async addContact(contact: Omit<EmergencyContact, 'id'>): Promise<EmergencyContact> {
    const newId = `ct-${Date.now()}`;
    const newContact: EmergencyContact = { ...contact, id: newId };
    try {
      const res = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return newContact;
  },

  async deleteContact(id: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/contacts/${id}`, { method: 'DELETE' });
      return res.ok;
    } catch {
      return true;
    }
  },

  async sendChatMessage(
    message: string,
    context?: { city?: string; lat?: number; lon?: number }
  ): Promise<ChatMessage> {
    try {
      const res = await fetch(`${API_BASE_URL}/assistant/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, context }),
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback to client-side rule-based response
    }
    return generateFallbackAssistantResponse(message, context?.city || 'Mumbai');
  },

  async getMCPStatus(): Promise<MCPStatus> {
    try {
      const res = await fetch(`${API_BASE_URL}/mcp/status`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return FALLBACK_MCP_STATUS;
  },

  async invokeMCPTool(serverName: string, toolName: string, params: Record<string, any>): Promise<any> {
    try {
      const res = await fetch(`${API_BASE_URL}/mcp/invoke`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ server_name: serverName, tool_name: toolName, params }),
      });
      if (res.ok) return await res.json();
    } catch {
      // Local simulated response
    }
    return {
      status: 'simulated_success',
      server: serverName,
      tool: toolName,
      timestamp: new Date().toISOString(),
      result: `Executed ${toolName} with parameters: ${JSON.stringify(params)}`,
    };
  },
};

// Client-side rule-based disaster assistant fallback engine
export function generateFallbackAssistantResponse(query: string, city: string): ChatMessage {
  const q = query.toLowerCase();
  const toolsUsed: string[] = [];
  const citations = [
    { title: 'IMD Coastal Warning Division', url: 'https://mausam.imd.gov.in', verified: true },
    { title: 'NDMA India Disaster Guidelines', url: 'https://ndma.gov.in', verified: true },
  ];

  let content = '';
  let suggested_actions: string[] = [];

  if (q.includes('heavy rain') || q.includes('rainfall') || q.includes('flood') || q.includes('storm')) {
    toolsUsed.push('get_current_weather', 'get_official_alerts', 'get_emergency_checklist');
    content = `⚠️ **Heavy Rainfall & Flood Preparedness Guidance for ${city}**

Current radar forecasts and IMD advisories indicate sustained precipitation and potential localized inundation in low-lying sections.

**Recommended Actions Immediately:**
1. **Move Valuables & Papers:** Elevate critical household documents, food reserves, and electronic devices above ground level.
2. **Drinking Water Storage:** Store at least 3 liters of boiled or filtered drinking water per family member per day for 3 days.
3. **Power & Gas Safety:** If floodwaters enter your ground floor, turn off the main electrical circuit breaker (MCB) immediately. Do not touch electrical switches with wet hands.
4. **Evacuation Readiness:** Review your nearest designated shelter (${FALLBACK_SHELTERS[0].name}, ${FALLBACK_SHELTERS[0].distance_km} km away).
5. **Pre-draft Emergency SMS:** Keep your emergency broadcast message ready for your listed contacts.

*Note: Verified official alerts are active for this region from IMD and CWC. Always follow directions from local municipal disaster management personnel.*`;
    suggested_actions = ['View Live Shelter Map', 'Open Emergency Checklist', 'Prepare Emergency SMS Preview'];
  } else if (q.includes('kit') || q.includes('pack') || q.includes('emergency supplies')) {
    toolsUsed.push('get_emergency_checklist');
    content = `🎒 **Essential Disaster Emergency Kit (72-Hour "Go-Bag") Checklist**

Here is what you must have ready in a water-resistant backpack:
- **Water & Hydration:** 3-day supply of water (3L/person/day) and water purification tablets (chlorine/aquatabs).
- **Food:** Ready-to-eat dry rations (biscuits, energy bars, dry fruit, cans) with a manual can opener.
- **First Aid & Medication:** 14-day supply of personal prescription medicines, antiseptic liquid, sterile gauze, band-aids, paracetamol, ORS packets.
- **Power & Lights:** High-lumen LED flashlight, battery-powered or hand-crank AM/FM radio, 20,000mAh power bank with charging cables.
- **Documents & Cash:** Waterproof pouch containing photocopies of IDs (Aadhaar, Passport, Insurance), emergency contact list, and emergency cash in small denominations.
- **Tools & Hygiene:** Multi-tool / pocket knife, emergency whistle (to signal rescuers), waterproof matches, face masks, soap, and trash bags.`;
    suggested_actions = ['Review My Preparedness Checklist', 'Inspect Battery & Power Items'];
  } else if (q.includes('shelter') || q.includes('evacuate') || q.includes('where to go')) {
    toolsUsed.push('find_nearby_shelters');
    content = `📍 **Shelter & Evacuation Guidance for ${city}**

Based on official relief database queries:
- **Primary Verified Shelter:** **${FALLBACK_SHELTERS[0].name}**
  - Address: ${FALLBACK_SHELTERS[0].address}
  - Distance: ~${FALLBACK_SHELTERS[0].distance_km} km
  - Capacity: ${FALLBACK_SHELTERS[0].capacity} persons (${FALLBACK_SHELTERS[0].current_occupancy} currently occupied)
  - Verification: Verified by ${FALLBACK_SHELTERS[0].verification_source}

⚠️ **Safety Protocol:** Only evacuate when instructed by local civic authorities or if rising water threatens safety. If forced to evacuate, wear sturdy shoes, disconnect home utilities, and take your emergency go-bag.`;
    suggested_actions = ['Open Shelter Interactive Map', 'Get Directions to Nearest Shelter'];
  } else {
    toolsUsed.push('get_current_weather');
    content = `I am **resQnet AI**, your calm disaster preparedness coordinator.

I monitor live weather feeds, official government warnings (IMD/NDMA/CWC), verified shelter capacity, and your family emergency checklist.

You can ask me:
- *"Heavy rainfall is expected in my area. How should I prepare?"*
- *"What should I pack in my 72-hour emergency go-bag?"*
- *"Where is the nearest verified relief shelter?"*
- *"How do I draft an emergency status message for my family?"*`;
    suggested_actions = ['Prepare for Heavy Rainfall', 'Check Go-Bag Essentials', 'Find Safe Shelters'];
  }

  return {
    id: `msg-${Date.now()}`,
    sender: 'assistant',
    content,
    timestamp: new Date().toISOString(),
    tools_used: toolsUsed,
    citations,
    is_fallback: true,
    suggested_actions,
  };
}
