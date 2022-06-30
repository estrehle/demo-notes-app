import {
  APIGatewayProxyEventV2WithRequestContext,
  APIGatewayEventRequestContextV2WithAuthorizer,
  APIGatewayProxyResultV2,
  Handler,
} from 'aws-lambda';

interface IamAuthorizer {
  iam: {
    cognitoIdentity: {
      identityId: string;
    };
  };
}

export type ApiEvent = APIGatewayProxyEventV2WithRequestContext<
  APIGatewayEventRequestContextV2WithAuthorizer<IamAuthorizer>
>;

export type ApiHandler<T = never> = Handler<
  ApiEvent,
  APIGatewayProxyResultV2<T>
>;
