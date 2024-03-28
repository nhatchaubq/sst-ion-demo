export type ApiResponse<T> =
  (| {
      isError: true;
      message: string;
    }
  | { isError: false; message?: string; data?: T }) & {[key: string]: any};

type RequestContext = {
  requestId: string;
  routeKey: string;
  stage: string;
  time: string;
  timeEpoch: string;
};

type LambdaEvent<TPathParams, TQueryStringParams> = {
  routeKey: string;
  rawQueryString: string;
  requestContext: RequestContext;
  pathParameters: TPathParams;
  queryStringParameters: TQueryStringParams;
  isBase64Encoded: boolean;
};

export type LambdaHandler<TPathParams, TQueryStringParams> = (
  event: LambdaEvent<TPathParams, TQueryStringParams>,
  context: any
) => ApiResponse<unknown> | Promise<ApiResponse<unknown>>;

export type Location = {
  id: string;
  name: string;
  assets: Asset[];
};

export type Asset = {
  id: string;
  name: string;
  description: string;
  status:
    | 'Active'
    | 'Needs Maintenance'
    | 'In Repair'
    | 'Needs Replacement'
    | 'Needs Upgrade'
    | 'Needs Calibration';
} & (
  | {
      type: 'License';
      version: string;
      licenseKey: string;
      assignedTo: string;
      renewalDate: string;
    }
  | {
      type:
        | 'Computer'
        | 'Office Supplies'
        | 'Networking'
        | 'Hardware'
        | 'Power Supply'
        | 'Safety Equipment'
        | 'Furniture'
        | 'Office Equipment'
        | 'AV Equipment'
        | 'Mobile Device'
        | 'Security Equipment'
        | 'Storage Device'
        | 'Storage Media'
        | 'Computer Hardware'
        | 'Telecommunications'
        | 'Consumables'
        | 'Test Equipment';
      model: string;
      serialNumber: string;
      purchaseDate: string;
      warranty: {
        startDate: string;
        endDate: string;
      };
    }
);
