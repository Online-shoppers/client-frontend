import * as yup from 'yup';

export const newPasswordSchema = yup.object({
  password: yup.string().required(),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], "validation:Passwords-don't-match")
    .required("validation:Field-shouldn't-be-empty"),
});
