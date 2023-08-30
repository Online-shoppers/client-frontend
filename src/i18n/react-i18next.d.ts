import 'react-i18next';

import auth from './locales/en/auth.json';
import cart from './locales/en/cart.json';
import categories from './locales/en/categories.json';
import common from './locales/en/common.json';
import errors from './locales/en/errors.json';
import home from './locales/en/home.json';
import order from './locales/en/order.json';
import reviews from './locales/en/reviews.json';
import sortings from './locales/en/sortings.json';
import validation from './locales/en/validation.json';

declare module 'react-i18next' {
  interface Resources {
    auth: typeof auth;
    cart: typeof cart;
    categories: typeof categories;
    common: typeof common;
    errors: typeof errors;
    home: typeof home;
    order: typeof order;
    reviews: typeof reviews;
    sortings: typeof sortings;
    validation: typeof validation;
  }
}
