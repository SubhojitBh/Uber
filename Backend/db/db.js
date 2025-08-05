import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const uri = process.env.DB_CONNECT;

function connectToDB() {
    mongoose.connect(uri)
    .then(() => {
        console.log("Connected to DB");
    }).catch(err => {
        console.error(err);
    })
}

export default connectToDB;