import React from 'react';
import { AirBnBListing, CurrencyRate } from '../types';
import { X, Heart, Star, Trash2 } from 'lucide-react';

interface WishlistDrawerProps {
  wishlistIds: string[];
  listings: AirBnBListing[];
  currency: CurrencyRate;
  nights: number;
  onRemove: (id: string) => void;
  onSelectListing: (listing: AirBnBListing) => void;
  onClose: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  wishlistIds,
  listings,
  currency,
  nights,
  onRemove,
  onSelectListing,
  onClose
}) => {
  const savedListings = listings.filter((l) => wishlistIds.includes(l.id));

  const formatPrice = (usd: number) => {
    const val = Math.round(usd * currency.rateFromUSD);
    return `${currency.symbol}${val.toLocaleString()}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white sm:rounded-3xl rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-neutral-200">
        
        {/* Header */}
        <div className="p-4 border-b border-neutral-100 flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-rose-600" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Saved Stays in Kenya</span>
              <h2 className="text-base font-bold text-neutral-900">Wishlist ({savedListings.length})</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 active:scale-90 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-4 space-y-3 flex-1 text-xs">
          {savedListings.length > 0 ? (
            savedListings.map((listing) => (
              <div
                key={listing.id}
                onClick={() => {
                  onSelectListing(listing);
                  onClose();
                }}
                className="flex gap-3 p-3 bg-neutral-50 rounded-2xl border border-neutral-100 hover:border-neutral-200 cursor-pointer transition group"
              >
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[11px] text-neutral-500 font-medium truncate">{listing.neighborhood}, {listing.city}</span>
                      <div className="flex items-center gap-0.5 text-xs font-bold text-neutral-900 shrink-0">
                        <Star className="w-3 h-3 fill-neutral-900 text-neutral-900" />
                        <span>{listing.rating.toFixed(2)}</span>
                      </div>
                    </div>
                    <h4 className="font-bold text-xs text-neutral-900 truncate mt-0.5 group-hover:text-rose-600">
                      {listing.title}
                    </h4>
                    <span className="text-[10px] font-mono text-emerald-700 block truncate">
                      {listing.registration.traLicenseNumber}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between pt-1">
                    <div>
                      <span className="font-extrabold text-neutral-900">{formatPrice(listing.pricePerNightUSD)}</span>
                      <span className="text-neutral-500 text-[10px]"> / night</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove(listing.id);
                      }}
                      className="p-1 rounded text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-neutral-500">
              <Heart className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
              <p className="font-bold text-neutral-800 text-sm">No saved Kenya stays yet</p>
              <p className="text-xs text-neutral-400 mt-1">Tap the heart icon on any registered AirBnB to compare pricing.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
