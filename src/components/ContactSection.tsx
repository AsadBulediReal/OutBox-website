import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  HelpCircle, 
  ExternalLink,
  Copy,
  Check,
  AlertCircle
} from 'lucide-react';

interface ContactFormData {
  fullName: string;
  email: string;
  topic: string;
  subject: string;
  message: string;
}

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    topic: 'Support & Troubleshooting',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [ticketId, setTicketId] = useState<string>('');

  const handleCopyEmail = (emailStr: string) => {
    navigator.clipboard.writeText(emailStr);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Basic Validation
    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      setErrorMessage('Please provide a valid email address so we can reply.');
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 15) {
      setErrorMessage('Please include a detailed message (minimum 15 characters).');
      return;
    }

    setStatus('submitting');

    // Simulate async submission with realistic feedback
    setTimeout(() => {
      const generatedTicket = 'OBX-' + Math.floor(100000 + Math.random() * 900000);
      setTicketId(generatedTicket);
      setStatus('success');
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      topic: 'Support & Troubleshooting',
      subject: '',
      message: ''
    });
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden scroll-mt-20">
      {/* Background decorations */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/20">
            Get In Touch
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Contact Support & Engineering
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Have questions regarding Outbox Downloader, experiencing an issue with a shared link, or inquiring about advertising and partnerships? We typically respond within 24–48 business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Info & Communication Guidelines */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Direct Contact Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-lg space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Direct Email Support
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Official communication channel
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    General & Technical Inquiries
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white font-mono truncate">
                    support@outboxdownloader.com
                  </div>
                </div>
                <button
                  onClick={() => handleCopyEmail('support@outboxdownloader.com')}
                  className="p-2 rounded-xl text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition cursor-pointer shrink-0"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Response Time Info */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white font-semibold">Response Time: </strong>
                    All inquiries are monitored Monday through Friday. Standard response turnaround is 24 to 48 hours.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white font-semibold">Security & Bug Bounties: </strong>
                    Responsible disclosures and integrity reports are prioritized immediately by our engineering team.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white font-semibold">Self-Service: </strong>
                    Check our <a href="#faq" className="text-blue-600 dark:text-blue-400 underline font-medium">FAQ section</a> for quick answers on password-protected folders and speed optimization.
                  </div>
                </div>
              </div>
            </div>

            {/* AdSense & Legal Transparency Note */}
            <div className="p-6 rounded-3xl bg-blue-50/70 dark:bg-slate-900/40 border border-blue-200/60 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2">
              <div className="font-bold text-slate-900 dark:text-slate-200">
                Official Publisher Transparency
              </div>
              <p className="leading-relaxed">
                Outbox Downloader is operated via <span className="font-semibold text-blue-600 dark:text-blue-400">outboxdownloader.com</span>. For advertising, sponsorship inquiries, or DMCA communications, please select the appropriate topic in the form.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl">
              {status === 'success' ? (
                <div className="py-12 px-4 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                      Message Sent Successfully!
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                      Thank you for contacting Outbox Downloader. Your ticket reference is{' '}
                      <span className="font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-500/20">
                        {ticketId}
                      </span>
                      . A member of our support team will get back to you at{' '}
                      <span className="font-semibold text-slate-900 dark:text-white">{formData.email}</span>.
                    </p>
                  </div>
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition cursor-pointer"
                    >
                      Send Another Message
                    </button>
                    <a
                      href={`mailto:support@outboxdownloader.com?subject=Ticket ${ticketId}: ${encodeURIComponent(formData.subject || 'Follow-up')}`}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                    >
                      <span>Open in Email App</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                    <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-base font-bold text-slate-900 dark:text-white">
                      Send a Direct Message
                    </span>
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Topic Dropdown */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Inquiry Topic <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition cursor-pointer"
                      >
                        <option value="Support & Troubleshooting">Support & Troubleshooting</option>
                        <option value="Bug Report or Download Error">Bug Report or Download Error</option>
                        <option value="Feature Request">Feature Request</option>
                        <option value="AdSense & Advertising Inquiry">AdSense & Advertising Inquiry</option>
                        <option value="Partnership & Press">Partnership & Press</option>
                        <option value="General Question">General Question</option>
                      </select>
                    </div>

                    {/* Subject Line */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Subject Line
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Brief summary of your inquiry"
                        className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
                      />
                    </div>
                  </div>

                  {/* Message Body */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please provide details about your issue, OS version, or question..."
                      className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      We respect your privacy. No marketing spam.
                    </span>
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 shadow-md shadow-blue-500/25 transition cursor-pointer"
                    >
                      {status === 'submitting' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
