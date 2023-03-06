import connectDB from "../../connectDB"
import User from "../../model/usermodel"
import bcrypt from 'bcryptjs'

connectDB()


export default async(req, res) => {
    try {
    if (req.method === "POST"  )    {
        const { email, password} = req.body

        // console.log(email, password, firstName, lastName)
  
        const user = await User.findOne({ email: email })
  
        if (user) {
          return res.status(422).json({ error: "User already exists" })
        }
        console.log(req.method)
    
    const HashedPassword = await bcrypt.hash(password, 12)
    const newUser =  await new User({
        email: email,
        password: HashedPassword,
      }).save()
    res.status(200).json({message: 'Sign Up Successful'})
    console.log(newUser)
    }
} catch(error)  {
    console.log(error)
}
}