import { Context } from 'aws-lambda';
import { ApiEvent, ApiHandler } from '../models/api-event';

export const handler = (
  lambda: (event: ApiEvent, context: Context) => Promise<any>,
): ApiHandler => {
  return async function (event: ApiEvent, context: Context) {
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
