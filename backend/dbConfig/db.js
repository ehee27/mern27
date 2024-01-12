import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`Mongoose rolling ${conn.connection.host}`)
  } catch (error) {
    console.error(`ERROR ${error}`)
    process.exit(1)
  }
}

export default connectDB
