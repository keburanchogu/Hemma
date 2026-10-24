import React from 'react';
import { CurrencyRate, NeighborhoodInsight } from '../types';
import {
  X, ShieldCheck, Footprints, Train, Volume2, Sparkles,
  MapPin, Lightbulb, Compass, Navigation, ArrowRight
} from 'lucide-react';

interface NeighborhoodInsightPanelProps {
  insight: NeighborhoodInsight;
  currency: CurrencyRate;
  onClose: () => void;
  onFilterByNeighborhood: (neighborhoodId: string) => void;
}

export const NeighborhoodInsightPanel: React.FC<NeighborhoodInsightPanelProps> = ({
  insight,
  currency,
  onClose,
  onFilterByNeighborhood
}) => {
  const formatPrice = (kesPrice: number) => {
    // If currency is KES, use directly; otherwise convert via USD base
    const usd = kesPrice / 130;
    const converted = Math.round(usd * currency.rateFromUSD);
    return `${currency.symbol}${converted.toLocaleString()}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 75) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white sm:rounded-3xl rounded-t-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-neutral-200">
        
        {/* Header */}
        <div className="p-4 border-b border-neutral-100 flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Kenya Neighborhood Dossier</span>
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 leading-tight">
                {insight.name}
              </h2>
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

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          
          {/* Vibe Tags */}
          <div>
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Neighborhood Character & Atmosphere</h4>
            <div className="flex flex-wrap gap-1.5">
              {insight.vibe.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-neutral-100 text-neutral-800 text-xs font-semibold rounded-full border border-neutral-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Livability & Traveler Scores Grid */}
          <div>
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2.5">Traveler Safety & Accessibility</h4>
            <div className="grid grid-cols-3 gap-2.5">
              
              {/* Safety */}
              <div className={`p-3 rounded-2xl border flex flex-col items-center text-center ${getScoreColor(insight.safetyScore)}`}>
                <ShieldCheck className="w-5 h-5 mb-1" />
                <span className="text-lg font-extrabold">{insight.safetyScore}/100</span>
                <span className="text-[10px] font-bold">Safety Index</span>
                <span className="text-[9px] opacity-75">{insight.crimeRating} Incidents</span>
              </div>

              {/* Walk Score */}
              <div className={`p-3 rounded-2xl border flex flex-col items-center text-center ${getScoreColor(insight.walkScore)}`}>
                <Footprints className="w-5 h-5 mb-1" />
                <span className="text-lg font-extrabold">{insight.walkScore}/100</span>
                <span className="text-[10px] font-bold">Walk Score</span>
                <span className="text-[9px] opacity-75">Mall & Café Walk</span>
              </div>

              {/* Transit */}
              <div className={`p-3 rounded-2xl border flex flex-col items-center text-center ${getScoreColor(insight.transitScore)}`}>
                <Train className="w-5 h-5 mb-1" />
                <span className="text-lg font-extrabold">{insight.transitScore}/100</span>
                <span className="text-[10px] font-bold">Transit Score</span>
                <span className="text-[9px] opacity-75">Expressway / Cabs</span>
              </div>
            </div>
          </div>

          {/* Pricing & Noise Quick Info */}
          <div className="grid grid-cols-2 gap-3 p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100 text-xs">
            <div>
              <span className="text-neutral-400 font-medium block">Average Nightly Rate:</span>
              <span className="font-bold text-neutral-900 text-sm">~{formatPrice(insight.averagePricePerNightKES)} / night</span>
            </div>
            <div>
              <span className="text-neutral-400 font-medium block">Ambient Noise Level:</span>
              <span className="font-bold text-neutral-900 text-sm flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5 text-neutral-500" />
                {insight.noiseLevel}
              </span>
            </div>
          </div>

          {/* Neighborhood Highlights */}
          <div>
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              What Guests Love About {insight.name}
            </h4>
            <div className="space-y-2">
              {insight.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-700 bg-amber-50/50 p-2.5 rounded-xl border border-amber-100/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Landmarks with walking time */}
          <div>
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Navigation className="w-3.5 h-3.5 text-blue-500" />
              Walking Proximity to Top Spots
            </h4>
            <div className="space-y-1.5 text-xs">
              {insight.nearbyLandmarks.map((lm, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-neutral-50 rounded-xl">
                  <span className="font-semibold text-neutral-800">{lm.name}</span>
                  <div className="flex items-center gap-2 text-neutral-500 text-[11px]">
                    <span>{lm.distance}</span>
                    <span className="bg-neutral-200 px-1.5 py-0.5 rounded font-bold text-neutral-700">{lm.walkTimeMinutes} min walk</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Local Kenya Transit Connections */}
          <div>
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Train className="w-3.5 h-3.5 text-emerald-600" />
              Transport & Highway Access
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {insight.transitOptions.map((opt, i) => (
                <span key={i} className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-medium border border-emerald-200/60">
                  🚗 {opt}
                </span>
              ))}
            </div>
          </div>

          {/* Insider Tips */}
          <div>
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-yellow-500" />
              Local Kenyan Insider Tips
            </h4>
            <div className="space-y-2">
              {insight.insiderTips.map((tip, i) => (
                <div key={i} className="p-3 bg-neutral-50 rounded-xl text-xs text-neutral-700 border border-neutral-100 leading-relaxed">
                  💡 {tip}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Button to filter map to this neighborhood */}
        <div className="p-4 bg-white border-t border-neutral-200">
          <button
            onClick={() => {
              onFilterByNeighborhood(insight.id);
              onClose();
            }}
            className="w-full py-3 bg-neutral-900 hover:bg-black text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition"
          >
            <span>Show registered stays in {insight.name}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
