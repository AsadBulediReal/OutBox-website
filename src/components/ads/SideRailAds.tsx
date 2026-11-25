import React, { useState, useEffect } from 'react';
import { X, RotateCcw } from 'lucide-react';
import {
  AD_SETTINGS,
  SPONSOR_ADS_POOL,
  getEffectiveAdSenseId,
  getShowMockAdsSetting,
} from '../../data/adConfig';
import { AdIcon } from './AdIcon';
import { GoogleAdUnit, useGoogleAdStatus } from './GoogleAdUnit';

interface SkyscraperCardProps {
  side: 'left' | 'right';
  defaultIndex: number;
  onOpenAutoAds?: () => void;
}

const SkyscraperCard: React.FC<SkyscraperCardProps> = ({ side, defaultIndex }) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [adIndex, setAdIndex] = useState(defaultIndex % (SPONSOR_ADS_POOL.length || 1));
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

  // Auto-rotate if mock ads enabled
  useEffect(() => {
    if (!hasMockAds) return;
    const timer = setInterval(() => {
      setAdIndex((prev) => (prev + 1) % SPONSOR_ADS_POOL.length);
    }, (AD_SETTINGS.autoRotateIntervalSeconds || 15) * 1000);
    return () => clearInterval(timer);
  }, [hasMockAds]);

  if (hasRealAds) {
    if (adStatus === 'unfilled') {
      return null;
    }

    const isVisible = adStatus === 'filled';

    if (isDismissed) {
      if (!isVisible) return null;
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
        aria-hidden={!isVisible}
        className={
          isVisible
            ? `fixed ${side === 'left' ? 'left-3' : 'right-3'} top-24 z-30 side-rail-ad flex-col w-[164px] min-h-[580px] max-h-[calc(100vh-8rem)] rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800/90 shadow-xl backdrop-blur-md overflow-hidden transition-all duration-300`
            : `fixed ${side === 'left' ? 'left-3' : 'right-3'} top-24 -z-10 side-rail-ad flex-col w-[164px] h-0 overflow-hidden opacity-0 pointer-events-none border-0 shadow-none`
        }
      >
        {isVisible && (
          <div className="flex items-center justify-between px-2.5 py-1.5 bg-slate-100/90 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400">
            <span className="font-bold tracking-wider uppercase text-[9px] text-slate-400 dark:text-slate-500">
              Sponsored
            </span>
            <button
              onClick={() => setIsDismissed(true)}
              aria-label="Close Ad Slot"
              className="p-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        <div className="flex-1 flex items-center justify-center p-2 text-center text-xs text-slate-400">
          <GoogleAdUnit
            clientId={activeGooglePubId}
            insRef={insRef}
            style={{ display: 'inline-block', width: '160px', height: '600px' }}
            format="vertical"
            fullWidthResponsive={false}
          />
        </div>
      </aside>
    );
  }

  if (!hasMockAds) {
    return null;
  }

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
          <p className="text-xs font-extrabold text-slate-900 dark:text-white leading-snug">
            {SPONSOR_ADS_POOL[adIndex].brand}
          </p>
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
