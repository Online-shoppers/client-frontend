import * as yup from 'yup';

export const resetPasswordSchema = yup.object({
  email: yup
    .string()
    .email('validation:Field-should-be-email')
    .required("validation:Field-shouldn't-be-empty"),
});
