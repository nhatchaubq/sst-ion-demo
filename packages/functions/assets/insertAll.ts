/// ref

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  BatchWriteCommand,
  DynamoDBDocumentClient
} from '@aws-sdk/lib-dynamodb';
import { chunkArray } from 'core/helpers/array';
import { success } from 'core/helpers/lambda';
import { Resource } from 'sst';
import { assets } from '../../../db';
import type { LambdaHandler } from 'core/types';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler: LambdaHandler<undefined, undefined> = async () => {
  const chunkAssets = chunkArray(assets, 15);
  for (const chunk of chunkAssets) {
    const putRequests = chunk.map(({ id, ...others }) => ({
      PutRequest: {
        Item: {
          primaryKey: `ASSET#${id}`,
          subKey: `ASSET#${id}`,
          ...others,
        },
      },
    }));
    client.send(
      new BatchWriteCommand({
        RequestItems: {
          [Resource.AssetsManagementProjectTable.name]: putRequests,
        },
      })
    );
  }
  return success();
};
