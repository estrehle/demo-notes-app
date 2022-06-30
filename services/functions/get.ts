import { dynamoDb, GetItemInput } from '../util/dynamodb';
import { env } from '../util/env';
import { handler } from '../util/handler';

export const main = handler(async (event) => {
  const params: GetItemInput = {
    TableName: env.TABLE_NAME,
    Key: {
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      noteId: event.pathParameters!.id!,
    },
  };

  const result = await dynamoDb.get(params);
  if (result.Item === undefined) throw new Error('item not found');
  return result.Item;
});
