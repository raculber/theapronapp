import mongoose from "mongoose";
const { Schema } = mongoose;

const ingredientsSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  ingredients: [
    {
      id: Number,
    },
  ],
});

var Ingredients = mongoose.model("Ingredients", ingredientsSchema);

export default Ingredients;
