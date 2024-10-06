const express = require('express');
const app = express();
app.use("/user",(req,res,next)=>{//if we don't send any response then it will hung around and after sometime it will be timed out.
//res.send("Hi This is 1st Route handler")
console.log("Hi")//it will print on console but still it will be hung as there is no response was sent.
next();//for control reach to next route handler we need to pass another function that is next();
},(req,res)=>{
    console.log("This is second route handler")
    res.send("This is 2nd route handler.")
})

app.use("/route1",(req,res,next)=>{
    next();
},(req,res)=>{

})
//o/p = This will also hung around till time out as in 2nd route there is no response.

app.use("/route2",(req,res,next)=>{
    res.send("This is route 2");
    next();
},(req,res)=>{

})//o/p will be only first response

app.use("/route3",(req,res,next)=>{
    next();
    res.send("This is route3 handler")
},(req,res)=>{
    res.send("This is Route3 second part")
})
//o/p = it will give the response of 2nd part and also it will give the error as the response was already sent from one endpoint , the tcp connection is already made
//So it will not give the second response that's why it iwll give the 2nd response first and give error

app.use("/route4",[(req,res)=>{
    res.send("Hi");
},(req,res)=>{
    res.send('HI 2')//as you can see it can be wrapped through multiple array or single array or array and normal
}],[(req,res)=>{
    res.send('HI 3')
},(req,res)=>{
    res.send('HI 4')
}],(req,res)=>{
    res.send('HI 5')
},(req,res)=>{
    res.send('HI 6')
})
app.use("/route5",(req,res,next)=>{
    res.send("This is route5 handler")
    next();
},(req,res)=>{
    res.send("This is Route5 second part")
})
//o/p = this is also give the 1st response and error because after giving response of 1st route handler
//control will reach to next and there it will find another response and as we know we can't send multiple response

app.use("/route6",(req,res,next)=>{
    next();
})
app.use("/route6",(req,res)=>{
    res.send("This is part 2 of 6th route")
})
//this is also exactly same as we used to do it before just a little change that we can create same route 2nd times 
//and pass function to it this wiil exactly work as above.

app.use("/r6",(req,res,next)=>{
    //res.send("Hi from 6")
    next();
},(req,res,next)=>{
    next();
})
//it will give error as there is no next function so it is expecting another route handler
app.listen(3000);
