const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGODB_URL;
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(url);
  console.log("DB is connected");

}
