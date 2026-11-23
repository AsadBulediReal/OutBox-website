import React, { useState, useEffect, useCallback } from 'react';
import { X, ShieldCheck, FileText, Lock, CheckCircle2 } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacy' | 'terms';
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy'
}) => {
  const [userTab, setUserTab] = useState<'privacy' | 'terms' | null>(null);
  const activeTab = userTab ?? initialTab;

  const handleClose = useCallback(() => {
    setUserTab(null);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[88vh] z-10">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setUserTab('privacy')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                activeTab === 'privacy'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>Privacy Policy</span>
            </button>
            <button
              onClick={() => setUserTab('terms')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                activeTab === 'terms'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Terms of Service</span>
            </button>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {activeTab === 'privacy' ? (
            <div className="space-y-5">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Privacy Policy for Outbox Downloader
                </h3>
                <p className="text-xs text-slate-400 mt-1">Last Updated: November 2026</p>
              </div>

              <p>
                At Outbox Downloader (<strong className="text-slate-900 dark:text-white">outboxdownloader.com</strong>), we respect your privacy. This policy outlines how information is handled when you visit our website and use our desktop client.
              </p>

              <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-slate-800/60 border border-blue-200/60 dark:border-slate-700/60 space-y-2">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Key Privacy Guarantee: Zero Payload Inspection
                </div>
                <p className="text-xs leading-relaxed">
                  Outbox Downloader is a native desktop client. All file transfers occur directly between your personal device and Dropbox&rsquo;s edge servers via TLS 1.3. We do NOT operate proxy servers and we never store, log, inspect, or retain your files or credentials.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">1. Information We Collect on the Website</h4>
                <p className="text-xs mt-1">
                  When you visit our website, standard web server logs (IP address, browser type, referring page) may be recorded for performance and security purposes. If you submit a query via our contact form, we collect the name and email you provide solely to reply to your inquiry.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">2. Cookies and Google AdSense</h4>
                <p className="text-xs mt-1">
                  Our website displays advertisements served by Google AdSense. Google uses cookies (including the DoubleClick cookie) to serve ads based on prior visits to our site and other websites on the Internet. Users may opt out of personalized advertising by visiting Google Ads Settings (<a href="https://adssettings.google.com" target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 underline">adssettings.google.com</a>).
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">3. Third-Party Links & Services</h4>
                <p className="text-xs mt-1">
                  Our website and software communicate with Dropbox shared links provided by users. We are not responsible for the privacy practices of third-party platforms or the content stored on them.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">4. Contacting Us About Privacy</h4>
                <p className="text-xs mt-1">
                  If you have questions or concerns about this policy, email us directly at <a href="mailto:support@outboxdownloader.com" className="text-blue-600 dark:text-blue-400 font-medium underline">support@outboxdownloader.com</a>.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Terms of Service
                </h3>
                <p className="text-xs text-slate-400 mt-1">Last Updated: November 2026</p>
              </div>

              <p>
                By accessing or downloading software from <strong className="text-slate-900 dark:text-white">outboxdownloader.com</strong>, you agree to comply with and be bound by the following terms and conditions.
              </p>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">1. Intended Use</h4>
                <p className="text-xs mt-1">
                  Outbox Downloader is a productivity tool intended for lawful personal and commercial downloading of files to which you have rightful access or authorization. You agree not to use this software in violation of applicable laws or third-party service terms.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">2. Disclaimer of Affiliation</h4>
                <p className="text-xs mt-1">
                  Outbox Downloader is an independent utility and is not affiliated, associated, authorized, endorsed by, or in any way officially connected with Dropbox, Inc. The name &ldquo;Dropbox&rdquo; as well as related names, marks, emblems, and images are registered trademarks of their respective owners.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">3. Warranty Disclaimer</h4>
                <p className="text-xs mt-1">
                  The software and website are provided &ldquo;as is&rdquo; without warranties of any kind, whether express or implied. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability arising from the use of the software.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">4. Contact Information</h4>
                <p className="text-xs mt-1">
                  For legal inquiries or questions concerning our terms, please contact <a href="mailto:support@outboxdownloader.com" className="text-blue-600 dark:text-blue-400 font-medium underline">support@outboxdownloader.com</a>.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Official Outbox Downloader Policy</span>
          </div>
          <button
            onClick={handleClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
