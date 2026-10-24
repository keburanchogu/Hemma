import { AirBnBListing, KenyaHub, CurrencyRate, NeighborhoodInsight } from '../types';

export const CURRENCY_RATES: Record<string, CurrencyRate> = {
  KES: { symbol: 'KSh ', rateFromUSD: 130, code: 'KES', isPrefix: true },
  USD: { symbol: '$', rateFromUSD: 1, code: 'USD', isPrefix: true },
  EUR: { symbol: '€', rateFromUSD: 0.92, code: 'EUR', isPrefix: true },
  GBP: { symbol: '£', rateFromUSD: 0.79, code: 'GBP', isPrefix: true },
};

export const KENYA_HUBS: KenyaHub[] = [
  {
    id: 'nairobi',
    name: 'Nairobi',
    county: 'Nairobi City County',
    lat: -1.2921,
    lng: 36.8219,
    zoom: 13,
    tagline: 'Modern high-rises, lush green suburbs & wildlife skyline',
    traCountyOffice: 'TRA Regional Office, Utalii House Nairobi'
  },
  {
    id: 'mombasa',
    name: 'Mombasa',
    county: 'Mombasa County',
    lat: -4.0435,
    lng: 39.6682,
    zoom: 13,
    tagline: 'Swahili heritage, palm-fringed reef beaches & warm Indian Ocean',
    traCountyOffice: 'TRA Coast Regional Directorate, Bima Towers Mombasa'
  },
  {
    id: 'diani',
    name: 'Diani Beach',
    county: 'Kwale County',
    lat: -4.2797,
    lng: 39.5934,
    zoom: 13,
    tagline: 'World-renowned white coral sands, kitesurfing & coastal forest villas',
    traCountyOffice: 'TRA South Coast Station, Diani Beach Road'
  },
  {
    id: 'naivasha',
    name: 'Naivasha',
    county: 'Nakuru County',
    lat: -0.7172,
    lng: 36.4310,
    zoom: 12,
    tagline: 'Great Rift Valley lakefront retreats, wildlife on lawn & Hell\'s Gate',
    traCountyOffice: 'TRA Central Rift Station, Nakuru'
  }
];

export const NEIGHBORHOOD_INSIGHTS: Record<string, NeighborhoodInsight> = {
  'nrb-kilimani': {
    id: 'nrb-kilimani',
    name: 'Kilimani & Hurlingham',
    city: 'Nairobi',
    region: 'Nairobi Central Suburbs',
    vibe: ['Café Culture', 'Modern Serviced Towers', 'Cosmopolitan', 'Foodie Hub'],
    safetyScore: 94,
    walkScore: 96,
    transitScore: 98,
    noiseLevel: 'Moderate',
    crimeRating: 'Very Low',
    highlights: [
      'Heart of Nairobi\'s international dining: artisan coffee roasters, Lebanese grills, and Japanese bistros on Argwings Kodhek & Chania Ave',
      'Steps to Yaya Centre, Adlife Plaza, and Quick Mart 24/7 supermarket',
      'Direct 10-minute access via Ring Road to Nairobi Expressway (JKIA Airport in 18 minutes)'
    ],
    nearbyLandmarks: [
      { name: 'Yaya Centre Mall', distance: '350m', walkTimeMinutes: 4 },
      { name: 'Adlife Plaza & Cafes', distance: '500m', walkTimeMinutes: 6 },
      { name: 'CJ\'s Restaurant Kilimani', distance: '650m', walkTimeMinutes: 8 }
    ],
    insiderTips: [
      'Artcaffe & Java House at Yaya Centre have super-fast backup Wi-Fi and solar power during any grid maintenance.',
      'Uber and Bolt response times are under 3 minutes throughout Kilimani day and night.',
      'All certified AirBnBs here feature 24/7 PSRA uniformed security guards with electric perimeter fencing.'
    ],
    transitOptions: ['Nairobi Expressway (Muringa/Argwings)', 'Ring Road Kilimani', 'Uber/Bolt (1-2 min avg)'],
    averagePricePerNightKES: 8500
  },
  'nrb-westlands': {
    id: 'nrb-westlands',
    name: 'Westlands & Parklands',
    city: 'Nairobi',
    region: 'Nairobi Commercial Hub',
    vibe: ['Luxury Skylines', 'Vibrant Nightlife', 'Global Corporate HQ', 'Fine Dining'],
    safetyScore: 95,
    walkScore: 94,
    transitScore: 99,
    noiseLevel: 'Lively',
    crimeRating: 'Very Low',
    highlights: [
      'Nairobi\'s premier business & entertainment district: Global Trade Centre (GTC), Westgate, and Sarit Centre',
      'Rooftop cocktail lounges overlooking the Karura Forest and city skyline',
      'Immediate access to Nairobi Expressway toll gates for rapid airport transit'
    ],
    nearbyLandmarks: [
      { name: 'Sarit Centre Megamall', distance: '400m', walkTimeMinutes: 5 },
      { name: 'Westgate Shopping Mall', distance: '600m', walkTimeMinutes: 7 },
      { name: 'Karura Forest Gate', distance: '1.4km', walkTimeMinutes: 16 }
    ],
    insiderTips: [
      'Head to Alchemist Bar or K1 Clubhouse for Nairobi\'s creative indie music and street food trucks.',
      'Sarit Centre has a full Carrefour hypermarket and direct foreign exchange counters with favorable rates.',
      'Karura Forest is 5 mins away for tranquil trail running and waterfall hikes.'
    ],
    transitOptions: ['Expressway Westlands Toll Gate', 'Waiyaki Way Corridors', 'Boda Boda & Cabs'],
    averagePricePerNightKES: 11500
  },
  'nrb-karen': {
    id: 'nrb-karen',
    name: 'Karen & Lang\'ata',
    city: 'Nairobi',
    region: 'Nairobi Green Belt',
    vibe: ['Tranquil Estates', 'Colonial Charm', 'Sanctuary & Forest', 'Craft Boutiques'],
    safetyScore: 98,
    walkScore: 78,
    transitScore: 82,
    noiseLevel: 'Quiet',
    crimeRating: 'Very Low',
    highlights: [
      'Acres of forested grounds with views of the Ngong Hills',
      'Minutes to Giraffe Centre, David Sheldrick Elephant Orphanage, and Karen Blixen Museum',
      'The Hub Karen & Galleria: open-air dining, organic farm shops, and artisan bakeries'
    ],
    nearbyLandmarks: [
      { name: 'The Hub Karen Mall', distance: '900m', walkTimeMinutes: 10 },
      { name: 'Giraffe Centre Sanctuary', distance: '2.5km', walkTimeMinutes: 30 },
      { name: 'Nairobi National Park Gate', distance: '3.8km', walkTimeMinutes: 45 }
    ],
    insiderTips: [
      'Ideal for couples and families seeking quiet birdsong mornings instead of city bustle.',
      'Book the David Sheldrick 11:00 AM baby elephant foster visit in advance.',
      'Southern Bypass gives fast highway access to JKIA without passing through central traffic.'
    ],
    transitOptions: ['Southern Bypass (Karen interchange)', 'Ngong Road Dual Carriageway', 'Private Chauffeur'],
    averagePricePerNightKES: 16000
  },
  'nrb-kileleshwa': {
    id: 'nrb-kileleshwa',
    name: 'Kileleshwa & Lavington',
    city: 'Nairobi',
    region: 'Nairobi Leafy Suburbs',
    vibe: ['Leafy Residential', 'Quiet Sunlit Balconies', 'Family-Friendly', 'Expat Haven'],
    safetyScore: 96,
    walkScore: 89,
    transitScore: 93,
    noiseLevel: 'Quiet',
    crimeRating: 'Very Low',
    highlights: [
      'Peaceful canopy-covered avenues: Mandera Road and Kandara Road',
      'Close to Lavington Curve, Nairobi Arboretum, and Kenya National Theatre',
      'High security gated compounds with heated infinity pools and backup generators'
    ],
    nearbyLandmarks: [
      { name: 'Kasuku Centre (Artisan Grocers)', distance: '350m', walkTimeMinutes: 4 },
      { name: 'Nairobi Arboretum Park', distance: '1.2km', walkTimeMinutes: 14 },
      { name: 'Lavington Mall', distance: '1.6km', walkTimeMinutes: 19 }
    ],
    insiderTips: [
      'Kasuku Centre has the neighborhood\'s favorite butcher, bakery, and pharmacy for quick provisions.',
      'Morning jogs along Oloitokitok road are peaceful with friendly community runners and 24/7 patrols.'
    ],
    transitOptions: ['Riverside Drive Link', 'Ring Road Kileleshwa', 'Uber/Bolt (2 min)'],
    averagePricePerNightKES: 9200
  },
  'msa-nyali': {
    id: 'msa-nyali',
    name: 'Nyali Beach & Links Road',
    city: 'Mombasa',
    region: 'Coast North',
    vibe: ['Ocean Breeze', 'Beachfront Luxury', 'Seafood Dining', 'Swahili Architecture'],
    safetyScore: 93,
    walkScore: 91,
    transitScore: 94,
    noiseLevel: 'Moderate',
    crimeRating: 'Very Low',
    highlights: [
      'Direct private access to soft Nyali Beach sands and calm Indian Ocean lagoon',
      'City Mall Nyali and Nyali Centre: seafood restaurants, rooftop gelaterias, and night markets',
      'Close to Haller Park eco-sanctuary and Mombasa Marine Reserve reef excursions'
    ],
    nearbyLandmarks: [
      { name: 'Nyali Beach Shoreline', distance: '200m', walkTimeMinutes: 2 },
      { name: 'City Mall Nyali (Carrefour)', distance: '450m', walkTimeMinutes: 5 },
      { name: 'Haller Park Sanctuary', distance: '1.1km', walkTimeMinutes: 13 }
    ],
    insiderTips: [
      'Enjoy fresh coconut water (madafu) on the beach from licensed local vendors in morning hours.',
      'Mombasa SGR Terminus is a 30-minute cab ride via the new Nyali-Tudor bypass road.'
    ],
    transitOptions: ['Links Road Dual Carriageway', 'Nyali Bridge Link', 'Tuk-Tuk & Coastal Cabs'],
    averagePricePerNightKES: 13500
  },
  'kwl-diani': {
    id: 'kwl-diani',
    name: 'Diani Beach Road & Galu',
    city: 'Diani Beach',
    region: 'South Coast (Kwale County)',
    vibe: ['Pristine White Sands', 'Kitesurfing', 'Swahili Coral Villas', 'Tropical Paradise'],
    safetyScore: 95,
    walkScore: 88,
    transitScore: 86,
    noiseLevel: 'Quiet',
    crimeRating: 'Very Low',
    highlights: [
      'Repeatedly voted Africa\'s leading beach destination with turquoise waters and powdery white sand',
      'Kite-surfing, deep sea dhow excursions to Kisite Mpunguti Marine Park and dolphin watching',
      'Romantic beach clubs, Nomad Beach Bar, and lush ancient baobab trees'
    ],
    nearbyLandmarks: [
      { name: 'Diani Beach Oceanfront', distance: '150m', walkTimeMinutes: 2 },
      { name: 'Chale Island Marine Reserve Excursions', distance: '1.2km', walkTimeMinutes: 15 },
      { name: 'Diani Shopping Centre & Bakery', distance: '800m', walkTimeMinutes: 10 }
    ],
    insiderTips: [
      'Fly directly into Ukunda / Diani Airstrip (10 min from most villas) from Wilson Airport Nairobi.',
      'Fresh seafood can be ordered daily from certified local fishermen arriving at Diani reef.'
    ],
    transitOptions: ['Diani Beach Road', 'Ukunda Airstrip (UKA)', 'Tuk-Tuk & Licensed Taxis'],
    averagePricePerNightKES: 19000
  },
  'nkr-naivasha': {
    id: 'nkr-naivasha',
    name: 'Moi South Lake Road & Sanctuary',
    city: 'Naivasha',
    region: 'Great Rift Valley',
    vibe: ['Lakefront Wildlife', 'Zebras on Lawn', 'Volcanic Geothermal', 'Fresh Air'],
    safetyScore: 97,
    walkScore: 75,
    transitScore: 80,
    noiseLevel: 'Quiet',
    crimeRating: 'Very Low',
    highlights: [
      'Spectacular views over freshwater Lake Naivasha with resident hippos and fish eagles',
      'Steps to Hell\'s Gate National Park (cycle alongside giraffes and zebras)',
      'Olkaria Geothermal natural mineral hot spa pools'
    ],
    nearbyLandmarks: [
      { name: 'Lake Naivasha Boat Pier', distance: '300m', walkTimeMinutes: 4 },
      { name: 'Hell\'s Gate National Park Elsa Gate', distance: '2.4km', walkTimeMinutes: 28 },
      { name: 'Crescent Island Game Sanctuary', distance: '3.2km', walkTimeMinutes: 38 }
    ],
    insiderTips: [
      'Evenings get crisp and chilly by the lake; chalets include working stone wood fireplaces.',
      'Rent a mountain bike at Hell\'s Gate gate for the scenic gorge ride that inspired The Lion King.'
    ],
    transitOptions: ['Moi South Lake Road (Paved)', 'Nairobi-Nakuru Highway Link', 'Safari Vans'],
    averagePricePerNightKES: 17500
  }
};

export const AIRBNB_LISTINGS: AirBnBListing[] = [
  // 1. NAIROBI - KILIMANI
  {
    id: 'ken-nrb-101',
    title: 'Skyline Balcony Oasis with Rooftop Heated Pool - Kilimani',
    description: 'Immerse yourself in Nairobi\'s chicest serviced residential tower. Features floor-to-ceiling glass, designer African hardwood furniture, high-speed fiber internet, and panoramic views of Upper Hill & city skyline. Officially certified by Kenya Tourism Regulatory Authority (TRA) with 24/7 PSRA security and backup power generator.',
    propertyType: 'Serviced apartment',
    roomType: 'Entire place',
    city: 'Nairobi',
    county: 'Nairobi City County',
    neighborhood: 'Kilimani',
    neighborhoodId: 'nrb-kilimani',
    lat: -1.2934,
    lng: 36.7871,
    pricePerNightUSD: 60, // ~7,800 KES
    cleaningFeeUSD: 15,
    serviceFeePercent: 10,
    tourismLevyPercent: 2,
    weeklyDiscountPercent: 12,
    rating: 4.97,
    reviewCount: 168,
    isSuperhost: true,
    isGuestFavorite: true,
    isInstantBookable: true,
    registration: {
      traLicenseNumber: 'TRA/ACC/NRB/2024/0482',
      countySbpNumber: 'NCCG/SBP/STR/2024/8912',
      status: 'Verified TRA Active',
      kraPinCompliant: true,
      psraSecurityGuarded: true,
      issueDate: '2024-01-15',
      expiryDate: '2027-01-15',
      inspectionRating: 'Grade A - Certified',
      occupancyPermitMax: 4,
      taxCollectionAgreement: true
    },
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    maxGuests: 4,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['100 Mbps Safaricom Fiber Wi-Fi', 'Rooftop Heated Pool', 'Full Generator & Borehole Water', '24/7 Manned Security & CCTV', 'Washing Machine', 'Smart TV with Netflix & DSTV', 'Dedicated Ergonomic Desk', 'Balcony Sunset View'],
    ratingBreakdown: { cleanliness: 4.99, accuracy: 4.97, communication: 4.99, location: 4.98, checkIn: 4.98, value: 4.92 },
    recentReviews: [
      { id: 'rev-k1', author: 'Dr. Wanjiku M.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80', rating: 5, date: 'October 2026', comment: 'The TRA license badge is clearly mounted in the foyer. Immaculate apartment, fast Wi-Fi, and 5 minutes walk to Yaya Centre. The generator kicked in seamlessly during rain.', tripType: 'Business' },
      { id: 'rev-k2', author: 'Brian K.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80', rating: 5, date: 'September 2026', comment: 'Best Airbnb stay in Nairobi! The guards at the gate were courteous and security protocols were top notch.', tripType: 'Solo Traveler' }
    ],
    host: {
      name: 'Faith & Kevin',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      isSuperhost: true,
      yearsHosting: 6,
      responseRate: 100,
      responseTime: 'within an hour'
    }
  },

  // 2. NAIROBI - WESTLANDS
  {
    id: 'ken-nrb-102',
    title: 'Executive High-Rise Suite near GTC & Westgate - Westlands',
    description: 'Breathtaking 18th-floor luxury retreat with floor-to-ceiling vistas over Westlands and Nairobi Arboretum. Equipped with chef\'s induction kitchen, rainfall marble showers, and high-speed elevator access. Fully licensed under TRA and Nairobi City County Short-Term Rental Regulations.',
    propertyType: 'Luxury penthouse',
    roomType: 'Entire place',
    city: 'Nairobi',
    county: 'Nairobi City County',
    neighborhood: 'Westlands',
    neighborhoodId: 'nrb-westlands',
    lat: -1.2683,
    lng: 36.8042,
    pricePerNightUSD: 95, // ~12,350 KES
    cleaningFeeUSD: 20,
    serviceFeePercent: 10,
    tourismLevyPercent: 2,
    weeklyDiscountPercent: 15,
    rating: 4.98,
    reviewCount: 204,
    isSuperhost: true,
    isGuestFavorite: true,
    isInstantBookable: true,
    registration: {
      traLicenseNumber: 'TRA/ACC/NRB/2024/0911',
      countySbpNumber: 'NCCG/SBP/STR/2024/4420',
      status: 'Verified TRA Active',
      kraPinCompliant: true,
      psraSecurityGuarded: true,
      issueDate: '2024-02-10',
      expiryDate: '2027-02-10',
      inspectionRating: 'Grade A - Certified',
      occupancyPermitMax: 2,
      taxCollectionAgreement: true
    },
    bedrooms: 1,
    beds: 1,
    bathrooms: 1.5,
    maxGuests: 2,
    images: [
      'https://images.unsplash.com/photo-1502005229762-ee1e0ed21606?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Ultra-Fast 250 Mbps Wi-Fi', 'Infinity Sky Pool & Gym', 'Card Key Biometric Entry', 'Washer & Dryer', 'Full Automatic Generator', 'Safe & Secure Covered Parking', 'Nespresso Coffee Bar'],
    ratingBreakdown: { cleanliness: 5.0, accuracy: 4.98, communication: 4.99, location: 4.99, checkIn: 4.98, value: 4.94 },
    recentReviews: [
      { id: 'rev-w1', author: 'David Ochieng', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80', rating: 5, date: 'October 2026', comment: 'The sunset over Nairobi skyline from the 18th floor is world-class. Quick access to Westgate and Sarit. Superhost Martin is exceptional.', tripType: 'Business' }
    ],
    host: {
      name: 'Martin Mwangi',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      isSuperhost: true,
      yearsHosting: 8,
      responseRate: 100,
      responseTime: 'within an hour'
    }
  },

  // 3. NAIROBI - KAREN
  {
    id: 'ken-nrb-103',
    title: 'Lush Colonial Garden Cottage - Karen Sanctuary',
    description: 'Private 1-acre sanctuary nestled under ancient indigenous acacia trees. Wake up to peacocks and hornbills, relax on the sun-drenched veranda, and enjoy a stone fireplace in the evenings. Minutes to Giraffe Centre and Nairobi National Park. Certified Class A Tourism Accommodations license.',
    propertyType: 'Garden villa',
    roomType: 'Entire place',
    city: 'Nairobi',
    county: 'Nairobi City County',
    neighborhood: 'Karen',
    neighborhoodId: 'nrb-karen',
    lat: -1.3328,
    lng: 36.7118,
    pricePerNightUSD: 130, // ~16,900 KES
    cleaningFeeUSD: 25,
    serviceFeePercent: 10,
    tourismLevyPercent: 2,
    weeklyDiscountPercent: 10,
    rating: 4.96,
    reviewCount: 134,
    isSuperhost: true,
    isGuestFavorite: true,
    isInstantBookable: false,
    registration: {
      traLicenseNumber: 'TRA/ACC/NRB/2023/1209',
      countySbpNumber: 'NCCG/SBP/STR/2023/5108',
      status: 'Verified TRA Active',
      kraPinCompliant: true,
      psraSecurityGuarded: true,
      issueDate: '2023-08-14',
      expiryDate: '2026-08-14',
      inspectionRating: 'Grade A - Certified',
      occupancyPermitMax: 6,
      taxCollectionAgreement: true
    },
    bedrooms: 3,
    beds: 4,
    bathrooms: 2.5,
    maxGuests: 6,
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['1-Acre Private Botanical Garden', 'Wood Fireplace', 'Solar Water Heating & Inverter', '24/7 G4S Armed Response & Guards', 'Barbecue Terrace', 'Complimentary Breakfast Basket', 'Pet-Friendly'],
    ratingBreakdown: { cleanliness: 4.98, accuracy: 4.96, communication: 4.99, location: 4.95, checkIn: 4.97, value: 4.92 },
    recentReviews: [
      { id: 'rev-kar1', author: 'Amina & Sarah', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80', rating: 5, date: 'October 2026', comment: 'A slice of heaven in Karen. Feeding giraffes nearby in the morning and relaxing by the log fire at night was magical.', tripType: 'Family' }
    ],
    host: {
      name: 'Rosemary Chebet',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      isSuperhost: true,
      yearsHosting: 7,
      responseRate: 99,
      responseTime: 'within an hour'
    }
  },

  // 4. NAIROBI - KILELESHWA
  {
    id: 'ken-nrb-104',
    title: 'Peaceful Tree-Canopy Loft with Solar Power - Kileleshwa',
    description: 'Quiet, sun-drenched residence on tree-lined Mandera Road. Features dedicated workstation with ergonomic Herman Miller chair, continuous solar-battery backup, and close proximity to Kasuku Centre and Arboretum park. TRA compliant verified listing.',
    propertyType: 'Serviced apartment',
    roomType: 'Entire place',
    city: 'Nairobi',
    county: 'Nairobi City County',
    neighborhood: 'Kileleshwa',
    neighborhoodId: 'nrb-kileleshwa',
    lat: -1.2789,
    lng: 36.7865,
    pricePerNightUSD: 65, // ~8,450 KES
    cleaningFeeUSD: 15,
    serviceFeePercent: 10,
    tourismLevyPercent: 2,
    weeklyDiscountPercent: 12,
    rating: 4.92,
    reviewCount: 92,
    isSuperhost: true,
    isGuestFavorite: true,
    isInstantBookable: true,
    registration: {
      traLicenseNumber: 'TRA/ACC/NRB/2024/0744',
      countySbpNumber: 'NCCG/SBP/STR/2024/2981',
      status: 'Verified TRA Active',
      kraPinCompliant: true,
      psraSecurityGuarded: true,
      issueDate: '2024-03-01',
      expiryDate: '2027-03-01',
      inspectionRating: 'Grade A - Certified',
      occupancyPermitMax: 3,
      taxCollectionAgreement: true
    },
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    maxGuests: 3,
    images: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['150 Mbps Fiber Wi-Fi', 'Solar Inverter Backup System', 'Workstation with Monitor', 'Gym Access', 'Smart TV with Showmax & Netflix', 'Balcony overlooking Jacaranda trees'],
    ratingBreakdown: { cleanliness: 4.95, accuracy: 4.92, communication: 4.96, location: 4.97, checkIn: 4.94, value: 4.90 },
    recentReviews: [
      { id: 'rev-kl1', author: 'George Mutua', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80', rating: 5, date: 'September 2026', comment: 'Extremely peaceful. The solar inverter made sure my remote work calls never dropped for a single second.', tripType: 'Business' }
    ],
    host: {
      name: 'Sharon & Ian',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      isSuperhost: true,
      yearsHosting: 5,
      responseRate: 98,
      responseTime: 'within an hour'
    }
  },

  // 5. MOMBASA - NYALI BEACH
  {
    id: 'ken-msa-201',
    title: 'Oceanfront Coral Villa with Private Beach Access - Nyali',
    description: 'Step directly from your private terrace onto the warm sands of Nyali Beach. Traditional Swahili architectural high ceilings with carved mahogany lintels, coastal breeze, and sea-facing swimming pool. Officially registered with Tourism Regulatory Authority Mombasa Directorate and Mombasa County Government.',
    propertyType: 'Coastal beachfront suite',
    roomType: 'Entire place',
    city: 'Mombasa',
    county: 'Mombasa County',
    neighborhood: 'Nyali Beach',
    neighborhoodId: 'msa-nyali',
    lat: -4.0289,
    lng: 39.7128,
    pricePerNightUSD: 110, // ~14,300 KES
    cleaningFeeUSD: 25,
    serviceFeePercent: 10,
    tourismLevyPercent: 2,
    weeklyDiscountPercent: 15,
    rating: 4.95,
    reviewCount: 156,
    isSuperhost: true,
    isGuestFavorite: true,
    isInstantBookable: true,
    registration: {
      traLicenseNumber: 'TRA/ACC/MSA/2024/0119',
      countySbpNumber: 'CGM/SBP/2024/3140',
      status: 'Verified TRA Active',
      kraPinCompliant: true,
      psraSecurityGuarded: true,
      issueDate: '2024-01-20',
      expiryDate: '2027-01-20',
      inspectionRating: 'Grade A - Certified',
      occupancyPermitMax: 5,
      taxCollectionAgreement: true
    },
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    maxGuests: 5,
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Private Beach Pathway (1 min to water)', 'Swimming Pool', 'Air Conditioning in All Rooms', 'Fast Wi-Fi', 'Fresh Fish Delivery on Request', 'Full Standby Generator', '24/7 Security Guards'],
    ratingBreakdown: { cleanliness: 4.97, accuracy: 4.95, communication: 4.98, location: 4.99, checkIn: 4.96, value: 4.91 },
    recentReviews: [
      { id: 'rev-ny1', author: 'Capt. James Otieno', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80', rating: 5, date: 'October 2026', comment: 'Waking up to the Indian Ocean sunrise is therapeutic. Very safe compound, right behind City Mall Nyali.', tripType: 'Family' }
    ],
    host: {
      name: 'Salim & Zuleikha',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      isSuperhost: true,
      yearsHosting: 9,
      responseRate: 100,
      responseTime: 'within an hour'
    }
  },

  // 6. DIANI BEACH - KWALE
  {
    id: 'ken-kwl-301',
    title: 'Luxury Swahili Baobab Pool Villa - Diani Beach',
    description: 'Architectural masterpiece blending Lamu plasterwork with minimalist coastal luxury. Private 12-meter turquoise plunge pool, outdoor rain showers, lush tropical garden, and only 3 minutes walk to the white sands of Galu & Diani. Registered and verified by TRA Kwale Station.',
    propertyType: 'Garden villa',
    roomType: 'Entire place',
    city: 'Diani Beach',
    county: 'Kwale County',
    neighborhood: 'Diani Beach Road',
    neighborhoodId: 'kwl-diani',
    lat: -4.2981,
    lng: 39.5841,
    pricePerNightUSD: 160, // ~20,800 KES
    cleaningFeeUSD: 30,
    serviceFeePercent: 10,
    tourismLevyPercent: 2,
    weeklyDiscountPercent: 12,
    rating: 4.98,
    reviewCount: 118,
    isSuperhost: true,
    isGuestFavorite: true,
    isInstantBookable: false,
    registration: {
      traLicenseNumber: 'TRA/ACC/KWL/2024/0074',
      countySbpNumber: 'CGK/SBP/STR/2024/1102',
      status: 'Verified TRA Active',
      kraPinCompliant: true,
      psraSecurityGuarded: true,
      issueDate: '2024-02-18',
      expiryDate: '2027-02-18',
      inspectionRating: 'Grade A - Certified',
      occupancyPermitMax: 6,
      taxCollectionAgreement: true
    },
    bedrooms: 3,
    beds: 4,
    bathrooms: 3,
    maxGuests: 6,
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Private 12m Plunge Pool', 'Chef on Request', 'Air Conditioning & Ceiling Fans', 'Inverter Battery Backup', 'Kite Surf Storage & Rinse', '24/7 Security with Night Dog Patrol'],
    ratingBreakdown: { cleanliness: 4.99, accuracy: 4.98, communication: 4.99, location: 4.98, checkIn: 4.98, value: 4.94 },
    recentReviews: [
      { id: 'rev-di1', author: 'Nadia Hassan', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80', rating: 5, date: 'October 2026', comment: 'The most stunning property we have stayed at in Kenya. The chef made incredible Swahili seafood curry and the pool is divine.', tripType: 'Family' }
    ],
    host: {
      name: 'Chef Ali & Nicole',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      isSuperhost: true,
      yearsHosting: 8,
      responseRate: 100,
      responseTime: 'within an hour'
    }
  },

  // 7. NAIVASHA - RIFT VALLEY
  {
    id: 'ken-nkr-401',
    title: 'Lakefront Wildlife Chalet with Fireplace - Naivasha',
    description: 'Watch zebras, impalas, and waterbucks graze on your front lawn right outside your veranda. Perched on Moi South Lake Road with panoramic views of Lake Naivasha and Mount Longonot. Includes working volcanic stone fireplace and solar backup. Officially licensed by TRA Nakuru Directorate.',
    propertyType: 'Safari chalet',
    roomType: 'Entire place',
    city: 'Naivasha',
    county: 'Nakuru County',
    neighborhood: 'Moi South Lake Road',
    neighborhoodId: 'nkr-naivasha',
    lat: -0.7421,
    lng: 36.3985,
    pricePerNightUSD: 125, // ~16,250 KES
    cleaningFeeUSD: 20,
    serviceFeePercent: 10,
    tourismLevyPercent: 2,
    weeklyDiscountPercent: 10,
    rating: 4.96,
    reviewCount: 142,
    isSuperhost: true,
    isGuestFavorite: true,
    isInstantBookable: true,
    registration: {
      traLicenseNumber: 'TRA/ACC/NKR/2024/0291',
      countySbpNumber: 'CGN/SBP/STR/2024/7740',
      status: 'Verified TRA Active',
      kraPinCompliant: true,
      psraSecurityGuarded: true,
      issueDate: '2024-03-12',
      expiryDate: '2027-03-12',
      inspectionRating: 'Grade A - Certified',
      occupancyPermitMax: 6,
      taxCollectionAgreement: true
    },
    bedrooms: 3,
    beds: 4,
    bathrooms: 2,
    maxGuests: 6,
    images: [
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502005229762-ee1e0ed21606?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Direct Wildlife Lawn Access', 'Wood Burning Fireplace', 'Private Lake Jetty & Boat Ride Booking', 'Solar Power with Battery Bank', 'BBQ Grill & Firepit', '24/7 Gate Patrols'],
    ratingBreakdown: { cleanliness: 4.97, accuracy: 4.96, communication: 4.98, location: 4.99, checkIn: 4.95, value: 4.92 },
    recentReviews: [
      { id: 'rev-nv1', author: 'Dennis Kimani', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80', rating: 5, date: 'September 2026', comment: 'Unbelievable experience! Zebras came right to the deck while having afternoon chai. 10 mins to Hell\'s Gate.', tripType: 'Safari Explorer' }
    ],
    host: {
      name: 'John & Grace Kariuki',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      isSuperhost: true,
      yearsHosting: 7,
      responseRate: 100,
      responseTime: 'within an hour'
    }
  }
];
