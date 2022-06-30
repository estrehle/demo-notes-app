import { UpdateNoteReqDto } from '../models/replace-note.req.dto';
import { dynamoDb, UpdateItemInput } from '../util/dynamodb';
import { env } from '../../util/env';
import { handler } from '../util/handler';

export const main = handler(async (event) => {
  const body = event.body;
  if (body === undefined) throw new Error('missing body');
  const data = JSON.parse(body) as UpdateNoteReqDto;

  const params: UpdateItemInput = {
    TableName: env.TABLE_NAME,
    Key: {
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      noteId: event.pathParameters!.id!,
    },
    UpdateExpression: 'SET content = :content, attachment = :attachment',
    ExpressionAttributeValues: {
      ':attachment': data.attachment ?? null,
      ':content': data.content ?? null,
    },
    ReturnValues: 'ALL_NEW',
  };

  await dynamoDb.update(params);

  return { status: true };
});
