import React, { useState, useEffect } from 'react';
import { X, ChevronUp, ChevronDown, MegaphoneOff, Sparkles } from 'lucide-react';
import {
  AD_SETTINGS,
  SPONSOR_ADS_POOL,
  getStoredAdSenseId,
  getShowMockAdsSetting,
} from '../../data/adConfig';
import { AdIcon } from './AdIcon';

interface FloatingBottomAdProps {
  onOpenAutoAds?: () => void;
}

export const FloatingBottomAd: React.FC<FloatingBottomAdProps> = ({ onOpenAutoAds }) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
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

  if (!AD_SETTINGS.enableFloatingBottomBanner || isDismissed) {
    return null;
  }

  const hasRealAds = !!activeGooglePubId;
  const hasMockAds = showMockAds && SPONSOR_ADS_POOL.length > 0;

  if (isCollapsed) {
    return (
      <div className="fixed bottom-3 right-4 z-40 animate-fade-in">
        <button
          onClick={() => setIsCollapsed(false)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 dark:bg-slate-800/95 text-white border border-slate-700 shadow-xl backdrop-blur text-xs font-medium hover:bg-slate-800 transition cursor-pointer"
        >
          <MegaphoneOff className="w-3.5 h-3.5 text-slate-400" />
          <span>{hasRealAds ? 'Active Ad' : 'No Ads'}</span>
          <ChevronUp className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <aside
      aria-label="Bottom advertisement banner"
      className="fixed bottom-0 inset-x-0 z-40 p-2 sm:p-3 pointer-events-none"
    >
      <div className="pointer-events-auto max-w-4xl mx-auto rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800/90 shadow-2xl backdrop-blur-md px-3.5 py-2.5 sm:px-5 sm:py-3 transition-all duration-300">
        <div className="flex items-center justify-between gap-3">
          {/* Left Icon + Text */}
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 shrink-0 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center border border-slate-200 dark:border-slate-700">
              {hasMockAds ? (
                <AdIcon name={SPONSOR_ADS_POOL[0].iconName} className="w-4 h-4" />
              ) : (
                <MegaphoneOff className="w-4 h-4 text-slate-400" />
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                  {hasRealAds ? 'Live Ad' : hasMockAds ? 'Partner Ad' : 'No Active Ads'}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 truncate">
                  {hasRealAds
                    ? 'Google Auto Ads Active'
                    : hasMockAds
                    ? SPONSOR_ADS_POOL[0].brand
                    : 'No advertisements currently running'}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate hidden sm:block">
                {hasRealAds
                  ? 'Ads are automatically optimized by Google AdSense.'
                  : hasMockAds
                  ? SPONSOR_ADS_POOL[0].tagline
                  : 'This slot is currently empty.'}
              </p>
            </div>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {!hasRealAds && !hasMockAds && onOpenAutoAds && (
              <button
                onClick={onOpenAutoAds}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/50 border border-blue-200/60 dark:border-blue-800/40 transition cursor-pointer"
              >
                <Sparkles className="w-3 h-3" />
                <span>Auto Ads</span>
              </button>
            )}

            <button
              onClick={() => setIsCollapsed(true)}
              title="Minimize banner"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              <ChevronDown className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsDismissed(true)}
              title="Dismiss banner"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
