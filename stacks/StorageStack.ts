import { Bucket, StackContext, Table } from '@serverless-stack/resources';

export function StorageStack({ stack }: StackContext) {
  const bucket = new Bucket(stack, 'Uploads', {
    cors: [
      {
        allowedHeaders: ['*'],
        allowedMethods: ['DELETE', 'GET', 'HEAD', 'POST', 'PUT'],
        allowedOrigins: ['*'],
        maxAge: '1 day',
      },
    ],
  });

  const table = new Table(stack, 'Notes', {
    fields: {
      userId: 'string',
      noteId: 'string',
    },
    primaryIndex: { partitionKey: 'userId', sortKey: 'noteId' },
  });

  return { bucket, table };
}
