import { error } from 'core/helpers/lambda';
import type { LambdaHandler } from 'core/types/lambda';
import { ZodError, z } from 'zod';
import { assets } from '../../../db';
import { optional } from 'core/helpers/optional';

const PathParamsSchema = z.object({
  assetId: z.coerce.number(),
});

type PathParams = z.infer<typeof PathParamsSchema>;

export const handler: LambdaHandler<PathParams, undefined> = (event) => {
  try {
    const { assetId } = PathParamsSchema.parse(event.pathParameters);
    return optional(assets.find((asset) => asset.id === assetId)).when({
      hasValue: (value) => value,
      hasNoValue: error('Not found!'),
    });
  } catch (e) {
    if (e instanceof ZodError) {
      return error(e.issues[0].message);
    }
  }
};
