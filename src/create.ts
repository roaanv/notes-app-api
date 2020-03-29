import {DynamoDB} from "aws-sdk";
import {Context, Handler} from "aws-lambda";
import { v4 as uuidv4 } from 'uuid';
import {ApiResponse, failure, success} from "./response-lib";

const ddb = new DynamoDB.DocumentClient();

export const handler:Handler<ApiResponse> = async (evt: any, ctx: Context): Promise<ApiResponse> => {
  const data = JSON.parse(evt.body);
  const params = {
    TableName: process.env.tableName!,
    Item: {
      userId: evt.requestContext.identity.cognitoIdentityId,
      noteId: uuidv4(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  };

  try {
    await ddb.put(params).promise();
    return success(params.Item);
  } catch (e) {
    return failure({status:false,detail: JSON.stringify(e)});
  }
};