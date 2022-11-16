import mongoose from "mongoose";

export const conection = () => {
    // mongoose.connect('mongodb://localhost:27017/dblink');
    const DB_URI = process.env.DB_URI;
    mongoose.connect(DB_URI);
    
};
