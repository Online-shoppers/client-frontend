import * as yup from 'yup';

export const signInSchema = yup.object({
  email: yup
    .string()
    .email('validation:Field-should-be-email')
    .required("validation:Field-shouldn't-be-empty"),
  password: yup.string().required("validation:Field-shouldn't-be-empty"),
});
