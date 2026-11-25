import React, { useState, useEffect } from 'react';
import {
  AD_SETTINGS,
  SPONSOR_ADS_POOL,
  getEffectiveAdSenseId,
  getShowMockAdsSetting,
} from '../../data/adConfig';
import { AdIcon } from './AdIcon';
import { GoogleAdUnit, useGoogleAdStatus } from './GoogleAdUnit';

export const ModalSponsorAd: React.FC = () => {
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

  if (!AD_SETTINGS.enableModalSponsor) {
    return null;
  }

  if (hasRealAds) {
    if (adStatus === 'unfilled') {
      return null;
    }

    const isVisible = adStatus === 'filled';

    return (
      <div
        aria-hidden={!isVisible}
        className={
          isVisible
            ? 'p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 text-center'
            : 'w-full h-0 overflow-hidden opacity-0 pointer-events-none m-0 p-0 border-0'
        }
      >
        <GoogleAdUnit
          clientId={activeGooglePubId}
          insRef={insRef}
          style={{ display: 'block', width: '100%' }}
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
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                {adData.brand}
              </p>
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

  return null;
};
