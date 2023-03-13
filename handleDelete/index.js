const dynamoose = require("dynamoose");

const schema = new dynamoose.Schema({
  id: String,
  name: String,
  phone: String,
});

const peopleModel = dynamoose.model("people", schema);

exports.handler = async (event) => {
  const id = event?.pathParameters?.id;

  const response = { statusCode: null, body: null };

  try {
    await peopleModel.delete(id);

    response.statusCode = 200;
    response.body = JSON.stringify("item deleted");
  } catch (e) {
    response.body = JSON.stringify(e.message);
    response.statusCode = 500;
  }

  return response;
};
