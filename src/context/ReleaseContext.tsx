import React, { createContext, useContext, useState, useEffect } from 'react';
import defaultReleaseInfo from '../data/releaseInfo.json';

export interface ReleaseInfo {
  version: string;
  tag: string;
  winFileName: string;
  macFileName: string;
  winDownloadUrl: string;
  macDownloadUrl: string;
  winSizeFormatted: string;
  macSizeFormatted: string;
  publishedAt: string;
  releaseDate: string;
  releaseUrl: string;
  isLoading: boolean;
  error?: string | null;
}

const DEFAULT_RELEASE: ReleaseInfo = {
  version: defaultReleaseInfo.version || '1.0.5',
  tag: defaultReleaseInfo.tag || `v${defaultReleaseInfo.version || '1.0.5'}`,
  winFileName: defaultReleaseInfo.winFileName || 'Outbox_Downloader_Windows_Setup_v1.0.5.exe',
  macFileName: defaultReleaseInfo.macFileName || 'Outbox_Downloader_macOS_v1.0.5.dmg',
  winDownloadUrl: defaultReleaseInfo.winDownloadUrl || 'https://github.com/AsadBulediReal/outbox-releases/releases/latest',
  macDownloadUrl: defaultReleaseInfo.macDownloadUrl || 'https://github.com/AsadBulediReal/outbox-releases/releases/latest',
  winSizeFormatted: (defaultReleaseInfo as any).winSizeFormatted || '~37 MB',
  macSizeFormatted: (defaultReleaseInfo as any).macSizeFormatted || '~40 MB',
  publishedAt: defaultReleaseInfo.publishedAt || '2026-11-20',
  releaseDate: defaultReleaseInfo.releaseDate || '2026-11-20',
  releaseUrl: (defaultReleaseInfo as any).releaseUrl || 'https://github.com/AsadBulediReal/outbox-releases/releases/latest',
  isLoading: false,
  error: null,
};

const ReleaseContext = createContext<ReleaseInfo>(DEFAULT_RELEASE);

const GITHUB_REPO = 'AsadBulediReal/outbox-releases';
const CACHE_KEY = 'outbox_latest_release_cache';
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache to respect GitHub API limits

function formatBytesToMB(bytes?: number): string {
  if (!bytes || isNaN(bytes)) return '~40 MB';
  const mb = Math.round(bytes / (1024 * 1024));
  return `~${mb} MB`;
}

export const ReleaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [release, setRelease] = useState<ReleaseInfo>(() => {
    // Attempt instant read from cached localStorage
    if (typeof window !== 'undefined') {
      try {
        const cachedRaw = localStorage.getItem(CACHE_KEY);
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw);
          if (cached && cached.data && Date.now() - cached.timestamp < CACHE_TTL_MS) {
            return { ...DEFAULT_RELEASE, ...cached.data, isLoading: false };
          }
        }
      } catch {
        // Ignore localStorage read errors
      }
    }
    return DEFAULT_RELEASE;
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchLatestRelease() {
      try {
        const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`, {
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        });

        if (!response.ok) {
          // If GitHub rate limited or unavailable, keep default/cached gracefully
          return;
        }

        const data = await response.json();
        if (!data || !data.tag_name) return;

        const rawTag: string = data.tag_name;
        const cleanVersion = rawTag.startsWith('v') ? rawTag.substring(1) : rawTag;
        const assets: any[] = Array.isArray(data.assets) ? data.assets : [];

        // Find Windows Setup installer asset
        const winAsset = assets.find(
          (a) => a.name?.toLowerCase().endsWith('.exe') && !a.name?.toLowerCase().includes('blockmap')
        );

        // Find macOS DMG disk image asset
        const macAsset = assets.find((a) => a.name?.toLowerCase().endsWith('.dmg'));

        const updatedRelease: ReleaseInfo = {
          version: cleanVersion,
          tag: rawTag,
          winFileName: winAsset?.name || `Outbox_Downloader_Windows_Setup_${rawTag}.exe`,
          macFileName: macAsset?.name || `Outbox_Downloader_macOS_${rawTag}.dmg`,
          winDownloadUrl:
            winAsset?.browser_download_url ||
            `https://github.com/${GITHUB_REPO}/releases/download/${rawTag}/Outbox_Downloader_Windows_Setup_${rawTag}.exe`,
          macDownloadUrl:
            macAsset?.browser_download_url ||
            `https://github.com/${GITHUB_REPO}/releases/download/${rawTag}/Outbox_Downloader_macOS_${rawTag}.dmg`,
          winSizeFormatted: formatBytesToMB(winAsset?.size),
          macSizeFormatted: formatBytesToMB(macAsset?.size),
          publishedAt: data.published_at ? data.published_at.split('T')[0] : DEFAULT_RELEASE.publishedAt,
          releaseDate: data.published_at ? data.published_at.split('T')[0] : DEFAULT_RELEASE.releaseDate,
          releaseUrl: data.html_url || `https://github.com/${GITHUB_REPO}/releases/tag/${rawTag}`,
          isLoading: false,
          error: null,
        };

        if (isMounted) {
          setRelease(updatedRelease);
          try {
            localStorage.setItem(
              CACHE_KEY,
              JSON.stringify({
                timestamp: Date.now(),
                data: updatedRelease,
              })
            );
          } catch {
            // Ignore cache storage errors
          }
        }
      } catch (err: any) {
        if (isMounted) {
          setRelease((prev) => ({
            ...prev,
            isLoading: false,
            error: err?.message || 'Failed to fetch release',
          }));
        }
      }
    }

    fetchLatestRelease();

    return () => {
      isMounted = false;
    };
  }, []);

  return <ReleaseContext.Provider value={release}>{children}</ReleaseContext.Provider>;
};

export const useReleaseInfo = (): ReleaseInfo => {
  return useContext(ReleaseContext);
};
