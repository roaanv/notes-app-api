import {Context, Handler} from "aws-lambda";
import {ApiResponse, failure, success} from "./libs/response-lib";
import {ddb} from "./libs/ddb-lib";

export const handler:Handler<ApiResponse> = async (evt: any, ctx: Context): Promise<ApiResponse> => {
  const params = {
    TableName: process.env.tableName!,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be Identity Pool identity id
    //   of the authenticated user
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": evt.requestContext.identity.cognitoIdentityId
    }
  };

  try {
    const result = await ddb.query(params).promise();
    return success(result.Items);
  } catch (e) {
    return failure({status:false,detail: JSON.stringify(e)});
  }
};