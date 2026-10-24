import React from 'react';
import { CurrencyRate, FilterState } from '../types';
import { X, Star, ShieldCheck, Sparkles, SlidersHorizontal, Check } from 'lucide-react';

interface FilterModalProps {
  filters: FilterState;
  onFiltersChange: (newFilters: FilterState) => void;
  currency: CurrencyRate;
  totalMatchesCount: number;
  onClose: () => void;
  onReset: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  filters,
  onFiltersChange,
  currency,
  totalMatchesCount,
  onClose,
  onReset
}) => {
  const formatPrice = (usd: number) => {
    const val = Math.round(usd * currency.rateFromUSD);
    return `${currency.symbol}${val.toLocaleString()}`;
  };

  const handlePriceChange = (min: number, max: number) => {
    onFiltersChange({
      ...filters,
      minPriceKES: min,
      maxPriceKES: max
    });
  };

  const handleRatingChange = (rating: number) => {
    onFiltersChange({
      ...filters,
      minRating: filters.minRating === rating ? 0 : rating
    });
  };

  const handleBedroomsChange = (beds: number) => {
    onFiltersChange({
      ...filters,
      bedrooms: filters.bedrooms === beds ? 0 : beds
    });
  };

  const togglePropertyType = (type: string) => {
    const exists = filters.propertyTypes.includes(type);
    const updated = exists
      ? filters.propertyTypes.filter((t) => t !== type)
      : [...filters.propertyTypes, type];
    onFiltersChange({ ...filters, propertyTypes: updated });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white sm:rounded-3xl rounded-t-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-neutral-200">
        
        {/* Header */}
        <div className="p-4 border-b border-neutral-100 flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-rose-600" />
            <h2 className="text-base font-bold text-neutral-900">Kenya AirBnB Filters</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 active:scale-90 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Filter Options */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1 text-xs">
          
          {/* 1. BUDGET RANGE SLIDER */}
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="font-bold text-sm text-neutral-900">Price Range (Nightly Budget)</h3>
              <span className="text-xs font-bold text-rose-600">
                {formatPrice(filters.minPriceKES / 130)} – {formatPrice(filters.maxPriceKES / 130)}+
              </span>
            </div>
            
            {/* Price histogram bars */}
            <div className="flex items-end gap-1 h-12 mb-3 px-1 pt-2">
              {[25, 45, 80, 100, 70, 50, 65, 40, 20, 15].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-rose-200 rounded-t"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-neutral-500 text-[11px] block mb-1">
                  Max Nightly Rate: {formatPrice(filters.maxPriceKES / 130)}
                </label>
                <input
                  type="range"
                  min="4000"
                  max="35000"
                  step="1000"
                  value={filters.maxPriceKES}
                  onChange={(e) => handlePriceChange(filters.minPriceKES, Number(e.target.value))}
                  className="w-full accent-rose-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                  <span>KSh 4,000 (~$30)</span>
                  <span>KSh 18,000 (~$140)</span>
                  <span>KSh 35,000+ (~$270+)</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. TRAVELER RATINGS */}
          <div className="pt-4 border-t border-neutral-100">
            <h3 className="font-bold text-sm text-neutral-900 mb-2">Traveler Ratings</h3>
            <p className="text-neutral-500 text-[11px] mb-3">Filter by guest review scores</p>
            <div className="grid grid-cols-4 gap-2">
              {[
                { val: 0, label: 'Any' },
                { val: 4.5, label: '4.5+ ★' },
                { val: 4.8, label: '4.8+ ★' },
                { val: 4.9, label: '4.9+ ★' }
              ].map((r) => (
                <button
                  key={r.val}
                  onClick={() => handleRatingChange(r.val)}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1 transition ${
                    (filters.minRating === r.val) || (r.val === 0 && filters.minRating === 0)
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. STRICT TRA KENYA REGISTRATION GUARANTEE */}
          <div className="pt-4 border-t border-neutral-100">
            <div className="flex items-center justify-between p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-xs text-emerald-950">100% Kenya TRA Registered Stays Only</h4>
                  <p className="text-[11px] text-emerald-800 mt-0.5">
                    Every property displayed in StayMap Kenya possesses an authentic Tourism Regulatory Authority (TRA) license number and 24/7 security verification.
                  </p>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-600 text-white font-bold px-2.5 py-1 rounded-full shrink-0">
                Active Policy
              </span>
            </div>
          </div>

          {/* 4. GUEST PREFERENCES (Superhost, Guest Favorite, Instant Book) */}
          <div className="pt-4 border-t border-neutral-100 space-y-3">
            <h3 className="font-bold text-sm text-neutral-900">Stay Type & Host Badges</h3>
            
            <label className="flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-50 cursor-pointer">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-500" />
                <div>
                  <span className="font-bold text-neutral-800">Guest favorite</span>
                  <span className="text-[11px] text-neutral-500 block">The highest-rated homes in Kenya according to guests</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={filters.guestFavoriteOnly}
                onChange={(e) => onFiltersChange({ ...filters, guestFavoriteOnly: e.target.checked })}
                className="w-4 h-4 rounded text-rose-600 accent-rose-600 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-50 cursor-pointer">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" />
                <div>
                  <span className="font-bold text-neutral-800">Superhost only</span>
                  <span className="text-[11px] text-neutral-500 block">Experienced Kenyan hosts with 100% response rates</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={filters.superhostOnly}
                onChange={(e) => onFiltersChange({ ...filters, superhostOnly: e.target.checked })}
                className="w-4 h-4 rounded text-rose-600 accent-rose-600 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-50 cursor-pointer">
              <div>
                <span className="font-bold text-neutral-800">Instant Book</span>
                <span className="text-[11px] text-neutral-500 block">Book immediately with M-PESA or credit card</span>
              </div>
              <input
                type="checkbox"
                checked={filters.instantBookOnly}
                onChange={(e) => onFiltersChange({ ...filters, instantBookOnly: e.target.checked })}
                className="w-4 h-4 rounded text-rose-600 accent-rose-600 cursor-pointer"
              />
            </label>
          </div>

          {/* 5. BEDROOMS */}
          <div className="pt-4 border-t border-neutral-100">
            <h3 className="font-bold text-sm text-neutral-900 mb-2.5">Bedrooms</h3>
            <div className="flex gap-2">
              {[0, 1, 2, 3].map((b) => (
                <button
                  key={b}
                  onClick={() => handleBedroomsChange(b)}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold transition ${
                    filters.bedrooms === b
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  {b === 0 ? 'Any' : `${b}+`}
                </button>
              ))}
            </div>
          </div>

          {/* 6. PROPERTY TYPES */}
          <div className="pt-4 border-t border-neutral-100">
            <h3 className="font-bold text-sm text-neutral-900 mb-2.5">Property Type in Kenya</h3>
            <div className="flex flex-wrap gap-2">
              {['Serviced apartment', 'Luxury penthouse', 'Garden villa', 'Safari chalet', 'Coastal beachfront suite'].map((pt) => {
                const selected = filters.propertyTypes.includes(pt);
                return (
                  <button
                    key={pt}
                    onClick={() => togglePropertyType(pt)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
                      selected
                        ? 'bg-rose-50 text-rose-700 border-rose-300'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    {selected && <Check className="w-3.5 h-3.5 text-rose-600" />}
                    <span>{pt}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white border-t border-neutral-200 flex items-center justify-between gap-3">
          <button
            onClick={onReset}
            className="text-xs font-bold text-neutral-600 hover:text-neutral-900 underline py-2 px-3"
          >
            Clear all
          </button>
          <button
            onClick={onClose}
            className="py-3 px-6 bg-neutral-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow-md transition active:scale-95"
          >
            Show {totalMatchesCount} {totalMatchesCount === 1 ? 'registered stay' : 'registered stays'}
          </button>
        </div>

      </div>
    </div>
  );
};
