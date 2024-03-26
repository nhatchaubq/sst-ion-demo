type RequestContext = {
  requestId: string;
  routeKey: string;
  stage: string;
  time: string;
  timeEpoch: string;
};

class LambdaEvent<TPathParams, TQueryStringParams> {
  routeKey: string;
  rawQueryString: string;
  requestContext: RequestContext;
  pathParameters: TPathParams;
  queryStringParameters: TQueryStringParams;
  isBase64Encoded: boolean;

  constructor(
    routeKey: string,
    rawQueryString: string,
    requestContext: RequestContext,
    pathParameters: TPathParams,
    queryStringParameters: TQueryStringParams,
    isBase64Encoded: boolean
  ) {
    this.routeKey = routeKey;
    this.rawQueryString = rawQueryString;
    this.requestContext = requestContext;
    this.pathParameters = pathParameters;
    this.queryStringParameters = queryStringParameters;
    this.isBase64Encoded = isBase64Encoded;
  }
}

export type LambdaHandler<TPathParams, TQueryStringParams> = (event: LambdaEvent<TPathParams, TQueryStringParams>, context: any) => unknown