import { dynamoDb, QueryInput } from '../util/dynamodb';
import { env } from '../util/env';
import { handler } from '../util/handler';

export const main = handler(async (event) => {
  const params: QueryInput = {
    TableName: env.TABLE_NAME,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': event.requestContext.authorizer.iam.cognitoIdentity.identityId,
    },
  };

  const result = await dynamoDb.query(params);

  return result.Items;
});
