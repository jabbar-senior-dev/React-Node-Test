import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

type ImageStatus = 'loading' | 'loaded' | 'error';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}

export function ImageWithFallback({
  src,
  alt,
  className,
  eager = false,
}: ImageWithFallbackProps) {
  const [status, setStatus] = useState<ImageStatus>('loading');

  // Callback ref to detect cached images immediately
  const imgRef = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalHeight > 0) {
      setStatus('loaded');
    }
  }, []);

  const isLoading = status === 'loading';
  const hasError = status === 'error';

  return (
    <>
      {/* Placeholder with shimmer effect */}
      {(isLoading || hasError) && (
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200',
            isLoading && 'animate-pulse',
            className
          )}
        />
      )}
      {/* Actual image */}
      {!hasError && (
        <img
          key={src}
          ref={imgRef}
          src={src}
          alt={alt}
          className={cn(
            'transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100',
            className
          )}
          onError={() => setStatus('error')}
          onLoad={() => setStatus('loaded')}
          loading={eager ? 'eager' : 'lazy'}
        />
      )}
    </>
  );
}

