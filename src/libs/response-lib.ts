export interface ApiResponse {
  statusCode: number;
  headers: {};
  body: string;
}

export function success(body): ApiResponse {
  return buildResponse(200, body);
}

export function failure(body): ApiResponse {
  return buildResponse(500, body);
}

function buildResponse(statusCode, body): ApiResponse {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(body)
  };
}
