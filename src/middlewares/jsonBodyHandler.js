export async function jsonBodyHandler(request, response) {
  // Add new chunks to the buffers array
  const buffers = [];
  for await (const chunk of request) {
    buffers.push(chunk);
  }

  try {
    // Concatenate all chunks into a single buffer. Then parse it as JSON
    request.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (error) {
    // If an error occurs
    response.body = null;
  }

  // Define the Content-Type header as JSON
  response.setHeader("Content-Type", "application/json");
}
