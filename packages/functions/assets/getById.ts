import type { Handler } from 'aws-lambda';
import { optional } from 'core/helpers/optional';
import { assets } from '../../../db';

export const handler: Handler = (event) => {
  return optional(
    assets.find((asset) => asset.id === Number(event.pathParameters.assetId))
  ).when({
    hasValue: (value) => value,
    hasNoValue: {
      error: true,
      message: 'Not found',
    },
  }) as any;
};
