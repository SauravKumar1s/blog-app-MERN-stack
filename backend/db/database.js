import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

mongoose.connect(process.env.Mongo_Url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    writeConcern: {
      w: "majority",
      wtimeout: 0,
    },
  }).then((result) => {
    console.log("connected to the database");
  }).catch((err) => {
    console.log(err);
  });
  