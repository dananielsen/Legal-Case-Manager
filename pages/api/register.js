import connectDB from "../../connectDB"
import User from "../../model/usermodel"
import bcrypt from 'bcryptjs'

connectDB()

export default async (req, res) => {
  try {
      if (req.method === "POST") {
          const { email, password, firstName, lastName, firmName, userType } = req.body;

          const user = await User.findOne({ email });

          if (user) {
              return res.status(422).json({ error: "User already exists" });
          }

          const hashedPassword = await bcrypt.hash(password, 12);
          const newUser = await new User({
              email,
              password: hashedPassword,
              firstName,
              lastName,
              firmName,
              userType,
          }).save();

          res.status(200).json({ message: "Sign Up Successful" });
          console.log(newUser);
      }
  } catch (error) {
      console.log(error);
  }
};
