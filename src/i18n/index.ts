import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import authEn from './locales/en/auth.json';
import cartEn from './locales/en/cart.json';
import commonEn from './locales/en/common.json';
import orderEn from './locales/en/order.json';
import reviewEn from './locales/en/review.json';
import authRu from './locales/ru/auth.json';
import cartRu from './locales/ru/cart.json';
import commonRu from './locales/ru/common.json';
import orderRu from './locales/ru/order.json';
import reviewRu from './locales/ru/review.json';

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
        common: commonEn,
        order: orderEn,
        cart: cartEn,
        review: reviewEn,
        auth: authEn,
      },
      ru: {
        common: commonRu,
        order: orderRu,
        cart: cartRu,
        review: reviewRu,
        auth: authRu,
      },
    },
    detection: {
      caches: ['cookie'],
    },
  });

export default i18n;
