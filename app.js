require("dotenv").config();

const expressApp = require("./src/adapters/express/expressAdapter");

const currentPort = process.env.PORT || 3000;
expressApp.listen(currentPort, () => {
  console.log("Server is running on port", currentPort);
});
