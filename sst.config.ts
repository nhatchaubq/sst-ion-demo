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
    // Cognito
    // const userPool = new aws.cognito.UserPool("AssetsManagementUserPool", {

    // });
    // const userPoolClient = new aws.cognito.UserPoolClient("AssetsManagementUserPoolClient", {
    //   userPoolId: userPool.id
    // });
    // const indentityPool = new aws.cognito.IdentityPool('AssetsManagementIndentityPool', {
    //   identityPoolName: 'AssetsManagementIndentityPool',
    // })
    // const identityPoolRoleAttachment = new aws.cognito.IdentityPoolRoleAttachment('AssetsManagementIdentityPoolRoleAttachment')

    // DynamoDB
    const table = new sst.aws.Dynamo('AssetsManagementProjectTable', {
      fields: {
        primaryKey: 'string',
        subKey: 'string',
        dataType: 'string',
      },
      primaryIndex: { hashKey: 'primaryKey', rangeKey: 'subKey' },
      globalIndexes: {
        DataTypeIndex: { hashKey: 'dataType', rangeKey: 'subKey' },
      },
    });

    // API Gateway V2
    const api = new sst.aws.ApiGatewayV2('PublicApi')
      /////// ASSETS APIs ///////
      .route('GET /assets', 'packages/functions/assets/getAll.handler')
      .route(
        'GET /assets/{assetId}',
        'packages/functions/assets/getById.handler'
      )
      .route('GET /assets/getByLocationId/{locationId}', {
        handler: 'packages/functions/assets/getByLocationId.handler',
        link: [table],
      })

      /////// LOCATIONS APIs ///////
      .route('get /locations', {
        handler: 'packages/functions/locations/getAll.handler',
        link: [table],
      })
      .route('POST /locations', {
        handler: 'packages/functions/locations/generate.handler',
        link: [table],
      });

    // Static Site
    new sst.aws.StaticSite('AssetsManagementWeb', {
      path: 'packages/web',
      build: {
        command: 'bun run build',
        output: 'packages/web/dist',
      },
      environment: {
        VITE_API_URL: api.url,
      },
    });
  },
});
