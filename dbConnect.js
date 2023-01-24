const mongoose = require("mongoose");

module.exports = async () => {
  const uri =
    "mongodb+srv://aditya:Ayanagar47@cluster0.df8gpcl.mongodb.net/main?retryWrites=true&w=majority";
  try {
    await mongoose.connect(
      uri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => {
        console.log("Mongoose connect");
      }
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
