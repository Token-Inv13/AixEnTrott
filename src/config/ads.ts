export const ADSENSE_CLIENT_ID = 'ca-pub-5209828957209966';

export const ADSENSE_TEST_MODE = import.meta.env.VITE_ADSENSE_TEST_MODE === 'true';

export const ADSENSE_SLOTS = {
  homeBanner: import.meta.env.VITE_ADSENSE_SLOT_HOME ?? '',
  sortiesBanner: import.meta.env.VITE_ADSENSE_SLOT_SORTIES ?? '',
  sortieDetailBanner: import.meta.env.VITE_ADSENSE_SLOT_SORTIE_DETAIL ?? '',
  carteSidebarBanner: import.meta.env.VITE_ADSENSE_SLOT_CARTE ?? '',
  rechargeBanner: import.meta.env.VITE_ADSENSE_SLOT_RECHARGE ?? '',
} as const;
