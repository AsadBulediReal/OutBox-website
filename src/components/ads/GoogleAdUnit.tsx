import React, { useEffect, useRef, useState } from 'react';

export type GoogleAdStatus = 'pending' | 'filled' | 'unfilled';

function isElementVisibleWithSize(el: Element | null): boolean {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  if (rect.width <= 10 || rect.height <= 10) return false;
  const style = window.getComputedStyle(el);
  return style.display !== 'none' && style.visibility !== 'hidden';
}

export function useGoogleAdStatus(clientId: string) {
  const insRef = useRef<HTMLModElement | null>(null);
  const [status, setStatus] = useState<GoogleAdStatus>('pending');

  useEffect(() => {
    setStatus('pending');
    if (!clientId) return;

    const ins = insRef.current;
    if (!ins) return;

    let resizeObserver: ResizeObserver | null = null;
    let observedIframe: Element | null = null;

    const evaluateAdState = () => {
      const attrStatus = ins.getAttribute('data-ad-status');
      if (attrStatus === 'unfilled') {
        setStatus('unfilled');
        return;
      }

      const iframe = ins.querySelector('iframe');
      if (iframe && iframe !== observedIframe && resizeObserver) {
        if (observedIframe) resizeObserver.unobserve(observedIframe);
        resizeObserver.observe(iframe);
        observedIframe = iframe;
      }

      if (attrStatus === 'filled') {
        if (isElementVisibleWithSize(iframe)) {
          setStatus('filled');
          return;
        }
        // Fallback if Google rendered non-iframe creative inside <ins>
        const hasVisibleChild = Array.from(ins.children).some((child) =>
          isElementVisibleWithSize(child)
        );
        if (hasVisibleChild) {
          setStatus('filled');
          return;
        }
      }

      setStatus('pending');
    };

    const mutationObserver = new MutationObserver(() => {
      evaluateAdState();
    });

    mutationObserver.observe(ins, {
      attributes: true,
      attributeFilter: ['data-ad-status', 'style', 'class'],
      childList: true,
      subtree: true,
    });

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        evaluateAdState();
      });
      resizeObserver.observe(ins);
    }

    if (!ins.dataset.adPushed) {
      ins.dataset.adPushed = 'true';
      try {
        type WindowWithAds = typeof window & { adsbygoogle?: Array<Record<string, unknown>> };
        const win = window as WindowWithAds;
        win.adsbygoogle = win.adsbygoogle || [];
        win.adsbygoogle.push({});
      } catch {
        // Ignore AdSense push errors (e.g., ad blocker or script not ready)
      }
    }

    evaluateAdState();

    return () => {
      mutationObserver.disconnect();
      resizeObserver?.disconnect();
    };
  }, [clientId]);

  return { insRef, status };
}

interface GoogleAdUnitProps {
  clientId: string;
  insRef: React.RefObject<HTMLModElement | null>;
  style?: React.CSSProperties;
  format?: string;
  fullWidthResponsive?: boolean;
}

export const GoogleAdUnit: React.FC<GoogleAdUnitProps> = ({
  clientId,
  insRef,
  style,
  format = 'auto',
  fullWidthResponsive = true,
}) => (
  <ins
    key={clientId}
    ref={insRef}
    className="adsbygoogle"
    style={style}
    data-ad-client={clientId}
    data-ad-slot="auto"
    data-ad-format={format}
    data-full-width-responsive={fullWidthResponsive ? 'true' : undefined}
  />
);
