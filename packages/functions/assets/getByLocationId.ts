import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { error, success } from 'core/helpers/lambda';
import type { LambdaHandler } from 'core/types';
import { Resource } from 'sst';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler: LambdaHandler<{ locationId: string }, undefined> = async (
  event
) => {
  try {
    const result = await client.send(
      new QueryCommand({
        TableName: Resource.AssetsManagementProjectTable.name,
        KeyConditionExpression:
          'primaryKey = :primaryKey AND begins_with(subKey, :subKey)',
        ExpressionAttributeValues: {
          ':primaryKey': event.pathParameters.locationId,
          ':subKey': 'ASSET##',
        },
      })
    );
    return success(result.Items, { count: result.Count });
  } catch (e) {
    return error(JSON.stringify(e));
  }
};
