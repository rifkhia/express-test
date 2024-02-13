require("dotenv").config();

const expressApp = require("./src/adapters/express/expressAdapter");
expressApp.listen(3001, () => {
  console.log("Server is running on port 3000");
});
