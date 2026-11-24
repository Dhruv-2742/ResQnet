import React, { useState } from 'react';
import {
  MapPin,
  ShieldCheck,
  Search,
  Filter,
  Phone,
  AlertCircle,
  Building,
  Navigation,
  X,
  ExternalLink,
} from 'lucide-react';
import { ShelterRecord, UserLocation } from '../types';
import { DisasterMap } from '../components/map/DisasterMap';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

interface MapPageProps {
  location: UserLocation;
  shelters: ShelterRecord[];
  selectedCity: string;
}

export const MapPage: React.FC<MapPageProps> = ({
  location,
  shelters,
  selectedCity,
}) => {
  const [filterVerifiedOnly, setFilterVerifiedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShelter, setSelectedShelter] = useState<ShelterRecord | null>(null);

  const filteredShelters = shelters
    .filter((s) => (filterVerifiedOnly ? s.is_verified : true))
    .filter((s) =>
      searchQuery.trim()
        ? s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.address.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <MapPin className="w-7 h-7 text-blue-600" />
            Interactive Emergency Shelter Map
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Community cyclone shelters, school relief points, and medical triage facilities in {selectedCity}.
          </p>
        </div>

        {/* Verification Filter & Search */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search shelters..."
              className="bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600"
            />
          </div>

          <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-xs">
            <input
              type="checkbox"
              checked={filterVerifiedOnly}
              onChange={(e) => setFilterVerifiedOnly(e.target.checked)}
              className="rounded border-slate-300 text-blue-600 focus:ring-0"
            />
            <span className="font-medium">Verified Only</span>
          </label>
        </div>
      </div>

      {/* Interactive Map */}
      <DisasterMap
        location={location}
        shelters={filteredShelters}
        onSelectShelter={(shelter) => setSelectedShelter(shelter)}
        heightClass="h-[520px]"
      />

      {/* Shelter Directory Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Building className="w-5 h-5 text-blue-600" />
            Shelter Records Directory ({filteredShelters.length})
          </h3>
          <span className="text-xs text-slate-500">
            Click any record to inspect verified amenities & contacts
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredShelters.map((shelter) => (
            <Card
              key={shelter.id}
              onClick={() => setSelectedShelter(shelter)}
              className="space-y-3 cursor-pointer"
              borderVariant={shelter.is_verified ? 'normal' : 'warning'}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 hover:text-blue-700 transition">
                    {shelter.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">📍 {shelter.address}</p>
                </div>

                {shelter.is_verified ? (
                  <Badge variant="success" size="sm">
                    Verified
                  </Badge>
                ) : (
                  <Badge variant="demo" size="sm">
                    DEMO DATA
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 py-2 border-y border-slate-100">
                <div>
                  <span className="text-slate-400">Capacity:</span>{' '}
                  <strong className="text-slate-800">{shelter.capacity}</strong> (Occupancy: {shelter.current_occupancy})
                </div>
                <div>
                  <span className="text-slate-400">Distance:</span>{' '}
                  <strong className="text-slate-800">~{shelter.distance_km || 2} km</strong>
                </div>
                <div>
                  <span className="text-slate-400">Operational:</span>{' '}
                  <strong className={shelter.is_operational ? 'text-emerald-700' : 'text-red-700'}>
                    {shelter.is_operational ? 'Active & Ready' : 'Standby'}
                  </strong>
                </div>
                {shelter.contact_number && (
                  <div className="flex items-center gap-1 text-slate-700">
                    <Phone className="w-3 h-3 text-blue-600" />
                    <span>{shelter.contact_number}</span>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <div className="text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Verification Source:</span>{' '}
                  {shelter.verification_source} ({shelter.verification_date})
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {shelter.amenities.map((amenity, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-100 text-[10px] text-slate-600 font-medium"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Shelter Details Modal */}
      {selectedShelter && (
        <Modal
          isOpen={!!selectedShelter}
          onClose={() => setSelectedShelter(null)}
          title={selectedShelter.name}
        >
          <div className="space-y-4 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <Badge variant={selectedShelter.is_verified ? 'success' : 'demo'}>
                {selectedShelter.is_verified ? 'OFFICIALLY VERIFIED SHELTER' : 'DEMO DATA (UNVERIFIED)'}
              </Badge>
              <span className="text-slate-500 font-mono">Distance: ~{selectedShelter.distance_km || 2} km</span>
            </div>

            <p className="text-slate-600 font-medium">📍 {selectedShelter.address}</p>

            <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <div>Total Capacity: <strong>{selectedShelter.capacity} people</strong></div>
              <div>Current Occupancy: <strong>{selectedShelter.current_occupancy}</strong></div>
              <div>Contact Helpline: <strong>{selectedShelter.contact_number || '1916'}</strong></div>
              <div>Status: <strong className="text-emerald-700">Operational</strong></div>
            </div>

            <div>
              <div className="font-semibold text-slate-900 mb-1">On-Site Amenities:</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedShelter.amenities.map((a, i) => (
                  <span key={i} className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-800 text-[11px]">
                    ✓ {a}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-[11px] leading-relaxed">
              <strong>Official Evacuation Mandate:</strong> Only relocate to this shelter if your current building is flooded or local disaster police issue an evacuation notice.
            </div>

            <div className="flex justify-end pt-2">
              <Button size="sm" variant="navy" onClick={() => setSelectedShelter(null)}>
                Close Details
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
