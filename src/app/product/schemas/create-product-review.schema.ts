import * as yup from 'yup';

export const createProductReviewSchema = yup.object({
  text: yup.string().required().max(1000),
  rating: yup.number().integer().moreThan(0).lessThan(6).required(),
});
