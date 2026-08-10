/**
 * Umami Analytics Helper Functions
 * Safely triggers custom Umami events if Umami tracking is active.
 */

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, any>) => void;
    };
  }
}

export function trackUmamiEvent(eventName: string, eventData?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.umami) {
    try {
      window.umami.track(eventName, eventData);
    } catch (e) {
      console.warn('Umami event tracking error:', e);
    }
  }
}
