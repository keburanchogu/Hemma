import React, { useState } from 'react';
import { AirBnBListing, CurrencyRate, NeighborhoodInsight } from '../types';
import {
  X, Star, ShieldCheck, Heart, MapPin, Award,
  CheckCircle2, Building2, ChevronRight, Compass, Shield
} from 'lucide-react';

interface ListingDetailModalProps {
  listing: AirBnBListing;
  neighborhood?: NeighborhoodInsight;
  currency: CurrencyRate;
  nights: number;
  onNightsChange: (nights: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onClose: () => void;
  onOpenNeighborhood: (neighborhoodId: string) => void;
  onOpenRegistryCheck: (permitNumber: string) => void;
}

export const ListingDetailModal: React.FC<ListingDetailModalProps> = ({
  listing,
  neighborhood,
  currency,
  nights,
  onNightsChange,
  isWishlisted,
  onToggleWishlist,
  onClose,
  onOpenNeighborhood,
  onOpenRegistryCheck
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'pricing' | 'reviews' | 'permit'>('overview');
  const [bookedSuccess, setBookedSuccess] = useState(false);

  const formatPrice = (usd: number) => {
    const val = Math.round(usd * currency.rateFromUSD);
    return `${currency.symbol}${val.toLocaleString()}`;
  };

  // Pricing calculation
  const baseRate = listing.pricePerNightUSD * nights;
  const cleaningFee = listing.cleaningFeeUSD;
  const serviceFee = Math.round(baseRate * (listing.serviceFeePercent / 100));
  const tourismLevy = Math.round(baseRate * (listing.tourismLevyPercent / 100)); // 2% TRA levy
  const weeklyDiscount = nights >= 7 ? Math.round(baseRate * (listing.weeklyDiscountPercent / 100)) : 0;
  const grandTotal = baseRate + cleaningFee + serviceFee + tourismLevy - weeklyDiscount;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white sm:rounded-3xl rounded-t-3xl max-h-[92vh] sm:max-h-[88vh] flex flex-col shadow-2xl overflow-hidden border border-neutral-200">
        
        {/* Android Drag Handle / Top Header */}
        <div className="pt-2.5 pb-2 px-4 flex items-center justify-between border-b border-neutral-100 bg-white/95 backdrop-blur sticky top-0 z-30">
          <div className="sm:hidden w-12 h-1.5 bg-neutral-300 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2" />
          
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-600">
            <span className="flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200/80 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              TRA License: {listing.registration.traLicenseNumber}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggleWishlist(listing.id)}
              className="p-2 rounded-full hover:bg-neutral-100 text-neutral-700 active:scale-90 transition"
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-neutral-600'}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-neutral-100 text-neutral-700 active:scale-90 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-neutral-100 px-4 bg-neutral-50/70 text-xs font-bold text-neutral-600 shrink-0">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'pricing', label: 'Price Breakdown' },
            { id: 'permit', label: 'TRA Kenya License' },
            { id: 'reviews', label: `Reviews (${listing.reviewCount})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`py-3 px-3 relative transition-colors ${
                activeTab === tab.id ? 'text-rose-600 font-extrabold' : 'hover:text-neutral-900'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-rose-600 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-6">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Photo Showcase */}
              <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden aspect-[16/10]">
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full h-full object-cover col-span-2 sm:col-span-1 max-h-64 sm:max-h-full"
                />
                <div className="hidden sm:grid grid-rows-2 gap-2">
                  <img
                    src={listing.images[1] || listing.images[0]}
                    alt="Interior 1"
                    className="w-full h-full object-cover"
                  />
                  <img
                    src={listing.images[2] || listing.images[0]}
                    alt="Interior 2"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Title & Neighborhood link */}
              <div>
                <div className="flex items-center gap-2 flex-wrap text-xs text-neutral-500 mb-1">
                  <span>{listing.propertyType}</span>
                  <span>•</span>
                  <span>{listing.maxGuests} guests</span>
                  <span>•</span>
                  <span>{listing.bedrooms} bedrooms</span>
                  <span>•</span>
                  <span>{listing.bathrooms} baths</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 leading-tight">
                  {listing.title}
                </h1>
                
                <button
                  onClick={() => onOpenNeighborhood(listing.neighborhoodId)}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-100"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Explore neighborhood insights: {listing.neighborhood}, {listing.city} ({listing.county})</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Host Summary */}
              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                <div className="flex items-center gap-3">
                  <img
                    src={listing.host.avatar}
                    alt={listing.host.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-neutral-900">Hosted by {listing.host.name}</h4>
                    <p className="text-xs text-neutral-500">
                      {listing.host.isSuperhost && 'Superhost • '}
                      {listing.host.yearsHosting} years hosting • {listing.host.responseRate}% response rate
                    </p>
                  </div>
                </div>
                {listing.host.isSuperhost && (
                  <span className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    <Award className="w-3.5 h-3.5 text-amber-600" /> Superhost
                  </span>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="font-bold text-sm text-neutral-900 mb-1.5">About this registered Kenya stay</h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {listing.description}
                </p>
              </div>

              {/* Security & Utilities Highlights */}
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-100 grid grid-cols-2 gap-2 text-xs text-emerald-900">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>24/7 PSRA Manned Guardhouse</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Full Automatic Generator / Solar Backup</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Safaricom High-Speed Fiber</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Continuous Water Storage</span>
                </div>
              </div>

              {/* Amenities Grid */}
              <div>
                <h3 className="font-bold text-sm text-neutral-900 mb-2.5">What this place offers</h3>
                <div className="grid grid-cols-2 gap-2 text-xs text-neutral-700">
                  {listing.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-neutral-50 rounded-lg">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PRICING TAB */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-rose-50 to-orange-50 p-4 sm:p-5 rounded-2xl border border-rose-100">
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-sm font-bold text-neutral-900">Itemized Pricing Breakdown</h3>
                  <span className="text-xs text-rose-700 font-semibold">Includes Kenya Tourism Levy</span>
                </div>
                <p className="text-xs text-neutral-600 mb-4">
                  Full disclosure of nightly stay, cleaning, and regulatory statutory taxes. No surprise charges at check-in.
                </p>

                {/* Duration Slider */}
                <div className="bg-white p-3.5 rounded-xl border border-rose-200/60 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-neutral-800">
                    <span>Length of Stay:</span>
                    <span className="text-rose-600 text-sm font-extrabold">{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={nights}
                    onChange={(e) => onNightsChange(Number(e.target.value))}
                    className="w-full accent-rose-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-400">
                    <span>1 night (Weekend)</span>
                    <span>7 nights (Weekly -{listing.weeklyDiscountPercent}%)</span>
                    <span>30 nights (Monthly)</span>
                  </div>
                </div>
              </div>

              {/* Itemized calculation table */}
              <div className="space-y-3 bg-neutral-50 p-4 rounded-2xl border border-neutral-100 text-xs sm:text-sm">
                <div className="flex justify-between py-1 border-b border-neutral-200/60">
                  <span className="text-neutral-600">
                    {formatPrice(listing.pricePerNightUSD)} × {nights} {nights === 1 ? 'night' : 'nights'}
                  </span>
                  <span className="font-semibold text-neutral-900">{formatPrice(baseRate)}</span>
                </div>

                {weeklyDiscount > 0 && (
                  <div className="flex justify-between py-1 border-b border-neutral-200/60 text-emerald-700 font-medium">
                    <span>Weekly Stay Discount ({listing.weeklyDiscountPercent}%)</span>
                    <span>-{formatPrice(weeklyDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between py-1 border-b border-neutral-200/60">
                  <span className="text-neutral-600">Turnaround cleaning & linen turnaround fee</span>
                  <span className="font-semibold text-neutral-900">{formatPrice(cleaningFee)}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-neutral-200/60">
                  <span className="text-neutral-600">Guest Service & platform operations ({listing.serviceFeePercent}%)</span>
                  <span className="font-semibold text-neutral-900">{formatPrice(serviceFee)}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-neutral-200/60">
                  <span className="text-neutral-600">
                    Kenya Tourism Regulatory Levy (2% TRA statutory)
                  </span>
                  <span className="font-semibold text-neutral-900">{formatPrice(tourismLevy)}</span>
                </div>

                <div className="pt-2 flex justify-between items-baseline text-sm sm:text-base font-extrabold text-neutral-900">
                  <span>Total (Taxes & Fees Included)</span>
                  <span className="text-rose-600 text-lg sm:text-xl">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-2.5 text-xs text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Free cancellation within 48 hours.</span> Full M-PESA or card refund.
                </div>
              </div>
            </div>
          )}

          {/* PERMIT TAB */}
          {activeTab === 'permit' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-1">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>Kenya Tourism Regulatory Authority (TRA) Certification</span>
                </div>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  Under the Tourism Act No. 28 of 2011, this short-term stay has passed mandatory health, fire safety, biometric entry log, and building security inspections.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                  <span className="text-neutral-400 block mb-0.5 font-medium">TRA License Number</span>
                  <span className="font-mono font-bold text-neutral-900 text-sm">{listing.registration.traLicenseNumber}</span>
                </div>
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                  <span className="text-neutral-400 block mb-0.5 font-medium">County Single Business Permit (SBP)</span>
                  <span className="font-mono font-bold text-neutral-900 text-sm">{listing.registration.countySbpNumber}</span>
                </div>
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                  <span className="text-neutral-400 block mb-0.5 font-medium">Registration Status</span>
                  <span className="font-bold text-emerald-600 inline-flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    {listing.registration.status}
                  </span>
                </div>
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                  <span className="text-neutral-400 block mb-0.5 font-medium">Official Inspection Rating</span>
                  <span className="font-bold text-neutral-800">{listing.registration.inspectionRating}</span>
                </div>
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 sm:col-span-2">
                  <span className="text-neutral-400 block mb-0.5 font-medium">Security & Tax Compliance Details</span>
                  <div className="grid grid-cols-2 gap-2 mt-1 text-neutral-700">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      PSRA Security Guarded
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      KRA Tax PIN Compliant
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      2% Tourism Levy Remitted
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Valid until {listing.registration.expiryDate}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenRegistryCheck(listing.registration.traLicenseNumber)}
                className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-black text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition"
              >
                <Building2 className="w-4 h-4" />
                <span>Verify License in Kenya TRA Portal</span>
              </button>
            </div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {/* Overall Score */}
              <div className="flex items-center gap-4 p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                <div className="text-center pr-4 border-r border-neutral-200">
                  <div className="text-3xl font-extrabold text-neutral-900">{listing.rating.toFixed(2)}</div>
                  <div className="flex items-center justify-center gap-0.5 my-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3 h-3 fill-neutral-900 text-neutral-900" />
                    ))}
                  </div>
                  <div className="text-[11px] text-neutral-500">{listing.reviewCount} reviews</div>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 flex-1 text-xs">
                  {Object.entries(listing.ratingBreakdown).map(([key, val]) => (
                    <div key={key} className="flex justify-between items-center capitalize text-neutral-600">
                      <span>{key}</span>
                      <span className="font-bold text-neutral-900">{val.toFixed(1)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review items */}
              <div className="space-y-4">
                {listing.recentReviews.map((rev) => (
                  <div key={rev.id} className="p-3.5 bg-white rounded-xl border border-neutral-100 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={rev.avatar}
                          alt={rev.author}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <h5 className="font-bold text-xs text-neutral-900">{rev.author}</h5>
                          <span className="text-[10px] text-neutral-400">{rev.date} • {rev.tripType}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-neutral-900 text-neutral-900" />
                        <span className="text-xs font-bold text-neutral-900">{rev.rating}.0</span>
                      </div>
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky Android Booking Footer */}
        <div className="p-3 sm:p-4 bg-white border-t border-neutral-200 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-base sm:text-lg font-extrabold text-neutral-900">{formatPrice(listing.pricePerNightUSD)}</span>
              <span className="text-xs text-neutral-500">/ night</span>
            </div>
            <div className="text-[11px] text-neutral-500 underline">
              {formatPrice(grandTotal)} total for {nights} nights
            </div>
          </div>

          {!bookedSuccess ? (
            <button
              onClick={() => setBookedSuccess(true)}
              className="py-3 px-6 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-rose-500/25 active:scale-95 transition"
            >
              {listing.isInstantBookable ? 'Instant Reserve (M-PESA / Card)' : 'Request to Book'}
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 font-bold text-xs py-2 px-4 rounded-xl border border-emerald-200 animate-in zoom-in-95">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Reservation Confirmed (TRA Logged)</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
