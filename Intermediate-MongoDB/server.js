require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
const productRoutes = require("./routes/product-routes");
const app = express();

//
app.use(express.json());
//conccect to our databse
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongodb connected successfully"))
  .catch((e) => console.log(e));

  app.use("/products", productRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on PORT ${process.env.PORT}`);
})
