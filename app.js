const express=require("express");
const mongoose=require("mongoose");
const path=require("path");
const dotenv=require("dotenv");
const urlRouter=require("./routes/urlRouter");

dotenv.config();

const app=express();
const PORT=process.env.PORT || 8000;


mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000
})
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

    
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.urlencoded({extended:true}));

app.use("/", urlRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});