/**
 * Smooth scroll to element by ID
 */
export const scrollToElement = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

/**
 * Get the currently active section based on scroll position
 */
export const getActiveSection = (sectionIds: string[], threshold = 100): string => {
  const current = sectionIds.find(sectionId => {
    const element = document.getElementById(sectionId);
    if (element) {
      const rect = element.getBoundingClientRect();
      return rect.top <= threshold && rect.bottom >= threshold;
    }
    return false;
  });
  
  return current || '';
};