const mongoose = require("mongoose");

const mongoURL = "mongodb+srv://tastfood:project123@testfood.ucuadup.mongodb.net/tastfood?retryWrites=true&w=majority"

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURL, { useNewUrlParser: true }); 
    console.log("MongoDB connected");
    const fetched_data = await mongoose.connection.db.collection("food_items");
    const data = await fetched_data.find({}).toArray();
    global.food_items = data;
    // console.log(global.food_items)
    const foodCategory = await mongoose.connection.db.collection("food_category")
    const cateData= await foodCategory.find({}).toArray();
    global.food_category = cateData
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

module.exports = mongoDB;
