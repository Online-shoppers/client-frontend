import * as yup from 'yup';

import i18n from 'i18n';

export const signInSchema = yup.object({
  email: yup
    .string()
    .email(i18n.t('validation:Field-should-be-email'))
    .required(i18n.t("validation:Field-shouldn't-be-empty")),
  password: yup.string().required(i18n.t("validation:Field-shouldn't-be-empty")),
});
