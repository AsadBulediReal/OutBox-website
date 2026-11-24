import releaseInfo from '../data/releaseInfo.json';

interface WebMcpToolDescriptor {
  name: string;
  title?: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations?: {
    readOnlyHint?: boolean;
  };
  execute: (args: Record<string, unknown>) => Promise<{
    content: Array<{ type: 'text'; text: string }>;
  }>;
}

interface ModelContextLike {
  registerTool?: (
    tool: WebMcpToolDescriptor,
    options?: { signal?: AbortSignal }
  ) => void | Promise<void>;
}

const FAQ_ENTRIES = [
  {
    question: 'Do I need a paid Dropbox subscription or cloud storage quota?',
    answer:
      'No. Outbox works with any Dropbox account (including free Basic) and requires zero storage quota in your own Dropbox account.',
  },
  {
    question: 'How does the automatic pause and resume mechanism work?',
    answer:
      'Outbox writes incoming data to temporary files while tracking exact byte offsets and resumes interrupted transfers using standard HTTP Range requests.',
  },
  {
    question: 'How does cryptographic verification guarantee intact downloads?',
    answer:
      "Outbox computes SHA-256 hashes on 4MB data blocks in real time and validates them against Dropbox's content_hash specification.",
  },
  {
    question: 'Are my files, tokens, or links sent through any third-party servers?',
    answer:
      "No. Outbox connects directly from your local machine to Dropbox's official APIs over encrypted HTTPS with zero proxy servers or telemetry.",
  },
  {
    question: 'Which platforms and link formats are supported?',
    answer:
      'Windows 10/11 (.exe), macOS 11+ (.dmg), and Linux from source. Supports standard shared links (/scl/fo/..., /sh/...), team folders, and password-protected folders.',
  },
];

function getModelContext(): ModelContextLike | undefined {
  const nav = navigator as unknown as { modelContext?: ModelContextLike };
  const doc = document as unknown as { modelContext?: ModelContextLike };
  return nav.modelContext ?? doc.modelContext;
}

/**
 * Registers Outbox Downloader WebMCP tools with the browser's Model Context API
 * when supported by an in-browser AI agent runtime.
 */
export function registerOutboxWebMcpTools(onOpenDownload?: () => void): () => void {
  const modelContext = getModelContext();
  if (!modelContext?.registerTool) {
    return () => {};
  }

  const controller = new AbortController();

  const tools: WebMcpToolDescriptor[] = [
    {
      name: 'get_product_info',
      title: 'Get Outbox Downloader Product & Release Info',
      description:
        'Returns current version, pricing ($0 USD / Free), supported platforms, and official download links for Outbox Downloader.',
      inputSchema: {
        type: 'object',
        properties: {},
      },
      annotations: { readOnlyHint: true },
      async execute() {
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                name: 'Outbox Downloader',
                price: '0 USD (Free)',
                version: releaseInfo.version,
                releaseDate: releaseInfo.releaseDate,
                platforms: ['Windows 10/11 (.exe)', 'macOS 11+ (.dmg)', 'Linux (source)'],
                windowsDownloadUrl: releaseInfo.winDownloadUrl,
                macDownloadUrl: releaseInfo.macDownloadUrl,
                website: 'https://outboxdownloader.com',
                contactEmail: 'contact@outboxdownloader.com',
              }),
            },
          ],
        };
      },
    },
    {
      name: 'get_faq',
      title: 'Search Outbox Downloader FAQ',
      description:
        'Returns frequently asked questions and answers about Outbox Downloader features, security, and Dropbox compatibility.',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Optional keyword to filter FAQ entries (e.g. "resume", "sha-256", "quota").',
          },
        },
      },
      annotations: { readOnlyHint: true },
      async execute(args) {
        const query = typeof args.query === 'string' ? args.query.trim().toLowerCase() : '';
        const matches = query
          ? FAQ_ENTRIES.filter(
              (item) =>
                item.question.toLowerCase().includes(query) ||
                item.answer.toLowerCase().includes(query)
            )
          : FAQ_ENTRIES;

        return {
          content: [{ type: 'text', text: JSON.stringify(matches) }],
        };
      },
    },
    {
      name: 'navigate_section',
      title: 'Navigate to Page Section or Download Modal',
      description:
        'Scrolls the page to a specific section (simulator, features, how-it-works, comparison, faq, about, contact) or opens the download modal.',
      inputSchema: {
        type: 'object',
        properties: {
          section: {
            type: 'string',
            enum: ['simulator', 'features', 'how-it-works', 'comparison', 'faq', 'about', 'contact', 'download'],
            description: 'Target section ID or "download" to open the download modal.',
          },
        },
        required: ['section'],
      },
      annotations: { readOnlyHint: true },
      async execute(args) {
        const section = String(args.section ?? '');
        if (section === 'download' && onOpenDownload) {
          onOpenDownload();
          return {
            content: [{ type: 'text', text: JSON.stringify({ status: 'opened_download_modal' }) }],
          };
        }
        const target = document.getElementById(section);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          return {
            content: [{ type: 'text', text: JSON.stringify({ status: 'scrolled', section }) }],
          };
        }
        return {
          content: [{ type: 'text', text: JSON.stringify({ status: 'not_found', section }) }],
        };
      },
    },
  ];

  for (const tool of tools) {
    try {
      void modelContext.registerTool(tool, { signal: controller.signal });
    } catch {
      // Ignore duplicate registration or unsupported runtime options
    }
  }

  return () => controller.abort();
}
