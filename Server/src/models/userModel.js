import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email address"],
        unique: [true, "This email already exist"],
        lowercase: true,
        validate:[validator.isEmail, "Please provide a valid email address"]
    },
    picture: {
        type: String,
        default: "https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png",
    },
    status: {
        type: String,
        default: "Hey there! I connect will pals using PalConnect"
    },
    password: {
        type: String,
        required: [true, "Please provide your password"],
        minLength: [6, "Please make sure your password is at least 6 characters long"],
        maxLength: [128, "Please make sure your password is at less than 128 characters long" ]
    }
}, {
    collection: "users",
    timestamps: true,
}
);
userSchema.pre('save', async ()=>{
    try{
        if(this.isNew){
            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(this.password, salt)
            this.password = hashedPassword;
        }
        next();
    } catch (error) {
        next(error)
    }
})

const UserModel = mongoose.model("UserModel", userSchema); 

export default UserModel;