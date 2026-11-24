import React, { useState, useEffect } from 'react';
import { X, MegaphoneOff, Sparkles } from 'lucide-react';
import {
  AD_SETTINGS,
  SPONSOR_ADS_POOL,
  getStoredAdSenseId,
  getShowMockAdsSetting,
} from '../../data/adConfig';
import { AdIcon } from './AdIcon';

interface LeaderboardAdProps {
  className?: string;
  defaultIndex?: number;
  onOpenAutoAds?: () => void;
}

export const LeaderboardAd: React.FC<LeaderboardAdProps> = ({
  className = '',
  defaultIndex = 0,
  onOpenAutoAds,
}) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [adIndex] = useState(defaultIndex % (SPONSOR_ADS_POOL.length || 1));
  const [activeGooglePubId, setActiveGooglePubId] = useState<string>(() => getStoredAdSenseId());
  const [showMockAds, setShowMockAds] = useState<boolean>(() => getShowMockAdsSetting());

  useEffect(() => {
    const handleStorageChange = () => {
      setActiveGooglePubId(getStoredAdSenseId());
      setShowMockAds(getShowMockAdsSetting());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (!AD_SETTINGS.enableInPageAds || isDismissed) {
    return null;
  }

  const hasRealAds = !!activeGooglePubId;
  const hasMockAds = showMockAds && SPONSOR_ADS_POOL.length > 0;

  return (
    <section aria-label="Sponsored advertisement" className={`w-full max-w-5xl mx-auto px-4 my-8 sm:my-12 ${className}`}>
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-50 via-slate-100/40 to-slate-50 dark:from-slate-900/90 dark:via-slate-850 dark:to-slate-900/90 border border-dashed border-slate-300 dark:border-slate-800 p-4 sm:p-5 shadow-sm backdrop-blur-md transition-all">
        {/* Top meta row */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 font-bold uppercase tracking-wider text-[10px] text-slate-500 dark:text-slate-400 bg-slate-200/60 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-300 dark:border-slate-700">
              <MegaphoneOff className="w-3 h-3 text-slate-400" />
              <span>Ad Space</span>
            </span>
            <span className="text-slate-400 dark:text-slate-500">•</span>
            <span className="text-slate-500 dark:text-slate-400">
              {hasRealAds ? 'Active AdSense' : hasMockAds ? 'Partner Sponsor' : 'No Active Ads'}
            </span>
          </div>

          <button
            onClick={() => setIsDismissed(true)}
            aria-label="Hide advertisement slot"
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Ad Body */}
        {hasRealAds ? (
          <div className="flex items-center justify-center min-h-[90px] py-2">
            <ins
              className="adsbygoogle"
              style={{ display: 'block', width: '100%', maxHeight: '120px' }}
              data-ad-client={activeGooglePubId}
              data-ad-slot="auto"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>
        ) : hasMockAds ? (
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-4 text-left w-full md:w-auto">
              <div className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
                <AdIcon name={SPONSOR_ADS_POOL[adIndex].iconName} className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  {SPONSOR_ADS_POOL[adIndex].brand}
                </p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 max-w-2xl">
                  {SPONSOR_ADS_POOL[adIndex].description}
                </p>
              </div>
            </div>
            <a
              href={SPONSOR_ADS_POOL[adIndex].ctaUrl}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 transition"
            >
              {SPONSOR_ADS_POOL[adIndex].ctaText}
            </a>
          </div>
        ) : (
          /* NO ADS BANNER STATE */
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left py-1">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-200/70 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center shrink-0">
                <MegaphoneOff className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  No Ads Available
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  There are currently no active advertisements to display in this slot.
                </p>
              </div>
            </div>

            {onOpenAutoAds && (
              <button
                onClick={onOpenAutoAds}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/50 border border-blue-200/60 dark:border-blue-800/40 transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Configure Auto Ads</span>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
