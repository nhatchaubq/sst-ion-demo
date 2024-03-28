import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { error, success } from 'core/helpers/lambda';
import { Resource } from 'sst';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async () => {
  try {
    const result = await client.send(
      new QueryCommand({
        TableName: Resource.AssetsManagementProjectTable.name,
        IndexName: 'DataTypeIndex',
        KeyConditionExpression: 'dataType = :dataType',
        ExpressionAttributeValues: {
          ':dataType': 'location',
        },
      })
    );
    return success(
      result.Items?.map(({ primaryKey: id, name }) => ({ id, name })) || [],
      {
        count: result.Count,
      }
    );
  } catch (e) {
    return error('Could not get data.');
  }
};
