import { DynamoDB as _DynamoDB } from 'aws-sdk';

export type DeleteItemInput = _DynamoDB.DocumentClient.DeleteItemInput;
export type GetItemInput = _DynamoDB.DocumentClient.GetItemInput;
export type PutItemInput = _DynamoDB.DocumentClient.PutItemInput;
export type QueryInput = _DynamoDB.DocumentClient.QueryInput;
export type UpdateItemInput = _DynamoDB.DocumentClient.UpdateItemInput;

class DynamoDb {
  private readonly client: _DynamoDB.DocumentClient;

  constructor() {
    this.client = new _DynamoDB.DocumentClient();
  }

  delete(params: DeleteItemInput) {
    return this.client.delete(params).promise();
  }

  get(params: GetItemInput) {
    return this.client.get(params).promise();
  }

  put(params: PutItemInput) {
    return this.client.put(params).promise();
  }

  query(params: QueryInput) {
    return this.client.query(params).promise();
  }

  update(params: UpdateItemInput) {
    return this.client.update(params).promise();
  }
}

const dynamoDb = new DynamoDb();
export { dynamoDb };
