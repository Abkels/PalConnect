import createHttpError from "http-errors"
import validator from 'validator'
import {UserModel} from "../models/index.js"
import bcrypt from "bcrypt"

//env variables
const {DEFAULT_PICTURE, DEFAULT_STATUS}= process.env;

export const createUser = async(userData)=> {
    const {name, email,picture,status,password} = userData;

    //check if fields are empty
    if(!name || !email || !password){
        throw createHttpError.BadRequest('Please fill all fields.')
    } 

   //check name length
   if(!validator.isLength(name,{
    min: 2,
    max: 20
   })){
    throw createHttpError.BadRequest("Please make sure your name is between 2 and 16 chracters")
   }

   //check status length
   if (status && status.length > 100 ) {
    if(status.length > 100) {
        throw createHttpError.BadRequest("Please make sure your status is less than 100 characters.");
    }
   }

   //check if email address is valid
   if(!validator.isEmail(email)) {
    throw createHttpError.BadRequest('Please provide a valid email address')
   }

   //Check if user already exist
   const checkDb = await UserModel.findOne({email});
   if (checkDb) {
    throw createHttpError.Conflict("Please try again with a differednt email address, this email already exists")
   }

   //check password length
   if(!validator.isLength(password, {
    min:6,
    max: 128,
   })){
    throw createHttpError.BadRequest(
        "Please make sure your password is above 6 characters and does not exceed 128 characters"
    );
   }

   //hash password ---> to be done in the user model

   //Adding user to database
   const user = await new UserModel({
    name,
    email,
    picture: picture || DEFAULT_PICTURE,
    status: status || DEFAULT_STATUS,
    password
   }).save()
   
   return user;
}

export const signUser = async (email, password) => {
    const user = await UserModel.findOne({email: email.toLowerCase()}).lean();

    //Check if user exists
    if(!user) {
        throw createHttpError.NotFound("Invalid credentials");
    }

      //compare password
      let passwordMatch = await bcrypt.compare(password, user.password)

      if(!passwordMatch) throw createHttpError.NotFound("Invalid credentials.");

      return user; 
};
 