import React, { useEffect, useState } from 'react';
import { APIProvider, Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import { AirBnBListing, CurrencyRate } from '../types';
import { ShieldCheck, MapPin, Layers, Compass } from 'lucide-react';

interface AirbnbMapProps {
  listings: AirBnBListing[];
  selectedListing: AirBnBListing | null;
  onSelectListing: (listing: AirBnBListing) => void;
  currency: CurrencyRate;
  center: { lat: number; lng: number };
  zoom: number;
  highlightedNeighborhood?: string;
  className?: string;
}

// Camera controller component inside APIProvider
function MapController({ center, zoom, selectedListing }: { center: { lat: number; lng: number }; zoom: number; selectedListing: AirBnBListing | null }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    if (selectedListing) {
      map.panTo({ lat: selectedListing.lat, lng: selectedListing.lng });
      map.setZoom(15);
    } else {
      map.panTo(center);
      map.setZoom(zoom);
    }
  }, [map, center, zoom, selectedListing]);

  return null;
}

export const AirbnbMap: React.FC<AirbnbMapProps> = ({
  listings,
  selectedListing,
  onSelectListing,
  currency,
  center,
  zoom,
  className = 'w-full h-full'
}) => {
  const apiKey = (import.meta as unknown as { env: Record<string, string> }).env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyCWAana6Ck4vVUmL03S4UtLltgJAHR-iKc';
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'hybrid'>('roadmap');
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const [mapLoadError, setMapLoadError] = useState(false);

  useEffect(() => {
    const handleQuotaExceeded = () => {
      setQuotaExceeded(true);
    };
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => {
      window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    };
  }, []);

  const formatPrice = (usdPrice: number) => {
    const converted = Math.round(usdPrice * currency.rateFromUSD);
    return `${currency.symbol}${converted.toLocaleString()}`;
  };

  return (
    <div className={`relative ${className} overflow-hidden bg-neutral-100 flex flex-col`}>
      {/* Required Tier 2 Client-Side Quota Banner */}
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm shrink-0">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* Map Content */}
      <div className="relative flex-1 w-full h-full">
        {!mapLoadError ? (
          <APIProvider
            apiKey={apiKey}
            onError={() => setMapLoadError(true)}
          >
            <Map
              defaultCenter={center}
              defaultZoom={zoom}
              mapId="DEMO_MAP_ID"
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              gestureHandling="greedy"
              disableDefaultUI={true}
              mapTypeId={mapType}
              style={{ width: '100%', height: '100%' }}
            >
              <MapController center={center} zoom={zoom} selectedListing={selectedListing} />

              {listings.map((item) => {
                const isSelected = selectedListing?.id === item.id;
                return (
                  <AdvancedMarker
                    key={item.id}
                    position={{ lat: item.lat, lng: item.lng }}
                    onClick={() => onSelectListing(item)}
                    zIndex={isSelected ? 999 : 10}
                  >
                    <button
                      className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs md:text-sm transition-all shadow-md active:scale-95 cursor-pointer ${
                        isSelected
                          ? 'bg-rose-600 text-white shadow-rose-500/40 scale-110 ring-2 ring-white ring-offset-2 ring-offset-rose-600'
                          : 'bg-white text-neutral-900 hover:bg-neutral-900 hover:text-white border border-neutral-200'
                      }`}
                      title={`${item.title} - ${formatPrice(item.pricePerNightUSD)}/night (TRA Licensed)`}
                      aria-label={`Listing: ${item.title}`}
                    >
                      {/* Municipal verified permit indicator */}
                      <span className={`flex items-center justify-center w-3.5 h-3.5 rounded-full ${isSelected ? 'bg-white text-rose-600' : 'bg-emerald-500 text-white'}`}>
                        <ShieldCheck className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <span>{formatPrice(item.pricePerNightUSD)}</span>

                      {/* Small triangle pointer */}
                      <span
                        className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] ${
                          isSelected ? 'border-t-rose-600' : 'border-t-white group-hover:border-t-neutral-900'
                        }`}
                      />
                    </button>
                  </AdvancedMarker>
                );
              })}
            </Map>
          </APIProvider>
        ) : (
          /* Graceful Fallback Simulated Vector Map if API Key restrictions or network fail */
          <div className="w-full h-full relative bg-neutral-200 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#64748b_1px,transparent_1px)] [background-size:24px_24px]" />
            <div className="text-center p-6 bg-white/90 backdrop-blur rounded-2xl shadow-xl max-w-sm z-10 border border-neutral-200">
              <MapPin className="w-10 h-10 text-rose-600 mx-auto mb-2" />
              <h3 className="font-bold text-neutral-900 text-base">Interactive Kenya AirBnB Vector View</h3>
              <p className="text-xs text-neutral-600 mt-1">Showing {listings.length} registered Kenya AirBnBs in {center.lat.toFixed(2)}, {center.lng.toFixed(2)}</p>
            </div>
          </div>
        )}

        {/* Floating Quick Map Controls (Android Floating Action style) */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          {/* Map Layer Switcher */}
          <button
            onClick={() => setMapType(t => (t === 'roadmap' ? 'satellite' : 'roadmap'))}
            className="w-10 h-10 rounded-full bg-white/95 backdrop-blur shadow-md flex items-center justify-center text-neutral-700 hover:text-neutral-900 hover:bg-white active:scale-90 transition border border-neutral-200/80"
            title="Toggle Satellite / Streets"
            aria-label="Toggle Satellite"
          >
            <Layers className="w-4 h-4 text-rose-600" />
          </button>
          <button
            onClick={() => {
              if (selectedListing) {
                onSelectListing(selectedListing);
              }
            }}
            className="w-10 h-10 rounded-full bg-white/95 backdrop-blur shadow-md flex items-center justify-center text-neutral-700 hover:text-neutral-900 hover:bg-white active:scale-90 transition border border-neutral-200/80"
            title="Re-center"
            aria-label="Re-center"
          >
            <Compass className="w-4 h-4 text-neutral-700" />
          </button>
        </div>

        {/* Active Kenya TRA Registered Stays Badge */}
        <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
          <div className="flex items-center gap-2 bg-neutral-900/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs shadow-lg border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold">{listings.length} stays mapped</span>
            <span className="text-neutral-400">|</span>
            <span className="text-neutral-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Kenya TRA Licensed Only
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
