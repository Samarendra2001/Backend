require('dotenv' ).config();
const express = require('express');
const app = express();
const connectToDB = require("./database/db");
const authRoutes = require('./routes/auth-route');
const homeRoutes = require("./routes/home-route");
const adminRoutes = require("./routes/admin-route");
const uploadImageRoutes = require("./routes/image-routes");
connectToDB();

//middlewares
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/image", uploadImageRoutes);
const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})