const dynamoose = require("dynamoose");

const schema = new dynamoose.Schema({
  id: String,
  name: String,
  phone: String,
});

const peopleModel = dynamoose.model("people", schema);

exports.handler = async (event) => {
  // TODO implement
  // const id = event?.pathParameters?.id;
  const parsedBody = JSON.parse(event.body);

  const response = { statusCode: null, body: null };
  try {
    let updatedResult = await peopleModel.update(
      event.pathParameters,
      parsedBody
    );
    response.statusCode = 200;
    response.body = JSON.stringify(updatedResult);
  } catch (e) {
    response.body = JSON.stringify(e.message);
    response.statusCode = 500;
  }

  return response;
};
