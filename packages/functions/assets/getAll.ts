import { optional } from 'core/helpers/optional';
import { assets } from '../../../db';

export const handler = () => {
  return optional(assets).when({
    hasValue: (value) => value,
    hasNoValue: {
      error: true,
      message: 'Not found',
    },
  });
};