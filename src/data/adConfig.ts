export interface AdItem {
  id: string;
  brand: string;
  tagline: string;
  description: string;
  badgeText: string;
  ctaText: string;
  ctaUrl: string;
  iconName: 'cloud' | 'shield' | 'hard-drive' | 'zap' | 'server';
  badgeColor?: string;
}

export interface AdSettings {
  // Master toggle: Fully automatic ad delivery
  autoAdsMode: boolean; // When true, automatically places, sizes, and manages ads
  autoRotateIntervalSeconds: number; // Rotates sponsors automatically (e.g. every 15s)

  // Show fake/mock partner ads (NordVPN, Backblaze, etc.) as preview:
  // Set to FALSE by default so the site only shows real ads or "No ads" placeholder
  showMockPartnerAds: boolean;

  // Placements
  enableSideRails: boolean;
  enableInPageAds: boolean;
  enableFloatingBottomBanner: boolean;
  enableModalSponsor: boolean;

  // Google Auto Ads
  useGoogleAutoAds: boolean;
  googleAdSenseClientId: string; // e.g. "ca-pub-1234567890123456"
}

// Persistent key for local storage so user can set Publisher ID from the UI without touching code
export const ADSENSE_STORAGE_KEY = 'outbox_adsense_client_id';
export const SHOW_MOCK_ADS_KEY = 'outbox_show_mock_ads';

export function getStoredAdSenseId(): string {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(ADSENSE_STORAGE_KEY);
    if (saved && saved.trim()) return saved.trim();
  }
  return import.meta.env.VITE_ADSENSE_CLIENT_ID || '';
}

export function getEffectiveAdSenseId(): string {
  const stored = getStoredAdSenseId();
  if (stored) return stored;
  return AD_SETTINGS.useGoogleAutoAds ? AD_SETTINGS.googleAdSenseClientId : '';
}

export function saveStoredAdSenseId(pubId: string): void {
  if (typeof window !== 'undefined') {
    if (pubId.trim()) {
      localStorage.setItem(ADSENSE_STORAGE_KEY, pubId.trim());
    } else {
      localStorage.removeItem(ADSENSE_STORAGE_KEY);
    }
  }
}

export function getShowMockAdsSetting(): boolean {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(SHOW_MOCK_ADS_KEY);
    if (saved !== null) {
      return saved === 'true';
    }
  }
  return import.meta.env.VITE_ENABLE_MOCK_ADS === 'true';
}

export function saveShowMockAdsSetting(enabled: boolean): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(SHOW_MOCK_ADS_KEY, enabled ? 'true' : 'false');
  }
}

export const AD_SETTINGS: AdSettings = {
  autoAdsMode: true,
  autoRotateIntervalSeconds: 15,
  showMockPartnerAds: false, // Default: NO fake ads
  enableSideRails: true,
  enableInPageAds: true,
  enableFloatingBottomBanner: true,
  enableModalSponsor: true,

  // Google Auto Ads is ready. Paste your pub ID here or via the Auto Ads button in the footer:
  useGoogleAutoAds: true,
  googleAdSenseClientId: 'ca-pub-1722794534248442',
};

// Optional sample ads (only rendered if user explicitly enables preview mode)
export const SPONSOR_ADS_POOL: AdItem[] = [
  {
    id: 'sample-1',
    brand: 'Cloud Storage & Sync',
    tagline: 'High-Speed Automated File Storage',
    description: 'S3-compatible ultra-fast object storage with multi-region replication.',
    badgeText: 'Sample Sponsor',
    ctaText: 'Learn More',
    ctaUrl: '#',
    iconName: 'cloud',
    badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  },
];
