export type Currency = 'KES' | 'USD' | 'EUR' | 'GBP';

export interface CurrencyRate {
  symbol: string;
  rateFromUSD: number; // e.g. 1 USD = 130 KES
  code: Currency;
  isPrefix?: boolean;
}

export interface NeighborhoodInsight {
  id: string;
  name: string;
  city: string; // e.g., 'Nairobi', 'Mombasa', 'Diani Beach', 'Naivasha'
  region: string;
  vibe: string[];
  safetyScore: number; // 0-100
  walkScore: number; // 0-100
  transitScore: number; // 0-100
  noiseLevel: 'Quiet' | 'Moderate' | 'Lively' | 'Vibrant Nightlife';
  crimeRating: 'Very Low' | 'Low' | 'Moderate';
  highlights: string[];
  nearbyLandmarks: {
    name: string;
    distance: string;
    walkTimeMinutes: number;
  }[];
  insiderTips: string[];
  transitOptions: string[]; // e.g. 'Expressway Access', 'Bolt/Uber 2 min', 'Matatu Stage'
  averagePricePerNightKES: number;
}

export interface RegistrationDetails {
  traLicenseNumber: string; // e.g. TRA/ACC/NRB/2024/0942
  countySbpNumber: string; // e.g. NCCG/SBP/STR/2024/1820
  status: 'Verified TRA Active' | 'TRA Registered 2026' | 'County SBP Compliant';
  kraPinCompliant: boolean;
  psraSecurityGuarded: boolean; // 24/7 security & digital visitor log
  issueDate: string;
  expiryDate: string;
  inspectionRating: 'Grade A - Certified' | 'Grade B - Standard Compliant';
  occupancyPermitMax: number;
  taxCollectionAgreement: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  tripType?: 'Solo Traveler' | 'Couple' | 'Family' | 'Safari Explorer' | 'Business';
}

export interface RatingBreakdown {
  cleanliness: number;
  accuracy: number;
  communication: number;
  location: number;
  checkIn: number;
  value: number;
}

export interface AirBnBListing {
  id: string;
  title: string;
  description: string;
  propertyType: 'Serviced apartment' | 'Luxury penthouse' | 'Garden villa' | 'Safari chalet' | 'Coastal beachfront suite' | 'Executive studio';
  roomType: 'Entire place' | 'Private room';
  city: string;
  county: string;
  neighborhood: string;
  neighborhoodId: string;
  lat: number;
  lng: number;
  pricePerNightUSD: number; // base reference
  cleaningFeeUSD: number;
  serviceFeePercent: number; // standard ~10%
  tourismLevyPercent: number; // 2% TRA Catering & Tourism Training Levy
  weeklyDiscountPercent: number;
  
  rating: number; // e.g. 4.95
  reviewCount: number;
  isSuperhost: boolean;
  isGuestFavorite: boolean;
  isInstantBookable: boolean;
  
  registration: RegistrationDetails;
  
  bedrooms: number;
  beds: number;
  bathrooms: number;
  maxGuests: number;
  
  images: string[];
  amenities: string[];
  
  ratingBreakdown: RatingBreakdown;
  recentReviews: ReviewItem[];
  
  host: {
    name: string;
    avatar: string;
    isSuperhost: boolean;
    yearsHosting: number;
    responseRate: number;
    responseTime: string;
  };
}

export interface FilterState {
  minPriceKES: number;
  maxPriceKES: number;
  minRating: number;
  bedrooms: number; // 0 = any
  propertyTypes: string[];
  amenities: string[];
  superhostOnly: boolean;
  guestFavoriteOnly: boolean;
  instantBookOnly: boolean;
  selectedNeighborhood: string; // 'all' or specific id
  searchQuery: string;
}

export interface KenyaHub {
  id: string;
  name: string;
  county: string;
  lat: number;
  lng: number;
  zoom: number;
  tagline: string;
  traCountyOffice: string;
}
