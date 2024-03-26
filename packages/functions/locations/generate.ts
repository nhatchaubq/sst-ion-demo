import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  BatchWriteCommand,
  DynamoDBDocumentClient,
  PutCommand,
} from '@aws-sdk/lib-dynamodb';
import { Resource } from 'sst';
import { locationsWithAssets } from '../../../db';
import { success } from 'core/helpers/lambda';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async () => {
  const result = [];
  const keys = Object.keys(locationsWithAssets);
  for await (const [index, key] of keys.entries()) {
    try {
      const assets = locationsWithAssets[key];
      const locationId = `LOCATION##${
        key === 'undefined' ? '000000' : (index + 1).toString().padStart(6, '0')
      }`;
      // await client.send(
      //   new PutCommand({
      //     TableName: Resource.AssetsManagementProjectTable.name,
      //     Item: {
      //       primaryKey: locationId,
      //       subKey: locationId,
      //       name: key,
      //     },
      //   })
      // );
      result.push({
        primaryKey: locationId,
        subKey: locationId,
        name: key,
      });

      const assetPutRequests = assets.map((asset) => {
        const { id, ...others } = asset as any;
        delete others.location;
        delete others.locationId;
        result.push({
          primaryKey: locationId,
          subKey: `ASSET##${id.toString().padStart(6, '0')}`,
          ...others,
        });
        return {
          PutRequest: {
            Item: {
              primaryKey: locationId,
              subKey: `ASSET##${id.toString().padStart(6, '0')}`,
              ...others,
            },
          },
        };
      });
      // await client.send(
      //   new BatchWriteCommand({
      //     RequestItems: {
      //       [Resource.AssetsManagementProjectTable.name]: assetPutRequests,
      //     },
      //   })
      // );
    } catch (e) {
      return e;
    }
  }
  return success();
};
