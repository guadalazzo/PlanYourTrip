import { useEffect, useState } from 'react';

interface ScreenType {
  isMobile: boolean;
}
/**
 * Custom hook to retrieve isMobile viewport
 */
export const useViewportScreen = (): ScreenType => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      // On unmount
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 640;

  return { isMobile };
};
