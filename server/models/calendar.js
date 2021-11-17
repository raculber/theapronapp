import mongoose from "mongoose";
const { Schema } = mongoose;

const calendarSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  recipes: [
    {
      date: Date,
      recipe: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
    },
  ],
});

var Calendar = mongoose.model("Calendar", calendarSchema);

export default Calendar;
