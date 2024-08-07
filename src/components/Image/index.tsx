import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useViewportScreen } from '../../hooks/useViewportScreen';
interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

const Image: React.FC<ImageProps> = (props) => {
  const [inView, setInView] = useState(false);
  const [imageError, setImageError] = useState(false);
  const placeholderRef = useRef<HTMLImageElement>(null);
  const { isMobile } = useViewportScreen();

  const onIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setInView(true);
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection, {
      root: null,
      threshold: 0.5,
    });
    const currentRef = placeholderRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      // Disconnect the observer on unmount
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, []);

  const getOptimizedSrc = useCallback(
    (src: string) => {
      if (src) {
        // Example of Optimized width and height according to https://docs.imgix.com/apis/rendering/size/image-height
        // return isMobile ? `${src}&w=102&h=136` : `${src}&w=360&h=228`;

        // Optimized according to ratio https://docs.imgix.com/apis/rendering/size/aspect-ratio
        return isMobile ? `${src}&ar=3:4&w=102` : `${src}&ar=3:&w=360`;
      }
      return '';
    },
    [isMobile],
  );

  const width = isMobile ? 102 : 360; // Preset image Width
  const height = isMobile ? 136 : 228; // Preset image Height
  const fallbackSrc = isMobile ? '/placeholder-mobile.png' : '/placeholder-desktop.png';

  const handleError = () => {
    setImageError(true);
  };

  if (inView && !imageError) {
    // if Image don't load correctly, do fallback
    return (
      <picture>
        <source media="(min-width: 640px)" srcSet={getOptimizedSrc(props.src)} />
        <source media="(max-width: 639px)" srcSet={getOptimizedSrc(props.src)} />
        <img
          {...props}
          alt={props.alt || ''}
          loading="lazy"
          src={getOptimizedSrc(props.src)}
          width={width}
          height={height}
          className={`rounded-l-lg sm:rounded-none sm:rounded-t-lg object-cover max-w-cardmob sm:max-w-none max-h-cardmob sm:max-h-carddesk sm:w-full`}
          onError={handleError}
        />
      </picture>
    );
  }
  return (
    <img
      {...props}
      ref={placeholderRef}
      width={width}
      height={height}
      src={fallbackSrc}
      alt={props.alt || ''}
      className="rounded-l-lg sm:rounded-t-lg"
      onError={handleError}
    />
  );
};

export default Image;
