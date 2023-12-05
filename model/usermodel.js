import mongoose from  "mongoose"
import validator from "validator"


const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: true,
    },
    firmName: String,
    userType: {
        type: String,
        enum: ["Attorney", "Paralegal", "Staff"],
    },
});




export default mongoose.models.User || mongoose.model("User", userSchema)