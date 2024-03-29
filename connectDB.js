import mongoose from "mongoose"

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return
  }
  mongoose
    .connect(process.env.NEXT_PUBLIC_MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => console.log("connected to DB"))
}

export default connectDB