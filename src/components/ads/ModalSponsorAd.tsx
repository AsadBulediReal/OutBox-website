import React, { useState, useEffect } from 'react';
import { MegaphoneOff } from 'lucide-react';
import {
  AD_SETTINGS,
  SPONSOR_ADS_POOL,
  getStoredAdSenseId,
  getShowMockAdsSetting,
} from '../../data/adConfig';
import { AdIcon } from './AdIcon';

export const ModalSponsorAd: React.FC = () => {
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

  if (!AD_SETTINGS.enableModalSponsor) {
    return null;
  }

  const hasRealAds = !!activeGooglePubId;
  const hasMockAds = showMockAds && SPONSOR_ADS_POOL.length > 0;

  if (hasRealAds) {
    return (
      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 text-center">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={activeGooglePubId}
          data-ad-slot="auto"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  if (hasMockAds) {
    const adData = SPONSOR_ADS_POOL[0];
    return (
      <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/70 dark:border-blue-800/40 text-left transition">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
              <AdIcon name={adData.iconName} className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                {adData.brand}
              </h5>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                {adData.tagline}
              </p>
            </div>
          </div>
          <a
            href={adData.ctaUrl}
            className="shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40"
          >
            {adData.ctaText}
          </a>
        </div>
      </div>
    );
  }

  // NO ADS STATE
  return (
    <div className="p-3 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-800 text-left flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-slate-200/60 dark:bg-slate-800 text-slate-400 flex items-center justify-center shrink-0">
          <MegaphoneOff className="w-3.5 h-3.5" />
        </div>
        <div>
          <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block">
            No Sponsored Offers Available
          </span>
          <span className="text-[10px] text-slate-400 block">
            No companion tools or third-party ads to display.
          </span>
        </div>
      </div>
      <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-slate-200/50 dark:bg-slate-800 text-slate-400">
        Vacant
      </span>
    </div>
  );
};
