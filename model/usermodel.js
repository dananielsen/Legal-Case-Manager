import mongoose from  "mongoose"


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
            
        },
        password:   {
            type: String,
            required: true,
        },
       
    }
)



export default mongoose.models.User || mongoose.model("User", userSchema)