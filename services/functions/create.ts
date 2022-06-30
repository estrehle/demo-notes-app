import { v1 as uuidV1 } from 'uuid';
import { CreateNoteReqDto } from '../models/create-note.req.dto';
import { dynamoDb, PutItemInput } from '../util/dynamodb';
import { env } from '../util/env';
import { handler } from '../util/handler';

export const main = handler(async (event) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const body = event.body;
  if (body === undefined) throw new Error('missing body');
  const data = JSON.parse(body) as CreateNoteReqDto;

  const params: PutItemInput = {
    TableName: env.TABLE_NAME,
    Item: {
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
      noteId: uuidV1(),
      attachment: data.attachment ?? null,
      content: data.content ?? null,
      createdAt: Date.now(),
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
