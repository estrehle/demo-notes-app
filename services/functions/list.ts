import { dynamoDb, QueryInput } from '../util/dynamodb';
import { env } from '../util/env';
import { handler } from '../util/handler';

export const main = handler(async () => {
  const params: QueryInput = {
    TableName: env.TABLE_NAME,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': '123',
    },
  };

  const result = await dynamoDb.query(params);

  return result.Items;
});
