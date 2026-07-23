export const GOOGLE_ADS_ID = 'AW-18342709035';
export const PHONE_CONVERSION_LABEL = '-WvyCKnkk9UcEKuOvqpE';

declare global {
  interface Window {
    gtag: (
      command: 'event' | 'js' | 'config',
      ...args: unknown[]
    ) => void;
  }
}
