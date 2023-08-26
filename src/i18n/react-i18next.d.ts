import 'react-i18next';

import auth from './locales/en/auth.json';
import cart from './locales/en/cart.json';
import common from './locales/en/common.json';
import order from './locales/en/order.json';
import review from './locales/en/review.json';
import validation from './locales/en/validation.json';

declare module 'react-i18next' {
  interface Resources {
    auth: typeof auth;
    cart: typeof cart;
    common: typeof common;
    order: typeof order;
    review: typeof review;
    validation: typeof validation;
  }
}
