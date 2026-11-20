/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADSENSE_CLIENT_ID?: string;
  readonly VITE_ENABLE_MOCK_ADS?: string;
  readonly VITE_APP_TITLE?: string;
  readonly VITE_APP_VERSION?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_DOWNLOAD_WIN_URL?: string;
  readonly VITE_DOWNLOAD_MAC_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
