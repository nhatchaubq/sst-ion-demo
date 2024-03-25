/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'assets-management',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
    };
  },
  async run() {
    const table = new sst.aws.Dynamo('AssetsManagementProjectTable', {
      fields: {
        primaryKey: 'string',
        subKey: 'string',
      },
      primaryIndex: { hashKey: 'primaryKey', rangeKey: 'subKey' },
    });

    new sst.aws.ApiGatewayV2('PublicApi')
      .route('GET /assets', 'packages/functions/assets/getAll.handler')
      .route(
        'GET /assets/{assetId}',
        'packages/functions/assets/getById.handler'
      )
      .route(
        'POST /assets',
        {
          architecture: 'arm64',
          handler: 'packages/functions/assets/insertAll.handler',
          link: [table]
        }
      );
  },
});
