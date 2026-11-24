# Outbox Downloader — Selective Dropbox Downloader & Folder Extractor

> Official website: [https://outboxdownloader.com](https://outboxdownloader.com)
> Price: Free ($0 USD)
> Platforms: Windows 10/11 (`.exe`), macOS 11+ (`.dmg`), Linux (from source)
> Contact: [contact@outboxdownloader.com](mailto:contact@outboxdownloader.com)

Outbox Downloader is an independent desktop utility engineered for selective, resumable, and cryptographically verified downloads from Dropbox shared links. It eliminates Dropbox's 20 GB / 10,000-file server-side ZIP limit by streaming selected files directly from Dropbox's official APIs to your local drive.

## Key Features

- **Selective Directory Tree**: Inspect massive shared links (`/scl/fo/...`, `/sh/...`, team folders, and password-protected links) and pick only the files or folders you need.
- **Automatic Pause & Resume**: Tracks exact byte offsets and resumes interrupted transfers using standard HTTP `Range` requests.
- **SHA-256 Block Verification**: Computes 4MB block hashes in real time and validates them against Dropbox's `content_hash` specification, automatically re-downloading any corrupted block.
- **No Cloud Quota Needed**: Works with any Dropbox account (including free Basic) without taking up space in your personal cloud storage.
- **Local-First Security**: Connects directly from your computer to Dropbox over encrypted HTTPS—no proxy servers, intermediate databases, or telemetry.

## Frequently Asked Questions

### Do I need a paid Dropbox subscription or cloud storage quota?
No. Outbox works with any Dropbox account (including free Basic) and requires zero storage quota in your own Dropbox account.

### How does the automatic pause and resume mechanism work?
Outbox writes incoming data to temporary files while tracking exact byte offsets. If your network drops or you pause a transfer, it resumes via HTTP `Range` requests from the last verified byte.

### How does cryptographic verification guarantee intact downloads?
Outbox computes SHA-256 hashes on 4MB data blocks in real time and validates them against Dropbox's `content_hash` specification. Any failed block is re-downloaded automatically.

### Are my files, tokens, or links sent through any third-party servers?
No. Outbox connects directly from your local machine to Dropbox's official APIs over encrypted HTTPS.

## Site Navigation & Legal

- [About Us](https://outboxdownloader.com/about.html)
- [Contact Us](https://outboxdownloader.com/contact.html)
- [Privacy Policy](https://outboxdownloader.com/privacy.html)
- [Terms of Service](https://outboxdownloader.com/terms.html)
