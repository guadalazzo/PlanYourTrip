import React, { useEffect, useRef, useState } from 'react';
import { useViewportScreen } from '../../hooks/useViewportScreen';
interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

const Image: React.FC<ImageProps> = (props) => {
  const [inView, setInView] = useState(false);
  const placeholderRef = useRef<HTMLImageElement>(null);
  const { isMobile } = useViewportScreen();

  function onIntersection(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setInView(true);
      }
    });
  }

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection, {
      root: null,
      threshold: 0.5,
    });

    if (placeholderRef.current) {
      observer.observe(placeholderRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const getOptimizedSrc = (src: string) => {
    if (src) {
      // Example of Optimized width and height according to https://docs.imgix.com/apis/rendering/size/image-height
      // return isMobile ? `${src}&w=102&h=136` : `${src}&w=342&h=228`;

      // Optimized according to ratio https://docs.imgix.com/apis/rendering/size/aspect-ratio
      return isMobile ? `${src}&ar=3:4` : `${src}&ar=3:2`;
    }
    return '';
  };

  if (inView) {
    return (
      <img
        {...props}
        alt={props.alt || ''}
        src={getOptimizedSrc(props.src)}
        loading="lazy"
        className="rounded-l-lg sm:rounded-none sm:rounded-t-lg"
        onError={({ currentTarget }) => {
          // if image don't load, fallback to the placeholders.
          currentTarget.onerror = null;
          currentTarget.src = isMobile ? '/placeholder-mobile.png' : '/placeholder-desktop.png';
        }}
      />
    );
  }
  return (
    <img
      {...props}
      ref={placeholderRef}
      src={isMobile ? '/placeholder-mobile.png' : '/placeholder-desktop.png'}
      alt={props.alt || ''}
      className="rounded-l-lg sm:rounded-t-lg"
    />
  );
};

export default Image;
