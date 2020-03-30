import {Context, Handler} from "aws-lambda";
import {ApiResponse, failure, success} from "./libs/response-lib";
import {ddb} from "./libs/ddb-lib";

export const handler:Handler<ApiResponse> = async (evt: any, ctx: Context): Promise<ApiResponse> => {
  const params = {
    TableName: process.env.tableName!,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: evt.requestContext.identity.cognitoIdentityId,
      noteId: evt.pathParameters.id
    }
  };

  try {
    const result = await ddb.get(params).promise();
    if (result.Item) {
      // Return the retrieved item
      return success(result.Item);
    } else {
      return failure({ status: false, error: "Item not found." });
    }
  } catch (e) {
    return failure({status:false,detail: JSON.stringify(e)});
  }
};