const express = require('express');
const app = express();

//root route
app.get('/',(req,res)=>{
    res.send("welocome to our page");
})

//getting all products

app.get("/products",(req,res)=>{
    const products = [{
        id:1,
        label:"product 1"
    },{
        id:2,
        label:"product 2"
    },{
        id:3,
        label:"product 3"
    }];
    res.json(products);
})

//dynamic route or getting a specific product through its id 

app.get('/products/:id',(req,res)=>{
    console.log('req.params',req.params);
    const productId = parseInt(req.params.id);
    const products = [{
        id:1,
        label:"product 1"
    },{
        id:2,
        label:"product 2"
    },{
        id:3,
        label:"product 3"
    }];
    const getSingleProduct = products.find((product)=>product.id ===productId);
    if(getSingleProduct){
        res.json(getSingleProduct);
    }
    else{
        res.status(404).send("Product is not found");
    }
})

const port = 3000;
app.listen(port,()=>{
    console.log(`Server is running at port${port}`);
})