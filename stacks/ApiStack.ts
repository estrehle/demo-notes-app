import { Api, StackContext, use } from '@serverless-stack/resources';
import { StorageStack } from './StorageStack';

export function ApiStack({ stack }: StackContext) {
  const { table } = use(StorageStack);

  const api = new Api(stack, 'Api', {
    defaults: {
      function: {
        permissions: [table],
        environment: {
          TABLE_NAME: table.tableName,
        },
      },
    },
    routes: {
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
