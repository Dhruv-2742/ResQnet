export interface UserLocation {
  city: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
  timezone?: string;
}

export interface WeatherCurrent {
  temperature: number;
  feels_like: number;
  humidity: number;
  precipitation: number;
  rain: number;
  weather_code: number;
  weather_desc: string;
  wind_speed: number;
  wind_direction: number;
  surface_pressure: number;
  timestamp: string;
  source: string;
}

export interface DailyForecast {
  date: string;
  temp_max: number;
  temp_min: number;
  precipitation_sum: number;
  precipitation_probability_max: number;
  weather_code: number;
  weather_desc: string;
  wind_speed_max: number;
}

export interface WeatherData {
  location: UserLocation;
  current: WeatherCurrent;
  forecast: DailyForecast[];
  retrieved_at: string;
  provider: string;
}

export interface OfficialAlert {
  id: string;
  title: string;
  description: string;
  source: 'IMD' | 'NDMA_SACHET' | 'CWC' | 'OFFICIAL_STATE_FEED' | 'DEMO_DATA';
  source_name: string;
  source_url: string;
  severity: 'WARNING' | 'ALERT' | 'WATCH' | 'ADVISORY' | 'INFO';
  affected_area: string;
  issued_at: string;
  valid_until: string;
  is_verified: boolean;
  status: 'active' | 'updating' | 'expired';
  instructions?: string[];
}

export interface ShelterRecord {
  id: string;
  name: string;
  type: 'cyclone_shelter' | 'flood_relief_camp' | 'community_center' | 'school' | 'hospital';
  address: string;
  city: string;
  lat: number;
  lon: number;
  capacity: number;
  current_occupancy: number;
  contact_number?: string;
  is_verified: boolean;
  verification_source: string;
  verification_date: string;
  is_operational: boolean;
  amenities: string[];
  distance_km?: number;
}

export interface ChecklistTask {
  id: string;
  category: 'documents' | 'food_water' | 'medical' | 'communication' | 'household';
  category_name: string;
  title: string;
  description: string;
  is_completed: boolean;
  is_critical: boolean;
  custom?: boolean;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  is_primary: boolean;
  notify_on_sos: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  tools_used?: string[];
  citations?: Array<{ title: string; url: string; verified: boolean }>;
  is_fallback?: boolean;
  suggested_actions?: string[];
}

export interface MCPToolInfo {
  server_name: string;
  tool_name: string;
  description: string;
  parameters: Record<string, any>;
  status: 'connected' | 'disconnected' | 'error';
}

export interface MCPStatus {
  connected: boolean;
  servers: Array<{
    name: string;
    status: 'online' | 'offline' | 'error';
    tools_count: number;
    error_message?: string;
  }>;
  discovered_tools: MCPToolInfo[];
  last_heartbeat: string;
}

export interface SystemStatus {
  api_connected: boolean;
  mcp_status: MCPStatus;
  llm_provider: string;
  voice_enabled: boolean;
  database_type: string;
}
