import mongoose from "mongoose";
const { Schema } = mongoose;
mongoose.set("debug", true);

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

var User = mongoose.model("User", userSchema);

export default User;
