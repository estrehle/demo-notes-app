import { Api, StackContext, use } from '@serverless-stack/resources';
import { env } from '../util/env';
import { StorageStack } from './StorageStack';

export function ApiStack({ stack }: StackContext) {
  const { table } = use(StorageStack);

  const api = new Api(stack, 'Api', {
    defaults: {
      authorizer: 'iam',
      function: {
        permissions: [table],
        environment: {
          STRIPE_SECRET_KEY: env.STRIPE_SECRET_KEY,
          TABLE_NAME: table.tableName,
        },
      },
    },
    routes: {
      'POST /billing': 'functions/billing.main',
      'GET /notes': 'functions/list.main',
      'POST /notes': 'functions/create.main',
      'DELETE /notes/{id}': 'functions/delete.main',
      'GET /notes/{id}': 'functions/get.main',
      'PUT /notes/{id}': 'functions/replace.main',
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return { api };
}
