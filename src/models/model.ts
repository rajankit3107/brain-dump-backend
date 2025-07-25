import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const contentModel = new mongoose.Schema({
    title : {
        type : String,
        required:  true
    },

    link : {
        type : String,
        required : true,
    },
    tags : [{
        type: mongoose.Types.ObjectId,
        ref : 'Tag'
    }],
    userId : {
        type: mongoose.Types.ObjectId,
        ref : 'User',
        required : true,
    }
},{
    timestamps : true
})


export const User = mongoose.model("User", userModel);
export const Content = mongoose.model("Content", contentModel)

