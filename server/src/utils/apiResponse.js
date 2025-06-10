class CustomResponse {
  constructor(statusCode, message = "Success", data) {
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
  }
}

function ApiResponse(response, statusCode, message, data) {
  const responseObj = new CustomResponse(statusCode, message, data);
  return response.status(responseObj.statusCode).json({ ...responseObj });
}

export default ApiResponse;
