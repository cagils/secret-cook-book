import { useEffect } from 'react';

export const useEscape = (onEscape) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onEscape();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onEscape]);
};
