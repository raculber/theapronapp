import mongoose from "mongoose";
const { Schema } = mongoose;

const groceryListSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  groceryLists: [
    {
      name: { type: String, unique: true },
      items: [
        {
          id: Number,
          name: String,
          amount: Number,
          unit: String,
        },
      ],
    },
  ],
});

var GroceryList = mongoose.model("GroceryList", groceryListSchema);

export default GroceryList;
