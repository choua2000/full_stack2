// import mongoose from "mongoose";
// const authSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     role:{
//         type:String,
//         enum:["user","admin"],
//         required:true,
//         default:"user"
//     }
// },{timestamps:true})

// export default mongoose.model("Auth", authSchema)


// import mongoose from "mongoose";
import mongoose, { Schema, Document } from 'mongoose';

// Interface for the User model
export interface Auth extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';  // You can define the roles here as a string enum
}

// Define the User Schema
const AuthSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Trims any whitespace from the name
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures that email is unique
    lowercase: true, // Converts email to lowercase before saving
    // match: [
    //   /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 
    //   'Please fill a valid email address',
    // ], // Basic email validation
  },
  password: {
    type: String,
    required: true,
     minlength: 6,  //Minimum password length
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Limits the role to either 'user' or 'admin'
    default: 'user', // Default role is 'user'
  },
}, {
  timestamps: true, // Automatically adds `createdAt` and `updatedAt` timestamps
});

// Create and export the User model
const Auth = mongoose.models.Auth || mongoose.model<Auth>('Auth', AuthSchema);

export default Auth;
