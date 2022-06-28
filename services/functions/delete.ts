import { dynamoDb, DeleteItemInput } from '../util/dynamodb';
import { env } from '../util/env';
import { handler } from '../util/handler';

export const main = handler(async (event) => {
  const params: DeleteItemInput = {
    TableName: env.TABLE_NAME,
    Key: {
      userId: '123',
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      noteId: event.pathParameters!.id!,
    },
  };

  await dynamoDb.delete(params);

  return { status: true };
});
