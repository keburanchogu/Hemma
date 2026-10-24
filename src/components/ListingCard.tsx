import React, { useState } from 'react';
import { AirBnBListing, CurrencyRate } from '../types';
import { Star, ShieldCheck, Heart, ChevronLeft, ChevronRight, Sparkles, MapPin } from 'lucide-react';

interface ListingCardProps {
  listing: AirBnBListing;
  currency: CurrencyRate;
  nights: number;
  isSelected?: boolean;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onSelect: (listing: AirBnBListing) => void;
  onOpenDetails: (listing: AirBnBListing) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  currency,
  nights,
  isSelected = false,
  isWishlisted,
  onToggleWishlist,
  onSelect,
  onOpenDetails
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const formatPrice = (usd: number) => {
    const val = Math.round(usd * currency.rateFromUSD);
    return `${currency.symbol}${val.toLocaleString()}`;
  };

  const baseTotal = listing.pricePerNightUSD * nights;
  const cleaning = listing.cleaningFeeUSD;
  const service = baseTotal * (listing.serviceFeePercent / 100);
  const levy = baseTotal * (listing.tourismLevyPercent / 100);
  const totalPriceUSD = baseTotal + cleaning + service + levy;

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % listing.images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length);
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(listing.id);
  };

  return (
    <div
      onClick={() => {
        onSelect(listing);
        onOpenDetails(listing);
      }}
      className={`group relative flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer border ${
        isSelected
          ? 'ring-2 ring-rose-500 shadow-xl border-rose-200'
          : 'border-neutral-200/80 hover:shadow-lg hover:border-neutral-300'
      }`}
    >
      {/* Image Carousel Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
        <img
          src={listing.images[activeImageIndex]}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient Overlay for badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap gap-1.5">
            {listing.isGuestFavorite && (
              <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-md text-neutral-900 font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
                <Sparkles className="w-2.5 h-2.5 text-rose-500 fill-rose-500" />
                Guest favorite
              </span>
            )}
            <span className="inline-flex items-center gap-1 bg-emerald-600/90 backdrop-blur-md text-white font-semibold text-[10px] px-2 py-0.5 rounded-full shadow-sm">
              <ShieldCheck className="w-2.5 h-2.5" />
              TRA Registered
            </span>
          </div>

          <button
            onClick={handleHeartClick}
            aria-label="Save to Wishlist"
            className="pointer-events-auto p-1.5 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md text-white transition active:scale-80"
          >
            <Heart
              className={`w-4 h-4 transition ${
                isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-white'
              }`}
            />
          </button>
        </div>

        {/* Carousel arrows */}
        {listing.images.length > 1 && (
          <div className="absolute inset-y-0 inset-x-1.5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handlePrevImage}
              aria-label="Previous photo"
              className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-neutral-800 shadow-md flex items-center justify-center transition active:scale-90"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              aria-label="Next photo"
              className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-neutral-800 shadow-md flex items-center justify-center transition active:scale-90"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Pagination Dots */}
        {listing.images.length > 1 && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1">
            {listing.images.map((_, idx) => (
              <span
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === activeImageIndex ? 'bg-white w-3' : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card Info Content */}
      <div className="p-3.5 flex flex-col flex-1">
        {/* Location & Rating Header */}
        <div className="flex items-start justify-between gap-1 mb-1">
          <div className="flex items-center gap-1 text-xs text-neutral-500 font-medium truncate">
            <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="truncate">{listing.neighborhood}, {listing.city}</span>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-neutral-900 shrink-0">
            <Star className="w-3.5 h-3.5 fill-neutral-900 text-neutral-900" />
            <span>{listing.rating.toFixed(2)}</span>
            <span className="text-neutral-400 font-normal">({listing.reviewCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-sm text-neutral-900 line-clamp-1 group-hover:text-rose-600 transition-colors">
          {listing.title}
        </h3>

        {/* Subtitle / Details */}
        <p className="text-xs text-neutral-500 mt-0.5">
          {listing.propertyType} • {listing.bedrooms} bed • {listing.bathrooms} bath
        </p>

        {/* TRA Municipal License Tag */}
        <div className="mt-2 text-[10px] font-mono text-neutral-600 bg-emerald-50/60 border border-emerald-200/60 px-2 py-0.5 rounded flex items-center justify-between">
          <span className="truncate font-semibold text-emerald-900">{listing.registration.traLicenseNumber}</span>
          <span className="text-emerald-700 font-bold shrink-0">TRA Certified</span>
        </div>

        {/* Pricing Footer */}
        <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-baseline justify-between">
          <div>
            <span className="font-extrabold text-base text-neutral-900">{formatPrice(listing.pricePerNightUSD)}</span>
            <span className="text-xs text-neutral-500 font-normal"> / night</span>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-neutral-500 underline font-medium">
              {formatPrice(totalPriceUSD)} total ({nights} {nights === 1 ? 'night' : 'nights'})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
