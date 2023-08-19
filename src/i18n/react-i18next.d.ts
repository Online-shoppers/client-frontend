import 'react-i18next';

import cart from './locales/en/cart';
import common from './locales/en/common.json';
import order from './locales/en/order';
import review from './locales/en/review';

declare module 'react-i18next' {
  interface Resources {
    cart: typeof cart;
    common: typeof common;
    order: typeof order;
    review: typeof review;
  }
}
