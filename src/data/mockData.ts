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
    title: 'Selective File Explorer',
    subtitle: 'Selective Tree Download',
    description: 'Browse remote directory trees and pick individual files or subfolders with accurate byte counters before initiating transfers.',
    highlight: 'Zero wasted disk space',
  },
  {
    icon: 'RotateCcw',
    title: 'Byte-Range Resume',
    subtitle: 'Interruption Proof',
    description: 'Picks up paused or broken downloads at exact byte boundaries if your Wi-Fi flickers or your computer goes to sleep.',
    highlight: 'No lost progress',
  },
  {
    icon: 'ShieldCheck',
    title: 'Cryptographic Self-Healing',
    subtitle: 'Block-Level SHA-256',
    description: 'Computes parallel 4MB chunk hashes against cloud checksums, detecting and re-downloading only damaged blocks.',
    highlight: 'Bit-perfect accuracy',
  },
  {
    icon: 'SearchCheck',
    title: 'Local Audit & Delta Skip',
    subtitle: 'Smart Drive Checking',
    description: 'Detects existing project files on your SSD, validates hashes, and downloads only new or altered files.',
    highlight: 'Fast offline verification',
  },
  {
    icon: 'FolderSync',
    title: 'Zero Account Quota',
    subtitle: 'Direct TLS Streaming',
    description: 'Streams directly from the shared link to your disk without copying files into your personal Dropbox account or consuming storage.',
    highlight: '0 MB quota consumed',
  },
  {
    icon: 'KeyRound',
    title: 'Browser OAuth & Password Unlock',
    subtitle: 'Frictionless Access',
    description: 'Direct browser-based authorization with automatic password detection for password-protected shared folders.',
    highlight: 'Secure 1-click login',
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
    q: 'Do I need a paid Dropbox subscription or cloud storage quota?',
    a: 'No. Outbox works with any Dropbox account (including free Basic) and requires zero storage quota in your own Dropbox account. Files stream directly from the shared link to your local drive without taking up space in your personal cloud.'
  },
  {
    q: 'How does the automatic pause and resume mechanism work?',
    a: 'When downloading, Outbox writes incoming data to temporary files while tracking exact byte offsets. If your network blips, your computer sleeps, or you pause the transfer, Outbox sends standard HTTP Range requests from the last verified byte, avoiding wasted bandwidth.'
  },
  {
    q: 'How does cryptographic verification guarantee intact downloads?',
    a: 'Outbox computes SHA-256 hashes on 4MB data blocks in real time and validates them against Dropbox\'s content_hash specification. If any block fails or is truncated, Outbox re-downloads only that block. You can also run "Verify Files" anytime to audit existing files on your drive.'
  },
  {
    q: 'Are my files, tokens, or links sent through any third-party servers?',
    a: 'No. Outbox connects directly from your local machine to Dropbox\'s official APIs over encrypted HTTPS. There are zero proxy servers, intermediate databases, or telemetry trackers. Your credentials and files never leave your computer.'
  },
  {
    q: 'Which platforms and link formats are supported?',
    a: 'Outbox is available as a standalone executable for Windows 10/11, a native app for macOS, and can be run from source on Linux. It supports standard shared links (/scl/fo/..., /sh/...), team folders, and password-protected folders.'
  }
];
