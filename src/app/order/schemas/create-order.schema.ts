import * as yup from 'yup';

export const createOrderSchema = yup.object({
  city: yup.string().trim().required('validation:No-city'),
  phone: yup.string().trim().required('validation:No-phone-number'),
  address: yup.string().trim().required('validation:No-address'),
  country: yup.string().trim().required('validation:No-country'),
  zipCode: yup.string().trim().required('validation:No-zip-code'),
  lastName: yup.string().trim().required('validation:No-last-name'),
  firstName: yup.string().trim().required('validation:No-first-name'),
  buyerId: yup.string().uuid().trim().required('validation:No-first-name'),
});
