export interface FileNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  sizeBytes: number;
  sizeFormatted: string;
  path: string;
  extension?: string;
  selected?: boolean;
  expanded?: boolean;
  children?: FileNode[];
}

export interface PresetProject {
  id: string;
  title: string;
  badge: string;
  url: string;
  totalSize: string;
  totalFiles: number;
  rootFolder: FileNode;
}

export const PRESET_PROJECTS: PresetProject[] = [
  {
    id: 'cinema',
    title: '4K Cinema Reel — Commercial Shoot (2026)',
    badge: 'Video Production',
    url: 'https://www.dropbox.com/scl/fo/cinema-reel-2026-pro/h?rlkey=9x8a7b6c5d4e3f2g1',
    totalSize: '84.6 GB',
    totalFiles: 18,
    rootFolder: {
      id: 'root-1',
      name: 'Cinema_Reel_2026_4K',
      type: 'folder',
      sizeBytes: 90841285000,
      sizeFormatted: '84.6 GB',
      path: '/Cinema_Reel_2026_4K',
      selected: true,
      expanded: true,
      children: [
        {
          id: 'f-raw',
          name: '01_RED_RAW_Footage',
          type: 'folder',
          sizeBytes: 68719476736,
          sizeFormatted: '64.0 GB',
          path: '/Cinema_Reel_2026_4K/01_RED_RAW_Footage',
          selected: true,
          expanded: true,
          children: [
            {
              id: 'file-raw-1',
              name: 'A001_C001_1117_001.R3D',
              type: 'file',
              extension: 'R3D',
              sizeBytes: 17179869184,
              sizeFormatted: '16.0 GB',
              path: '/Cinema_Reel_2026_4K/01_RED_RAW_Footage/A001_C001_1117_001.R3D',
              selected: true,
            },
            {
              id: 'file-raw-2',
              name: 'A001_C002_1117_001.R3D',
              type: 'file',
              extension: 'R3D',
              sizeBytes: 25769803776,
              sizeFormatted: '24.0 GB',
              path: '/Cinema_Reel_2026_4K/01_RED_RAW_Footage/A001_C002_1117_001.R3D',
              selected: true,
            },
            {
              id: 'file-raw-3',
              name: 'A002_C001_1117_001.R3D',
              type: 'file',
              extension: 'R3D',
              sizeBytes: 25769803776,
              sizeFormatted: '24.0 GB',
              path: '/Cinema_Reel_2026_4K/01_RED_RAW_Footage/A002_C001_1117_001.R3D',
              selected: false,
            },
          ],
        },
        {
          id: 'f-proxies',
          name: '02_ProRes_Proxies',
          type: 'folder',
          sizeBytes: 8589934592,
          sizeFormatted: '8.0 GB',
          path: '/Cinema_Reel_2026_4K/02_ProRes_Proxies',
          selected: true,
          expanded: false,
          children: [
            {
              id: 'file-prx-1',
              name: 'Proxy_A001_C001.mov',
              type: 'file',
              extension: 'mov',
              sizeBytes: 2147483648,
              sizeFormatted: '2.0 GB',
              path: '/Cinema_Reel_2026_4K/02_ProRes_Proxies/Proxy_A001_C001.mov',
              selected: true,
            },
            {
              id: 'file-prx-2',
              name: 'Proxy_A001_C002.mov',
              type: 'file',
              extension: 'mov',
              sizeBytes: 3221225472,
              sizeFormatted: '3.0 GB',
              path: '/Cinema_Reel_2026_4K/02_ProRes_Proxies/Proxy_A001_C002.mov',
              selected: true,
            },
            {
              id: 'file-prx-3',
              name: 'Proxy_A002_C001.mov',
              type: 'file',
              extension: 'mov',
              sizeBytes: 3221225472,
              sizeFormatted: '3.0 GB',
              path: '/Cinema_Reel_2026_4K/02_ProRes_Proxies/Proxy_A002_C001.mov',
              selected: true,
            },
          ],
        },
        {
          id: 'f-audio',
          name: '03_MultiTrack_Audio',
          type: 'folder',
          sizeBytes: 2359296000,
          sizeFormatted: '2.2 GB',
          path: '/Cinema_Reel_2026_4K/03_MultiTrack_Audio',
          selected: true,
          expanded: false,
          children: [
            {
              id: 'file-aud-1',
              name: 'Boom_Mic_Take01.wav',
              type: 'file',
              extension: 'wav',
              sizeBytes: 820000000,
              sizeFormatted: '782 MB',
              path: '/Cinema_Reel_2026_4K/03_MultiTrack_Audio/Boom_Mic_Take01.wav',
              selected: true,
            },
            {
              id: 'file-aud-2',
              name: 'Lavalier_TalentA_Take01.wav',
              type: 'file',
              extension: 'wav',
              sizeBytes: 760000000,
              sizeFormatted: '724 MB',
              path: '/Cinema_Reel_2026_4K/03_MultiTrack_Audio/Lavalier_TalentA_Take01.wav',
              selected: true,
            },
            {
              id: 'file-aud-3',
              name: 'Lavalier_TalentB_Take01.wav',
              type: 'file',
              extension: 'wav',
              sizeBytes: 779296000,
              sizeFormatted: '743 MB',
              path: '/Cinema_Reel_2026_4K/03_MultiTrack_Audio/Lavalier_TalentB_Take01.wav',
              selected: true,
            },
          ],
        },
        {
          id: 'f-docs',
          name: '04_CallSheets_&_EDL',
          type: 'folder',
          sizeBytes: 42000000,
          sizeFormatted: '40.0 MB',
          path: '/Cinema_Reel_2026_4K/04_CallSheets_&_EDL',
          selected: true,
          expanded: false,
          children: [
            {
              id: 'file-doc-1',
              name: 'ShotList_Day01_Final.pdf',
              type: 'file',
              extension: 'pdf',
              sizeBytes: 15728640,
              sizeFormatted: '15.0 MB',
              path: '/Cinema_Reel_2026_4K/04_CallSheets_&_EDL/ShotList_Day01_Final.pdf',
              selected: true,
            },
            {
              id: 'file-doc-2',
              name: 'Master_Timeline_Edit.xml',
              type: 'file',
              extension: 'xml',
              sizeBytes: 26271360,
              sizeFormatted: '25.0 MB',
              path: '/Cinema_Reel_2026_4K/04_CallSheets_&_EDL/Master_Timeline_Edit.xml',
              selected: true,
            },
          ],
        },
      ],
    },
  },
  {
    id: 'photos',
    title: 'High-Res Studio Photoshoot RAW (Sony ARW)',
    badge: 'Photography',
    url: 'https://www.dropbox.com/scl/fo/studio-session-nov2026/h?rlkey=2b3c4d5e6f7g8h9',
    totalSize: '24.2 GB',
    totalFiles: 340,
    rootFolder: {
      id: 'root-2',
      name: 'Studio_Fashion_Editorial_RAW',
      type: 'folder',
      sizeBytes: 25983582208,
      sizeFormatted: '24.2 GB',
      path: '/Studio_Fashion_Editorial_RAW',
      selected: true,
      expanded: true,
      children: [
        {
          id: 'p-selects',
          name: 'Client_Selects_5Star',
          type: 'folder',
          sizeBytes: 4831838208,
          sizeFormatted: '4.5 GB',
          path: '/Studio_Fashion_Editorial_RAW/Client_Selects_5Star',
          selected: true,
          expanded: true,
          children: [
            {
              id: 'img-1',
              name: 'DSC09412_Look1_Hero.ARW',
              type: 'file',
              extension: 'ARW',
              sizeBytes: 67108864,
              sizeFormatted: '64 MB',
              path: '/Studio_Fashion_Editorial_RAW/Client_Selects_5Star/DSC09412_Look1_Hero.ARW',
              selected: true,
            },
            {
              id: 'img-2',
              name: 'DSC09413_Look1_CloseUp.ARW',
              type: 'file',
              extension: 'ARW',
              sizeBytes: 67108864,
              sizeFormatted: '64 MB',
              path: '/Studio_Fashion_Editorial_RAW/Client_Selects_5Star/DSC09413_Look1_CloseUp.ARW',
              selected: true,
            },
            {
              id: 'img-3',
              name: 'DSC09455_Look2_Movement.ARW',
              type: 'file',
              extension: 'ARW',
              sizeBytes: 67108864,
              sizeFormatted: '64 MB',
              path: '/Studio_Fashion_Editorial_RAW/Client_Selects_5Star/DSC09455_Look2_Movement.ARW',
              selected: true,
            },
          ],
        },
        {
          id: 'p-all',
          name: 'Unedited_Camera_Roll (337 Files)',
          type: 'folder',
          sizeBytes: 21151744000,
          sizeFormatted: '19.7 GB',
          path: '/Studio_Fashion_Editorial_RAW/Unedited_Camera_Roll',
          selected: false,
          expanded: false,
          children: [
            {
              id: 'img-un-1',
              name: 'DSC09001_RollA.ARW',
              type: 'file',
              extension: 'ARW',
              sizeBytes: 67108864,
              sizeFormatted: '64 MB',
              path: '/Studio_Fashion_Editorial_RAW/Unedited_Camera_Roll/DSC09001_RollA.ARW',
              selected: false,
            },
          ],
        },
      ],
    },
  },
  {
    id: 'blender',
    title: 'Cyberpunk Game Environment (Blender + Unreal 5)',
    badge: '3D & Gaming',
    url: 'https://www.dropbox.com/scl/fo/unreal-cyberpunk-pack/h?rlkey=5f6e7d8c9b0a1',
    totalSize: '16.5 GB',
    totalFiles: 82,
    rootFolder: {
      id: 'root-3',
      name: 'Cyberpunk_City_Environment_UE5',
      type: 'folder',
      sizeBytes: 17716740096,
      sizeFormatted: '16.5 GB',
      path: '/Cyberpunk_City_Environment_UE5',
      selected: true,
      expanded: true,
      children: [
        {
          id: 'b-textures',
          name: '4K_PBR_Textures',
          type: 'folder',
          sizeBytes: 11811160064,
          sizeFormatted: '11.0 GB',
          path: '/Cyberpunk_City_Environment_UE5/4K_PBR_Textures',
          selected: true,
          expanded: true,
          children: [
            {
              id: 'tex-1',
              name: 'NeonSign_Albedo_4K.exr',
              type: 'file',
              extension: 'exr',
              sizeBytes: 268435456,
              sizeFormatted: '256 MB',
              path: '/Cyberpunk_City_Environment_UE5/4K_PBR_Textures/NeonSign_Albedo_4K.exr',
              selected: true,
            },
            {
              id: 'tex-2',
              name: 'WetAsphalt_Normal_4K.png',
              type: 'file',
              extension: 'png',
              sizeBytes: 134217728,
              sizeFormatted: '128 MB',
              path: '/Cyberpunk_City_Environment_UE5/4K_PBR_Textures/WetAsphalt_Normal_4K.png',
              selected: true,
            },
          ],
        },
        {
          id: 'b-models',
          name: 'Meshes_FBX',
          type: 'folder',
          sizeBytes: 4294967296,
          sizeFormatted: '4.0 GB',
          path: '/Cyberpunk_City_Environment_UE5/Meshes_FBX',
          selected: true,
          expanded: false,
          children: [
            {
              id: 'mesh-1',
              name: 'HoverCar_Chassis_LOD0.fbx',
              type: 'file',
              extension: 'fbx',
              sizeBytes: 524288000,
              sizeFormatted: '500 MB',
              path: '/Cyberpunk_City_Environment_UE5/Meshes_FBX/HoverCar_Chassis_LOD0.fbx',
              selected: true,
            },
          ],
        },
      ],
    },
  },
];

export interface FeatureItem {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  highlight: string;
}

export const FEATURES: FeatureItem[] = [
  {
    icon: 'FolderTree',
    title: 'Selective Downloads',
    subtitle: 'Only download what you want',
    description: 'Browse the complete folder tree and pick the specific files or folders you need. Avoid downloading massive 100+ GB archives when you only need a few files.',
    highlight: 'No giant ZIP archives',
  },
  {
    icon: 'RotateCcw',
    title: 'Pause & Resume Transfers',
    subtitle: 'Never lose your progress',
    description: 'If your Wi-Fi drops or your computer goes to sleep, transfers pick up right from where they stopped. Never restart a download from scratch.',
    highlight: 'Seamless instant resume',
  },
  {
    icon: 'ShieldCheck',
    title: 'Automatic File Repair',
    subtitle: 'Guaranteed intact downloads',
    description: 'Outbox automatically checks every downloaded file. If a file is incomplete or damaged during transfer, it is instantly self-healed and re-downloaded.',
    highlight: '100% accurate files',
  },
  {
    icon: 'KeyRound',
    title: '1-Click Secure Sign-In',
    subtitle: 'Fast browser-based login',
    description: 'Sign in directly through your web browser with any Dropbox account. No complicated tokens, passwords, or setup required.',
    highlight: 'Instant, safe sign-in',
  },
  {
    icon: 'Lock',
    title: 'Smart Password Detection',
    subtitle: 'Prompts automatically',
    description: 'Open password-protected Dropbox links without hassle. Outbox automatically detects protected shares and prompts you cleanly for the password.',
    highlight: 'Unlocks password shares',
  },
  {
    icon: 'CheckCircle2',
    title: 'Smart Skip for Existing Files',
    subtitle: 'Skip already downloaded files',
    description: 'Already have part of the project on your drive? Outbox checks your existing files in seconds and only downloads what is new or updated.',
    highlight: 'No duplicate downloads',
  },
  {
    icon: 'FolderSync',
    title: 'Clean Folder Organization',
    subtitle: 'No accidental double folders',
    description: 'Intelligently prevents annoying duplicate nesting like Photos/Photos. Files land cleanly into your chosen destination folder.',
    highlight: 'Clean folder layout',
  },
  {
    icon: 'SearchCheck',
    title: 'Verify Existing Files',
    subtitle: 'Audit your drive anytime',
    description: 'Want to confirm files on your drive or SSD match the cloud master? Click "Verify Files" anytime without re-downloading anything.',
    highlight: 'Fast offline check',
  },
];

export const COMPARISONS = [
  {
    feature: 'Selective File / Folder Selection',
    outbox: true,
    dropboxWeb: false,
    officialClient: 'Syncs entire linked folder or requires selective sync setup',
    rclone: 'CLI flags only, no visual hierarchy tree',
  },
  {
    feature: 'Bypasses 20 GB & 10,000 File Limits',
    outbox: true,
    dropboxWeb: false,
    officialClient: true,
    rclone: true,
  },
  {
    feature: 'Pause & Resume Interrupted Transfers',
    outbox: true,
    dropboxWeb: false,
    officialClient: true,
    rclone: true,
  },
  {
    feature: 'Automatic File Integrity Check',
    outbox: true,
    dropboxWeb: false,
    officialClient: 'Proprietary internal sync',
    rclone: 'MD5/SHA1 only on supported endpoints',
  },
  {
    feature: 'Automatic Corruption Repair',
    outbox: true,
    dropboxWeb: false,
    officialClient: 'Sync retry loop',
    rclone: false,
  },
  {
    feature: 'Requires Hard Drive Sync Installation',
    outbox: false,
    dropboxWeb: false,
    officialClient: true,
    rclone: false,
  },
  {
    feature: 'Visual GUI with Search, Filter & Log',
    outbox: true,
    dropboxWeb: 'Limited web preview',
    officialClient: 'System tray widget only',
    rclone: false,
  },
  {
    feature: 'No Account Storage Quota Consumed',
    outbox: true,
    dropboxWeb: true,
    officialClient: false,
    rclone: true,
  },
];

export const FAQS = [
  {
    q: 'Why do large Dropbox shared folder downloads fail in normal web browsers?',
    a: 'When you click "Download" on a large Dropbox shared folder in your browser, Dropbox attempts to compress all files into a temporary single .zip archive on their servers. Dropbox strictly caps server-side zip generation at 20 GB or 10,000 files. Even under that limit, any minor network blip terminates the entire multi-gigabyte zip download without any way to resume, wasting all downloaded data. Outbox completely bypasses zip bundling by streaming individual files directly over HTTP with byte-range resume.'
  },
  {
    q: 'Do I need a paid Dropbox subscription to use Outbox?',
    a: 'No! Outbox works with any Dropbox account—Free Basic, Plus, Professional, or Business/Enterprise. In fact, Outbox streams shared links without adding the files to your personal Dropbox cloud quota, so you never have to worry about running out of Dropbox storage space.'
  },
  {
    q: 'How does Outbox guarantee 100% file integrity?',
    a: 'Outbox implements Dropbox\'s official SHA-256 block-chunked hash algorithm (content_hash). As each file is downloaded or audited, it computes 4MB block hashes in parallel. If even a single byte differs or an unexpected connection drop truncated a file, Outbox automatically detects the mismatch, isolates the file, and re-downloads a pristine copy.'
  },
  {
    q: 'How does Outbox handle password-protected Dropbox links?',
    a: 'When you paste a password-protected shared link, Outbox automatically detects the authorization challenge from Dropbox and prompts you with a secure password popup. Once entered, Outbox exchanges the authenticated session and renders the full directory tree instantly.'
  },
  {
    q: 'Can I resume downloads if my connection drops or I pause?',
    a: 'Yes. Outbox saves incomplete files as .tmp files on your local drive and records transfer offsets. When resuming, it sends an HTTP Range header with an engineered 4 KB safety rewind buffer to guarantee that no overlapping bytes are skipped or duplicated.'
  },
  {
    q: 'Are my Dropbox credentials or downloaded files sent to any remote servers?',
    a: 'Absolutely not. Outbox is 100% free and open-source desktop software. It runs entirely on your local machine and connects directly to Dropbox\'s official API (api.dropboxapi.com). Your OAuth tokens and downloaded files never leave your computer.'
  },
  {
    q: 'Can I verify files that were already downloaded previously without redownloading them?',
    a: 'Yes! Outbox features a dedicated "Verify Files" engine. You can select any target folder on your local machine and click Verify: Outbox will scan every local file, calculate its SHA-256 content hash, and cross-reference it against the remote Dropbox metadata without downloading anything that already passes.'
  },
  {
    q: 'What platforms are supported?',
    a: 'Outbox is built with Python 3.11+ and PySide6 (Qt for Python). It is packaged as a standalone Windows executable (.exe) for Windows 10 and 11, and can also be run natively from source on macOS and Linux via Python.'
  }
];
