exports.handler = async function (event, context) {
  // Check if the request method is POST and has a valid body
  if (event.httpMethod === "POST" && event.body) {
    const data = JSON.parse(event.body);

    // Check if the required data properties are available
    if (data.name && data.message && data.email) {
      const response = {
        message: `Hello ${data.name}! You sent the message: "${data.message}".`,
      };

      // Return a successful response with the custom greeting
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      };
    }
  }

  // Return an error response if the request is not valid
  return {
    statusCode: 400,
    body: JSON.stringify({
      error: "Invalid request. Please provide name, email and message.",
    }),
  };
};
