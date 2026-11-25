import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import {
  AD_SETTINGS,
  SPONSOR_ADS_POOL,
  getEffectiveAdSenseId,
  getShowMockAdsSetting,
} from '../../data/adConfig';
import { AdIcon } from './AdIcon';
import { GoogleAdUnit, useGoogleAdStatus } from './GoogleAdUnit';

interface LeaderboardAdProps {
  className?: string;
  defaultIndex?: number;
  onOpenAutoAds?: () => void;
}

export const LeaderboardAd: React.FC<LeaderboardAdProps> = ({
  className = '',
  defaultIndex = 0,
}) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [adIndex] = useState(defaultIndex % (SPONSOR_ADS_POOL.length || 1));
  const [activeGooglePubId, setActiveGooglePubId] = useState<string>(() => getEffectiveAdSenseId());
  const [showMockAds, setShowMockAds] = useState<boolean>(() => getShowMockAdsSetting());

  useEffect(() => {
    const handleStorageChange = () => {
      setActiveGooglePubId(getEffectiveAdSenseId());
      setShowMockAds(getShowMockAdsSetting());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const hasRealAds = !!activeGooglePubId;
  const hasMockAds = showMockAds && SPONSOR_ADS_POOL.length > 0;
  const { insRef, status: adStatus } = useGoogleAdStatus(hasRealAds ? activeGooglePubId : '');

  if (!AD_SETTINGS.enableInPageAds || isDismissed) {
    return null;
  }

  if (hasRealAds) {
    if (adStatus === 'unfilled') {
      return null;
    }

    const isVisible = adStatus === 'filled';

    return (
      <section
        aria-label="Sponsored advertisement"
        aria-hidden={!isVisible}
        className={
          isVisible
            ? `w-full max-w-5xl mx-auto px-4 my-8 sm:my-12 ${className}`
            : 'w-full max-w-5xl mx-auto px-4 h-0 overflow-hidden opacity-0 pointer-events-none m-0 p-0'
        }
      >
        <div
          className={
            isVisible
              ? 'relative rounded-2xl bg-gradient-to-r from-slate-50 via-slate-100/40 to-slate-50 dark:from-slate-900/90 dark:via-slate-850 dark:to-slate-900/90 border border-dashed border-slate-300 dark:border-slate-800 p-4 sm:p-5 shadow-sm backdrop-blur-md transition-all'
              : ''
          }
        >
          {isVisible && (
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-500">
              <span className="font-bold uppercase tracking-wider text-[10px] text-slate-500 dark:text-slate-400 bg-slate-200/60 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-300 dark:border-slate-700">
                Sponsored
              </span>

              <button
                onClick={() => setIsDismissed(true)}
                aria-label="Hide advertisement slot"
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <div className={isVisible ? 'flex items-center justify-center min-h-[90px] py-2' : 'w-full'}>
            <GoogleAdUnit
              clientId={activeGooglePubId}
              insRef={insRef}
              style={{ display: 'block', width: '100%', maxHeight: '120px' }}
            />
          </div>
        </div>
      </section>
    );
  }

  if (!hasMockAds) {
    return null;
  }

  return (
    <section aria-label="Sponsored advertisement" className={`w-full max-w-5xl mx-auto px-4 my-8 sm:my-12 ${className}`}>
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-50 via-slate-100/40 to-slate-50 dark:from-slate-900/90 dark:via-slate-850 dark:to-slate-900/90 border border-dashed border-slate-300 dark:border-slate-800 p-4 sm:p-5 shadow-sm backdrop-blur-md transition-all">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold uppercase tracking-wider text-[10px] text-slate-500 dark:text-slate-400 bg-slate-200/60 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-300 dark:border-slate-700">
              Partner Sponsor
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
      </div>
    </section>
  );
};
