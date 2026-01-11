import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    minLength: 3,
    maxLength: 30,
    immutable: false,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    immutable: true,
    match: /.+\@.+\..+/,
  },
  age: {
    type: Number,
    min: 18,
    max: 200,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 20,
    select:false,
    validate: {
      validator: function (v) {
        let hasUpperCase = false;
        let hasLowerCase = false;
        let number = false;

        for (let i = 0; i < v.length; i++) {
          const char = v[i];
          const charCode = char.charCodeAt(0);

          //uppercase
          if (charCode >= 65 && charCode <= 90) {
            hasUpperCase = true;
          }
          //lowercase
          if (charCode >= 97 && charCode <= 122) {
            hasLowerCase = true;
          }

          if (charCode >= 48 && charCode <= 57) {
            number = true;
          }
        }
        return hasUpperCase && hasLowerCase && number;
      },
      message:
        "Password that you are trying to enter is invalid, please include lowercase uppercase and number in it",
    },
  },
  role: {
    type: String,
    enum: ["admin", "user", "superAdmin"],
    default: "user",
  },
  isActive:{
    type:Boolean,
    default : true,
  },
},
{
    timestamps:true
}
);



const User = mongoose.model("user",userSchema)
export default User;