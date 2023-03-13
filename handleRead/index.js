const dynamoose = require("dynamoose");

const schema = new dynamoose.Schema({
  id: String,
  name: String,
  phone: String,
});

const peopleModel = dynamoose.model("people", schema);

exports.handler = async (event) => {
  console.log("the path parameters", event.pathParameters);
  const id = event?.pathParameters?.id;

  const response = { statusCode: null, body: null };

  try {
    if (!id) {
      let results = await peopleModel.scan().exec();
      console.log(results);
      response.body = JSON.stringify(results);
      response.statusCode = 200;
    } else {
      let result = await peopleModel.get(id);
      console.log(result);
      response.body = JSON.stringify(result);
      response.statusCode = 200;
    }
  } catch (e) {
    response.body = JSON.stringify(e.message);
    response.statusCode = 500;
  }

  // TODO implement

  return response;
};
