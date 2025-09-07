import { useEffect } from 'react';

export const Favicon = () => {
  useEffect(() => {
    const updateFavicon = () => {
      const isDark = document.documentElement.classList.contains('dark');
      
      // Find or create favicon link element
      let link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
      
      if (!link) {
        link = document.createElement('link');
        link.type = 'image/svg+xml';
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      
      // Update favicon based on theme
      link.href = isDark ? '/favicon-dark.svg' : '/favicon-light.svg';
    };

    // Initial update
    updateFavicon();
    
    // Watch for class changes on document element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          updateFavicon();
        }
      });
    });
    
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
};