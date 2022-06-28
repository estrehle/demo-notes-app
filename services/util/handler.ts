import {
  APIGatewayProxyEventV2,
  APIGatewayProxyHandlerV2,
  APIGatewayProxyResultV2,
  Context,
} from 'aws-lambda';

export const handler = (
  lambda: (event: APIGatewayProxyEventV2, context: Context) => Promise<any>,
): APIGatewayProxyHandlerV2 => {
  return async function (
    event: APIGatewayProxyEventV2,
    context: Context,
  ): Promise<APIGatewayProxyResultV2> {
    let body: any;
    let statusCode: number;

    try {
      body = await lambda(event, context);
      statusCode = 200;
    } catch (e: any) {
      console.error(e);
      body = { error: e.message };
      statusCode = 500;
    }

    return {
      statusCode,
      body: JSON.stringify(body),
    };
  };
};
