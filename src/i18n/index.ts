import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

import authEn from './locales/en/auth.json';
import cartEn from './locales/en/cart.json';
import categoriesEn from './locales/en/categories.json';
import commonEn from './locales/en/common.json';
import errorsEn from './locales/en/errors.json';
import homeEn from './locales/en/home.json';
import orderEn from './locales/en/order.json';
import reviewsEn from './locales/en/reviews.json';
import sortingsEn from './locales/en/sortings.json';
import validationEn from './locales/en/validation.json';
import authRu from './locales/ru/auth.json';
import cartRu from './locales/ru/cart.json';
import categoriesRu from './locales/ru/categories.json';
import commonRu from './locales/ru/common.json';
import errorsRu from './locales/ru/errors.json';
import homeRu from './locales/ru/home.json';
import orderRu from './locales/ru/order.json';
import reviewsRu from './locales/ru/reviews.json';
import sortingsRu from './locales/ru/sortings.json';
import validationRu from './locales/ru/validation.json';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    load: 'all',
    debug: true,
    keySeparator: '.',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        auth: authEn,
        cart: cartEn,
        categories: categoriesEn,
        common: commonEn,
        errors: errorsEn,
        home: homeEn,
        order: orderEn,
        reviews: reviewsEn,
        sortings: sortingsEn,
        validation: validationEn,
      },
      ru: {
        auth: authRu,
        cart: cartRu,
        categories: categoriesRu,
        common: commonRu,
        errors: errorsRu,
        home: homeRu,
        order: orderRu,
        reviews: reviewsRu,
        sortings: sortingsRu,
        validation: validationRu,
      },
    },
    detection: {
      caches: ['cookie'],
    },
  });

export default i18n;
