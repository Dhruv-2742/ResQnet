import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { ShelterRecord, UserLocation } from '../../types';
import { Badge } from '../ui/Badge';
import { AlertTriangle, Info, MapPin } from 'lucide-react';

interface DisasterMapProps {
  location: UserLocation;
  shelters: ShelterRecord[];
  onSelectShelter?: (shelter: ShelterRecord) => void;
  heightClass?: string;
  isInteractivePreview?: boolean;
}

export const DisasterMap: React.FC<DisasterMapProps> = ({
  location,
  shelters,
  onSelectShelter,
  heightClass = 'h-[500px]',
  isInteractivePreview = false,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [location.lat, location.lon],
        zoom: isInteractivePreview ? 11 : 12,
        zoomControl: true,
      });

      // Crisp OpenStreetMap Carto tiles
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 19,
        }
      ).addTo(map);

      mapInstanceRef.current = map;
      markersLayerRef.current = L.layerGroup().addTo(map);
    } else {
      mapInstanceRef.current.setView([location.lat, location.lon], isInteractivePreview ? 11 : 12);
    }

    if (markersLayerRef.current && mapInstanceRef.current) {
      markersLayerRef.current.clearLayers();

      // User location marker
      const userIcon = L.divIcon({
        className: 'custom-user-marker',
        html: `
          <div style="position: relative; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
            <div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background: #3b82f6; opacity: 0.35; animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="width: 18px; height: 18px; border-radius: 50%; background: #1d4ed8; border: 3px solid #ffffff; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.25);"></div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      L.marker([location.lat, location.lon], { icon: userIcon })
        .addTo(markersLayerRef.current)
        .bindPopup(
          `<div style="font-family: inherit; font-size: 13px; padding: 2px;">
            <strong style="color: #1d4ed8;">📍 Monitored Location</strong><br/>
            ${location.city}, ${location.state || location.country}<br/>
            <small style="color: #64748b;">Lat: ${location.lat.toFixed(4)}, Lon: ${location.lon.toFixed(4)}</small>
          </div>`
        );

      // Shelter markers
      shelters.forEach((shelter) => {
        const isVerified = shelter.is_verified;
        const color = isVerified ? '#10b981' : '#f59e0b';

        const shelterIcon = L.divIcon({
          className: 'custom-shelter-marker',
          html: `
            <div style="width: 30px; height: 30px; border-radius: 50%; background: ${color}; border: 2.5px solid #ffffff; display: flex; align-items: center; justify-content: center; box-shadow: 0 3px 8px rgba(15,23,42,0.25); color: #ffffff; font-weight: 700; font-size: 13px;">
              ${isVerified ? '✓' : '!'}
            </div>
          `,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        });

        const marker = L.marker([shelter.lat, shelter.lon], { icon: shelterIcon })
          .addTo(markersLayerRef.current!)
          .bindPopup(
            `
            <div style="font-family: inherit; min-width: 230px; font-size: 13px; color: #0f172a; padding: 3px;">
              <div style="font-weight: 700; color: #0f172a; margin-bottom: 4px; font-size: 13.5px;">${shelter.name}</div>
              <div style="margin-bottom: 6px;">
                <span style="display: inline-block; padding: 2px 7px; border-radius: 9999px; font-size: 10px; font-weight: 700; letter-spacing: 0.3px; background: ${
                  isVerified ? '#ecfdf5' : '#fef3c7'
                }; color: ${isVerified ? '#047857' : '#b45309'}; border: 1px solid ${
                  isVerified ? '#a7f3d0' : '#fde68a'
                };">
                  ${isVerified ? 'VERIFIED SHELTER RECORD' : 'DEMO RECORD (UNVERIFIED)'}
                </span>
              </div>
              <div style="color: #475569; font-size: 12px; margin-bottom: 5px;">📍 ${shelter.address}</div>
              <div style="color: #64748b; font-size: 11.5px; line-height: 1.5; border-top: 1px solid #f1f5f9; padding-top: 4px;">
                Capacity: <strong>${shelter.capacity}</strong> (Occupancy: ${shelter.current_occupancy})<br/>
                Verification: ${shelter.verification_source}<br/>
                Distance: ~${shelter.distance_km || 2} km
              </div>
            </div>
            `
          );

        marker.on('click', () => {
          onSelectShelter?.(shelter);
        });
      });
    }

    setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 200);
  }, [location, shelters, onSelectShelter, isInteractivePreview]);

  return (
    <div className={`relative w-full ${heightClass} rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm`}>
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Warning Notice */}
      <div className="absolute top-3 left-3 right-3 sm:right-auto sm:max-w-md z-10 p-3 rounded-lg bg-white/95 backdrop-blur-md border border-amber-300 shadow-md text-xs space-y-1">
        <div className="flex items-center gap-1.5 font-semibold text-amber-900">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
          <span>Evacuation Notice & Verification Standard</span>
        </div>
        <p className="text-slate-600 text-[11px] leading-relaxed">
          Amber markers indicate <strong>DEMO / UNVERIFIED</strong> records for platform demonstration. Never assume unverified locations are designated emergency shelters. Follow instructions broadcast by NDRF or police.
        </p>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-3 right-3 z-10 p-2.5 rounded-lg bg-white/95 backdrop-blur-md border border-slate-200 text-[11px] space-y-1.5 shadow-md">
        <div className="font-semibold text-slate-800">Map Legend</div>
        <div className="flex items-center gap-2 text-slate-600">
          <div className="w-3 h-3 rounded-full bg-blue-600 border border-white shadow-xs" />
          <span>Monitored Location</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <div className="w-3 h-3 rounded-full bg-emerald-500 border border-white shadow-xs" />
          <span>Verified Shelter (BMC / NDMA)</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <div className="w-3 h-3 rounded-full bg-amber-500 border border-white shadow-xs" />
          <span>DEMO DATA (Unverified)</span>
        </div>
      </div>
    </div>
  );
};
