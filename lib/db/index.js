import mongoose from "mongoose";
import { Role, User } from "../models";


export const connectDBHandler = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState !== 1) {
    console.log("X not connected X");
    await mongoose
      .connect(process.env.MONGODB_URL || "")
      .then(() => console.log('db connected successfully🚀'))
      .catch(err => console.log('db connection Error = ', err));

    let adminRole = await Role.findOne({ name: "admin" });
    const userRole = await Role.findOne({ name: "user" });

    if (!adminRole) {
      adminRole = await Role.create({ name: "admin" });
      console.log("Admin role created");
    }
    if (!userRole) {
      await Role.create({ name: "user" });
      console.log("User role created");
    }

    const adminUser = await User.findOne({ role: "admin" });

    if (!adminUser) {
      await User.create({
        name: "admin",
        email: "admin@gmail.com",
        password: "admin",
        role: adminRole._id
      });
      console.log("Admin user created");
    }
  }

  return handler(req, res);
};

const db = mongoose.connection;
db.once('ready', () => console.log(`connected to mongo on ${process.env.MONGODB_URL}`));
