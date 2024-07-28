import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useViewportScreen } from '../../hooks/useViewportScreen';
interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

const Image: React.FC<ImageProps> = (props) => {
  const [inView, setInView] = useState(false);
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

  const getWidth = useCallback(() => {
    return isMobile ? '102' : '360';
  }, [isMobile]);

  const getHeight = useCallback(() => {
    return isMobile ? '136' : '228';
  }, [isMobile]);

  const handleError = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
      const currentTarget = event.currentTarget;

      // if image don't load, fallback to the placeholders.
      currentTarget.onerror = null;
      currentTarget.src = isMobile ? '/placeholder-mobile.png' : '/placeholder-desktop.png';
    },
    [isMobile],
  );

  if (inView) {
    return (
      <picture>
        <source media="(min-width: 640px)" srcSet={`${props.src}&ar=3:2&w=360`} sizes="(min-width: 640px) 102px" />
        <source media="(max-width: 639px)" srcSet={`${props.src}&ar=3:4&w=102`} />
        <img
          {...props}
          alt={props.alt || ''}
          loading="lazy"
          src={getOptimizedSrc(props.src)}
          width={getWidth()}
          height={getHeight()}
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
      width={getWidth()}
      height={getHeight()}
      src={isMobile ? '/placeholder-mobile.png' : '/placeholder-desktop.png'}
      alt={props.alt || ''}
      className="rounded-l-lg sm:rounded-t-lg"
      onError={handleError}
    />
  );
};

export default Image;
