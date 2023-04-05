import mongoose from  "mongoose"
import validator from "validator"


const userSchema = mongoose.Schema(
    {
        firstName:  {
            type: String,
          
        },
        lastName:   {
            type: String, 
           
        },
        email: {
            type: String,
            required: true,
            unique: true, 
            validate: [validator.isEmail, "Please Enter A Valid Email Address"],
            
        },
        password:   {
            type: String,
            required: true,
        },
       
    }
)



export default mongoose.models.User || mongoose.model("User", userSchema)