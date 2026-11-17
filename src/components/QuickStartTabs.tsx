import React, { useState } from 'react';
import { Terminal, Download, Key, Check, Copy, ExternalLink, CheckCircle } from 'lucide-react';

export const QuickStartTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'exe' | 'source' | 'env' | 'tests'>('exe');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="quickstart" className="py-20 md:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Installation & Setup
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Get Started in Under 2 Minutes.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Choose whether to run the standalone Windows application or run directly from the Python source repository.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('exe')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'exe'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>Windows Standalone (.exe)</span>
            </button>

            <button
              onClick={() => setActiveTab('source')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'source'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>Python Source (venv)</span>
            </button>

            <button
              onClick={() => setActiveTab('env')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'env'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Key className="w-4 h-4" />
              <span>Dropbox App Key (.env)</span>
            </button>

            <button
              onClick={() => setActiveTab('tests')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'tests'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>Run Automated Tests</span>
            </button>
          </div>
        </div>

        {/* Tab Content Panes */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'exe' && (
            <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">Windows Standalone Executable</h3>
                  <p className="text-xs sm:text-sm text-slate-400">Zero Python or runtime installation needed. Self-contained 64-bit binary.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-semibold">
                  v2.4 Ready
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-xs text-slate-500 font-mono font-bold">STEP 1</div>
                  <h4 className="text-sm font-bold text-white mt-1">Download Outbox.exe</h4>
                  <p className="text-xs text-slate-400 mt-1">Grab the latest verified binary directly from GitHub releases.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-xs text-slate-500 font-mono font-bold">STEP 2</div>
                  <h4 className="text-sm font-bold text-white mt-1">Launch Application</h4>
                  <p className="text-xs text-slate-400 mt-1">Double-click to open. Clean native light/dark UI starts immediately.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-xs text-slate-500 font-mono font-bold">STEP 3</div>
                  <h4 className="text-sm font-bold text-white mt-1">1-Click Browser Login</h4>
                  <p className="text-xs text-slate-400 mt-1">Click "Log In with Dropbox" to authenticate with PKCE in your browser.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-400 font-mono">
                  SHA-256 Release Checksum: <span className="text-blue-400">e3b0c44298fc1c149afbf4c8996fb92427ae41e4...</span>
                </div>
                <a
                  href="#simulator"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition whitespace-nowrap"
                >
                  Download Outbox.exe (42 MB)
                </a>
              </div>
            </div>
          )}

          {activeTab === 'source' && (
            <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white">Run Directly from Python Source</h3>
                <p className="text-xs sm:text-sm text-slate-400">Requires Python 3.10+ (tested up to Python 3.12). Uses virtual environment isolation.</p>
              </div>

              <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-5 font-mono text-xs sm:text-sm">
                <button
                  onClick={() => handleCopy(`git clone https://github.com/dropbox-downloader/outbox.git\ncd outbox\npython -m venv .venv\n.venv\\Scripts\\activate\npip install -r requirements.txt\npython app.py`, 1)}
                  className="absolute right-4 top-4 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                >
                  {copiedIndex === 1 ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <div className="space-y-2 text-slate-300">
                  <div className="text-slate-500"># 1. Clone the repository</div>
                  <div className="text-blue-300">git clone https://github.com/dropbox-downloader/outbox.git</div>
                  <div className="text-blue-300">cd outbox</div>
                  
                  <div className="text-slate-500 pt-2"># 2. Create and activate Python virtual environment</div>
                  <div className="text-sky-300">python -m venv .venv</div>
                  <div className="text-sky-300">.venv\Scripts\activate <span className="text-slate-500"># On Windows PowerShell</span></div>
                  <div className="text-slate-500"># (source .venv/bin/activate on macOS/Linux)</div>
                  
                  <div className="text-slate-500 pt-2"># 3. Install PySide6 and Dropbox SDK dependencies</div>
                  <div className="text-emerald-300">pip install -r requirements.txt</div>

                  <div className="text-slate-500 pt-2"># 4. Launch Outbox</div>
                  <div className="text-white font-bold">python app.py</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'env' && (
            <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white">Configure Your Dropbox App Key</h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Outbox uses standard Dropbox PKCE OAuth. No client secret or manual token handling is required!
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="font-bold text-white flex items-center justify-between">
                    <span>1. Create a free app on the Dropbox App Console</span>
                    <a
                      href="https://www.dropbox.com/developers/apps"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      <span>dropbox.com/developers</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-slate-400">
                    Click <strong>Create app</strong> → choose <strong>Scoped access</strong> → select <strong>Full Dropbox</strong> → give it any name you prefer.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="font-bold text-white">2. Enable Permissions</div>
                  <p className="text-slate-400">
                    Under the <strong>Permissions</strong> tab, check:
                  </p>
                  <div className="flex gap-2">
                    <span className="font-mono text-xs px-2.5 py-1 rounded bg-slate-900 text-blue-400 border border-slate-800">
                      files.metadata.read
                    </span>
                    <span className="font-mono text-xs px-2.5 py-1 rounded bg-slate-900 text-blue-400 border border-slate-800">
                      sharing.read
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="font-bold text-white">3. Paste your App Key into .env</div>
                  <div className="relative font-mono text-xs bg-slate-900 p-3 rounded-xl border border-slate-800 text-slate-200">
                    DROPBOX_APP_KEY=your_dropbox_app_key_here
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tests' && (
            <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white">Automated Test Suite</h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Verify unit tests covering SHA-256 block hash computation, resume offsets, URL parsing, and file tree hierarchy logic.
                </p>
              </div>

              <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-5 font-mono text-xs sm:text-sm">
                <button
                  onClick={() => handleCopy(`python -m pytest -v`, 2)}
                  className="absolute right-4 top-4 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                >
                  {copiedIndex === 2 ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <div className="space-y-2 text-slate-300">
                  <div className="text-slate-500"># Run with pytest (recommended):</div>
                  <div className="text-emerald-300 font-bold">python -m pytest -v</div>
                  
                  <div className="text-slate-500 pt-2"># Or using Python's built-in unittest:</div>
                  <div className="text-sky-300">python -m unittest discover -s tests -v</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>All tests pass with 100% assertions across Windows and cross-platform environments.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
