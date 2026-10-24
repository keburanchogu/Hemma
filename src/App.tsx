import React, { useState, useMemo, useEffect } from 'react';
import {
  Search, SlidersHorizontal, MapPin, Compass, ShieldCheck, Heart,
  Building2, Sparkles, Smartphone, List, Map as MapIcon,
  Wifi, Battery, Signal, Award, Star
} from 'lucide-react';
import {
  AirBnBListing, KenyaHub, Currency, CurrencyRate, FilterState,
  NeighborhoodInsight
} from './types';
import {
  AIRBNB_LISTINGS, KENYA_HUBS, CURRENCY_RATES, NEIGHBORHOOD_INSIGHTS
} from './data/listingsData';
import { AirbnbMap } from './components/AirbnbMap';
import { ListingCard } from './components/ListingCard';
import { ListingDetailModal } from './components/ListingDetailModal';
import { NeighborhoodInsightPanel } from './components/NeighborhoodInsightPanel';
import { FilterModal } from './components/FilterModal';
import { RegistryCheckerModal } from './components/RegistryCheckerModal';
import { WishlistDrawer } from './components/WishlistDrawer';

export default function App() {
  // Navigation & View Mode
  const [activeTab, setActiveTab] = useState<'explore' | 'neighborhoods' | 'registry' | 'wishlist'>('explore');
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(() => {
    return window.innerWidth > 768; // Desktop defaults to mobile Android frame
  });
  const [currentTime, setCurrentTime] = useState('09:41');

  // Clock for Android status bar
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  // Selected Kenya Region/City
  const [selectedHub, setSelectedHub] = useState<KenyaHub>(KENYA_HUBS[0]); // Nairobi default
  const [mapCenter, setMapCenter] = useState({ lat: KENYA_HUBS[0].lat, lng: KENYA_HUBS[0].lng });
  const [mapZoom, setMapZoom] = useState(KENYA_HUBS[0].zoom);

  // Currency & Stay Parameters (Default KES)
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('KES');
  const currency: CurrencyRate = CURRENCY_RATES[selectedCurrency];
  const [stayNights, setStayNights] = useState<number>(3);

  // Selected Listing & Modals
  const [selectedListing, setSelectedListing] = useState<AirBnBListing | null>(null);
  const [detailModalListing, setDetailModalListing] = useState<AirBnBListing | null>(null);
  const [activeNeighborhoodInsight, setActiveNeighborhoodInsight] = useState<NeighborhoodInsight | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isRegistryModalOpen, setIsRegistryModalOpen] = useState(false);
  const [initialPermitForRegistry, setInitialPermitForRegistry] = useState('');
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Wishlist Storage
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('staymap_kenya_wishlist');
      return saved ? JSON.parse(saved) : ['ken-nrb-101'];
    } catch {
      return ['ken-nrb-101'];
    }
  });

  const toggleWishlist = (id: string) => {
    setWishlistIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('staymap_kenya_wishlist', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // Filter State (strictly Kenya registered stays)
  const initialFilters: FilterState = {
    minPriceKES: 4000,
    maxPriceKES: 35000,
    minRating: 0,
    bedrooms: 0,
    propertyTypes: [],
    amenities: [],
    superhostOnly: false,
    guestFavoriteOnly: false,
    instantBookOnly: false,
    selectedNeighborhood: 'all',
    searchQuery: ''
  };

  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Handle Kenya Hub Change
  const handleHubSelect = (hub: KenyaHub) => {
    setSelectedHub(hub);
    setMapCenter({ lat: hub.lat, lng: hub.lng });
    setMapZoom(hub.zoom);
    setSelectedListing(null);
    setFilters((prev) => ({ ...prev, selectedNeighborhood: 'all' }));
  };

  // Filtered Listings Calculation (Strictly in Kenya & strictly TRA licensed)
  const filteredListings = useMemo(() => {
    return AIRBNB_LISTINGS.filter((item) => {
      // Must have valid TRA license
      if (!item.registration?.traLicenseNumber) {
        return false;
      }
      // Region/City filter match
      if (item.city.toLowerCase() !== selectedHub.name.toLowerCase()) {
        return false;
      }
      // Neighborhood check
      if (filters.selectedNeighborhood !== 'all' && item.neighborhoodId !== filters.selectedNeighborhood) {
        return false;
      }
      // Budget check in KES
      const priceKES = item.pricePerNightUSD * 130;
      if (priceKES < filters.minPriceKES || priceKES > filters.maxPriceKES) {
        return false;
      }
      // Traveler rating check
      if (filters.minRating > 0 && item.rating < filters.minRating) {
        return false;
      }
      // Superhost
      if (filters.superhostOnly && !item.isSuperhost) {
        return false;
      }
      // Guest favorite
      if (filters.guestFavoriteOnly && !item.isGuestFavorite) {
        return false;
      }
      // Instant book
      if (filters.instantBookOnly && !item.isInstantBookable) {
        return false;
      }
      // Bedrooms
      if (filters.bedrooms > 0 && item.bedrooms < filters.bedrooms) {
        return false;
      }
      // Property type
      if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(item.propertyType)) {
        return false;
      }
      // Search query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesNeigh = item.neighborhood.toLowerCase().includes(q);
        const matchesTra = item.registration.traLicenseNumber.toLowerCase().includes(q);
        if (!matchesTitle && !matchesNeigh && !matchesTra) return false;
      }
      return true;
    });
  }, [selectedHub, filters]);

  // Active Filter Count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.maxPriceKES < 35000 || filters.minPriceKES > 4000) count++;
    if (filters.minRating > 0) count++;
    if (filters.bedrooms > 0) count++;
    if (filters.propertyTypes.length > 0) count += filters.propertyTypes.length;
    if (filters.superhostOnly) count++;
    if (filters.guestFavoriteOnly) count++;
    if (filters.instantBookOnly) count++;
    if (filters.selectedNeighborhood !== 'all') count++;
    return count;
  }, [filters]);

  return (
    <div className="w-full h-screen bg-neutral-950 flex flex-col items-center justify-center overflow-hidden font-sans select-none">
      
      {/* Top Device Switcher on Desktop */}
      <header className="hidden md:flex w-full max-w-5xl items-center justify-between px-4 py-2 text-xs text-neutral-400 bg-neutral-900 border-b border-neutral-800 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-rose-600 flex items-center justify-center text-white font-extrabold text-xs">
            🇰🇪
          </div>
          <span className="font-bold text-white tracking-wide">StayMap Kenya</span>
          <span className="text-[11px] bg-neutral-800 px-2 py-0.5 rounded text-neutral-300">
            Registered AirBnBs & Neighborhood Insights (Kenya Only)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPhoneFrame((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold transition ${
              isPhoneFrame
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{isPhoneFrame ? 'Google Pixel View' : 'Edge-to-Edge Responsive'}</span>
          </button>

          <button
            onClick={() => setIsRegistryModalOpen(true)}
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Kenya TRA License Checker</span>
          </button>
        </div>
      </header>

      {/* Main Container - either Android Device Frame or Full Screen */}
      <main
        className={`relative flex flex-col bg-white overflow-hidden transition-all duration-300 ${
          isPhoneFrame
            ? 'w-full max-w-[420px] h-[92vh] max-h-[880px] rounded-[48px] shadow-[0_0_50px_rgba(0,0,0,0.8)] border-[10px] border-neutral-800 ring-1 ring-neutral-700'
            : 'w-full h-full'
        }`}
      >
        {/* ANDROID SYSTEM STATUS BAR */}
        <div className="h-8 w-full bg-neutral-900 text-white flex items-center justify-between px-6 text-xs font-semibold shrink-0 z-40 select-none">
          <span>{currentTime}</span>
          
          {/* Camera Punchhole on Phone Frame */}
          {isPhoneFrame && (
            <div className="w-4 h-4 rounded-full bg-black border border-neutral-700 mx-auto" />
          )}

          <div className="flex items-center gap-1.5 text-neutral-300">
            <span className="text-[10px] text-emerald-400 font-bold">Safaricom 5G</span>
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* ANDROID TOP APP BAR & SEARCH */}
        <div className="p-3 bg-white border-b border-neutral-100 shadow-sm z-30 shrink-0 space-y-2">
          
          {/* Main Search Pill */}
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center bg-neutral-100 hover:bg-neutral-200/80 transition rounded-full px-3.5 py-2 border border-neutral-200/80 shadow-inner">
              <Search className="w-4 h-4 text-neutral-500 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search stays, TRA licenses, or areas..."
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                className="bg-transparent border-none outline-none text-xs text-neutral-800 w-full placeholder:text-neutral-400 font-medium"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => setFilters({ ...filters, searchQuery: '' })}
                  className="text-xs text-neutral-400 hover:text-neutral-700 font-bold px-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Currency Selector (KES default, USD, EUR, GBP) */}
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value as Currency)}
              className="bg-neutral-100 border border-neutral-200 text-xs font-bold text-neutral-800 rounded-full px-2.5 py-2 outline-none cursor-pointer hover:bg-neutral-200/70"
              title="Change Currency"
            >
              <option value="KES">KSh (KES)</option>
              <option value="USD">$ (USD)</option>
              <option value="EUR">€ (EUR)</option>
              <option value="GBP">£ (GBP)</option>
            </select>

            {/* Filter Action Button */}
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className={`relative p-2.5 rounded-full border transition flex items-center justify-center ${
                activeFilterCount > 0
                  ? 'bg-rose-50 border-rose-300 text-rose-600'
                  : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-100'
              }`}
              title="Open Filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Kenya Location Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
            {KENYA_HUBS.map((hub) => {
              const isSelected = selectedHub.id === hub.id;
              return (
                <button
                  key={hub.id}
                  onClick={() => handleHubSelect(hub)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition flex items-center gap-1 ${
                    isSelected
                      ? 'bg-neutral-900 text-white shadow-sm'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
                  }`}
                >
                  <MapPin className={`w-3 h-3 ${isSelected ? 'text-rose-400' : 'text-neutral-400'}`} />
                  <span>{hub.name}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* ACTIVE SCREEN BODY */}
        <div className="relative flex-1 w-full overflow-hidden flex flex-col">
          
          {/* TAB 1: EXPLORE & MAP SCREEN */}
          {activeTab === 'explore' && (
            <div className="relative w-full h-full flex flex-col md:flex-row overflow-hidden">
              
              {/* Map Layer */}
              <div className="relative w-full h-full flex-1">
                <AirbnbMap
                  listings={filteredListings}
                  selectedListing={selectedListing}
                  onSelectListing={(listing) => {
                    setSelectedListing(listing);
                  }}
                  currency={currency}
                  center={mapCenter}
                  zoom={mapZoom}
                  className="w-full h-full"
                />

                {/* Floating "List / Map" Toggle */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
                  <button
                    onClick={() => setViewMode((m) => (m === 'map' ? 'list' : 'map'))}
                    className="flex items-center gap-2 bg-neutral-900 hover:bg-black text-white px-5 py-2.5 rounded-full font-bold text-xs shadow-2xl active:scale-95 transition border border-white/10"
                  >
                    {viewMode === 'map' ? (
                      <>
                        <List className="w-4 h-4 text-rose-400" />
                        <span>Show Stays ({filteredListings.length})</span>
                      </>
                    ) : (
                      <>
                        <MapIcon className="w-4 h-4 text-rose-400" />
                        <span>Show Kenya Map</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* LIST VIEW OVERLAY */}
              {viewMode === 'list' && (
                <div className="absolute inset-0 bg-white z-20 flex flex-col overflow-hidden animate-in fade-in duration-150">
                  <div className="p-3 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between text-xs">
                    <span className="font-bold text-neutral-800">
                      {filteredListings.length} Registered Stays in {selectedHub.name} ({selectedHub.county})
                    </span>
                    <button
                      onClick={() => setViewMode('map')}
                      className="text-rose-600 font-bold hover:underline"
                    >
                      Back to Map
                    </button>
                  </div>
                  <div className="overflow-y-auto p-4 space-y-4 pb-20">
                    {filteredListings.length > 0 ? (
                      filteredListings.map((item) => (
                        <ListingCard
                          key={item.id}
                          listing={item}
                          currency={currency}
                          nights={stayNights}
                          isSelected={selectedListing?.id === item.id}
                          isWishlisted={wishlistIds.includes(item.id)}
                          onToggleWishlist={toggleWishlist}
                          onSelect={setSelectedListing}
                          onOpenDetails={setDetailModalListing}
                        />
                      ))
                    ) : (
                      <div className="text-center py-16 text-neutral-500">
                        <SlidersHorizontal className="w-8 h-8 mx-auto text-neutral-300 mb-2" />
                        <p className="font-bold text-sm text-neutral-800">No registered stays match current filters</p>
                        <p className="text-xs text-neutral-400 mt-1">Try broadening your price range or rating threshold.</p>
                        <button
                          onClick={() => setFilters(initialFilters)}
                          className="mt-3 px-4 py-2 bg-neutral-900 text-white rounded-xl text-xs font-bold"
                        >
                          Reset Filters
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* FLOATING ANDROID BOTTOM SHEET (when in map view) */}
              {viewMode === 'map' && selectedListing && (
                <div className="absolute bottom-16 inset-x-3 z-20 animate-in slide-in-from-bottom duration-200">
                  <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 p-3 flex gap-3 relative overflow-hidden">
                    <img
                      src={selectedListing.images[0]}
                      alt={selectedListing.title}
                      className="w-24 h-24 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[11px] font-semibold text-neutral-500 truncate">{selectedListing.neighborhood}</span>
                          <div className="flex items-center gap-0.5 text-xs font-bold text-neutral-900 shrink-0">
                            <Star className="w-3 h-3 fill-neutral-900 text-neutral-900" />
                            <span>{selectedListing.rating.toFixed(2)}</span>
                          </div>
                        </div>
                        <h4 className="font-bold text-xs text-neutral-900 truncate mt-0.5">
                          {selectedListing.title}
                        </h4>
                        <div className="text-[10px] text-emerald-800 font-mono mt-0.5 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          <span>TRA: {selectedListing.registration.traLicenseNumber}</span>
                        </div>
                      </div>

                      <div className="flex items-baseline justify-between pt-1">
                        <div>
                          <span className="font-extrabold text-neutral-900 text-sm">
                            {currency.symbol}{Math.round(selectedListing.pricePerNightUSD * currency.rateFromUSD).toLocaleString()}
                          </span>
                          <span className="text-neutral-500 text-[10px]"> / night</span>
                        </div>
                        <button
                          onClick={() => setDetailModalListing(selectedListing)}
                          className="px-3 py-1 bg-neutral-900 hover:bg-black text-white text-xs font-bold rounded-lg transition"
                        >
                          View Details
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedListing(null)}
                      className="absolute top-1.5 right-1.5 p-1 rounded-full bg-neutral-100 text-neutral-400 hover:text-neutral-700"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: KENYA NEIGHBORHOODS DOSSIER SCREEN */}
          {activeTab === 'neighborhoods' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20 bg-neutral-50">
              <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Compass className="w-5 h-5 text-rose-600" />
                  <h3 className="font-bold text-sm text-neutral-900">Kenya Neighborhood Insights</h3>
                </div>
                <p className="text-xs text-neutral-500">
                  Compare safety indices, proximity to shopping malls, highway transit, and ambient noise across {selectedHub.name} enclaves.
                </p>
              </div>

              {/* Neighborhood Cards for Current Selected Hub */}
              {Object.values(NEIGHBORHOOD_INSIGHTS)
                .filter((n) => n.city.toLowerCase() === selectedHub.name.toLowerCase())
                .map((neigh) => (
                  <div
                    key={neigh.id}
                    onClick={() => setActiveNeighborhoodInsight(neigh)}
                    className="p-4 bg-white rounded-2xl border border-neutral-200/80 shadow-sm hover:border-neutral-300 hover:shadow-md transition cursor-pointer space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-neutral-900">{neigh.name}</h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {neigh.vibe.slice(0, 3).map((v, i) => (
                            <span key={i} className="text-[10px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full font-medium">
                              {v}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="text-xs font-bold text-neutral-900 bg-rose-50 text-rose-700 px-2.5 py-1 rounded-full border border-rose-100">
                        ~{currency.symbol}{Math.round((neigh.averagePricePerNightKES / 130) * currency.rateFromUSD).toLocaleString()}/nt
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                      <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-100">
                        <span className="block text-xs font-extrabold text-emerald-800">{neigh.safetyScore}/100</span>
                        <span className="text-[9px] text-emerald-600 font-bold">Safety Index</span>
                      </div>
                      <div className="p-2 bg-blue-50 rounded-xl border border-blue-100">
                        <span className="block text-xs font-extrabold text-blue-800">{neigh.walkScore}/100</span>
                        <span className="text-[9px] text-blue-600 font-bold">Walk Score</span>
                      </div>
                      <div className="p-2 bg-neutral-100 rounded-xl border border-neutral-200">
                        <span className="block text-xs font-extrabold text-neutral-800">{neigh.noiseLevel}</span>
                        <span className="text-[9px] text-neutral-500 font-bold">Noise Level</span>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                      💡 {neigh.highlights[0]}
                    </p>

                    <div className="flex justify-between items-center text-xs font-bold text-rose-600 pt-1 border-t border-neutral-100">
                      <span>View Full Dossier & Landmarks</span>
                      <span>→</span>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* TAB 3: TRA PERMIT REGISTRY VERIFIER SCREEN */}
          {activeTab === 'registry' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20 bg-neutral-50">
              <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-5 rounded-3xl text-white shadow-lg space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-white mb-2">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold">Kenya TRA Official Accommodations Directory</h3>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  Every AirBnB on StayMap is legally certified by the Tourism Regulatory Authority under the Tourism Act No. 28 of 2011.
                </p>
                <button
                  onClick={() => setIsRegistryModalOpen(true)}
                  className="mt-2 py-2 px-4 bg-white text-emerald-800 font-bold text-xs rounded-xl shadow transition active:scale-95"
                >
                  Verify a Kenya TRA License Now
                </button>
              </div>

              {/* Kenya Regulations Card */}
              <div className="p-4 bg-white rounded-2xl border border-neutral-200 shadow-sm space-y-3 text-xs">
                <h4 className="font-bold text-neutral-900 text-sm flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-neutral-600" />
                  Regulatory Standards in {selectedHub.name} ({selectedHub.county})
                </h4>
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 font-mono text-neutral-700 text-[11px]">
                  {selectedHub.traCountyOffice}
                </div>
                <p className="text-neutral-600 leading-relaxed">
                  In accordance with Kenyan national security guidelines, registered short-term rentals require PSRA-certified security guards, digital occurrences logs, standby power systems, and KRA tax compliance.
                </p>
              </div>

              {/* Verified Stays in Current County */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  TRA Certified Properties in {selectedHub.name} ({filteredListings.length})
                </h4>
                {filteredListings.map((l) => (
                  <div
                    key={l.id}
                    onClick={() => setDetailModalListing(l)}
                    className="p-3 bg-white rounded-xl border border-neutral-200 flex items-center justify-between hover:border-neutral-300 cursor-pointer text-xs"
                  >
                    <div>
                      <h5 className="font-bold text-neutral-900 truncate max-w-[200px]">{l.title}</h5>
                      <span className="font-mono text-[11px] text-emerald-700 font-bold">{l.registration.traLicenseNumber}</span>
                    </div>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-1 rounded-full border border-emerald-200">
                      TRA Active
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: WISHLIST SCREEN */}
          {activeTab === 'wishlist' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20 bg-neutral-50">
              <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-neutral-900">Saved Kenya Stays</h3>
                  <p className="text-xs text-neutral-500">Compare transparent pricing across favorites</p>
                </div>
                <span className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 font-bold flex items-center justify-center text-xs">
                  {wishlistIds.length}
                </span>
              </div>

              {wishlistIds.length > 0 ? (
                AIRBNB_LISTINGS.filter((l) => wishlistIds.includes(l.id)).map((item) => (
                  <ListingCard
                    key={item.id}
                    listing={item}
                    currency={currency}
                    nights={stayNights}
                    isSelected={selectedListing?.id === item.id}
                    isWishlisted={true}
                    onToggleWishlist={toggleWishlist}
                    onSelect={setSelectedListing}
                    onOpenDetails={setDetailModalListing}
                  />
                ))
              ) : (
                <div className="text-center py-16 text-neutral-500">
                  <Heart className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
                  <p className="font-bold text-sm text-neutral-800">Your wishlist is empty</p>
                  <p className="text-xs text-neutral-400 mt-1">Tap the heart on any listing to save and compare.</p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* ANDROID BOTTOM NAVIGATION BAR (Material 3 Style) */}
        <nav className="h-16 w-full bg-white border-t border-neutral-200 flex items-center justify-around px-2 shrink-0 z-40 select-none">
          {[
            { id: 'explore', label: 'Explore', icon: Compass },
            { id: 'neighborhoods', label: 'Insights', icon: MapPin },
            { id: 'registry', label: 'TRA Permits', icon: ShieldCheck },
            { id: 'wishlist', label: 'Saved', icon: Heart }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex flex-col items-center justify-center flex-1 py-1 transition ${
                  isActive ? 'text-rose-600' : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                <div
                  className={`px-4 py-1 rounded-full transition ${
                    isActive ? 'bg-rose-50' : 'bg-transparent'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive && tab.id === 'wishlist' ? 'fill-rose-600' : ''}`} />
                </div>
                <span className={`text-[10px] mt-0.5 ${isActive ? 'font-bold' : 'font-medium'}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* ANDROID GESTURE BAR */}
        <div className="h-4 w-full bg-white flex items-center justify-center shrink-0">
          <div className="w-32 h-1 bg-neutral-300 rounded-full" />
        </div>

        {/* MODALS */}
        {detailModalListing && (
          <ListingDetailModal
            listing={detailModalListing}
            neighborhood={NEIGHBORHOOD_INSIGHTS[detailModalListing.neighborhoodId]}
            currency={currency}
            nights={stayNights}
            onNightsChange={setStayNights}
            isWishlisted={wishlistIds.includes(detailModalListing.id)}
            onToggleWishlist={toggleWishlist}
            onClose={() => setDetailModalListing(null)}
            onOpenNeighborhood={(neighId) => {
              const neigh = NEIGHBORHOOD_INSIGHTS[neighId];
              if (neigh) setActiveNeighborhoodInsight(neigh);
            }}
            onOpenRegistryCheck={(permitNum) => {
              setInitialPermitForRegistry(permitNum);
              setIsRegistryModalOpen(true);
            }}
          />
        )}

        {activeNeighborhoodInsight && (
          <NeighborhoodInsightPanel
            insight={activeNeighborhoodInsight}
            currency={currency}
            onClose={() => setActiveNeighborhoodInsight(null)}
            onFilterByNeighborhood={(neighId) => {
              setFilters((prev) => ({ ...prev, selectedNeighborhood: neighId }));
              setActiveTab('explore');
            }}
          />
        )}

        {isFilterModalOpen && (
          <FilterModal
            filters={filters}
            onFiltersChange={setFilters}
            currency={currency}
            totalMatchesCount={filteredListings.length}
            onClose={() => setIsFilterModalOpen(false)}
            onReset={() => setFilters(initialFilters)}
          />
        )}

        {isRegistryModalOpen && (
          <RegistryCheckerModal
            initialPermit={initialPermitForRegistry}
            onClose={() => {
              setIsRegistryModalOpen(false);
              setInitialPermitForRegistry('');
            }}
            onSelectListingByPermit={(listingId) => {
              const match = AIRBNB_LISTINGS.find((l) => l.id === listingId);
              if (match) {
                setSelectedListing(match);
                setDetailModalListing(match);
                setActiveTab('explore');
              }
            }}
          />
        )}

        {isWishlistOpen && (
          <WishlistDrawer
            wishlistIds={wishlistIds}
            listings={AIRBNB_LISTINGS}
            currency={currency}
            nights={stayNights}
            onRemove={toggleWishlist}
            onSelectListing={(listing) => {
              setSelectedListing(listing);
              setDetailModalListing(listing);
              setIsWishlistOpen(false);
              setActiveTab('explore');
            }}
            onClose={() => setIsWishlistOpen(false)}
          />
        )}

      </main>
    </div>
  );
}
