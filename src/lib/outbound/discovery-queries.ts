/**
 * Discovery query list for the daily outbound cron.
 * Each entry defines one Google Places Text Search query.
 * Language (lang) is the language the gatekeeper email will be sent in.
 * City is parsed from the last word(s) of the query string.
 */

export interface DiscoveryQuery {
  query: string;
  vertical: string;
  lang: 'ar' | 'en';
}

/**
 * Blocklist — business types or patterns that are not outreach targets.
 * Checked case-insensitively against displayName.text.
 */
export const BLOCKLIST = [
  'haraj',
  'used car',
  'market',
  'souq',
  'سوق',
  ' parking',
  'موقف',
  ' ATM ',
  'صراف',
];

export const DISCOVERY_QUERIES: DiscoveryQuery[] = [
  // === Healthcare — Arabic gatekeeper ===
  { query: 'private hospitals Al Khobar', vertical: 'healthcare', lang: 'ar' },
  { query: 'clinics Dhahran', vertical: 'healthcare', lang: 'ar' },
  { query: 'dental clinics Dammam', vertical: 'healthcare', lang: 'ar' },
  { query: 'medical centers Al Jubail', vertical: 'healthcare', lang: 'ar' },
  { query: 'ophthalmology centers Al Khobar', vertical: 'healthcare', lang: 'ar' },
  { query: 'physiotherapy clinics Dammam', vertical: 'healthcare', lang: 'ar' },
  { query: 'dermatology clinics Dhahran', vertical: 'healthcare', lang: 'ar' },
  { query: 'pharmacy Al Khobar', vertical: 'healthcare', lang: 'ar' },

  // === Hospitality — Arabic gatekeeper ===
  { query: 'hotels Al Khobar', vertical: 'hospitality', lang: 'ar' },
  { query: 'hotels Dammam', vertical: 'hospitality', lang: 'ar' },
  { query: 'restaurants Al Khobar', vertical: 'hospitality', lang: 'ar' },
  { query: 'cafes Dammam', vertical: 'hospitality', lang: 'ar' },
  { query: 'fast food chains Al Jubail', vertical: 'hospitality', lang: 'ar' },
  { query: 'wedding venues Dhahran', vertical: 'hospitality', lang: 'ar' },
  { query: 'event venues Al Khobar', vertical: 'hospitality', lang: 'ar' },
  { query: 'resorts Al Khobar', vertical: 'hospitality', lang: 'ar' },

  // === Real estate — Arabic gatekeeper ===
  { query: 'real estate developers Al Khobar', vertical: 'real_estate', lang: 'ar' },
  { query: 'real estate offices Dammam', vertical: 'real_estate', lang: 'ar' },
  { query: 'property management companies Dhahran', vertical: 'real_estate', lang: 'ar' },
  { query: 'real estate investment companies Al Jubail', vertical: 'real_estate', lang: 'ar' },

  // === Contracting & Engineering — mixed ===
  { query: 'contracting companies Al Khobar', vertical: 'contracting', lang: 'ar' },
  { query: 'building contractors Dammam', vertical: 'contracting', lang: 'ar' },
  { query: 'engineering consultancy Dhahran', vertical: 'engineering', lang: 'en' },
  { query: 'architectural firms Al Khobar', vertical: 'engineering', lang: 'ar' },
  { query: 'project management companies Dammam', vertical: 'engineering', lang: 'ar' },

  // === Logistics — English gatekeeper ===
  { query: 'logistics companies Dammam', vertical: 'logistics', lang: 'en' },
  { query: 'shipping companies Al Jubail', vertical: 'logistics', lang: 'en' },
  { query: 'warehouse companies Dhahran', vertical: 'logistics', lang: 'en' },
  { query: 'customs clearance agents Dammam', vertical: 'logistics', lang: 'en' },

  // === Education — mixed ===
  { query: 'international schools Al Khobar', vertical: 'education', lang: 'en' },
  { query: 'private schools Dammam', vertical: 'education', lang: 'ar' },
  { query: 'universities Dhahran', vertical: 'education', lang: 'ar' },
  { query: 'training centers Al Khobar', vertical: 'education', lang: 'ar' },

  // === Auto & Industrial — Arabic gatekeeper ===
  { query: 'car dealerships Al Khobar', vertical: 'automotive', lang: 'ar' },
  { query: 'car dealerships Dammam', vertical: 'automotive', lang: 'ar' },
  { query: 'auto repair shops Al Jubail', vertical: 'automotive', lang: 'ar' },
  { query: 'industrial companies Al Jubail', vertical: 'industrial', lang: 'ar' },
  { query: 'manufacturing companies Dammam', vertical: 'industrial', lang: 'ar' },

  // === Lifestyle — Arabic gatekeeper ===
  { query: 'gyms Al Khobar', vertical: 'lifestyle', lang: 'en' },
  { query: 'fitness centers Dammam', vertical: 'lifestyle', lang: 'ar' },
  { query: 'interior design companies Al Khobar', vertical: 'interiors', lang: 'ar' },
  { query: 'furniture stores Dammam', vertical: 'interiors', lang: 'ar' },
];

/**
 * Day-of-year modulo — selects two consecutive queries per run.
 * index  = today % len
 * index2 = (today + 1) % len
 */
export function getQueriesForToday(): [DiscoveryQuery, DiscoveryQuery] {
  const now = new Date();
  // Day-of-year: days since Jan 1 (0-indexed)
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diffMs = now.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diffMs / 86_400_000);

  const len = DISCOVERY_QUERIES.length;
  const a = dayOfYear % len;
  const b = (dayOfYear + 1) % len;
  return [DISCOVERY_QUERIES[a], DISCOVERY_QUERIES[b]];
}
