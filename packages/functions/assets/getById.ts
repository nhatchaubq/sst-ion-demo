import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { error, success } from 'core/helpers/lambda';
import type { LambdaHandler } from 'core/types';
import { ZodError, z } from 'zod';

const PathParamsSchema = z.object({
  assetId: z.coerce.number(),
});

type PathParams = z.infer<typeof PathParamsSchema>;

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler: LambdaHandler<PathParams, undefined> = async (event) => {
  try {
    const { assetId } = PathParamsSchema.parse(event.pathParameters);
    // const result = await client.send(new GetCommand({
    //   TableName: Resource.AssetsManagementProjectTable.name,
    //   Key: {
    //     primaryKey: assetId,
    //     subKey:
    //   }
    // }))
    return success(event);
  } catch (e) {
    if (e instanceof ZodError) {
      return error(e.issues[0].message);
    }
    return error('Some errors happened.')
  }
};
