const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser=require('body-parser');
const connectDb =require('./config/mongoose')
const userRouter =require('./routes/userRoute')
const path=require('path')
const app = express();
const PORT = process.env.PORT;






//connecting database
connectDb();

app.use(bodyParser.json());
app.use(cors());

// user api
app.use("/api/users", userRouter);



// ------------------------Deployement------------------------------------------>



const __dirname1 = path.resolve();
 

app.use(express.static(path.join(__dirname1,'frontend_build')))

app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname1,"frontend_build","index.html"))
});






// --------------------------------------------------------------------




app.listen(PORT, () => {
  console.log(`Server is running successfully on ${PORT}`);
});






process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Shutting down...");
  process.exit(1);
});