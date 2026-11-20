import React, { useEffect, useState } from 'react';
import { Sparkles, CheckCircle2, X, ShieldCheck, MegaphoneOff } from 'lucide-react';
import {
  AD_SETTINGS,
  getStoredAdSenseId,
  saveStoredAdSenseId,
  getShowMockAdsSetting,
  saveShowMockAdsSetting,
} from '../../data/adConfig';

interface AutoAdsManagerProps {
  isConfigOpen: boolean;
  onCloseConfig: () => void;
}

function injectGoogleAutoAdsScript(clientId: string): void {
  const cleanId = clientId.trim();
  if (!cleanId) return;

  // Check if script is already present
  const existingScript = document.querySelector(`script[src*="googlesyndication.com"]`);
  if (existingScript) {
    existingScript.remove();
  }

  const script = document.createElement('script');
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${cleanId}`;
  script.async = true;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);

  try {
    type WindowWithAds = typeof window & { adsbygoogle?: Array<Record<string, unknown>> };
    const win = window as WindowWithAds;
    win.adsbygoogle = win.adsbygoogle || [];
    win.adsbygoogle.push({
      google_ad_client: cleanId,
      enable_page_level_ads: true,
    });
  } catch {
    // adsbygoogle script handling
  }
}

export const AutoAdsManager: React.FC<AutoAdsManagerProps> = ({
  isConfigOpen,
  onCloseConfig,
}) => {
  const [initialId] = useState(() => getStoredAdSenseId() || AD_SETTINGS.googleAdSenseClientId);
  const [pubId, setPubId] = useState<string>(initialId);
  const [activePubId, setActivePubId] = useState<string>(initialId);
  const [showMock, setShowMock] = useState<boolean>(() => getShowMockAdsSetting());
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Initialize and inject Google Auto Ads script on mount if a valid ID exists
  useEffect(() => {
    if (initialId) {
      injectGoogleAutoAdsScript(initialId);
    }
  }, [initialId]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = pubId.trim();
    saveStoredAdSenseId(clean);
    saveShowMockAdsSetting(showMock);
    setActivePubId(clean);
    setIsSaved(true);

    if (clean) {
      injectGoogleAutoAdsScript(clean);
    }

    // Notify all active ad components on page
    window.dispatchEvent(new Event('storage'));

    setTimeout(() => {
      setIsSaved(false);
      onCloseConfig();
    }, 1200);
  };

  const handleClear = () => {
    saveStoredAdSenseId('');
    saveShowMockAdsSetting(false);
    setPubId('');
    setActivePubId('');
    setShowMock(false);
    setIsSaved(false);
    window.dispatchEvent(new Event('storage'));
  };

  if (!isConfigOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl transition-all space-y-6">
        {/* Close Button */}
        <button
          onClick={onCloseConfig}
          className="absolute right-5 top-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              Auto Ads Controller
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${activePubId ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-slate-500/10 text-slate-500 border-slate-500/20'}`}>
                {activePubId ? 'AdSense Active' : 'No Active Ads'}
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              When no ads are configured, slots automatically display a clean "No Ads" placeholder.
            </p>
          </div>
        </div>

        {/* Status card */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-300 space-y-2">
          <p className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Current Ad State:
          </p>
          <p className="text-slate-500 dark:text-slate-400">
            {activePubId ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                Google Auto Ads is active ({activePubId}). Real ads will be served automatically.
              </span>
            ) : (
              <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                <MegaphoneOff className="w-3.5 h-3.5 text-slate-400" />
                No active ads connected. Slots will display <strong>"No Ads Available"</strong>.
              </span>
            )}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Google AdSense Publisher ID
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="ca-pub-0000000000000000"
                value={pubId}
                onChange={(e) => setPubId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-mono text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p className="mt-1.5 text-[11px] text-slate-400">
              Paste your ID here when ready to run real ads. If empty, the website safely displays "No Ads Available".
            </p>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 text-xs">
            <div>
              <span className="font-medium text-slate-700 dark:text-slate-300 block">
                Show Sample Partner Ads (Preview Mode)
              </span>
              <span className="text-[11px] text-slate-400">
                Keep unchecked to show "No Ads Available"
              </span>
            </div>
            <input
              type="checkbox"
              checked={showMock}
              onChange={(e) => setShowMock(e.target.checked)}
              className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
            />
          </div>

          {activePubId && (
            <div className="flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-2 rounded-xl border border-emerald-500/20">
              <span className="truncate">Publisher Connected: {activePubId}</span>
              <button
                type="button"
                onClick={handleClear}
                className="text-xs text-red-500 hover:underline shrink-0 ml-2 cursor-pointer"
              >
                Disconnect
              </button>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/25 transition cursor-pointer"
            >
              {isSaved ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Settings Updated!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Save Settings</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onCloseConfig}
              className="px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
