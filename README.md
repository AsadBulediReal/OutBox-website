# Outbox Downloader — Official Website (outboxdownloader.com)

A modern, high-performance product landing page and interactive application simulator for **Outbox Downloader** (`https://outboxdownloader.com`), built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Lucide Icons**.

## 🚀 Features

- **Interactive In-Browser App Simulator**:
  - **Step 1: Link & Credentials**: Test link input with preset real-world media packages (84 GB Cinema Reel, 24 GB Fashion RAWs, 16 GB Unreal 5 Project), destination folder picker, password-protected link unlock challenge, and animated loading dialog.
  - **Step 2: Interactive Directory Tree**: Expandable/collapsible folders, individual and batch checkbox selection, dynamic byte counters, file type icons, search filtering, and instant preview.
  - **Step 3: Transfers & Telemetry**: Live transfer simulation with dual progress bars (active file and batch), real-time MB/s metrics, pause/resume engine, SHA-256 block hash verification, and live terminal activity log.
  - **Slide-Over Settings Drawer**: Concurrency sliders, HTTP Range rewind safety buffers, and auto-repair toggle.
- **The Dropbox Problem vs. Outbox Solution**: Visual comparison of Dropbox's 20 GB / 10k file server-side ZIP limits, network drops, and storage waste vs Outbox's selective streaming.
- **Engine Capabilities & Feature Grid**: Deep technical breakdown of byte-range resumption, SHA-256 content_hash block integrity, PKCE OAuth, smart directory normalization, and on-demand cloud audits.
- **Comprehensive Comparison Matrix**: Outbox vs. Dropbox Web ZIP vs. Official Sync Client vs. CLI tools (rclone/wget).
- **Architecture Showcase**: Clean modular Python/PySide6 design pattern (≤400 lines/file rule, QThread non-blocking workers, pytest automation).
- **Tabbed Installation & Setup Guide**: Standalone Windows `.exe` and macOS `.dmg` setup guides.
- **Audience & Use Cases**: Video editors, commercial photographers, game developers, sound designers.
- **Interactive FAQ Accordion**: In-depth explanations of security, file integrity, and platform support.
- **Download Modal**: 1-click downloads for Windows installer and macOS disk image.
- **Responsive Dark/Light Aesthetics**: Polished dark mode with vibrant royal blue accents matching the native PySide6 desktop app theme.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + Plus Jakarta Sans & JetBrains Mono typography
- **Icons**: Lucide React + Official Outbox Vector Brand Assets
- **Bundler**: Vite 8 with `@tailwindcss/vite`

---

## 💻 Development & Building

```bash
# Install dependencies
npm.cmd install

# Start local dev server
npm.cmd run dev

# Build for production
npm.cmd run build

# Preview production build locally
npm.cmd run preview
```
