import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { Resource } from 'sst';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async () => {
  await client.send(
    new PutCommand({
      TableName: Resource.AssetsManagementProjectTable.name,
      Item: {
        primaryKey: "ASSET#"
      },
    })
  );
};
