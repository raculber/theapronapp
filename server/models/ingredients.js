import mongoose from "mongoose";
const { Schema } = mongoose;

const ingredientsSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      id: Number,
      name: String,
    },
  ],
});

var Ingredients = mongoose.model("Ingredients", ingredientsSchema);

export default Ingredients;
