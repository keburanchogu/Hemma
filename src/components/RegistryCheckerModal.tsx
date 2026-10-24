import React, { useState } from 'react';
import { X, Search, ShieldCheck, CheckCircle2, AlertTriangle, Building2 } from 'lucide-react';
import { AIRBNB_LISTINGS } from '../data/listingsData';

interface RegistryCheckerModalProps {
  initialPermit?: string;
  onClose: () => void;
  onSelectListingByPermit?: (listingId: string) => void;
}

export const RegistryCheckerModal: React.FC<RegistryCheckerModalProps> = ({
  initialPermit = '',
  onClose,
  onSelectListingByPermit
}) => {
  const [permitQuery, setPermitQuery] = useState(initialPermit);
  const [selectedListingMatch, setSelectedListingMatch] = useState(() => {
    return AIRBNB_LISTINGS.find(
      (l) => l.registration.traLicenseNumber.toLowerCase() === initialPermit.toLowerCase()
    );
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const match = AIRBNB_LISTINGS.find(
      (l) =>
        l.registration.traLicenseNumber.toLowerCase().includes(permitQuery.trim().toLowerCase()) ||
        l.registration.countySbpNumber.toLowerCase().includes(permitQuery.trim().toLowerCase())
    );
    setSelectedListingMatch(match);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white sm:rounded-3xl rounded-t-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-neutral-200">
        
        {/* Header */}
        <div className="p-4 border-b border-neutral-100 flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Kenya Tourism Regulatory Authority</span>
              <h2 className="text-base font-bold text-neutral-900">TRA Short-Term Rental Registry Checker</h2>
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
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1 text-xs">
          
          {/* Search Box */}
          <form onSubmit={handleSearch} className="space-y-2">
            <label className="font-bold text-neutral-800 block text-xs">
              Enter Kenya TRA License or County SBP Number
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="e.g. TRA/ACC/NRB/2024/0482 or TRA/ACC/MSA/2024/0119"
                value={permitQuery}
                onChange={(e) => setPermitQuery(e.target.value)}
                className="w-full pl-9 pr-24 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-xs"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 pointer-events-none" />
              <button
                type="submit"
                className="absolute right-1.5 py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition"
              >
                Verify
              </button>
            </div>
            <p className="text-[11px] text-neutral-500">
              Try testing registered Kenya stays: <button type="button" onClick={() => { setPermitQuery('TRA/ACC/NRB/2024/0482'); setSelectedListingMatch(AIRBNB_LISTINGS[0]); }} className="text-emerald-700 underline font-mono">Kilimani TRA</button> | <button type="button" onClick={() => { setPermitQuery('TRA/ACC/KWL/2024/0074'); setSelectedListingMatch(AIRBNB_LISTINGS[5]); }} className="text-emerald-700 underline font-mono">Diani Beach TRA</button>
            </p>
          </form>

          {/* Verification Status Card */}
          {selectedListingMatch ? (
            <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200 space-y-4 animate-in zoom-in-95">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <div>
                    <h3 className="font-bold text-sm text-emerald-950">Verified TRA Class A License</h3>
                    <p className="text-[11px] text-emerald-800">
                      Fully registered and compliant with the Kenya Tourism Act and {selectedListingMatch.county}.
                    </p>
                  </div>
                </div>
                <span className="bg-emerald-600 text-white font-bold text-[10px] px-2.5 py-1 rounded-full">
                  100% Legal
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-emerald-100 space-y-2 text-xs">
                <div className="flex justify-between border-b border-neutral-100 pb-1.5">
                  <span className="text-neutral-500">Listing:</span>
                  <span className="font-semibold text-neutral-900 text-right max-w-[240px] truncate">{selectedListingMatch.title}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-100 pb-1.5">
                  <span className="text-neutral-500">TRA License ID:</span>
                  <span className="font-mono font-bold text-neutral-900">{selectedListingMatch.registration.traLicenseNumber}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-100 pb-1.5">
                  <span className="text-neutral-500">County SBP Permit:</span>
                  <span className="font-mono text-neutral-800">{selectedListingMatch.registration.countySbpNumber}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-100 pb-1.5">
                  <span className="text-neutral-500">County Location:</span>
                  <span className="font-medium text-neutral-800">{selectedListingMatch.neighborhood}, {selectedListingMatch.city} ({selectedListingMatch.county})</span>
                </div>
                <div className="flex justify-between border-b border-neutral-100 pb-1.5">
                  <span className="text-neutral-500">Security Accreditation:</span>
                  <span className="font-medium text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> PSRA Guarded & Digital Logbook Compliant
                  </span>
                </div>
                <div className="flex justify-between items-center pt-0.5">
                  <span className="text-neutral-500">KRA Tax Compliance:</span>
                  <span className="font-bold text-emerald-700">Verified PIN & 2% Tourism Levy Active</span>
                </div>
              </div>

              {onSelectListingByPermit && (
                <button
                  onClick={() => {
                    onSelectListingByPermit(selectedListingMatch.id);
                    onClose();
                  }}
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition text-center"
                >
                  Locate This Registered Stay on Kenya Map
                </button>
              )}
            </div>
          ) : permitQuery ? (
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-center space-y-2">
              <AlertTriangle className="w-6 h-6 text-amber-600 mx-auto" />
              <h4 className="font-bold text-xs text-amber-900">License Not Found in Active Directory</h4>
              <p className="text-[11px] text-amber-700">
                Ensure the license format matches official TRA designations (e.g., TRA/ACC/NRB/...).
              </p>
            </div>
          ) : null}

          {/* Educational info for travelers in Kenya */}
          <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-2.5">
            <h4 className="font-bold text-xs text-neutral-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Why booking a TRA-registered AirBnB in Kenya protects you:
            </h4>
            <ul className="space-y-1.5 text-[11px] text-neutral-600 leading-relaxed list-disc list-inside">
              <li><strong className="text-neutral-800">24/7 Licensed Security:</strong> Registered properties require certified private security guards, biometric/ID gate checks, and perimeter electric fences.</li>
              <li><strong className="text-neutral-800">Guaranteed Power & Water:</strong> Inspected stays are verified to have reliable standby generators or solar inverter backups and continuous water storage.</li>
              <li><strong className="text-neutral-800">Zero Eviction Risk:</strong> Stays comply fully with the Kenya Tourism Act and local county laws, avoiding sudden shutdowns by county revenue inspectors.</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};
