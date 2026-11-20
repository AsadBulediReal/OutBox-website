import React, { useState, useEffect } from 'react';
import { X, RotateCcw, MegaphoneOff, Sparkles } from 'lucide-react';
import {
  AD_SETTINGS,
  SPONSOR_ADS_POOL,
  getStoredAdSenseId,
  getShowMockAdsSetting,
} from '../../data/adConfig';
import { AdIcon } from './AdIcon';

interface SkyscraperCardProps {
  side: 'left' | 'right';
  defaultIndex: number;
  onOpenAutoAds?: () => void;
}

const SkyscraperCard: React.FC<SkyscraperCardProps> = ({ side, defaultIndex, onOpenAutoAds }) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [adIndex, setAdIndex] = useState(defaultIndex % (SPONSOR_ADS_POOL.length || 1));
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

  const hasRealAds = !!activeGooglePubId;
  const hasMockAds = showMockAds && SPONSOR_ADS_POOL.length > 0;

  // Auto-rotate if mock ads enabled
  useEffect(() => {
    if (!hasMockAds) return;
    const timer = setInterval(() => {
      setAdIndex((prev) => (prev + 1) % SPONSOR_ADS_POOL.length);
    }, (AD_SETTINGS.autoRotateIntervalSeconds || 15) * 1000);
    return () => clearInterval(timer);
  }, [hasMockAds]);

  if (isDismissed) {
    return (
      <div className={`fixed ${side === 'left' ? 'left-2' : 'right-2'} top-32 z-30 side-rail-ad`}>
        <button
          onClick={() => setIsDismissed(false)}
          title={`Show ${side} ad slot`}
          className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-full shadow-md backdrop-blur transition hover:scale-105 cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Show Slot</span>
        </button>
      </div>
    );
  }

  return (
    <aside
      aria-label={`${side} sidebar advertisement`}
      className={`fixed ${side === 'left' ? 'left-3' : 'right-3'} top-24 z-30 side-rail-ad flex-col w-[164px] min-h-[580px] max-h-[calc(100vh-8rem)] rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800/90 shadow-xl backdrop-blur-md overflow-hidden transition-all duration-300`}
    >
      {/* Top Banner Header / Badge & Dismiss */}
      <div className="flex items-center justify-between px-2.5 py-1.5 bg-slate-100/90 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400">
        <span className="font-bold tracking-wider uppercase text-[9px] text-slate-400 dark:text-slate-500">
          Ad Space • {side === 'left' ? 'Left' : 'Right'}
        </span>
        <button
          onClick={() => setIsDismissed(true)}
          aria-label="Close Ad Slot"
          className="p-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition cursor-pointer"
        >
          <X className="w-3 h-3" />
        </button>
      </div>

      {/* Ad Content vs "No Ads" State */}
      {hasRealAds ? (
        <div className="flex-1 flex items-center justify-center p-2 text-center text-xs text-slate-400">
          <ins
            className="adsbygoogle"
            style={{ display: 'inline-block', width: '160px', height: '600px' }}
            data-ad-client={activeGooglePubId}
            data-ad-slot="auto"
          />
        </div>
      ) : hasMockAds ? (
        <div className="flex-1 flex flex-col justify-between p-3.5 text-center">
          <div>
            <span
              className={`inline-block px-2 py-0.5 mb-3 text-[10px] font-bold rounded-full border ${SPONSOR_ADS_POOL[adIndex].badgeColor || 'bg-blue-500/10 text-blue-600 border-blue-500/20'}`}
            >
              {SPONSOR_ADS_POOL[adIndex].badgeText}
            </span>
            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <AdIcon name={SPONSOR_ADS_POOL[adIndex].iconName} className="w-6 h-6" />
            </div>
            <h4 className="text-xs font-extrabold text-slate-900 dark:text-white leading-snug">
              {SPONSOR_ADS_POOL[adIndex].brand}
            </h4>
            <p className="mt-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 leading-tight">
              {SPONSOR_ADS_POOL[adIndex].tagline}
            </p>
            <p className="mt-2.5 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed text-left">
              {SPONSOR_ADS_POOL[adIndex].description}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
            <a
              href={SPONSOR_ADS_POOL[adIndex].ctaUrl}
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition"
            >
              {SPONSOR_ADS_POOL[adIndex].ctaText}
            </a>
          </div>
        </div>
      ) : (
        /* NO ADS STATE */
        <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-3.5 shadow-inner">
            <MegaphoneOff className="w-6 h-6" />
          </div>

          <span className="inline-block px-2 py-0.5 mb-2 text-[10px] font-bold uppercase tracking-wider rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60">
            No Active Ads
          </span>

          <h4 className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
            No Ads Available
          </h4>

          <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            There are currently no advertisements to display in this slot.
          </p>

          <div className="mt-6 pt-4 border-t border-dashed border-slate-200 dark:border-slate-800 w-full">
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-2">
              Ad Space Reserved
            </p>
            {onOpenAutoAds && (
              <button
                onClick={onOpenAutoAds}
                className="w-full inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/50 border border-blue-200/60 dark:border-blue-800/40 transition cursor-pointer"
              >
                <Sparkles className="w-3 h-3" />
                <span>Auto Ads Setup</span>
              </button>
            )}
          </div>
        </div>
      )}
    </aside>
  );
};

interface SideRailAdsProps {
  onOpenAutoAds?: () => void;
}

export const SideRailAds: React.FC<SideRailAdsProps> = ({ onOpenAutoAds }) => {
  if (!AD_SETTINGS.enableSideRails) return null;

  return (
    <>
      <SkyscraperCard side="left" defaultIndex={0} onOpenAutoAds={onOpenAutoAds} />
      <SkyscraperCard side="right" defaultIndex={1} onOpenAutoAds={onOpenAutoAds} />
    </>
  );
};
