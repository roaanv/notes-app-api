import {Context, Handler} from "aws-lambda";
import { v4 as uuidv4 } from 'uuid';
import {ApiResponse, failure, success} from "./libs/response-lib";
import {ddb} from "./libs/ddb-lib";

export const handler:Handler<ApiResponse> = async (event: any, ctx: Context): Promise<ApiResponse> => {
  const params = {
    TableName: process.env.tableName!,
    // 'Key' defines the partition key and sort key of the item to be removed
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  };

  try {
    await ddb.delete(params).promise();
    return success({status:true});
  } catch (e) {
    return failure({status:false,detail: JSON.stringify(e)});
  }
};