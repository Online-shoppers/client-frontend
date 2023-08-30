import * as yup from 'yup';

import i18n from 'i18n';

export const signUpSchema = yup.object({
  firstName: yup.string().required(i18n.t("validation:Field-shouldn't-be-empty")),
  lastName: yup.string().required(i18n.t("validation:Field-shouldn't-be-empty")),
  email: yup
    .string()
    .email(i18n.t('validation:Field-should-be-email'))
    .required(i18n.t("validation:Field-shouldn't-be-empty")),

  password: yup.string().required(i18n.t("validation:Field-shouldn't-be-empty")),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], i18n.t("validation:Passwords-don't-match"))
    .required(i18n.t("validation:Field-shouldn't-be-empty")),
});
