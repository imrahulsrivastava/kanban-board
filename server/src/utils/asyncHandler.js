const asyncHandler = (requestHandler) => {
  return (request, response, nextHandler) => {
    Promise.resolve(requestHandler(request, response, nextHandler)).catch(
      (err) => nextHandler(err)
    );
  };
};

export default asyncHandler;
